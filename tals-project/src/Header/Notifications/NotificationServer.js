// Modulos de react
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

// Gestores globales de los Servicios
import * as MSensorServer from '../../services/Security/MSensorServer';
import * as TimerLight from '../../services/Lights/Timer/LightTimer';
import * as TimerSpray from '../../services/Water/Timer/SprayTimer';
import * as LevelsTherm from '../../services/Therm/Levels/ThermLevels';
import * as StatusTherm from '../../services/Therm/ThermServer';
import {getWatertankLevels} from '../../services/Water/WaterServer';
import WTItem from "../../services/Water/WaterItem";
import { addEventListener } from '../../Worker/worker'; // Funcion en segundo plano para interruptores automaticos

// Crear el contexto de notificaciones
const NotificationContext = createContext();

// Hook para acceder al contexto desde cualquier componente
export const useNotification = () => useContext(NotificationContext);

// Proveedor del contexto de notificaciones
export const NotificationProvider = ({ children }) => {
    const NOTIFICATION_INTERVAL = 15000; // Intervalo de 15 segundos
    const [porcentajeMaximo, setPorcentajeMaximo] = useState(0); // Porcentaje desde la API
    const [porcentajeMinimo, setPorcentajeMinimo] = useState(0); // Porcentaje desde la API
    const [porcentaje, setPorcentaje] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [lastNotificationTime, setLastNotificationTime] = useState(0); // Timestamp última notificación
    let lastStateChange = 0;
    const debounceDelay = 15000; // Delay de 15 segundos
    
    // Funcion extra para formato de fechas
    function formatTime(time) {
        // Convertir a objeto Date
        const timerDate = new Date(`1970-01-01T${time}`);
        // Extraer horas y minutos
        const hours = timerDate.getHours();
        const minutes = timerDate.getMinutes();
        // Formatear la hora
        const formattedTime = `${hours}:${minutes}`;
        return formattedTime;
    };
    
    //Sensor de Movimiento
    const actualState = async () => {
        try{
            const res = await MSensorServer.getLastActivity();
            const data = await res.json();
            const currentState = data?.MotionSensor?.estado;
            if (currentState === 1 && Date.now() - lastStateChange > debounceDelay) {
                addNotification('Movimiento: ¡Movimiento detectado!', "success");
                lastStateChange = Date.now();
            };
        }catch(error){
            console.log(error);
            return null;
        }
    };
    
    // Temperatura
    const ThermostatLevels = async () => {
        try{
            const levels = await LevelsTherm.getLevelsList();
            const dataLevels = await levels.json();
            const status = await StatusTherm.getLastThermostat();
            const dataStatus = await status.json();
            if (dataLevels.message === "Success" && dataStatus.message === "Success") {
                const t_level = dataLevels.thermLevel.temperatura_deseada;
                const t_status = dataStatus.Thermostat.temperatura;
                if (t_status > t_level) {
                    addNotification('Termostato: La temperatura actual no es la deseada por el usuario.', "success");
                }
            } else {
                console.log({'message':'No hay parametros establecidos'});
            }
        } catch (error) {
            console.error('Error al obtener los parametros:', error);
        }
    };
    
    // Interruptor automatico de las Luces
    const LightTime = async () => {
        try {
            const response = await TimerLight.getTimersList();
            const data = await response.json();
            const now = new Date();
            const time = now.getHours() + ':' + now.getMinutes();
            if (data.message === "Success") {
                const initTimer = data?.timerLight?.horario_inicio;
                const closeTimer = data?.timerLight?.horario_cierre;
                const initFormat = formatTime(initTimer);
                const closeFormat = formatTime(closeTimer);
                if (time === initFormat) {
                    const send = addEventListener('lights', 'ON');
                    if (send){    
                        addNotification('Luminaria: Se han encendido las luces', "success"); 
                    }
                } else if (time === closeFormat){
                    const send = addEventListener('lights', 'OFF');
                    if (send){    
                        addNotification('Luminaria: Se han apagado las luces', "success"); 
                    }
                }
            } else {
                console.log({'message':'No se encontraron temporizadores'});
            }
        } catch (error) {
            console.error('Error al obtener la lista de temporizadores:', error);
        }
    };
    
    // Interruptor automatico del sistema de Agua
    const SprayTime = async () => {
        try {
            const response = await TimerSpray.getTimer(1);
            const data = await response.json();
            if (data.message === "Success") {
                const timer = data?.timerSpray;
                const send = addEventListener('spray', timer);
            } else {
                console.log({'message':'No se encontraron temporizadores'});
            }
        } catch (error) {
            console.error('Error al obtener la lista de temporizadores:', error);
        }
    };

    // Hook para determinar Intervalos de Ejecucion
    useEffect(() => {
        actualState();
        LightTime();
        SprayTime();
        ThermostatLevels();

        // Actualizar intervalos por peirodos de tiempo (ajustar según las necesidades)
        const interval = setInterval(actualState, 1000);
        const interval_light = setInterval(LightTime, 15000);
        const interval_spray = setInterval(SprayTime, 15000);
        const interval_therm = setInterval(ThermostatLevels,1500);
        
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval,interval_light,interval_spray,interval_therm);
        // eslint-disable-next-line
    }, [] );
    
    // Función para agregar notificación
    const addNotification = useCallback((message, type = "success") => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);
    }, []);

    return (
        <NotificationContext.Provider value={{ addNotification, notifications }}>
            <div>
                {children}
            </div>
        </NotificationContext.Provider>
    );
};
import React, { createContext, useState, useEffect, useRef, useContext, useCallback } from "react";
import * as MSensorServer from '../../services/Security/MSensorServer';
import * as TimerLight from '../../services/Lights/Timer/LightTimer';
import * as TimerSpray from '../../services/Water/Timer/SprayTimer';
import * as LevelsTherm from '../../services/Therm/Levels/ThermLevels';
import * as StatusTherm from '../../services/Therm/ThermServer';
import { addEventListener } from '../../Worker/worker';

// Crear el contexto de notificaciones
const NotificationContext = createContext();

// Hook para acceder al contexto desde cualquier componente
export const useNotification = () => useContext(NotificationContext);

// Proveedor del contexto de notificaciones
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    let lastStateChange = 0;
    const debounceDelay = 10000; // 10 segundos
    const workerRef = useRef(null);

    function formatTime(time) {
        // Convertir a objeto Date
        const timerDate = new Date(`1970-01-01T${time}`);
        // Extraer horas y minutos
        const hours = timerDate.getHours();
        const minutes = timerDate.getMinutes();
        // Formatear la hora
        const formattedTime = `${hours}:${minutes}`;
        return formattedTime;
    }

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

    const ThermostatLevels = async () => {
        try{
            const levels = await LevelsTherm.getLevelsList();
            const dataLevels = await levels.json();
            const status = await StatusTherm.getLastThermostat();
            const dataStatus = await status.json();
            if (dataLevels.message === "Success" && dataStatus.message === "Success") {
                const t_level = dataLevels.thermLevel.temperatura_deseada;
                const t_status = dataStatus.Thermostat.temperatura;
                if (t_status !== t_level) {
                    addNotification('Termostato: La temperatura actual no es la deseada por el usuario.', "success");
                }
            } else {
                console.log({'message':'No hay parametros establecidos'});
            }
        } catch (error) {
            console.error('Error al obtener los parametros:', error);
        }
    };

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

    useEffect(() => {
        actualState();
        LightTime();
        SprayTime();
        ThermostatLevels();
        // Actualizar cada 1 segundos (ajusta el intervalo según tus necesidades)
        const interval = setInterval(actualState, 1000);
        const interval_light = setInterval(LightTime, 60000);
        const interval_spray = setInterval(SprayTime, 60000);
        const interval_therm = setInterval(ThermostatLevels, 60000);
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
        return () => clearInterval(interval_light);
        return () => clearInterval(interval_spray);
        return () => clearInterval(interval_therm);
        // eslint-disable-next-line
    }, [] );

    // Función para agregar notificación
    const addNotification = useCallback((message, type = "success") => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);
    }, []);

    return (
        <NotificationContext.Provider value={{ addNotification, notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

import React, { useState, useEffect, useRef } from "react";
import * as MSensorServer from './MSensorServer';
import { useNotification } from "../../Header/Notifications/NotificationServer"; // Importar el hook de notificaciones

const MSensorItem = () => {
    const [activity, setActivity] = useState({});
    const previousState = useRef(null); // Guardar el estado anterior
    const { addNotification } = useNotification(); // Obtener la función de notificación

    // Función para obtener el estado actual del sensor
    const actualState = async () => {
        try {
            const res = await MSensorServer.getLastActivity();
            const data = await res.json();
            setActivity(data);

            const currentStatus = data?.MotionSensor?.estado;

            console.log(currentStatus);

            // Verificar si el estado scambió a 1 para enviar notificación
            if (currentStatus === 1 && previousState.current !== 1) {
                const message = getActivityStatus(currentStatus);
                addNotification(message,'success'); // Enviar notificación
            }
            // Actualizar el estado anterior con el actual
            previousState.current = currentStatus;
        } catch (error) {
            console.log("Error al obtener el estado del sensor: ",error);
        }
    };

    // useEffect para actualizar cada segundo
    useEffect(() => {
        actualState(); // Llamada inicial
        const interval = setInterval(actualState, 1000); // Intervalo de actualización
        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, []);

    // Función para obtener el estado como texto
    function getActivityStatus(act) {
        switch (act) {
            case 0:
                return 'Sin Registros';
            case 1:
                return 'Movimiento detectado!';
            default:
                return 'N/A';
        }
    }

    return (
        <div className="d-flex flex-row mb-3 justify-content-evenly">
            <div className="d-flex flex-column">
                <div className="card card-body">
                    <h3 className="card-tittle">Sensor de Movimiento:</h3>
                    <p className="card-text my-3">
                        Estado: <strong>{getActivityStatus(activity?.MotionSensor?.estado) || 'N/A'}</strong>
                    </p>
                    <p className="card-text">
                        Fecha de Registro: <strong>{activity?.MotionSensor?.date || 'N/A'}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MSensorItem;

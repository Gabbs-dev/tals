﻿import React, { useState, useEffect } from "react";
import * as MSensorServer from './MSensorServer';
import {NotificationProvider} from '../../Header/Notifications/NotificationServer';

const MSensorItem = () => {
    const [Activity, setActivity] = useState([]);

    const actualState = async () => {
        try{
            const res = await MSensorServer.getLastActivity();
            const data = await res.json();
            setActivity(data);
        }catch(error){
            console.log(error);
            return null;
        }
    };
    useEffect(() => {
        actualState();
        // Actualizar cada 1 segundos (ajusta el intervalo según tus necesidades)
        const interval = setInterval(actualState, 1000);
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [] );

    function getActivityStatus(act) {
        switch (act) {
            case 0:
                return 'Sin Registros';
            case 1:
                return 'Movimiento detectado!';
            default:
                return 'N/A';
        };
    };

    return(
        <div className="d-flex flex-row mb-3 justify-content-evenly">
            <div className="d-flex">
                <div className="card card-body">
                    <h3 className="card-tittle">Sensor de Movimiento: </h3>
                    <p className="card-text my-3">Estado: <strong>{getActivityStatus(Activity?.MotionSensor?.estado) || 'N/A'}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default MSensorItem;
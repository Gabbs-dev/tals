﻿import * as WTServer from './WaterServer';
import React, { useEffect, useState } from 'react';

const WTItem = () => {
    const [TanqueAgua, setTanqueAgua] = useState([]);

    const actualState = async () => {
        try{
            const res = await WTServer.getLastWatertank();
            const data = await res.json();
            setTanqueAgua(data);
        }catch(error){
            console.log(error);
            return null;
        };
    };
    useEffect(() => {
        actualState();
        // Actualizar cada 5 segundos (ajusta el intervalo según tus necesidades)
        const interval = setInterval(actualState, 5000);
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [] );

    return(
        <div className="d-flex flex-row mb-3 justify-content-evenly">
            <div className='d-flex flex-column'>
                <div className="card card-body">
                    <h3 className="card-tittle">Tanque de agua</h3>
                    <p className="card-text my-3">Nivel Actual de Agua: <strong>{TanqueAgua?.Watertank?.nivel_agua || 'N/A'} Lts </strong></p>
                    <p className="card-text">Nivel Máximo: <strong>{TanqueAgua?.Watertank?.nivel_max || 'N/A'} Lts</strong></p>
                    <p className="card-text">Nivel Minimo: <strong>{TanqueAgua?.Watertank?.nivel_min || 'N/A'} Lts</strong></p>
                    <p className="card-text">Fecha: <strong>{TanqueAgua?.Watertank?.date || 'N/A'}</strong></p>
                </div>
            </div>
            
        </div>
    );
};

export default WTItem;
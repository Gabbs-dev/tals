import * as WTServer from './WaterServer';
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
        Levels();
        // Actualizar cada 5 segundos (ajusta el intervalo según tus necesidades)
        const interval = setInterval(actualState, 5000);
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [] );
    
    const [TanqueAguaLevels, setTanqueAguaLevels] = useState([]);
    const Levels = async () => {
        try{
            const res = await WTServer.getWatertankLevel(1);
            const data = await res.json();
            setTanqueAguaLevels(data);
        }catch(error){
            console.log(error);
            return null;
        };
    };

    return(
        <div className="d-flex flex-row mb-3 justify-content-evenly">
            <div className='d-flex flex-column'>
                <div className="card card-body">
                    <h3 className="card-tittle">Tanque de agua</h3>
                    <p className="card-text my-3">Nivel Actual de Agua: <strong>{TanqueAgua?.Watertank?.nivel_agua || 'N/A'} %</strong></p>
                    <p className="card-text">Litros Restantes: <strong> Lts</strong></p>
                    <p className="card-text">Nivel Máximo: <strong>{TanqueAguaLevels?.tanklevel?.nivel_maximo || 'N/A'} %</strong></p>
                    <p className="card-text">Nivel Minimo: <strong>{TanqueAguaLevels?.tanklevel?.nivel_minimo || 'N/A'} %</strong></p>
                </div>
            </div>
        </div>
    );
};

export default WTItem;
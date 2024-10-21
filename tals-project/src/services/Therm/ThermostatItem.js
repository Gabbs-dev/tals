import * as ThermServer from './ThermServer';
import React, { useEffect, useState } from 'react';

import { getLevel } from './Levels/ThermLevels'

const ThermostatItem = (levelsData) => {
    const [Termostato, setTermostato] = useState([]);
    const [Level, setLevel] = useState([]);

    const actualState = async () => {
        try{
            const res = await ThermServer.getLastThermostat();
            const data = await res.json();
            setTermostato(data);
        }catch(error){
            console.log(error);
            return null;
        };
    };

    const thermostatLevel = async () => {
        try{
            const res = await getLevel(1);
            const data = await res.json();
            setLevel(data);
        }catch(error){
            console.log(error);
            return null;
        };
    };

    useEffect(() => {
        actualState();
        thermostatLevel();
        // Actualizar cada 5 segundos (ajusta el intervalo según tus necesidades)
        const interval = setInterval(actualState, 5000);
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [] );
    
    return (
        <div className="d-flex flex-row mb-3 justify-content-evenly">
            <div className='d-flex flex-column'>
                <div className="card card-body">
                    <h3 className="card-tittle">Termómetro:</h3>
                    <p className="card-text my-3">Temperatura Actual: <strong> {Termostato?.Thermostat?.temperatura || 'N/A'} ºC </strong></p>
                    <p className="card-text">Humedad Actual: <strong>{Termostato?.Thermostat?.humedad || 'N/A'} % </strong></p>
                    <p className="card-text">Temperatura Deseada: <strong>{Level?.thermLevel?.temperatura_deseada || 'N/A'} ºC </strong></p>
                    <p className="card-text">Fecha: <strong>{Termostato?.Thermostat?.date || 'N/A'}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default ThermostatItem;
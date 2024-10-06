import * as ThermServer from './ThermServer';
import React, { useEffect, useState } from 'react';

const ThermostatItem = () => {
    const [Termostato, setTermostato] = useState([]);

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
    useEffect(() => {
        actualState();
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
                    <p className="card-text">Temperatura Deseada: <strong>{Termostato?.Thermostat?.temperatura_deseada || 'N/A'} ºC </strong></p>
                    <p className="card-text">Fecha: <strong>{Termostato?.Thermostat?.date || 'N/A'}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default ThermostatItem;
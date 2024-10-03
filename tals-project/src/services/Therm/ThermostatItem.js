import React, { useState, useEffect } from "react";
import * as ThermServer from './ThermServer';

const ThermostatItem = () => {
    const [termostato, setTermostato] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const lastThermostat = await ThermServer.getLastThermostat();
            setTermostato(lastThermostat);
        };
        fetchData();
        // Actualizar cada 5 segundos (ajusta el intervalo según tus necesidades)
        const interval = setInterval(fetchData, 3000);
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []);

    return(
        <div className="col-md-4 my-3">
            <div className="card card-body">
                <h3 className="card-tittle">Termometro:</h3>
                <p className="card-text my-3">Temperatura Actual: <strong>{termostato.temperatura} ºC </strong></p>
                <p className="card-text">Humedad Actual: <strong>{termostato.humedad} % </strong></p>
                <p className="card-text">Temperatura Deseada: <strong>{termostato.temperatura_deseada} ºC </strong></p>
                <p className="card-text">Fecha: <strong>{termostato.date}</strong></p>
            </div>
        </div>
    );
};

export default ThermostatItem;
﻿import React, { useEffect, useState } from 'react';
import ThermostatItem from './ThermostatItem';
import TempCharts from '../../Charts/TempChart';
import * as ThermServer from './ThermServer';

const ThermList = () => {
    const [Termostato, setTermostato] = useState([]);

    const actualState = async () => {
        try{
            const res = await ThermServer.getLastThermostat();
            const data = res.json();
            console.log(data);
            setTermostato(data.Termostato);
        }catch(error){
            console.log(error);
            return null;
        }
    };

    useEffect(() => {
        actualState();
        // Actualizar cada 5 segundos (ajusta el intervalo según tus necesidades)
        const interval = setInterval(actualState, 5000);
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [] );

    return (
        <div className='row'>
            <h1 className='display-5'>Panel de Control / Temperatura</h1>
            <hr className='divider'/>
            <div className="card text-bg-light mx-3 my-3">
                <div className="card-header">Resumen Global</div>
                <div className="card-body">
                    <TempCharts/>
                </div>
            </div>
            <h2 className='display-6 mt-5'>Dispositivos Activos</h2>
            <hr className='divider'/>
            {Termostato.map((termostato)=>(
                <ThermostatItem key={termostato.id} termostato={termostato} actualState={actualState} />
            ))} 
            <h2 className='display-6 mt-5'>Configuracion</h2>
            <hr className='divider'/>
            <div className="card text-bg-light mx-3 my-3">
                <div className="d-flex align-items-center justify-content-between card-header">
                    <h4>Resumen Global</h4>
                    <button className='btn btn-primary'>Configurar Dispositivo</button>
                </div>
                <div className="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Dispositivos</th>
                                <th scope="col">Actividad</th>
                                <th scope="col">Horas de Uso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Termostato</td>
                                <td>Activo</td>
                                <td>15:20</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Termostato</td>
                                <td>Activo</td>
                                <td>20:48</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Termostato</td>
                                <td>Inactivo</td>
                                <td>32:48</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Termostato</td>
                                <td>Inactivo</td>
                                <td>32:48</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ThermList;
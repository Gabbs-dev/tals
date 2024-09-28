import React, { useEffect, useState } from 'react';
import * as LightsServer from './LightsServer';
import LightItem from './LightsItem';
import LightsChart from '../../Charts/LightsChart';
import DynamicLight from '../Arduino/ard_commands';

const LightsList = () => {
    const [Lights, setLights] = useState([]);

    const listLights = async () => {
        try{
            const res = await LightsServer.listLights();
            const data = await res.json();
            console.log(data);
            setLights(data.Lights);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        listLights();
    }, []);

    return (
        <div className='row'>
            <h1 className='display-5'>Panel de Control / Luminarias</h1>
            <hr className='divider'/>
            <div className="card text-bg-light mx-3 my-3">
              <div className="card-header">Resumen Global</div>
                <div className="card-body">
                    <LightsChart/>
                </div>
            </div>
            <hr className='divider'/>
            <div>
                <DynamicLight/>
            </div>
            <hr className='divider'/>
            <h2 className='display-6 mt-5'>Dispositivos Disponibles</h2>
            <hr className='divider'/>
            {Lights.map((luminaria)=>(
                <LightItem key={luminaria.id} luminaria={luminaria} listLights={listLights} />
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
                                <th scope="col">Ubicacion</th>
                                <th scope="col">Actividad</th>
                                <th scope="col">Encendido Automático</th>
                                <th scope="col">Apagado Automático</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Oficina</td>
                                <td>Activo</td>
                                <td>07:00</td>
                                <td>12:00</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Sala Principal</td>
                                <td>Inactivo</td>
                                <td>16:00</td>
                                <td>20:00</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Entrada</td>
                                <td>Inactivo</td>
                                <td>20:00</td>
                                <td>22:00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LightsList;
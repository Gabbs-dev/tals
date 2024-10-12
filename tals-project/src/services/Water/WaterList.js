import WTItem from './WaterItem';
import WaterChart from '../../Charts/WaterChart';
import SprayList from './SprayList';
import * as WTServer from './WaterServer';
import React, { useEffect, useState } from 'react';

const WTList = () => {
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
    useEffect(() => {
        Levels();
    }, [] );

    return (
        <div className='row'>
            <h1 className='display-4 text-center'>Panel de Control / Tanque de Agua - Control de Riego</h1>
            <hr className='divider'/>
            <h2 className='display-6 mt-5'>Nivel de Agua / Actividad</h2>
            <hr className='divider'/>
            <div className="col-md-6">
                <WTItem/>
            </div>
            <div className="col-md-6">
                <div className="card text-bg-light">
                <div className="card-header">Resumen Global / Uso de Agua</div>
                    <div className="card-body">
                        <WaterChart/>
                    </div>
                </div>
            </div>
            <h2 className='display-6 mt-3'>Nivel de Agua / Configuración</h2>
            <hr className='divider'/>
            <div className="card text-bg-light mt-3">
                <div className="d-flex aling-items-center justify-content-between card-header">
                    <h4>Resumen Global</h4>
                    <a className='btn btn-primary' href="/water/tanklevelconfig">Configurar Dispositivo</a>
                </div>
                <div className="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nivel de Maximo</th>
                                <th scope="col">Nivel Minimo</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">{TanqueAguaLevels?.tanklevel?.id}</th>
                                <td>{TanqueAguaLevels?.tanklevel?.nivel_maximo}</td>
                                <td>{TanqueAguaLevels?.tanklevel?.nivel_minimo}</td>
                                <td>
                                    <a className="btn btn-warning mx-2" href={'/water/tanklevelconfig/'+(TanqueAguaLevels?.tanklevel?.id)}><i className="bi bi-pencil"/></a>
                                    <a className="btn btn-danger" href={'/water/tanklevelconfig/'+(TanqueAguaLevels?.tanklevel?.id)}><i className="bi bi-trash"/></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <SprayList/>
        </div>
    );
};

export default WTList;
import React, { useState,useEffect} from 'react';
import WTItem from './WaterItem';
import { WaterTank } from '../../Charts/watertank';
import WaterChart from '../../Charts/WaterChart';
import SprayList from './SprayList';
import * as WTServer from './WaterServer';

const WTList = () => {
    const [porcentaje, setPorcentaje] = useState(0);
    const [TALevels, setTanqueAguaLevels] = useState([]);
    const [showConfigButton, setShowConfigButton] = useState(false);
    const [showEditButtons, setShowEditButtons] = useState(false);

  const handlePorcentajeChange = (nuevoPorcentaje) => {
    setPorcentaje(nuevoPorcentaje);
  };
  
  const Levels = async () => {
    try{
        const res = await WTServer.getWatertankLevels();
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

useEffect(() => {
    if (TALevels && TALevels.tanklevel) {
        setShowConfigButton(false); // Ocultar botón de configurar si hay registros
        setShowEditButtons(true); // Mostrar botones de editar y eliminar
    } else {
        setShowConfigButton(true); // Mostrar botón de configurar si no hay registros
        setShowEditButtons(false); // Ocultar botones de editar y eliminar
    }
}, [TALevels]);




  return (
    <div className="row">
      <h1 className="display-4 text-center">Panel de Control / Tanque de Agua</h1>
      <hr className="divider" />
      <h2 className="display-6 mt-5">Nivel de Agua / Actividad</h2>
      <hr className="divider" />

      <div className="col-md-6">
        <WTItem onPorcentajeChange={handlePorcentajeChange} />
        <h2 className="display-6 mt-3">Configuración</h2>
        <hr className="divider" />
        <h2 className='display-6 mt-3'>Configuración</h2>
                <hr className='divider'/>
                <div className="card text-bg-light mt-3">
                    <div className="d-flex aling-items-center justify-content-between card-header">
                        <h4>Dispositivos</h4>
                        {showConfigButton && (
                            <a className='btn btn-primary' href="/water/tanklevelconfig/">Configurar Dispositivo</a>
                        )}
                    </div>
                    <div className="card-body">
                        <table class="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Nivel Maximo</th>
                                    <th scope="col">Nivel Minimo</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {TALevels?.tanklevel ? (
                                <tr key={TALevels?.tanklevel?.id}>
                                    <td>{TALevels?.tanklevel?.nivel_maximo}</td>
                                    <td>{TALevels?.tanklevel?.nivel_minimo}</td>
                                    <td>
                                        {showEditButtons && (
                                            <a className="btn btn-sm btn-warning" href={'/water/tanklevelconfig/'+(TALevels?.tanklevel?.id)}><i className="bi bi-pencil"/></a>
                                        )}
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="text-center" colSpan="4">Data not found</td>    
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>  
      </div>

      <div className="col-md-6">
        <div className="card text-bg-light">
          <div className="card-header">Nivel Actual de Agua</div>
          <div className="card-body">
            <h1>Estado del Tanque de Agua</h1>
            <WaterTank porcentaje={porcentaje} />
          </div>
        </div>

        <div className="card text-bg-light mt-3">
          <div className="card-header">Resumen Global / Uso de Agua</div>
          <div className="card-body">
            <WaterChart />
          </div>
        </div>
      </div>

      <SprayList />
    </div>
  );
};

export default WTList;
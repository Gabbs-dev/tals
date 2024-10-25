import React, { useState,useEffect,useCallback} from 'react';
import WTItem from './WaterItem';
import { WaterTank } from '../../Charts/watertank';
//import WaterChart from '../../Charts/WaterChart';
import SprayList from './SprayList';
import * as WTServer from './WaterServer';

const WTList = () => {
  const [TanqueAgua, setTanqueAgua] = useState([]);
  const [TALevels, setTanqueAguaLevels] = useState([]);
  const [porcentaje, setPorcentaje] = useState(0);
  const [litros, setLitros] = useState(0);
  const [showConfigButton, setShowConfigButton] = useState(false);
  const [showEditButtons, setShowEditButtons] = useState(false);

  const actualState = async () => {
    try {
      const res = await WTServer.getLastWatertank();
      const data = await res.json();
      setTanqueAgua(data);
    } catch (error) {
      console.error(error);
    }
  };

  const Levels = async () => {
    try {
      const res = await WTServer.getWatertankLevels();
      const data = await res.json();
      setTanqueAguaLevels(data);
    } catch (error) {
      console.error(error);
    }
  };

  const calcularLitros = useCallback(() => {
    const alturaTanque = (TALevels?.tanklevel?.altura || 0) * 100;
    const radioTanque = (TALevels?.tanklevel?.diametro || 0) * 100;
    const divRadioTanque = radioTanque / 2;
    const distancia = TanqueAgua?.Watertank?.nivel_agua || 0;
    const alturaLiquido = alturaTanque - distancia;
    const volumen = Math.PI * Math.pow(divRadioTanque, 2) * alturaLiquido;
    const lts = volumen / 1000;
    setLitros(lts.toFixed(2));
  }, [TanqueAgua, TALevels]);

  const calcularPorcentaje = useCallback(() => {
    const alturaTanque = (TALevels?.tanklevel?.altura || 0) * 100;
    const radioTanque = (TALevels?.tanklevel?.diametro || 0) * 100;
    const divRadioTanque = radioTanque / 2;
    const volumenTotal = Math.PI * Math.pow(divRadioTanque, 2) * alturaTanque;
    const porcentajeCalculado = (litros * 100) / (volumenTotal / 1000);
    setPorcentaje(porcentajeCalculado.toFixed(2));
  }, [litros, TALevels]);

  useEffect(() => {
    const fetchData = async () => {
      await actualState();
      await Levels();
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => calcularLitros(), [TanqueAgua, TALevels, calcularLitros]);
  useEffect(() => calcularPorcentaje(), [litros, calcularPorcentaje]);

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
        <WTItem 
          porcentaje={porcentaje}
          litros={litros}
        />
        <h2 className='display-6 mt-5'>Configuración</h2>
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
          <div className="card-header">Estado del nivel del tanque.</div>
          <div className="card-body">
            <WaterTank porcentaje={porcentaje} />
          </div>
        </div>
      </div>
      <SprayList />
    </div>
  );
};

export default WTList;
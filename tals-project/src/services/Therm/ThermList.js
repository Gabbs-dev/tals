import TempCharts from '../../Charts/TempChart';
import { useEffect, useState } from "react";
import * as ThermLevels from './Levels/ThermLevels';
import { Thermometer } from '../../Charts/thermometer';
import * as ThermServer from './ThermServer';
import ThermostatItem from './ThermostatItem';

const ThermList = () => {
    const [levelsData, setLevelsData] = useState([]);
    const [showConfigButton, setShowConfigButton] = useState(false);
    const [showEditButtons, setShowEditButtons] = useState(false);
    const [Termostato, setTermostato] = useState([]);

    const actualState = async () => {
        try{
            const res = await ThermServer.getLastThermostat();
            const data = await res.json();
            console.log(data);
            setTermostato(data);
        }catch(error){
            console.log(error);
            return null;
        };
    };

    const fetchData = async () => {
        try {
            const response = await ThermLevels.getLevelsList();
            const data = await response.json();
            setLevelsData(data);
        } catch (error) {
            console.error('Error fetching timers data:', error);
        }
    };

    useEffect(() => {
        actualState();
        fetchData();
        // Actualizar cada 5 segundos (ajusta el intervalo según tus necesidades)
        const interval = setInterval(actualState, 5000);
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [] );

    useEffect(() => {
        if (levelsData && levelsData.thermLevel) {
            setShowConfigButton(false); // Ocultar botón de configurar si hay registros
            setShowEditButtons(true); // Mostrar botones de editar y eliminar
        } else {
            setShowConfigButton(true); // Mostrar botón de configurar si no hay registros
            setShowEditButtons(false); // Ocultar botones de editar y eliminar
        }
    }, [levelsData]);

    return (
        <div className='row'>
            <h1 className='display-4 text-center'>Panel de Control / Temperatura</h1>
            <hr className='divider'/>
            <div className="col">
                <a className='btn btn-secondary' href='/'>Regresar</a>
            </div>
            <h2 className='display-6 mt-5'>Dispositivos Activos</h2>
            <hr className='divider'/>
            <div className="col-md-4">
                <ThermostatItem 
                    temperatura={Termostato?.Thermostat?.temperatura}
                    humedad={Termostato?.Thermostat?.humedad}
                    niveles={levelsData?.thermLevel?.temperatura_deseada}
                />
            </div>
            <div className="col-md-8">
                <div className="card text-bg-light">
                    <div className="card-header">Temperatura Actual</div>
                    <div className="card-body">
                        <Thermometer temperature={Termostato?.Thermostat?.temperatura}/>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="card text-bg-light">
                    <div className="card-header">Resumen Global</div>
                    <div className="card-body">
                        <TempCharts/>
                    </div>
                </div>
            </div>
            <h2 className='display-6 mt-5'>Configuracion</h2>
            <hr className='divider'/>
            <div className="card text-bg-light mt-3">
                <div className="d-flex justify-content-between card-header">
                    <h4>Dispositivos</h4>
                    {showConfigButton && (
                        <a className='btn btn-primary' href="/thermostat/config/">Configurar Dispositivo</a>
                    )}
                </div>
                <div className="card-body">
                    <table class="table table-striped text-center">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Dispositivo</th>
                                <th scope="col">Temperatura Deseada</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {levelsData?.thermLevel ? ( 
                            <tr key={levelsData?.thermLevel?.id}>
                                <th scope="row">{levelsData?.thermLevel?.id}</th>
                                <td>{levelsData?.thermLevel?.dispositivo}</td>
                                <td>{levelsData?.thermLevel?.temperatura_deseada}</td>
                                <td>
                                    {showEditButtons && (
                                        <a className="btn btn-sm btn-warning" href={'/thermostat/config/'+(levelsData?.thermLevel?.id)}><i className="bi bi-pencil"/></a>
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
    );
};

export default ThermList;
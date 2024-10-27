import LightItem from './LightsItem';
import LightsChart from '../../Charts/LightsChart';
import { useEffect, useState } from "react";
import * as LightTimer from './Timer/LightTimer'

const LightsList = () => {
    const [timersData, setTimersData] = useState([]);
    const [showConfigButton, setShowConfigButton] = useState(false);
    const [showEditButtons, setShowEditButtons] = useState(false);

    const fetchData = async () => {
        try {
            const response = await LightTimer.getTimersList();
            const data = await response.json();
            setTimersData(data);
        } catch (error) {
            console.error('Error fetching timers data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (timersData && timersData.timerLight) {
            setShowConfigButton(false); // Ocultar botón de configurar si hay registros
            setShowEditButtons(true); // Mostrar botones de editar y eliminar
        } else {
            setShowConfigButton(true); // Mostrar botón de configurar si no hay registros
            setShowEditButtons(false
            ); // Ocultar botones de editar y eliminar
        }
    }, [timersData]);

    return (
        <div className='row'>
            <h1 className='display-4'>Panel de Control / Luminarias</h1>
            <hr className='divider'/>
            <div className="col">
                <a className='btn btn-secondary' href='/'>Regresar</a>
            </div>
            <h3 className='display-6 mt-4'>Dispositivos Disponibles</h3>
            <hr className='divider'/>
            <div className="col-md-6">
                <LightItem />
            </div>
            <div className="col-md-6">
                <h2 className='display-6'>Configuracion</h2>
                <hr className='divider'/>
                <div className="card text-bg-light">
                    <div className="d-flex justify-content-between card-header">
                        <h4>Interruptor Automático</h4>
                        {showConfigButton && (
                            <a className='btn btn-primary' href="/lights/config/">Configurar Dispositivo</a>
                        )}
                    </div>    
                    <div className="card-body">
                        <table className="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Auto ON</th>
                                    <th scope="col">Auto OFF</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timersData?.timerLight ? ( 
                                    <tr key={timersData?.timerLight?.id}>
                                        <td>{timersData?.timerLight?.horario_inicio}</td>
                                        <td>{timersData?.timerLight?.horario_cierre}</td>
                                        <td>
                                            {showEditButtons && (
                                                <a className="btn btn-sm btn-warning" href={'/lights/config/'+(timersData?.timerLight?.id)}><i className="bi bi-pencil"/></a>
                                            )}
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td className="text-center" colSpan="5">Data not found</td>    
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card text-bg-light mt-3">
                    <div className="card-header">Resumen Global</div>
                    <div className="card-body">
                        <LightsChart/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LightsList;
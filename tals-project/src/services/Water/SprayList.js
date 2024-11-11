import SprayItem from './SprayItem';
import { useEffect, useState } from "react";
import * as SprayTimer from './Timer/SprayTimer';

const SprayList = () => {
    const [timersData, setTimersData] = useState([]);
    const [showConfigButton, setShowConfigButton] = useState(false);
    const [showEditButtons, setShowEditButtons] = useState(false);


    const fetchData = async () => {
        try {
            const response = await SprayTimer.getTimersList();
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
        if (timersData && timersData.timerSprays) {
            setShowConfigButton(false); // Ocultar botón de configurar si hay registros
            setShowEditButtons(true); // Mostrar botones de editar y eliminar
        } else {
            setShowConfigButton(true); // Mostrar botón de configurar si no hay registros
            setShowEditButtons(false); // Ocultar botones de editar y eliminar
        }
    }, [timersData]);

    return (
        <div className='row'>
            <h1 className='display-6 mt-5'>Control de Regado / Actividad</h1>
            <hr className='divider'/>
            <div className="col-md-4">
                <SprayItem/>
            </div>
            <div className="col-md-8">
                <div className="card text-bg-light mt-3">
                    <div className="d-flex aling-items-center justify-content-between card-header">
                        <h4>Configuración Automática</h4>
                        {showConfigButton && (
                            <a className='btn btn-primary' href="/water/sprayconfig/">Configurar Dispositivo</a>
                        )}
                    </div>
                    <div className="card-body">
                        <table class="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Dispositivo</th>
                                    <th scope="col">Auto ON</th>
                                    <th scope="col">Auto OFF</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {timersData?.timerSprays?.length > 0 ? ( 
                                timersData.timerSprays.map((timer) => {
                                    return(
                                        <tr key={timer.id}>
                                            <th scope="row">{timer.id}</th>
                                            <td>{timer.dispositivo}</td>
                                            <td>{timer.horario_inicio}</td>
                                            <td>{timer.horario_cierre}</td>
                                            <td>
                                                {showEditButtons && (
                                                    <a className="btn btn-sm btn-warning" href={'/water/sprayconfig/'+(timer.id)}><i className="bi bi-pencil"/></a>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td className="text-center" colSpan="5">Data not found</td>    
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SprayList;
import SecurityChart from '../../Charts/SecurityChart';
import MSensorList from './MSensorList';
import * as CameraServer from './CameraServer';
import React, { useEffect, useState } from 'react';

const SecurityList = () =>{
    const [MovementActivity, setMovementActivity] = useState([]);
    const Activity = async () => {
        try{
            const res = await CameraServer.getCameraStatus();
            const data = await res.json();
            setMovementActivity(data);
        }catch(error){
            console.log(error);
            return null;
        };
    };

    const handleClick = async (posX,posY) => {
        try{
            const command = {'posicion_x':posX,'posicion_y':posY};
            const send = CameraServer.cameraPosition(command);
            console.log('Commando:',command,'Envio:',send);
            if (send){
                console.log('Comando enviado con exito');
            }
        } catch(error){
            console.error('Ha ocurrido un error: ',error);
        }
    };

    useEffect(() => {
        Activity();
    }, [] );

    return (
        <div className='row'>
            <div className='col-md-8'>
                <h1 className='display-4'>Panel de Control / Seguridad</h1>
            </div>
            <div className='col-md-2 mt-4'>
                <a className='btn btn-secondary' href='/'><i className='bi bi-arrow-left'/> Regresar</a>
            </div>
            <hr className='divider'/>
            <div className="col-md-8 my-2">
                <h2 className='display-6 mt-5'>Control de Camaras / Actividad</h2>
                <hr className='divider'/>
                <div className="card text-bg-light">
                    <div className="card-header">Camaras</div>
                    <div className="card-body text-center">
                        <div className="d-flex flex-row justify-content-evenly">
                            <button className="btn btn-primary" type="button" name="posicionI" onClick={() => handleClick('20','45')}>Mover Izquierda</button>
                            <button className="btn btn-primary" type="button" name="posicionC" onClick={() => handleClick('90','45')}>Mover Centro</button>
                            <button className="btn btn-primary" type="button" name="posicionD" onClick={() => handleClick('160','45')}>Mover Derecha</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 my-3">
                <MSensorList />
                {/*}
                <div className="card text-bg-light">
                    <div className="card-header">Camaras / Actividad</div>
                    <div className="card-body">
                        <SecurityChart/>
                    </div>
                </div>
                {*/}
            </div>
        </div>
    );
};

export default SecurityList;
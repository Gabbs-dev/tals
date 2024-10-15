import SecurityChart from '../../Charts/SecurityChart';
import MSensorList from './MSensorList';
import * as CameraServer from './CameraServer';
import React, { useEffect, useState } from 'react';

const SecurityList = () =>{
    const [CamStatus, setCamStatus] = useState([]);
    const Activity = async () => {
        try{
            const res = await CameraServer.getCameraStatus();
            const data = await res.json();
            setCamStatus(data);
        }catch(error){
            console.log(error);
            return null;
        };
    };
    useEffect(() => {
        Activity();
    }, [] );

    return (
        <div className='row'>
            <h1 className='display-4 text-center'>Panel de Control / Seguridad</h1>
            <hr className='divider'/>
            <h2 className='display-6 mt-5'>Control de Camaras / Actividad</h2>
            <hr className='divider'/>
            <div className="col-md-8 my-2">
                <div className="card text-bg-light">
                    <div className="card-header">Camaras</div>
                    <div className="card-body text-center">
                        Aqui va algo xd
                    </div>
                </div>
            </div>
            <div className="col-md-4 my-2">
                <div className="card text-bg-light">
                    <div className="card-header">Camaras / Actividad</div>
                    <div className="card-body">
                        <SecurityChart/>
                    </div>
                </div>
            </div>
            <MSensorList />
        </div>
    );
};

export default SecurityList;
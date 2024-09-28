import React, { useEffect, useState } from 'react';
import * as WTServer  from './WaterServer';
import WTItem from './WaterItem';
import WaterChart from '../../Charts/WaterChart';
import SprayList from './SprayList';

const WTList = () => {
    const [WaterTank, setWT] = useState([]);

    const listWT = async () => {
        try{
            const res = await WTServer.listWatertank();
            const data = await res.json();
            console.log(data);
            setWT(data.WaterTank);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        listWT();
    }, []);

    return (
        <div className='row'>
            <h1 className='display-5'>Panel de Control / Tanque de Agua</h1>
            <hr className='divider'/>
            <div className="card text-bg-light mx-3 my-3">
              <div className="card-header">Resumen Global</div>
                <div className="card-body">
                    <WaterChart/>
                </div>
            </div>
            <h2 className='display-6 mt-5'>Actividad</h2>
            <hr className='divider'/>
            {WaterTank.map((tanque_agua)=>(
                <WTItem key={tanque_agua.id} tanque_agua={tanque_agua} listWT={listWT} />
            ))}
            <hr className='divider'/>
            <div className="container-fluid">
                <SprayList/>
            </div>
        </div>
    );
};

export default WTList;
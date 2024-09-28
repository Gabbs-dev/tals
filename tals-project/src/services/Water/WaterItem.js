import React, { useState } from "react";
import { useNavigate } from "react-router";
//import * as WTServer from './WaterServer';


const WTItem = ({tanque_agua, listWatertank}) => {
    const navigate = useNavigate();

    const handleDelete = async (WTID) =>{
        //console.log(ThermID);
        //await ThermServer.deleteUser(ThermID);
        listWatertank();
    };

    return(
        <div className="col-md-4 my-3">
            <div className="card card-body">
                <h3 className="card-tittle">Tanque de agua {tanque_agua.id}</h3>
                <p className="card-text my-3">Nivel Actual de Agua: <strong>{tanque_agua.nivel_agua} Lts </strong></p>
                <p className="card-text">Nivel Máximo: <strong>{tanque_agua.nivel_max} Lts</strong></p>
                <p className="card-text">Nivel Minimo: <strong>{tanque_agua.nivel_min} Lts</strong></p>
                <p className="card-text">Fecha: <strong>{tanque_agua.date} Lts</strong></p>
                {/*}<button onClick={()=>tanque_agua.id && handleDelete(tanque_agua.id)} className="btn btn-danger my-2">Eliminar</button>{*/}
            </div>
        </div>
    );
};

export default WTItem;
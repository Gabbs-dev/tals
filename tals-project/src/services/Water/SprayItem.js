import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as SprayServer from './SprayServer';


const SprayItem = ({regado, listSpray}) => {
    const navigate = useNavigate();

    const handleDelete = async (SprayID) =>{
        //console.log(ThermID);
        //await ThermServer.deleteUser(ThermID);
        listSpray();
    };

    return(
        <div className="col-md-4 my-3">
            <div className="card card-body">
                <h3 className="card-tittle">Jardín {regado.id} </h3>
                <p className="card-text my-3">Estado: <strong>{regado.estado} </strong></p>
                <p className="card-text">Humedad del Suelo: <strong>{regado.nivel_humedad} % </strong></p>
                <button onClick={()=>regado.id && handleDelete(regado.id)} className="btn btn-danger my-2">Eliminar</button>
            </div>
        </div>
    );
};

export default SprayItem;
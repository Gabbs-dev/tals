import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as ThermServer from './ThermServer';


const ThermostatItem = ({termostato, listTherms}) => {
    const navigate = useNavigate();

    const handleDelete = async (ThermID) =>{
        //console.log(ThermID);
        //await ThermServer.deleteUser(ThermID);
        listTherms();
    };

    return(
        <div className="col-md-4 my-3">
            <div className="card card-body">
                <h3 className="card-tittle">Termostato {termostato.id} </h3>
                <p className="card-text my-3">Temperatura Deseada: <strong>{termostato.temperatura} ºC </strong></p>
                <p className="card-text">Temperatura Registrada: <strong>{termostato.humedad} ºC </strong></p>
                <p className="card-text">Temperatura Registrada: <strong>{termostato.temperatura_deseada} ºC </strong></p>
                <p className="card-text">Temperatura Registrada: <strong>{termostato.date} ºC </strong></p>
                {/*}<button onClick={()=>termostato.id && handleDelete(termostato.id)} className="btn btn-danger my-2">Eliminar</button>{*/}
            </div>
        </div>
    );
};

export default ThermostatItem;
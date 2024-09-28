import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as LightsServer from './LightsServer';


const LightItem = ({luminaria, listLights}) => {
    const navigate = useNavigate();

    const handleDelete = async (ThermID) =>{
        //console.log(ThermID);
        //await ThermServer.deleteUser(ThermID);
        listLights();
    };

    return(
        <div className="col-md-4 my-3">
            <div className="card card-body">
                <h3 className="card-tittle">Luz {luminaria.id} </h3>
                <p className="card-text my-3">Ubicación: <strong>{luminaria.luz1} </strong></p>
                <p className="card-text my-3">Ubicación: <strong>{luminaria.luz2} </strong></p>
                <p className="card-text">Estado: <strong>{luminaria.auto_encendido} </strong></p>
                <p className="card-text">Estado: <strong>{luminaria.auto_apagado} </strong></p>
                <p className="card-text">Estado: <strong>{luminaria.date} </strong></p>
                {/*}<button onClick={()=>luminaria.id && handleDelete(luminaria.id)} className="btn btn-danger my-2">Eliminar</button>{*/}
            </div>
        </div>
    );
};

export default LightItem;
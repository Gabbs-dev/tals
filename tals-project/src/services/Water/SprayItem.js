import React, { useState, useEffect } from "react";
import * as SprayServer from './SprayServer';

const SprayItem = () => {
    const [Spray, setSpray] = useState([]);

    const actualState = async () => {
        try{
            const res = await SprayServer.getLastSpray();
            const data = await res.json();
            setSpray(data);
        }catch(error){
            console.log(error);
            return null;
        }
    };

    useEffect(() => {
        actualState();
        // Actualizar cada 5 segundos (ajusta el intervalo según tus necesidades)
        const interval = setInterval(actualState, 5000);
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [] );

    return(
        <div className="d-flex flex-row mb-3 justify-content-evenly">
            <div className="d-flex flex-column">
                <div className="card card-body">
                    <h3 className="card-tittle">Jardín</h3>
                    <p className="card-text my-3">Estado: <strong>{Spray?.lastSpray?.estado || 'N/A'} </strong></p>
                    <p className="card-text">Humedad del Suelo: <strong>{Spray?.lastSpray?.nivel_humedad || 'N/A'} % </strong></p>
                    <p className="card-text">Inicio de Regado Automatico: <strong>{Spray?.lastSpray?.auto_riego_inicio || 'N/A'} </strong></p>
                    <p className="card-text">Cierre de Regado Automatico: <strong>{Spray?.lastSpray?.auto_riego_cierre || 'N/A'} </strong></p>
                </div>
            </div>
        </div>
    );
};

export default SprayItem;
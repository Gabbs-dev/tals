import React, { useEffect, useState } from 'react';
import * as LightsServer from './LightsServer';

const LightItem = () => {
    const [Luminaria, setLuminaria] = useState([]);

    const actualState = async () => {
        try{
            const res = await LightsServer.getLastLight();
            const data = await res.json();
            setLuminaria(data);
        }catch(error){
            console.log(error);
            return null;
        };
    };
    useEffect(() => {
        actualState();
        // Actualizar cada 5 segundos (ajusta el intervalo según tus necesidades)
        const interval = setInterval(actualState, 5000);
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [] );

    function getEstadoLuz(luz) {
        switch (luz) {
            case 0:
                return 'Apagado';
            case 1:
                return 'Encendido';
            default:
                return 'N/A';
        };
    };

    const handleClick = async () => {
        
    };

    return(
        <div className="d-flex flex-row mb-3 justify-content-evenly">
            <div className='d-flex flex-column'>
                <div className="card card-body">
                    <div className="d-inline-flex justify-content-between">    
                        <h3 className="card-tittle">Luz</h3>
                        {Luminaria?.lastLight.luz1 === 0 ? 
                        <a type="button" className="btn btn-outline-warning" value='1' onClick={handleClick}><i className="bi bi-lightbulb" /></a> :
                        <a type="button" className="btn btn-outline-warning" value='0' onClick={handleClick}><i className="bi bi-lightbulb" /></a> }
                    </div>
                    <p className="card-text my-3">Estado: <strong>{getEstadoLuz(Luminaria?.lastLight?.luz1)}</strong></p>
                    <p className="card-text">Encendido Automatico: <strong>{Luminaria?.lastLight?.auto_encendido || 'N/A'} </strong></p>
                    <p className="card-text">Apagado Automatico: <strong>{Luminaria?.lastLight?.auto_apagado || 'N/A'} </strong></p>
                    <p className="card-text">Fecha: <strong>{Luminaria?.lastLight?.date || 'N/A'} </strong></p>
                </div>
            </div>
            <div className='d-flex flex-column'>
                <div className="card card-body">
                    <div className="d-inline-flex justify-content-between">    
                        <h3 className="card-tittle">Luz</h3>
                        <a type="button" className="btn btn-outline-warning" href='#'><i className="bi bi-lightbulb" /></a>
                    </div>
                    <p className="card-text my-3">Estado: <strong>{getEstadoLuz(Luminaria?.lastLight?.luz2)}</strong></p>
                    <p className="card-text">Encendido Automatico: <strong>{Luminaria?.lastLight?.auto_encendido || 'N/A'} </strong></p>
                    <p className="card-text">Apagado Automatico: <strong>{Luminaria?.lastLight?.auto_apagado || 'N/A'} </strong></p>
                    <p className="card-text">Fecha: <strong>{Luminaria?.lastLight?.date || 'N/A'} </strong></p>
                </div>
            </div>
        </div>
    );
};

export default LightItem;
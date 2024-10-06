import React, { useEffect, useState } from 'react';
import * as LightsServer from './LightsServer';
import moment from 'moment';

// ...



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

    const handleClick = async (lightNumber) => {
        try {
            const newLightState = Luminaria?.lastLight[`luz${lightNumber}`] === 0 ? 1 : 0;
            //const currentDate = new Date();
            //const timestamp = currentDate.getTime();
            const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
            // Construimos un objeto con los estados de ambas luces
            const dataToSend = {
                'luz1': newLightState,
                'luz2': newLightState,
                'auto_encendido': null, 
                'auto_apagado': null,
                'date': formattedDate,
            };
            // Enviamos la solicitud POSTs
            console.log(dataToSend);
            const response = await LightsServer.createLightState(dataToSend); // Cambia la función
            console.log(response);
            if(response.ok){
                setLuminaria({...Luminaria,lastLight:{...Luminaria.lastLight,[`luz${lightNumber}`]: newLightState}});
            } else {
                console.error('Error al actualizar el estado de la luz:', response.statusText);
            };
        } catch (error) {
            console.log(error);
        }
    }; 

    console.log(Luminaria);

    return(
        <div className="d-flex flex-row mb-3 justify-content-evenly">
            <div className='d-flex flex-column'>
                <div className="card card-body">
                    <div className="d-inline-flex justify-content-between">    
                        <h3 className="card-tittle">Luz</h3>
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
                    </div>
                    <p className="card-text my-3">Estado: <strong>{getEstadoLuz(Luminaria?.lastLight?.luz2)}</strong></p>
                    <p className="card-text">Encendido Automatico: <strong>{Luminaria?.lastLight?.auto_encendido || 'N/A'} </strong></p>
                    <p className="card-text">Apagado Automatico: <strong>{Luminaria?.lastLight?.auto_apagado || 'N/A'} </strong></p>
                    <p className="card-text">Fecha: <strong>{Luminaria?.lastLight?.date || 'N/A'} </strong></p>
                </div>
            </div>
            <div className='d-flex flex-column'>
                
                {Luminaria?.lastLight?.luz1 === 0 ? (
                    <button type='submit' className="btn btn-outline-warning" onClick={() => handleClick(1)}>
                        <i className="bi bi-lightbulb" />
                    </button>
                ) : Luminaria?.lastLight?.luz1 === 1 ? (
                    <button type='submit' className="btn btn-outline-warning" onClick={() => handleClick(0)}>
                        <i className="bi bi-lightbulb" />
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default LightItem;
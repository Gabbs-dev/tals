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
        // Actualizar cada 1 segundos (ajusta el intervalo según tus necesidades)
        const interval = setInterval(actualState, 1000);
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [] );


    const handleClick = async (buttonName) => {
        try {
            const lightNumber = buttonName.slice(3);
            const newLuminariaState = { ...Luminaria.lastLight };
            newLuminariaState[`luz${lightNumber}`] = newLuminariaState[`luz${lightNumber}`] === 0 ? 1 : 0;
            const response = await LightsServer.createLightState(newLuminariaState);
            if (response.ok) {
            setLuminaria({ ...Luminaria, lastLight: newLuminariaState });
            } else {
            console.error('Error al actualizar el estado de la luz:', response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    };

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

    return(
        <div className="row">
            <div className="d-flex flex-row mb-3 justify-content-evenly">
                <div className='d-flex flex-column'>
                    <div className="card card-body">
                        <div className="d-inline-flex justify-content-between">    
                            <h3 className="card-tittle">Luz 1</h3>
                            {Luminaria?.lastLight?.luz1 !== undefined && (
                                <button type='submit' className="btn btn-outline-warning" name="luz1" onClick={() => handleClick('luz1')}>
                                    <i className="bi bi-lightbulb" />
                                </button>
                            )}
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
                            <h3 className="card-tittle">Luz 2</h3>
                            {Luminaria?.lastLight?.luz2 !== undefined && (
                                <button type='submit' className="btn btn-outline-warning" name="luz2" onClick={() => handleClick('luz2')}>
                                    <i className="bi bi-lightbulb" />
                                </button>
                            )}
                        </div>
                        <p className="card-text my-3">Estado: <strong>{getEstadoLuz(Luminaria?.lastLight?.luz2)}</strong></p>
                        <p className="card-text">Encendido Automatico: <strong>{Luminaria?.lastLight?.auto_encendido || 'N/A'} </strong></p>
                        <p className="card-text">Apagado Automatico: <strong>{Luminaria?.lastLight?.auto_apagado || 'N/A'} </strong></p>
                        <p className="card-text">Fecha: <strong>{Luminaria?.lastLight?.date || 'N/A'} </strong></p>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row mb-3 justify-content-evenly">
                <div className='d-flex flex-column'>
                    <div className="card card-body">
                        <div className="d-inline-flex justify-content-between">    
                            <h3 className="card-tittle">Luz 3</h3>
                            {Luminaria?.lastLight?.luz3 !== undefined && (
                                <button type='submit' className="btn btn-outline-warning" name="luz3" onClick={() => handleClick('luz3')}>
                                    <i className="bi bi-lightbulb" />
                                </button>
                            )}
                        </div>
                        <p className="card-text my-3">Estado: <strong>{getEstadoLuz(Luminaria?.lastLight?.luz3)}</strong></p>
                        <p className="card-text">Encendido Automatico: <strong>{Luminaria?.lastLight?.auto_encendido || 'N/A'} </strong></p>
                        <p className="card-text">Apagado Automatico: <strong>{Luminaria?.lastLight?.auto_apagado || 'N/A'} </strong></p>
                        <p className="card-text">Fecha: <strong>{Luminaria?.lastLight?.date || 'N/A'} </strong></p>
                    </div>
                </div>
                <div className='d-flex flex-column'>
                    <div className="card card-body">
                        <div className="d-inline-flex justify-content-between">    
                            <h3 className="card-tittle">Luz 4</h3>
                            {Luminaria?.lastLight?.luz4 !== undefined && (
                                <button type='submit' className="btn btn-outline-warning" name="luz4" onClick={() => handleClick('luz4')}>
                                    <i className="bi bi-lightbulb" />
                                </button>
                            )}
                        </div>
                        <p className="card-text my-3">Estado: <strong>{getEstadoLuz(Luminaria?.lastLight?.luz4)}</strong></p>
                        <p className="card-text">Encendido Automatico: <strong>{Luminaria?.lastLight?.auto_encendido || 'N/A'} </strong></p>
                        <p className="card-text">Apagado Automatico: <strong>{Luminaria?.lastLight?.auto_apagado || 'N/A'} </strong></p>
                        <p className="card-text">Fecha: <strong>{Luminaria?.lastLight?.date || 'N/A'} </strong></p>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row mb-3 justify-content-evenly">
                <div className='d-flex flex-column'>
                    <div className="card card-body">
                        <div className="d-inline-flex justify-content-between">    
                            <h3 className="card-tittle">Luz 5</h3>
                            {Luminaria?.lastLight?.luz5 !== undefined && (
                                <button type='submit' className="btn btn-outline-warning" name="luz5" onClick={() => handleClick('luz5')}>
                                    <i className="bi bi-lightbulb" />
                                </button>
                            )}
                        </div>
                        <p className="card-text my-3">Estado: <strong>{getEstadoLuz(Luminaria?.lastLight?.luz5)}</strong></p>
                        <p className="card-text">Encendido Automatico: <strong>{Luminaria?.lastLight?.auto_encendido || 'N/A'} </strong></p>
                        <p className="card-text">Apagado Automatico: <strong>{Luminaria?.lastLight?.auto_apagado || 'N/A'} </strong></p>
                        <p className="card-text">Fecha: <strong>{Luminaria?.lastLight?.date || 'N/A'} </strong></p>
                    </div>
                </div>
                <div className='d-flex flex-column'>
                    <div className="card card-body">
                        <div className="d-inline-flex justify-content-between">    
                            <h3 className="card-tittle">Luz 6</h3>
                            {Luminaria?.lastLight?.luz6 !== undefined && (
                                <button type='submit' className="btn btn-outline-warning" name="luz6" onClick={() => handleClick('luz6')}>
                                    <i className="bi bi-lightbulb" />
                                </button>
                            )}
                        </div>
                        <p className="card-text my-3">Estado: <strong>{getEstadoLuz(Luminaria?.lastLight?.luz6)}</strong></p>
                        <p className="card-text">Encendido Automatico: <strong>{Luminaria?.lastLight?.auto_encendido || 'N/A'} </strong></p>
                        <p className="card-text">Apagado Automatico: <strong>{Luminaria?.lastLight?.auto_apagado || 'N/A'} </strong></p>
                        <p className="card-text">Fecha: <strong>{Luminaria?.lastLight?.date || 'N/A'} </strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LightItem;
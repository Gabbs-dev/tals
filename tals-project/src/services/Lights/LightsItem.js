import React, { useEffect, useState } from 'react';
import * as LightsServer from './LightsServer';

const LightItem = () => {
    const [Luminaria, setLuminaria] = useState([]);

    // Obtiene el estado de las luces
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

    // Hook de ejecucion
    useEffect(() => {
        actualState();
        // Actualizar cada 1 segundos (ajustar según las necesidades)
        const interval = setInterval(actualState, 1000);
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [] );

    // Funcion para encendido de luces individualmente
    const handleClick = async (buttonName) => {
        try {
            const lightNumber = buttonName.slice(3); // Recibe el nombre y el numero de la luz
            const newLuminariaState = { ...Luminaria.lastLight }; // Revisa el estado actual

            // Compara el estado logico actual para ejecutar el cambio
            newLuminariaState[`luz${lightNumber}`] = newLuminariaState[`luz${lightNumber}`] === 0 ? 1 : 0;
            const response = await LightsServer.createLightState(newLuminariaState); // Envia el nuevo estado a la API
            if (response.ok) {
                // Si todo se ejecuta correctamente, actualiza el estado
                setLuminaria({ ...Luminaria, lastLight: newLuminariaState });
            } else {
            console.error('Error al actualizar el estado de la luz:', response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Funcion para cambiar renderizado de logico a digital
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
                            {/* 
                                El boton contiene el estado logico actual de la luz recibido desde la API 
                                al hacer click envia el nombre de la luz y el estado,
                                la funcion se encarga de identificar el numero de la luz y evaluar su estado actual
                                y envia el estado nuevo a la API para encender o apagar la luz
                            */}
                            {Luminaria?.lastLight?.luz1 !== undefined && (
                                <button type='submit' className="btn btn-outline-warning" name="luz1" onClick={() => handleClick('luz1')}>
                                    <i className="bi bi-lightbulb" />
                                </button>
                            )}
                        </div>
                        <p className="card-text my-3">Estado: <strong>{getEstadoLuz(Luminaria?.lastLight?.luz1)}</strong></p>
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
                    </div>
                </div>
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
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row mb-3 justify-content-evenly">
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
                    </div>
                </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LightItem;
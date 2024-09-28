import React from "react";

const DevicesList = () => {

    return (
        <div className='row'>
            <div className="col">
                <h1 className="display-5">Agregar Dispositivo</h1>
            </div>
            <hr className="divider"/>
            <div className="row d-flex justify-content-center">
                <a type="button" className="col btn btn-outline-dark my-4 mx-3 d-flex align-items-center justify-content-center" href="/water/register" style={{height: 200}}>
                    <i class="bi bi-droplet" />
                    Agua
                </a>
                <a type="button" className="col btn btn-outline-dark my-4 mx-3 d-flex align-items-center justify-content-center" href="/lights/register" style={{height: 200}}>
                    <i class="bi bi-lightbulb" />
                    Iluminación
                </a>
            </div>
            <div className="row d-flex justify-content-center">
                <a type="button" className="col btn btn-outline-dark my-4 mx-3 d-flex align-items-center justify-content-center" href="/thermostat/register" style={{height: 200}}>
                    <i class="bi bi-thermometer" />
                    Temperatura
                </a>
                <a type="button" className="col btn btn-outline-dark my-4 mx-3 d-flex align-items-center justify-content-center" href="/security" style={{height: 200}}>
                    <i class="bi bi-shield" />
                    Seguridad
                </a>
            </div>
        </div>
    )

}

export default DevicesList;
import React from "react";

// Componente principal de la aplicación
const Dashboard = () => {
    return (
        <div className='row'>
            <div className="col">
                <h1 className="display-3">Panel Principal</h1>
            </div>
            <hr className="divider"/>
            <div className="row d-flex justify-content-center">
                <a type="button" className="col btn btn-outline-dark my-4 mx-3 d-flex align-items-center justify-content-center" href="/water" style={{height: 200}}>
                    <i class="bi bi-droplet" />
                    Agua
                </a>
                <a type="button" className="col btn btn-outline-dark my-4 mx-3 d-flex align-items-center justify-content-center" href="/lights" style={{height: 200}}>
                    <i class="bi bi-lightbulb" />
                    Iluminación
                </a>
            </div>
            <div className="row d-flex justify-content-center">
                <a type="button" className="col btn btn-outline-dark my-4 mx-3 d-flex align-items-center justify-content-center" href="/thermostat" style={{height: 200}}>
                    <i class="bi bi-thermometer" />
                    Temperatura
                </a>
                <a type="button" className="col btn btn-outline-dark my-4 mx-3 d-flex align-items-center justify-content-center" href="/security" style={{height: 200}}>
                    <i class="bi bi-shield" />
                    Seguridad
                </a>
            </div>
        </div>
    );
};

// Exportación del componente para acceder a el globalmente desde el index
export default Dashboard;
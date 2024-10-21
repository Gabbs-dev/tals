import React from 'react';
import NotificationItem from './Notifications/NotificationItem';
import { useNotification } from './Notifications/NotificationServer';
import { Offcanvas, Collapse, Dropdown } from 'bootstrap';
import AlertsItem from './Notifications/Alerts/AlertsItem';

const Header = () => {
    const { notifications } = useNotification();

    return(
        <header>
            <nav className="navbar navbar-dark bg-black md-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">TALS</a>
                    <div className='me-auto'>
                        <NotificationItem/>
                    </div>
                    {notifications.length > 0 && <AlertsItem/>}
                    <button className="btn btn-outline-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                        <i className="bi bi-list" />
                    </button>
                    <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title">Menú Principal</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/"><i class="bi bi-speedometer"/> Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="/users"><i class="bi bi-people"/> Usuarios</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="/devices"><i class="bi bi-plus-circle"/> Agregar Dispositivo</a>
                                </li>
                                <li className="nav-item">
                                    <div className="accordion mt-3" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                                    Servicios
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show">
                                                <div className="accordion-body bg-dark">
                                                    <ul className="navbar-nav">
                                                        <li className="nav-item"><a className="nav-link active" href="/lights"><i class="bi bi-lightbulb"/> Luminarias</a></li> 
                                                    </ul>
                                                    <ul className="navbar-nav">
                                                        <li className="nav-item"><a className="nav-link active" href="/water"><i class="bi bi-droplet"/> Agua</a></li> 
                                                    </ul>
                                                    <ul className="navbar-nav">
                                                        <li className="nav-item"><a className="nav-link active" href="/thermostat"><i class="bi bi-thermometer"/> Temperatura</a></li> 
                                                    </ul>
                                                    <ul className="navbar-nav">
                                                        <li className="nav-item"><a className="nav-link active" href="/security"><i class="bi bi-shield-shaded"/> Seguridad</a></li> 
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        
    );
    // eslint-disable-next-line
};

export default Header;
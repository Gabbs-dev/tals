import React, { useState, useEffect } from "react";
import { Offcanvas, Collapse, Dropdown } from "bootstrap";

const Header = () => {

    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationsCount, setNotificationsCount] = useState(0);

    
    // Simular la obtención de notificaciones (reemplazar con una llamada a tu API)
    /*
    useEffect(() => {
    const fetchNotifications = async () => {
        try {
            const response = await fetch('https://tu-api-para-obtener-notificaciones');
            const data = await response.json();
            setNotifications(data);
            setNotificationsCount(data.length);
        } catch (error) {
            console.error('Error al obtener notificaciones:', error);
        }
    };
    
    fetchNotifications();
    }, []);

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    };

    const handleNotificationClear = () => {
        // Limpiar notificaciones (actualizar estado y posiblemente hacer una llamada a la API)
        setNotifications([]);
        setNotificationsCount(0);
    };
    */

    return(
        <header>
            <nav className="navbar navbar-dark bg-black">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">TALS</a>
                    <div className="btn-group ms-auto">
                        <button className="btn btn-outline-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-bell" />
                    {/*notificationsCount > 0 && <span>{notificationsCount}</span>*/}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li className="dropdown-item">Item 1</li>
                            <li className="dropdown-item">Item 2</li>
                            <li className="dropdown-item">Item 3</li>
                    {/*}
                    {showNotifications && (
                        {notifications.map((notification, index) => (
                        <li key={index} className="dropdown-item">
                            {// Renderizar el contenido de la notificación aquí}
                            {notification.mensaje}
                        </li>
                        ))}
                        <button className="clear-notifications-button" onClick={handleNotificationClear}>Limpiar</button>
                    )}
                    {*/}
                        </ul>    
                        <button className="btn btn-outline-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                            <i className="bi bi-list" />
                        </button>
                    </div>
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
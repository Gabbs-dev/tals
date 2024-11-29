import React from 'react';

// Modulos de notificaciones
import NotificationItem from './Notifications/NotificationItem';
import { useNotification } from './Notifications/NotificationServer';
import AlertsItem from './Notifications/Alerts/AlertsItem';

// Contexto de autenticación, usado para cerrar sesión
import { useAuth } from '../Login/AuthContext';

// Extras
import { Offcanvas, Collapse, Dropdown } from 'bootstrap';

// Componente Principal
const Header = () => {
    const { notifications } = useNotification(); // Contexto de Notificaciones
    const { logout } = useAuth(); // Cierre de sesión
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
                                    <a className="nav-link active" aria-current="page" href="/"><i class="bi bi-speedometer"/> Panel principal</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="/users"><i class="bi bi-people"/> Usuarios</a>
                                </li>
                                {/*}
                                <li className="nav-item">
                                    <a className="nav-link active" href="/reports"><i class="bi bi-clipboard-data"/> Reportes</a>
                                </li>
                                {*/}
                                <li className="nav-item">
                                    <button onClick={logout} className='nav-link active'><i class="bi bi-door-closed"></i> Cerrar sesión</button>
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

// Exportación del componente para acceder a el globalmente desde el index
export default Header;
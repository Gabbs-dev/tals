import React from 'react';
import { useNotification } from './NotificationServer'; // Ajusta la ruta según tu estructura

const NotificationItem = () => {
    const { notifications } = useNotification(); // Obtener las notificaciones desde el contexto

    if (!notifications) {
        return <div>Error: No se pudieron cargar las notificaciones.</div>;
    };

    return (
        <div className="dropdown">
            <button className="btn btn-outline-light" type="button" id="notificationDropdown" data-bs-toggle="dropdown"aria-expanded="false">
                <i className='bi bi-bell'/> ({notifications.length})
            </button>
            <ul className="dropdown-menu" aria-labelledby="notificationDropdown">
                {notifications.length === 0 ? (
                    <li className="dropdown-item text-muted">No hay notificaciones</li>
                ) : (
                    notifications.map((notif) => (
                        <li key={notif.id} className={`dropdown-item text-${notif.type}`}>
                            {notif.message}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default NotificationItem;

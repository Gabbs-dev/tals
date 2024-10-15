import React, { createContext, useState, useContext, useCallback } from "react";

// Crear el contexto de notificaciones
const NotificationContext = createContext();

// Hook para acceder al contexto desde cualquier componente
export const useNotification = () => useContext(NotificationContext);

// Proveedor del contexto de notificaciones
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    // Función para agregar notificación
    const addNotification = useCallback((message, type = "success") => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);

        // Remover notificación después de 5 segundos
        /*setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 5000);*/
    }, []);

    return (
        <NotificationContext.Provider value={{ addNotification, notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

import React, { useState, useEffect } from 'react';
import { useNotification } from '../NotificationServer';

const NotificationItem = () => {
  const { notifications } = useNotification();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Si se añade una nueva notificación, mostrar la alerta
    if (notifications.length > 0 && !showAlert) {
      setShowAlert(true);
      // Después de un tiempo, ocultar la alerta
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 5000); // Oculta la alerta después de 5 segundos
      return () => clearTimeout(timeoutId);
    }
  }, [notifications, showAlert]);

  return (
    <div className="position-fixed top-0 end-0 mt-5 me-3">
      {showAlert && (
        notifications.length !== 0 && (
          notifications.map((notif) => (
            <div key={notif.id} className="d-inline-flex alert alert-danger alert-dimissible fade show" role="alert">
              <div>
                ¡Tienes una nueva notificacion!<br/>
                <strong>{notif.message}</strong>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )
        ))
      )}
    </div>
  );
};

export default NotificationItem;
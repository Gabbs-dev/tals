import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Proveedor del contexto de autenticacion
// para acceder a los componentes de la aplicacion
const ProtectedRoute = ({ component:Component }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

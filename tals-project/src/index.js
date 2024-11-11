import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// Servicios y componentes
import Header from './Header/Header';
import Dashboard from './Dashboard';
import UsersList from './users/UsersList';
import UsersForm from './users/UsersForm';
import LightsList from './services/Lights/LightsList';
import LightsForm from './services/Lights/LightsForm';
import WTList from './services/Water/WaterList';
import WTForm from './services/Water/WaterForm';
import ThermList from './services/Therm/ThermList';
import ThermForm from './services/Therm/ThermForm';
import SprayForm from './services/Water/SprayForm';
import SecurityList from './services/Security/SecurityList';
import Reports from './Reports/Reports';
import Login from './Login/Login';
import ProtectedRoute from './Login/ProtectedRoute';
import { AuthProvider } from './Login/AuthContext';
import { NotificationProvider } from './Header/Notifications/NotificationServer';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

// Componente principal de la aplicación
const App = () => {
    const location = useLocation(); // useLocation llamado dentro de un componente
    return (
        <AuthProvider>
            <NotificationProvider>
                {/* Renderiza el Header solo si no está en la página de login */}
                {location.pathname !== '/login' && <Header />}
                <div className="container my-4">
                    <Routes>
                        {/* Rutas protegidas por el modulo AuthProvider y ProtectedRoutes */}
                        <Route path="/login" element={<Login />} />
                        <Route exact path="/" element={<ProtectedRoute component={Dashboard} />} />
                        <Route path="/users" element={<ProtectedRoute component={UsersList} />} />
                        <Route path="/users/register" element={<ProtectedRoute component={UsersForm} />} />
                        <Route path="/users/update/:id" element={<ProtectedRoute component={UsersForm} />} />
                        <Route path="/reports" element={<ProtectedRoute component={Reports} />} />
                        <Route path="/lights" element={<ProtectedRoute component={LightsList} />} />
                        <Route path="/lights/config" element={<ProtectedRoute component={LightsForm} />} />
                        <Route path="/lights/config/:id" element={<ProtectedRoute component={LightsForm} />} />
                        <Route path="/water" element={<ProtectedRoute component={WTList} />} />
                        <Route path="/water/tanklevelconfig" element={<ProtectedRoute component={WTForm} />} />
                        <Route path="/water/tanklevelconfig/:id" element={<ProtectedRoute component={WTForm} />} />
                        <Route path="/water/sprayconfig" element={<ProtectedRoute component={SprayForm} />} />
                        <Route path="/water/sprayconfig/:id" element={<ProtectedRoute component={SprayForm} />} />
                        <Route path="/thermostat" element={<ProtectedRoute component={ThermList} />} />
                        <Route path="/thermostat/config" element={<ProtectedRoute component={ThermForm} />} />
                        <Route path="/thermostat/config/:id" element={<ProtectedRoute component={ThermForm} />} />
                        <Route path="/security" element={<ProtectedRoute component={SecurityList} />} />
                    </Routes>
                </div>
            </NotificationProvider>
        </AuthProvider>
    );
};

// Renderización de la aplicación en el DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

reportWebVitals();

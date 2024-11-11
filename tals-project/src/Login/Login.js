import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router";
import * as LoginServer from './LoginServer';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const sent = await LoginServer.Login(username,password);
            const res = await sent.json();
            console.log(res);
            if (res.message === "Success") {
                const token = res.token;
                localStorage.setItem('authToken', token);
                login();
                alert('Inicio de Sesion Exitoso');
            } else if (res.error) {
                // Usuario no encontrado o contraseña incorrecta
                console.error("Credenciales inválidas");
                alert('Credenciales Inválidas');
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert('Error al Iniciar Sesión.');
        }
    };
    
    return (
        <div >
        <div className="d-flex align-items-center justify-content-center">
            <div className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '500px', borderRadius: '15px',}}>
                <div className="text-center mb-4">
                    <div className="login-img"></div>
                    <img src={`${process.env.PUBLIC_URL}/tals.png`} alt="Descripción de la imagen" width="100%"/>
                    <h2 className="mt-2" style={{ color: '#333' }}>Bienvenido de nuevo</h2>
                    <p className="text-muted">Por favor, inicia sesión en tu cuenta</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Usuario</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-0"><i className="bi bi-person"></i></span>
                            <input type="text" className="form-control" id="username" placeholder="Ingrese su usuario" value={username} onChange={(e) => setUsername(e.target.value)}required/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-0"><i className="bi bi-lock"></i></span>
                            <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)}required/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Login;

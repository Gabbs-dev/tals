import React, { useState } from 'react';

// Componentes de autenticación
import { useAuth } from './AuthContext';
import * as LoginServer from './LoginServer';

// Componente principal
const Login = () => {
    const { login } = useAuth(); // Crea el contexto de inicio de sesión
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Envio de las credenciales a la API
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const sent = await LoginServer.Login(username,password);
            const res = await sent.json();
            if (res.message === "Success") {
                // Usuario encontrado, extrae el token y lo almacena localmente e inicia sesión
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
            alert('No se pudo Iniciar Sesión.');
        }
    };
    
    return (
        <div >
        <div className="d-flex align-items-center justify-content-center">
            <div className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '500px', borderRadius: '15px',}}>
                <div className="text-center mb-4">
                    <div className="login-img"></div>
                    <img src={`${process.env.PUBLIC_URL}/TALS5.png`} alt="Descripción de la imagen" width="80%"/>
                    <p className="text-muted mt-1">Por favor, inicia sesión en tu cuenta</p>
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
                <div className='d-flex justify-content-center mt-3'>
                    <a className=' btn btn-outline-dark w-100' href={`${process.env.PUBLIC_URL}/Manual de Usuario.pdf`} target='blank_'>
                        Manual de Usuario
                    </a>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;
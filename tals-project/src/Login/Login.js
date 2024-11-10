import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContex';
import * as LoginServer from './LoginServer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const { login } = useAuth();
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const getData = async () => {
        try{
            const res = await LoginServer.getUsers();
            const data = await res.json();
            setUser(data);
        }catch(error){
            console.log(error);
            return null;
    };}

    const handleLogin = (e) => {
        e.preventDefault();
        // Aquí podrías agregar la lógica de autenticación'
        try{
            const nombre_usuario = user.nombre;
            console.log(nombre_usuario);
            const contra_usuario = user.password;
            console.log(contra_usuario);
        }catch(error){
            console.error("Ha ocurrido una paraguayada",error);
        }
    };

    console.log(user);

    useEffect(() => {
        getData();
    }, [] );
    
    return (
        <div >
        <div className="d-flex align-items-center justify-content-center">
            <div className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
                <div className="text-center mb-4">
                    <img alt='tals_xd' src='../../public/tals.png' width={200} height={200}/>
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

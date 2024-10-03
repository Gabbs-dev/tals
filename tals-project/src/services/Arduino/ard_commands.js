/* import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const DynamicLight = () => {
    const [comando, setComando] = useState('');
    const socket = io('http://localhost:65432', { transports: ['websocket'] });

    useEffect(() => {
        // Cleanup function to disconnect socket on unmount
        return () => socket.disconnect();
    }, [socket]); // Dependency on socket instance

    const HandleSubmit = (event) => {
        event.preventDefault();
        socket.emit('enviar_comando', comando); // Emit event with command data
        setComando(''); // Clear command input after sending
    };

    return (
        <div className='row'>
            <h1 className='display-5 mt-5'>Control de Luminarias</h1>
            <hr className='divider'/>
            <div className='d-flex justify-content-center mb-3'>
                <div className='mb-3'>
                    <h3 className='display-6 mt-5'>Luz 1</h3>
                    <form className='mb-3' onSubmit={HandleSubmit}>
                        <input type='number' readOnly className='form-control' name='l1' defaultValue='1'/>       
                        <button type='send' className='btn btn-success'>Encender</button>
                    </form>
                    <form className='mb-3' onSubmit={HandleSubmit}>
                        <input type='number' readOnly className='form-control' name='l1' defaultValue='0' />     
                        <button className='btn btn-danger'>Apagar</button>
                    </form>
                </div>
                <div className='mb-3'>
                    <h3 className='display-6 mt-5'>Luz 2</h3>
                    <form className='mb-3' onSubmit={HandleSubmit}>
                        <input type='number' readOnly className='form-control' name='l1' defaultValue='1'  />    
                        <button type='send' className='btn btn-success'>Encender</button>
                    </form>
                    <form className='mb-3' onSubmit={HandleSubmit}>
                        <input type='number' readOnly className='form-control' name='l1' defaultValue='0' />    
                        <button className='btn btn-danger'>Apagar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DynamicLight;*/
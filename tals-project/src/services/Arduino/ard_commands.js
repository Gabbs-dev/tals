import React, { useState } from 'react';
import axios from 'axios';

const DynamicLight = () => {
    const [comando, setComando] = useState('');

    const HandleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/enviar_comando', {
                comando: comando
            });
            console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div className='row'>
            <h1 className='display-5 mt-5'>Control de Luminarias</h1>
            <hr className='divider'/>
            <div className='d-flex justify-content-center mb-3'>
                <div className='mb-3'>
                    <h3 className='display-6 mt-5'>Luz 1</h3>
                    <form className='mb-3' onSubmit={HandleSubmit}>
                        <input type='number' readonly className='form-control' name='l1' value='1'  />    
                        <input type='number' readonly className='form-control' name='sx' value='0'  />    
                        <button type='send' className='btn btn-success'>Encender</button>
                    </form>
                    <form className='mb-3' onSubmit={HandleSubmit}>
                        <input type='number' readonly className='form-control' name='l1' value='0' />    
                        <input type='number' readonly className='form-control' name='sy' value='0' />    
                        <button className='btn btn-danger'>Apagar</button>
                    </form>
                </div>
                <div className='mb-3'>
                    <h3 className='display-6 mt-5'>Luz 2</h3>
                    <form className='mb-3' onSubmit={HandleSubmit}>
                        <input type='number' readonly className='form-control' name='l1' value='1'  />    
                        <input type='number' readonly className='form-control' name='sx' value='0'  />    
                        <button type='send' className='btn btn-success'>Encender</button>
                    </form>
                    <form className='mb-3' onSubmit={HandleSubmit}>
                        <input type='number' readonly className='form-control' name='l1' value='0' />    
                        <input type='number' readonly className='form-control' name='sy' value='0' />    
                        <button className='btn btn-danger'>Apagar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DynamicLight;
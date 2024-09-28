import React, { useEffect, useState } from 'react';

//Componets:
import UsuarioItem from './UsuarioItem';
import * as UsersServer from './UsersServer';

const UsersList = () => {
    const [Users, setUsers] = useState([]);

    const listUsers = async () => {
        try{
            const res = await UsersServer.listUsers();
            const data = await res.json();
            console.log(data);
            setUsers(data.Users);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        listUsers();
    }, []);

    return (
        <div className='row'>
            <h1 className='col-md-3'>Usuarios</h1>
            <div class="col-md-3 d-flex align-items-center">
                <a class="btn btn-primary" href='/users/register'>Agregar Usuario</a>
            </div>
            <hr className="my-2"/>
            {Users.map((usuario)=>(
                <UsuarioItem key={usuario.id} usuario={usuario} listUsers={listUsers} />
            ))}
        </div>
    );
};

export default UsersList;
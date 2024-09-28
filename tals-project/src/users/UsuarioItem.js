import React from "react";
import { useNavigate } from "react-router";

import * as UsersServer from './UsersServer';


const UsuarioItem = ({usuario, listUsers}) => {
    //console.log(props);

    const navigate = useNavigate();

    const handleDelete = async (UserID) =>{
        //console.log(UserID);
        await UsersServer.deleteUser(UserID);
        listUsers();
    };

    return(
        <div className="col-md-4 my-3">
            <div className="card card-body">
                <h3 className="card-tittle"> {usuario.nombre} </h3>
                <p className="card-text">Email: <strong> {usuario.email} </strong></p>
                <button onClick={()=>navigate(`/users/update/${usuario.id}`)} className="btn btn-warning my-2">Editar</button>
                <button onClick={()=>usuario.id && handleDelete(usuario.id)} className="btn btn-danger my-2">Eliminar</button>
            </div>
        </div>
    );
};

export default UsuarioItem;
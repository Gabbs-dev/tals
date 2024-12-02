import React from "react";
import { useNavigate } from "react-router";
import * as UsersServer from './UsersServer';

const UsuarioItem = ({ usuario, listUsers }) => {
    const navigate = useNavigate();

    // Función para eliminar un usuario
    const handleDelete = async (UserID) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        
        if (confirmDelete) {
            try {
                // Llamada a la función para eliminar el usuario
                await UsersServer.deleteUser(UserID);
                alert("Usuario eliminado con éxito");
                listUsers(); // Actualiza la lista de usuarios después de la eliminación
            } catch (error) {
                alert("Error al eliminar el usuario");
            }
        }
    };


    return (
        <div className="col-md-4 my-3">
            <div className="card card-body">
                <h3 className="card-title">{usuario.nombre}</h3>
                <p className="card-text">
                    Email: <strong>{usuario.email}</strong>
                </p>
                {/* Mostrar los botones de editar y eliminar si el nombre no es 'talsAdmin' */}
                {usuario.nombre !== 'talsAdmin' && (
                    <div className="d-flex justify-content-evenly">
                        <button
                            onClick={() => navigate(`/users/update/${usuario.id}`)}
                            className="btn btn-warning my-2"
                        >
                            Editar
                        </button>
                        
                        <button
                            onClick={() => usuario.id && handleDelete(usuario.id)}
                            className="btn btn-danger my-2"
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsuarioItem;

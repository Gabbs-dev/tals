import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as UsersServer from './UsersServer';

const UsersForm = () => {
    const navigate = useNavigate();
    const params = useParams();

    const initialState = { id: 0, nombre: "", email: "", password: "" };
    const [Users, setUsers] = useState(initialState);
    const [isEditMode, setIsEditMode] = useState(false); // Nuevo estado para saber si estamos en modo editar

    const HandleInputChange = (e) => {
        setUsers({ ...Users, [e.target.name]: e.target.value });
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            // Si tiene un id, es una edición
            if (Users.id) {
                res = await UsersServer.updateUser(Users.id, {
                    nombre: Users.nombre,
                    email: Users.email,
                    password: Users.password,
                });

                const data = await res.json();
                if (data.message === "Success") {
                    alert("Usuario editado correctamente");
                    navigate("/users"); // Redirige a la lista de usuarios después de la edición
                }
            } else {
                // Si no tiene id, es un registro nuevo
                res = await UsersServer.registerUser(Users);

                const data = await res.json();
                if (data.message === "Success") {
                    alert("Nuevo usuario registrado correctamente");
                    navigate("/users"); // Redirige a la lista de usuarios después de registrar
                }
            }
        } catch (error) {
            alert("Error al guardar el usuario");
        }
    };

    const getUser = async (UserID) => {
        try {
            const res = await UsersServer.getUser(UserID);
            const data = await res.json();
            const { nombre, email, password } = data.User;
            setUsers({ id: UserID, nombre, email, password });
            setIsEditMode(true); // Establecemos que estamos en modo editar
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.id) {
            getUser(params.id); // Obtiene el usuario para editar si hay un id en la URL
        }
    }, [params.id]);

    return (
        <div className="col-md-3 mx-auto">
            <h2 className="mb-3 text-center">{isEditMode ? "Editar Usuario" : "Nuevo Usuario"}</h2>
            <form onSubmit={HandleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={Users.nombre}
                        onChange={HandleInputChange}
                        className="form-control"
                        maxLength="45"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={Users.email}
                        onChange={HandleInputChange}
                        className="form-control"
                        maxLength="45"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="text"
                        name="password"
                        value={Users.password}
                        onChange={HandleInputChange}
                        className="form-control"
                        maxLength="45"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {isEditMode ? "Actualizar" : "Registrar"}
                </button>
                <a type="button" className="btn btn-secondary mx-3" href="/users">
                    Regresar
                </a>
            </form>
        </div>
    );
};

export default UsersForm;

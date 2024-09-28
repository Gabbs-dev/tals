import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import * as UsersServer from './UsersServer';

const UsersForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState={id:0,nombre:"",email:"",password:""};
    const [Users, setUsers]= useState(initialState);

    const HandleInputChange = (e) =>{
        setUsers({...Users,[e.target.name]:e.target.value});
    };

    const HandleSubmit = async (e) =>{
        e.preventDefault();
        try{
            let res;
            res= await UsersServer.registerUser(Users);
            const data= await res.json();
            //console.log(data);
            if(data.message==="Success"){
                setUsers(initialState);
            }
            navigate('/users');
        }catch(error){
            console.log(error);
        };
    };

    const getUser = async (UserID) =>{
        try{
            const res = await UsersServer.getUser(UserID);
            const data = await res.json();
            const {nombre,email,password}= data.User;
            setUsers({nombre,email,password});
        }catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        if(params.id){
            getUser(params.id);
        }
        // eslint-disable-next-line
    }, []);

    return(
        <div className="col-md-3 mx-auto">
            <h2 className="mb-3 text-center">Ingrese Nuevo Usuario</h2>
            <form onSubmit={HandleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input type="text" name="nombre" value={Users.nombre} onChange={HandleInputChange} className="form-control" maxLength="45" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" name="email" value={Users.email} onChange={HandleInputChange} className="form-control" maxLength="45" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="text" name="password" value={Users.password} onChange={HandleInputChange} className="form-control" maxLength="45" required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <a type="button" className="btn btn-secondary mx-3" href="/users">Return</a>
            </form>
        </div>
        
    )
};

export default UsersForm;
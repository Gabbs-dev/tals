import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import * as SprayServer from './SprayServer';

const SprayForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState={id:0,nivel_agua:"0",nivel_max:"0.0",nivel_min:"0.0",date:""};
    const [Spray, setSpray]= useState(initialState);

    const HandleInputChange = (e) =>{
        setSpray({...Spray,[e.target.name]:e.target.value});
    };

    const HandleSubmit = async (e) =>{
        e.preventDefault();
        try{
            let res;
            res= await SprayServer.registerSpray(Spray);
            const data= await res.json();
            //console.log(data);
            if(data.message==="Success"){
                setSpray(initialState);
            }
            navigate('/water');
        }catch(error){
            console.log(error);
        };
    };

    const getSprayItem = async (SprayID) =>{
        try{
            const res = await SprayServer.getSpray(SprayID);
            const data = await res.json();
            const {nivel_agua,nivel_max,nivel_min,date}= data.SprayID;
            setSpray({nivel_agua,nivel_max,nivel_min,date});
        }catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        if(params.id){
            getSprayItem(params.id);
        }
        // eslint-disable-next-line
    }, []);

    return(
        <div className="row">
            <h2 className="display-6 text-center">Regado / Configuración</h2>
            <hr className="divider"/>
            <div className="d-flex flex-row justify-content-center">
                <div className="d-flex flex-column">
                    <form onSubmit={HandleSubmit}>
                        <div className="mb-3">
                            <input type="hidden" step="0.1" name="nivel_agua" value={Spray.nivel_agua} onChange={HandleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nivel Máximo:</label>
                            <input type="number" step="0.1" name="nivel_max" value={Spray.nivel_max} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nivel Mínimo:</label>
                            <input type="number" step="0.1" name="nivel_min" value={Spray.nivel_min} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <input type="hidden" name="date" value={Spray.date} onChange={HandleInputChange} className="form-control" />
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <a type="button" className="btn btn-secondary" href="/water">Return</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>    
    )
};

export default SprayForm;
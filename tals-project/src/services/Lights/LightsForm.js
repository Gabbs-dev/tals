import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import * as LightsServer from './LightsServer';

const LightForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState={id:0,ubicacion:"",estado:"",horario_inicio:"",horario_cierre:""};
    const [Lights, setLights]= useState(initialState);

    const HandleInputChange = (e) =>{
        setLights({...Lights,[e.target.name]:e.target.value});
    };

    const HandleSubmit = async (e) =>{
        e.preventDefault();
        try{
            let res;
            res= await LightsServer;
            const data= await res.json();
            if(data.message==="Success"){
                setLights(initialState);
            }
            navigate('/lights');
        }catch(error){
            console.log(error);
        };
    };

    const getLight = async (LightID) =>{
        try{
            const res = await LightsServer.getLight(LightID);
            const data = await res.json();
            const {ubicacion,estado,horario_inicio,horario_cierre}= data.Lights;
            setLights({ubicacion,estado,horario_inicio,horario_cierre});
        }catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        if(params.id){
            getLight(params.id);
        }
        // eslint-disable-next-line
    }, []);

    return(
        <div className="row">
            <h2 className="display-6 text-center">Luminarias / Configuracion</h2>
            <hr className="divider"/>
            <div className="d-flex flex-row justify-content-center mt-2">
                <div className="d-flex flex-column">
                    <form onSubmit={HandleSubmit}>
                        <div className="mb-3">
                            <input type="text" name="dispositivo" value={Lights.dispositivo} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Encendido Automático:</label>
                            <input type="time" step="00:00:00" name="horario_inicio" value={Lights.horario_inicio} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Apagado Automático:</label>
                            <input type="time" name="horario_cierre" value={Lights.horario_cierre} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <button type="submit" step="00:00:00" className="btn btn-primary">Submit</button>
                        <a type="button" className="btn btn-secondary mx-3" href="/lights">Return</a>
                    </form>
                </div>
            </div>
        </div>
        
    )
};

export default LightForm;
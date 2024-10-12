import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import * as ThermServer from './ThermServer';

const ThermForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState={id:0,registro_temperatura:"0.0",temperatura_deseada:"0.0",date:""};
    const [Thermostats, setTherm]= useState(initialState);

    const HandleInputChange = (e) =>{
        setTherm({...Thermostats,[e.target.name]:e.target.value});
    };

    const HandleSubmit = async (e) =>{
        e.preventDefault();
        try{
            let res;
            res= await ThermServer.registerTherm(Thermostats);
            const data= await res.json();
            if(data.message==="Success"){
                setTherm(initialState);
            }
            navigate('/thermostat');
        }catch(error){
            console.log(error);
        };
    };

    const getThermostat = async (ThermID) =>{
        try{
            const res = await ThermServer.getTherm(ThermID);
            const data = await res.json();
            const {registro_temperatura,temperatura_deseada,date}= data.Thermostats;
            setTherm({registro_temperatura,temperatura_deseada,date});
        }catch(error){
            console.log(error); 
        }
    };
    useEffect(() => {
        if(params.id){
            getThermostat(params.id);
        }
        // eslint-disable-next-line
    }, []);

    return(
        <div className="row">
            <h2 className="display-6 text-center">Termostato / Configuración</h2>
            <hr className="divider"/>
            <div className="d-flex flex-row justify-content-center mt-2">
                <div className="d-flex flex-column">
                    <form onSubmit={HandleSubmit}>
                        <div className="mb-3">
                            <input type="hidden" step="0.1" name="registro_temperatura" value={Thermostats.registro_temperatura} onChange={HandleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Temperatura Deseada:</label>
                            <input type="number" step="0.1" name="temperatura_deseada" value={Thermostats.temperatura_deseada} onChange={HandleInputChange} className="form-control" required />
                        </div><div className="mb-3">
                            <label className="form-label">Temperatura Deseada:</label>
                            <input type="number" step="0.1" name="temperatura_deseada" value={Thermostats.temperatura_deseada} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Temperatura Deseada:</label>
                            <input type="number" step="0.1" name="temperatura_deseada" value={Thermostats.temperatura_deseada} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Temperatura Deseada:</label>
                            <input type="number" step="0.1" name="temperatura_deseada" value={Thermostats.temperatura_deseada} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <input type="hidden" name="date" value={Thermostats.date} onChange={HandleInputChange} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <a type="button" className="btn btn-secondary mx-3" href="/thermostat">Return</a>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default ThermForm;
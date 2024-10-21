import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import * as ThermLevels from './Levels/ThermLevels';

const ThermForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState={id:0,dispositivo:"",temperatura_deseada:"0.0"};
    const [Level, setLevel]= useState(initialState);

    const HandleInputChange = (e) =>{
        setLevel({...Level,[e.target.name]:e.target.value});
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id, ...rest } = Level;
            if (id) {
                // Si existe un ID, actualizar el registro
                const res = await ThermLevels.updateLevel(id, rest);
                const data = await res.json();
                if (data.message === 'Success') {
                    setLevel(initialState);
                    navigate('/thermostat/');
                }
                alert('Registro actualizado correctamente');
            } else {
                // Si no existe ID, crear un nuevo registro
                const res = await ThermLevels.registerLevel(Level);
                const data= await res.json();
                if(data.message==="Success"){
                    setLevel(initialState);
                }
                alert('Nuevo registro creado correctamente');
                navigate('/thermostat');
            }
        } catch (error) {
            alert('Error al guardar los datos');
            console.log(error);
        }
    };

    const getThermostat = async (ThermID) =>{
        try{
            const res = await ThermLevels.getLevel(ThermID);
            const data = await res.json();
            const {id,dispositivo,temperatura_deseada}= data.thermLevel;
            setLevel({id,dispositivo,temperatura_deseada});
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
                            <label className="form-label">Dispositivo:</label>
                            <input type="text" name="dispositivo" placeholder="Ej: Termometro Habitacion" value={Level.dispositivo} onChange={HandleInputChange} className="form-control" required />
                        </div><div className="mb-3">
                            <label className="form-label">Temperatura Deseada:</label>
                            <input type="number" step="0.1" name="temperatura_deseada" value={Level.temperatura_deseada} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <input type="hidden" name="date" value={Level.date} onChange={HandleInputChange} className="form-control" />
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <input type="hidden" name="id" value={Level.id} onChange={HandleInputChange} className="form-control" required />
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <a type="button" className="btn btn-secondary" href="/thermostat/">Return</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default ThermForm;
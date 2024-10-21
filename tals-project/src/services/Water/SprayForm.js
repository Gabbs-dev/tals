import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import * as SprayTimer from './Timer/SprayTimer';

const SprayForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState={id:0,dispositivo:"",horario_inicio:"",horario_cierre:""};
    const [Lights, setLights]= useState(initialState);

    const HandleInputChange = (e) =>{
        setLights({...Lights,[e.target.name]:e.target.value});
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id, ...rest } = Lights;
            if (id) {
                // Si existe un ID, actualizar el registro
                const res = await SprayTimer.updateTimer(id, rest);
                const data = await res.json();
                if (data.message === 'Success') {
                    setLights(initialState);
                    navigate('/water');
                }
                alert('Registro actualizado correctamente');
            } else {
                // Si no existe ID, crear un nuevo registro
                const res = await SprayTimer.registerTimer(Lights);
                const data= await res.json();
                if(data.message==="Success"){
                    setLights(initialState);
                }
                alert('Nuevo registro creado correctamente');
                navigate('/water');
            }
        } catch (error) {
            alert('Error al guardar los datos');
            console.log(error);
        }
    };

    const getLight = async (LightID) =>{
        try{
            const res = await SprayTimer.getTimer(LightID);
            const data = await res.json();
            const {id,dispositivo,horario_inicio,horario_cierre}= data.timerSpray;
            setLights((prevState) => ({... prevState, id,dispositivo,horario_inicio,horario_cierre}));
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

    console.log(Lights);

    return(
        <div className="row">
            <h2 className="display-6 text-center">Regado / Configuracion</h2>
            <hr className="divider"/>
            <div className="d-flex flex-row justify-content-center mt-2">
                <div className="d-flex flex-column">
                    <form onSubmit={HandleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre de dispositivo</label>
                            <input type="text" name="dispositivo" placeholder="Ej: Aspersor Jardin" value={Lights.dispositivo} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Encendido Automático:</label>
                            <input type="time" step="00:00:00" name="horario_inicio" value={Lights.horario_inicio} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Apagado Automático:</label>
                            <input type="time" name="horario_cierre" value={Lights.horario_cierre} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="d-flex flex-row justify-content-evenly">
                            <input type="hidden" name="id" value={Lights.id} onChange={HandleInputChange} className="form-control" required />
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
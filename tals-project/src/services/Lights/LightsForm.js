import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

// Componente para los temporizadores de las luces
import * as LightTimer from './Timer/LightTimer';

const LightForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState={id:0,dispositivo:"",horario_inicio:"",horario_cierre:""};
    const [Lights, setLights]= useState(initialState);

    // Maneja el estado de los datos en caso de modificacion
    const HandleInputChange = (e) =>{
        setLights({...Lights,[e.target.name]:e.target.value});
    };

    // Envia los datos ingresados a la API
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id, ...rest } = Lights;
            if (id) {
                // Si existe un ID, actualizar el registro
                const res = await LightTimer.updateTimer(id, rest);
                const data = await res.json();
                if (data.message === 'Success') {
                    setLights(initialState);
                    navigate('/lights');
                }
                alert('Registro actualizado correctamente');
            } else {
                // Si no existe ID, crear un nuevo registro
                const res = await LightTimer.registerTimer(Lights);
                const data= await res.json();
                if(data.message==="Success"){
                    setLights(initialState);
                }
                alert('Nuevo registro creado correctamente');
                navigate('/lights');
            }
        } catch (error) {
            alert('Error al guardar los datos');
            console.log(error);
        }
    };

    // Obtiene los datos del temporizador existente para luego modificarlos
    const getLight = async (LightID) =>{
        try{
            const res = await LightTimer.getTimer(LightID);
            const data = await res.json();
            const {id,dispositivo,horario_inicio,horario_cierre}= data.timerLight;
            setLights((prevState) => ({... prevState, id,dispositivo,horario_inicio,horario_cierre}));
        }catch(error){
            console.log(error);
        }
    };

    // Hook de ejecucion
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
                            <label className="form-label">Nombre de dispositivo</label>
                            <input type="text" name="dispositivo" placeholder="Ej: Luz Oficina" value={Lights.dispositivo} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Encendido Automático:</label>
                            <input type="time" step="00:00:00" name="horario_ini cio" value={Lights.horario_inicio} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Apagado Automático:</label>
                            <input type="time" name="horario_cierre" value={Lights.horario_cierre} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="d-flex flex-row justify-content-evenly">
                            <input type="hidden" name="id" value={Lights.id} onChange={HandleInputChange} className="form-control" required />
                            <button type="submit" className="btn btn-primary">Guardar</button>
                            <a type="button" className="btn btn-secondary" href="/lights">Regrasar</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )
};

export default LightForm;
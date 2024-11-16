import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import * as WaterServer from './WaterServer';

const WTForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState={id:0,nivel_maximo:"00",nivel_minimo:"00",altura:"0.0",diametro:"0.0"};
    const [WaterTankLevels, setWTL]= useState(initialState);

    const HandleInputChange = (e) =>{
        setWTL({...WaterTankLevels,[e.target.name]:e.target.value});
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id, ...rest } = WaterTankLevels;
            if (id) {
                // Si existe un ID, actualizar el registro
                const res = await WaterServer.updateWatertankLevels(id, rest);
                const data = await res.json();
                if (data.message === 'Success') {
                    setWTL(initialState);
                    navigate('/water');
                }
                alert('Registro actualizado correctamente');
            } else {
                // Si no existe ID, crear un nuevo registro
                const res = await WaterServer.registerWatertankLevels(WaterTankLevels);
                const data= await res.json();
                if(data.message==="Success"){
                    setWTL(initialState);
                }
                alert('Nuevo registro creado correctamente');
                navigate('/water');
            }
        } catch (error) {
            alert('Error al guardar los datos');
            console.log(error);
        }
    };

    const getWTL = async (WTID) =>{
        try{
            const res = await WaterServer.getWatertankLevel(WTID);
            console.log(res);
            const data = await res.json();
            const {id,nivel_maximo,nivel_minimo,altura,diametro} = data.tanklevel;
            setWTL((prevState) => ({... prevState, id,nivel_maximo,nivel_minimo,altura,diametro}));
        }catch(error){
            console.log(error);
        }
    };
    
    useEffect(() => {
        if(params.id){
            getWTL(params.id);
        }
        // eslint-disable-next-line
    }, []);
    
    console.log(WaterTankLevels);

    return(
        <div className="row">
            <h2 className="display-5 text-center">Nivel de Agua / Configuracion</h2>
            <hr className="divider"/>
            <div className="d-flex flex-row justify-content-center">
                <div className="d-flex flex-column">
                    <form onSubmit={HandleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nivel Máximo (%):</label>
                            <input type="number" name="nivel_maximo" value={WaterTankLevels.nivel_maximo} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nivel Mínimo (%):</label>
                            <input type="number" name="nivel_minimo" value={WaterTankLevels.nivel_minimo} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Altura (mts):</label>
                            <input type="number" step="0.1" name="altura" value={WaterTankLevels.altura} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Diámetro (mts):</label>
                            <input type="number" step="0.1" name="diametro" value={WaterTankLevels.diametro} onChange={HandleInputChange} className="form-control" required />
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <input type="hidden" name="id" value={WaterTankLevels.id} onChange={HandleInputChange} className="form-control" required />
                            <button type="submit" className="btn btn-primary">Guardar</button>
                            <a type="button" className="btn btn-secondary" href="/water">Regresar</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default WTForm;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import * as WaterServer from './WaterServer';

const WTForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState={id:0, nivel_maximo:"00",nivel_minimo:"00",altura:"0.0",diametro:"0.0"};
    const [WaterTankLevels, setWTL]= useState(initialState);

    const HandleInputChange = (e) =>{
        setWTL({...WaterTankLevels,[e.target.name]:e.target.value});
    };

    const HandleSubmit = async (e) =>{
        e.preventDefault();
        try{
            let res;
            res= await WaterServer.registerWatertankLevels(WaterTankLevels);
            const data= await res.json();
            if(data.message==="Success"){
                setWTL(initialState);
            }
            navigate('/water');
        }catch(error){
            console.log(error);
        };
    };

    const getWaterTanklevel = async (WTID) =>{
        try{
            const res = await WaterServer.getWatertankLevel(WTID);
            const data = await res.json();
            const {nivel_maximo,nivel_minimo,altura,diametro} = data.WaterTankLevels;
            setWTL((prevState) => ({...prevState, nivel_maximo,nivel_minimo,altura,diametro,}));
        }catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        if(params.id){
            getWaterTanklevel(params.id);
        }
        // eslint-disable-next-line
    }, []);

    return(
        <div className="row">
            <h2 className="display-5 text-center">Nivel de Agua / Configuracion</h2>
            <hr className="divider"/>
            <div className="d-flex flex-row justify-content-center">
                <div className="d-flex flex-column">
                    <form onSubmit={HandleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nivel Máximo (%):</label>
                            <input type="number" name="nivel_maximo" value={WaterTankLevels?.tanklevel?.nivel_maximo} onChange={HandleInputChange} className="form-control" required />
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
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <a type="button" className="btn btn-secondary" href="/water">Return</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default WTForm;
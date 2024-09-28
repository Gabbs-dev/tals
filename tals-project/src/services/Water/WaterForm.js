import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import * as WaterServer from './WaterServer';

const WTForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState={id:0,nivel_agua:"0",nivel_max:"0.0",nivel_min:"0.0",date:""};
    const [WaterTank, setWT]= useState(initialState);

    const HandleInputChange = (e) =>{
        setWT({...WaterTank,[e.target.name]:e.target.value});
    };

    const HandleSubmit = async (e) =>{
        e.preventDefault();
        try{
            let res;
            res= await WaterServer.registerWatertank(WaterTank);
            const data= await res.json();
            //console.log(data);
            if(data.message==="Success"){
                setWT(initialState);
            }
            navigate('/water');
        }catch(error){
            console.log(error);
        };
    };

    const getWaterTank = async (WTID) =>{
        try{
            const res = await WaterServer.getWatertank(WTID);
            const data = await res.json();
            const {nivel_agua,nivel_max,nivel_min,date}= data.WaterTank;
            setWT({nivel_agua,nivel_max,nivel_min,date});
        }catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        if(params.id){
            getWaterTank(params.id);
        }
        // eslint-disable-next-line
    }, []);

    return(
        <div className="col-md-3 mx-auto">
            <h2 className="mb-3 text-center">Ingrese Nuevo Dispositivo</h2>
            <h4 className="mb-3 text-center">Control del Nivel de Agua</h4>
            <form onSubmit={HandleSubmit}>
                <div className="mb-3">
                    <input type="hidden" step="0.1" name="nivel_agua" value={WaterTank.nivel_agua} onChange={HandleInputChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nivel Máximo:</label>
                    <input type="number" step="0.1" name="nivel_max" value={WaterTank.nivel_max} onChange={HandleInputChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nivel Mínimo:</label>
                    <input type="number" step="0.1" name="nivel_min" value={WaterTank.nivel_min} onChange={HandleInputChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <input type="hidden" name="date" value={WaterTank.date} onChange={HandleInputChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <a type="button" className="btn btn-secondary mx-3" href="/addDevices">Return</a>
            </form>
        </div>
        
    )
};

export default WTForm;
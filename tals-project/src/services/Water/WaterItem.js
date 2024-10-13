import * as WTServer from './WaterServer';
import React, { useCallback, useEffect, useState } from 'react';

const WTItem = () => {
    const [TanqueAgua, setTanqueAgua] = useState([]);
    const [TanqueAguaLevels, setTanqueAguaLevels] = useState([]);
    const [litros, setLitros] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    const actualState = async () => {
        try{
            const res = await WTServer.getLastWatertank();
            const data = await res.json();
            setTanqueAgua(data);
        }catch(error){
            console.log(error);
            return null;
        };
    };

    const Levels = async () => {
        try{
            const res = await WTServer.getWatertankLevel(1);
            const data = await res.json();
            setTanqueAguaLevels(data);
        }catch(error){
            console.log(error);
            return null;
        };
    };

    // Función para calcular los litros
    const calcularLitros = useCallback(() => {
        const alturaTanque = (TanqueAguaLevels?.tanklevel?.altura || 0) * 100; // cm
        const radioTanque = (TanqueAguaLevels?.tanklevel?.diametro || 0) * 100; // cm
        const divRadioTanque = radioTanque / 2;
        const distancia = TanqueAgua?.Watertank?.nivel_agua || 0;
        const alturaLiquido = alturaTanque - distancia;
        if (alturaLiquido < 0) return 0; // Evitar negativos
        const volumen = Math.PI * Math.pow(divRadioTanque, 2) * alturaLiquido; // cm³
        const conversion = volumen / 1000; // Convertir a litros
        setLitros(conversion);
    }, [TanqueAgua, TanqueAguaLevels]);
    
    const calcularPorcentaje = useCallback(() => {
        const alturaTanque = (TanqueAguaLevels?.tanklevel?.altura || 0) * 100; // cm
        const radioTanque = (TanqueAguaLevels?.tanklevel?.diametro || 0) * 100; // cm
        const divRadioTanque = radioTanque / 2;
        const volumen = Math.PI * Math.pow(divRadioTanque, 2) * alturaTanque;
        const litTotal = volumen / 1000;
        const Litros = litros;
        const calc = Litros * 100;
        const porciento = calc  / litTotal;
        if (porciento < 0) return 0; // Evitar negativos
        setPorcentaje(porciento);
    }, [litros, TanqueAguaLevels]);

    useEffect(() => {
        const fetchData = async () => {
            await actualState();
            await Levels();
        };
        fetchData();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        calcularLitros();
    }, [TanqueAgua, TanqueAguaLevels, calcularLitros]);

    useEffect(() => {
        calcularPorcentaje();
    }, [TanqueAgua, TanqueAguaLevels, calcularPorcentaje]);

    return(
        <div className="d-flex flex-row mb-3 justify-content-evenly">
            <div className='d-flex flex-column'>
                <div className="card card-body">
                    <h3 className="card-tittle">Tanque de agua</h3>
                    <p className="card-text my-3">Nivel Actual de Agua: <strong>{ porcentaje.toPrecision(3) || 'N/A'} %</strong></p>
                    <p className="card-text">Litros Restantes: <strong> {litros.toPrecision(4) || 'N/A' } Lts</strong></p>
                    <p className="card-text">Nivel Máximo: <strong>{TanqueAguaLevels?.tanklevel?.nivel_maximo || 'N/A'} %</strong></p>
                    <p className="card-text">Nivel Minimo: <strong>{TanqueAguaLevels?.tanklevel?.nivel_minimo || 'N/A'} %</strong></p>
                </div>
            </div>
        </div>
    );
};

export default WTItem;
// WaterItem.js
import * as WTServer from './WaterServer';
import React, { useCallback, useEffect, useState } from 'react';

const WTItem = ({ onPorcentajeChange }) => {
  const [TanqueAgua, setTanqueAgua] = useState([]);
  const [TanqueAguaLevels, setTanqueAguaLevels] = useState([]);
  const [litros, setLitros] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  const actualState = async () => {
    try {
      const res = await WTServer.getLastWatertank();
      const data = await res.json();
      setTanqueAgua(data);
    } catch (error) {
      console.error(error);
    }
  };

  const Levels = async () => {
    try {
      const res = await WTServer.getWatertankLevel(1);
      const data = await res.json();
      setTanqueAguaLevels(data);
    } catch (error) {
      console.error(error);
    }
  };

  const calcularLitros = useCallback(() => {
    const alturaTanque = (TanqueAguaLevels?.tanklevel?.altura || 0) * 100;
    const radioTanque = (TanqueAguaLevels?.tanklevel?.diametro || 0) * 100;
    const divRadioTanque = radioTanque / 2;
    const distancia = TanqueAgua?.Watertank?.nivel_agua || 0;
    const alturaLiquido = alturaTanque - distancia;
    const volumen = Math.PI * Math.pow(divRadioTanque, 2) * alturaLiquido;
    setLitros(volumen / 1000);
  }, [TanqueAgua, TanqueAguaLevels]);

  const calcularPorcentaje = useCallback(() => {
    const alturaTanque = (TanqueAguaLevels?.tanklevel?.altura || 0) * 100;
    const radioTanque = (TanqueAguaLevels?.tanklevel?.diametro || 0) * 100;
    const divRadioTanque = radioTanque / 2;
    const volumenTotal = Math.PI * Math.pow(divRadioTanque, 2) * alturaTanque;
    const porcentajeCalculado = (litros * 100) / (volumenTotal / 1000);
    setPorcentaje(porcentajeCalculado);
    onPorcentajeChange(porcentajeCalculado);
  }, [litros, TanqueAguaLevels, onPorcentajeChange]);

  useEffect(() => {
    const fetchData = async () => {
      await actualState();
      await Levels();
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => calcularLitros(), [TanqueAgua, TanqueAguaLevels, calcularLitros]);
  useEffect(() => calcularPorcentaje(), [litros, calcularPorcentaje]);

  return (
    <div className="d-flex flex-row mb-3 justify-content-evenly">
      <div className="d-flex flex-column">
        <div className="card card-body">
          <h3 className="card-title">Tanque de agua</h3>
          <p className="card-text my-3">
            Nivel Actual de Agua: <strong>{porcentaje.toFixed(2) || 'N/A'} %</strong>
          </p>
          <p className="card-text">
            Litros Restantes: <strong>{litros.toFixed(2) || 'N/A'} Lts</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WTItem;

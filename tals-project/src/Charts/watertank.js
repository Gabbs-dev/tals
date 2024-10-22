// watertank.js
import React from 'react';
import { useEffect, useState } from 'react';

export const WaterTank = ({ porcentaje }) => {
    const [waterLevel, setWaterLevel] = useState(50);

    useEffect(() => {
        const interval = setInterval(() => {
            setWaterLevel((prev) => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(0, Math.min(prev + change, 100));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tank-container">
      <div className="tank">
        <div className="water" style={{ height: `${porcentaje}%` }} />
      </div>
      <p>Nivel de agua: {porcentaje.toFixed(2)}%</p>
    </div>
  );
};
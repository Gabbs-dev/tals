import React, { useEffect, useState } from 'react';

export const Thermometer = ({ temperature }) => {
  const [currentTemperature, setCurrentTemperature] = useState(20);

  useEffect(() => {
    // Replace this with a function to get temperature from the sensor
    const interval = setInterval(() => {
      setCurrentTemperature((prev) => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(0, Math.min(prev + change, 40));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="thermometer-container">
      <div className="thermometer">
        <div className="mercury" style={{ width: `${temperature * 2.5}%` }} />
      </div>
      <p>Temperatura: {temperature}°C</p>
    </div>
  );
};
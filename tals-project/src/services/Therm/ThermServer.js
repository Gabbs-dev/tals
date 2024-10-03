const API_URL="http://127.0.0.1:8000/api/thermostat/";

export const getLastThermostat = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el último termostato:', error);
        return null;
    };
};

export const getTherm = async (ThermID) => {
    return await fetch(`${API_URL}${ThermID}`);
};

export const registerTherm = async (newTherm) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            "registro_temperatura":Number(newTherm.registro_temperatura),
            "temperatura_deseada":Number(newTherm.temperatura_deseada),
            "date":Date(newTherm.date),
        })
    });
};

export const deleteTherm = async (ThermID) => {
    return await fetch(`${API_URL}${ThermID}`, {
        method: 'DELETE',
    });
};
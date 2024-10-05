const API_URL="http://127.0.0.1:8000/api/lights/";

export const getLastLight = async () => {
    return await fetch(API_URL);
};

export const getLight = async (LightID) => {
    return await fetch(`${API_URL}${LightID}`);
};

export const registerLight = async (newLight) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            "ubicacion":String(newLight.ubicacion).trim(),
            "estado":String(newLight.estado).trim(),
            "auto_encendido":Number(newLight.auto_encendido),
            "auto_apagado":Number(newLight.auto_apagado),
        })
    });
};

export const deleteLight = async (LightID) => {
    return await fetch(`${API_URL}${LightID}`, {
        method: 'DELETE',
    });
};
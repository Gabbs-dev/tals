const API_URL="http://127.0.0.1:8000/api/spray/";

export const listSpray = async () => {
    return await fetch(API_URL);
};

export const getSpray = async (SprayID) => {
    return await fetch(`${API_URL}${SprayID}`);
};

export const registerSpray = async (newSpray) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            "nombre":String(newSpray.registro_temperatura).trim(),
            "email":String(newSpray.temperatura_deseada).trim(),
            "password":String(newSpray.date).trim(),
        })
    });
};

export const deleteSpray = async (SprayID) => {
    return await fetch(`${API_URL}${SprayID}`, {
        method: 'DELETE',
    });
};
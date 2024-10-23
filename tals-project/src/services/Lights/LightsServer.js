const API_URL="http://127.0.0.1:8000/api/lights/";

export const getLastLight = async () => {
    return await fetch(API_URL);
};

export const getLight = async (LightID) => {
    return await fetch(`${API_URL}${LightID}`);
};

export const createLightState = async (data) => {
    return await fetch(API_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "luz1":Number(data.luz1),
            "luz2":Number(data.luz2),
            "luz3":Number(data.luz3),
            "luz4":Number(data.luz4),
            "luz5":Number(data.luz5),
            "luz6":Number(data.luz6),
        })
    });
};
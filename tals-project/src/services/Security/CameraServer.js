const API_URL="http://127.0.0.1:8000/api/cameras/";

export const getCameraStatus = async () => {
    return await fetch(API_URL);
};

export const getCameraData = async (WTID) => {
    return await fetch(`${API_URL}${WTID}`);
};

export const cameraPosition = async (position) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            "posicion_x":Number(position.posicion_x),
            "posicion_y":Number(position.posicion_y),
        })
    });
};

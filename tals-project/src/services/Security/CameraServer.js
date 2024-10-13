const API_URL="http://127.0.0.1:8000/api/cameras/";

export const getCameraStatus = async () => {
    return await fetch(API_URL);
};

export const getCameraData = async (WTID) => {
    return await fetch(`${API_URL}${WTID}`);
};

export const registerCameraData = async (newWatertank) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            "nivel_maximo":Number(newWatertank.nivel_maximo),
            "nivel_minimo":Number(newWatertank.nivel_minimo),
        })
    });
};

export const deleteCamera = async (WTID) => {
    return await fetch(`${API_URL}${WTID}`, {
        method: 'DELETE',
    });
};

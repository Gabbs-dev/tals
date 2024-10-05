const API_URL="http://127.0.0.1:8000/api/watertank/";

export const getLastWatertank = async () => {
    return await fetch(API_URL);
};

export const getWatertank = async (WTID) => {
    return await fetch(`${API_URL}${WTID}`);
};

export const registerWatertank = async (newWatertank) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            "nivel_agua":Number(newWatertank.nivel_agua),
            "nivel_max":Number(newWatertank.nivel_max),
            "nivel_min":Number(newWatertank.nivel_min),
            "date":Date(newWatertank.date),
        })
    });
};

export const deleteWatertank = async (WTID) => {
    return await fetch(`${API_URL}${WTID}`, {
        method: 'DELETE',
    });
};
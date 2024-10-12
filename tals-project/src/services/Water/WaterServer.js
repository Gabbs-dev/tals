const API_URL="http://127.0.0.1:8000/api/watertank/";
const API_URL_Levels="http://127.0.0.1:8000/api/watertank/levels/";

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
            "nivel_maximo":Number(newWatertank.nivel_maximo),
            "nivel_minimo":Number(newWatertank.nivel_minimo),
        })
    });
};

export const deleteWatertank = async (WTID) => {
    return await fetch(`${API_URL}${WTID}`, {
        method: 'DELETE',
    });
};


// Water Tank Levels //

export const getWatertankLevels = async () => {
    return await fetch(API_URL_Levels);
};

export const getWatertankLevel = async (WTID) => {
    return await fetch(`${API_URL_Levels}${WTID}`);
};

export const registerWatertankLevels = async (newWatertank) => {
    return await fetch(API_URL_Levels, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            "nivel_maximo":Number(newWatertank.nivel_maximo),
            "nivel_minimo":Number(newWatertank.nivel_minimo),
            "altura":Number(newWatertank.altura),
            "diametro":Number(newWatertank.diametro),
        })
    });
};

export const deleteWatertankLevels = async (WTID) => {
    return await fetch(`${API_URL_Levels}${WTID}`, {
        method: 'DELETE',
    });
};

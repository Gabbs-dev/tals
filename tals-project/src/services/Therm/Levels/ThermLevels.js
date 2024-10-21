const API_URL="http://127.0.0.1:8000/api/thermostat/levels/";

export const getLevelsList = async () => {
    return await fetch(API_URL);
};

export const getLevel = async (LevelID) => {
    return await fetch(`${API_URL}${LevelID}`);
};

export const registerLevel = async (newTimer) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            "dispositivo":String(newTimer.dispositivo).trim(),
            "temperatura_deseada":Number(newTimer.temperatura_deseada),
        })
    });
};

export const updateLevel = async (LevelID, updatedData) => {
    return await fetch(`${API_URL}${LevelID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    });
};

export const deleteLevel = async (LevelID) => {
    return await fetch(`${API_URL}${LevelID}`, {
        method: 'DELETE',
    });
};

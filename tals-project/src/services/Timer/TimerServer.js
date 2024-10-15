const API_URL="http://127.0.0.1:8000/api/timer/";

export const getTimersList = async () => {
    return await fetch(API_URL);
};

export const getTimer = async (TimerID) => {
    return await fetch(`${API_URL}${TimerID}`);
};

export const registertimer = async (newTimer) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            "dispositivo":String(newTimer.dispositivo).trim(),
            "horario_inicio":newTimer.horario_inicio,
            "horario_cierre":newTimer.horario_cierre,
        })
    });
};

export const updateTimer = async (TimerID, updatedData) => {
    return await fetch(`${API_URL}${TimerID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    });
};

export const deleteTimer = async (TimerID) => {
    return await fetch(`${API_URL}${TimerID}`, {
        method: 'DELETE',
    });
};

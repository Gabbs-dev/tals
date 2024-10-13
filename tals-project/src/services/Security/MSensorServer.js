const API_URL="http://127.0.0.1:8000/api/mSensors/";

export const getLastActivity = async () => {
    return await fetch(API_URL);
};

export const getActivity = async (ActID) => {
    return await fetch(`${API_URL}${ActID}`);
};
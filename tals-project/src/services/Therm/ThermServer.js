const API_URL="http://127.0.0.1:8000/api/thermostat/";

export const getLastThermostat = async () => {
    return await fetch(API_URL);
};

export const getTherm = async (ThermID) => {
    return await fetch(`${API_URL}${ThermID}`);
};

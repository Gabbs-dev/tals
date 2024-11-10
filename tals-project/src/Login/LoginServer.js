const API_URL= "http://127.0.0.1:8000/api/users/";

export const getUsers = async () => {
    return await fetch(API_URL);
};
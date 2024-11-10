const API_URL= "http://127.0.0.1:8000/api/login/";

export const Login = async (username,password) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        });
};
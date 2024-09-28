const API_URL="http://127.0.0.1:8000/api/users/";

export const listUsers = async () => {
    return await fetch(API_URL);
};

export const getUser = async (UserID) => {
    return await fetch(`${API_URL}${UserID}`);
};

export const registerUser = async (newUser) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            "nombre":String(newUser.nombre).trim(),
            "email":String(newUser.email).trim(),
            "password":String(newUser.password).trim(),
        })
    });
};

export const deleteUser = async (UserID) => {
    return await fetch(`${API_URL}${UserID}`, {
        method: 'DELETE',
    });
};
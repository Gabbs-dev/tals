const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

app.post('/enviar_comando', async (req, res) => {
    const comando = req.body.comando;

    try {
        const response = await axios.post("http://127.0.0.1:8000/api/ard_commands", {
            comando: comando
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al enviar el comando' });
    }
});

app.listen(port, () => {
    console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});
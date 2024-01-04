const express = require('express');

const app = express();

// Define el puerto que utilizará el servidor
const port = 3000;

// Crea el endpoint /api/v1/threads
app.get('/api/v1/threads', (req, res) => {
    res.send('Aquí están tus threads');
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`El servidor está corriendo en http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'rondas.json');

app.use(bodyParser.json());
app.use(express.static('public'));

// Carrega dados existentes
let rondasData = [];
if (fs.existsSync(DATA_FILE)) {
    rondasData = JSON.parse(fs.readFileSync(DATA_FILE));
}

// Rota para registrar ronda
app.post('/api/rondas', (req, res) => {
    const novaRonda = {
        ...req.body,
        timestamp: new Date().getTime()
    };
    
    rondasData.push(novaRonda);
    fs.writeFileSync(DATA_FILE, JSON.stringify(rondasData, null, 2));
    
    res.status(201).json(novaRonda);
});

// Rota para obter histórico
app.get('/api/rondas', (req, res) => {
    res.json(rondasData.sort((a, b) => b.timestamp - a.timestamp));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});



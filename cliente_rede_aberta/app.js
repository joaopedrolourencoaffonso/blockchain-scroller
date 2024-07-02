require('dotenv').config();
const express = require('express');

// Variáveis de ambiente
const app = express();
const port = process.env.SERVER_PORT;
const smartContractAddress = process.env.SMART_CONTRACT_ADDRESS;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

app.get('/publicar', (req, res) => {
    try {
        res.render('publicar', { enderecoDoContrato: smartContractAddress });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

app.get('/contractAddress', async (req, res) => {
    try {
        // Send the message as the response
        res.setHeader('Content-Type', 'application/json');
        res.send(`[{"endereco": "${smartContractAddress}"}]`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

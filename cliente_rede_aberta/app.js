require('dotenv').config();
const express = require('express');
const { Web3 } = require('web3');

// Variáveis de ambiente
const app = express();
const port = process.env.SERVER_PORT;
const blockchainAddress = process.env.ADDRESS;
const blockchainPort = process.env.PORT;
const smartContractAddress = process.env.SMART_CONTRACT_ADDRESS;

// Conectando com a rede
//const web3 = new Web3(`http://${blockchainAddress}:${blockchainPort}`);

// pegando a ABI do contrato
const fs = require('fs');
const jsonFile = '..\\hardhat\\artifacts\\contracts\\Scroller.sol\\Scroller.json'; // Adjust the path as needed
const parsed = JSON.parse(fs.readFileSync(jsonFile));
const contractABI = parsed.abi;

// Create contract instance
//const contract = new web3.eth.Contract(contractABI, smartContractAddress);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// http://localhost:3000/?param1=value1&param2=value2
// Define a route that renders the index.ejs template
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

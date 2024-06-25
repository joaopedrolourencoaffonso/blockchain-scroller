require('dotenv').config();
const express = require('express');
const { Web3 } = require('web3');

const app = express();
const port = 3000;

// Load environment variables
const blockchainAddress = process.env.ADDRESS;
const blockchainPort = process.env.PORT;
const smartContractAddress = process.env.SMART_CONTRACT_ADDRESS;

// Setup Web3 connection
const web3 = new Web3(`http://${blockchainAddress}:${blockchainPort}`);

// pegando a ABI do contrato
const fs = require('fs');
const jsonFile = '..\\hardhat\\artifacts\\contracts\\Scroller.sol\\Scroller.json'; // Adjust the path as needed
const parsed = JSON.parse(fs.readFileSync(jsonFile));
const contractABI = parsed.abi;

// Create contract instance
const contract = new web3.eth.Contract(contractABI, smartContractAddress);

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
})

app.get('/status', async (req, res) => {
    try {
        // Call the getMessage function
        const status = await contract.methods.getStatus().call();
        
        // Send the message as the response
        res.setHeader('Content-Type', 'application/json');
        res.send(`[{"status": "${status}"}]`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

app.get('/getid', async (req, res) => {
    try {
        // Call the getMessage function
        const id = await contract.methods.getId().call();
        
        // Send the message as the response
        res.setHeader('Content-Type', 'application/json');
        res.send(`[{"id": ${id}}]`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

app.get('/posts/:inicio/:fim', async (req, res) => {
    try {
        const inicio = parseInt(req.params.inicio);
        const fim = parseInt(req.params.fim);
        
        if (isNaN(inicio) || isNaN(fim) || inicio > fim || inicio < 0 || fim < 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(403).send(`[{"error": "Verifique sua requisicao. 'Inicio' e 'fim' nao podem ser menores que zero e 'inicio' deve ser menor que 'fim'"}]`);
        } else {
            // Call the retornaPost function
            const posts = await contract.methods.retornaPost(inicio,fim).call();
            
            // Convertendo BigInt em string para retornar como json
            const formattedPosts = posts.map(post => ({
                id: post.id.toString(),
                titulo: post.titulo,
                conteudo: post.conteudo
            }));

            // Send the message as the response
            res.setHeader('Content-Type', 'application/json');
            res.send(formattedPosts);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

app.get('/allPosts', async (req, res) => {
    try {
        // Call the getMessage function
        let events = await contract.getPastEvents('allEvents', {
            fromBlock: 0, // Start from the first block
            toBlock: 'latest' // Up to the latest block
        });

        let answerjson = '[';
        for (let event of events) {
            answerjson = answerjson + '{"id": "' + event['returnValues']['0'] + '","titulo": "' + event['returnValues']['titulo'] + '", "conteudo": "' + event['returnValues']['conteudo'] + '"},';
        }
        answerjson = answerjson.slice(0, -1) + ']';
        
        // Send the message as the response
        res.setHeader('Content-Type', 'application/json');
        res.send(answerjson);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

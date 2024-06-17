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

app.get('/status', async (req, res) => {
    try {
        // Call the getMessage function
        const message = await contract.methods.getStatus().call();
        
        // Send the message as the response
        res.send(`{"status": "${message}" }`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

app.get('/posts', async (req, res) => {
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

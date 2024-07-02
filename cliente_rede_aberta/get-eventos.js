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

// Function to get and print events
async function getEvents() {
    try {
        // Get all events from the smart contract
        const events = await contract.getPastEvents('allEvents', {
            fromBlock: 0, // Start from the first block
            toBlock: 'latest' // Up to the latest block
        });

        // Print all events to the console
        //console.log('Events:', events);
        for (let event of events) {
            console.log("id do post: ", event['returnValues']['0']);
            console.log("    titulo: ",event['returnValues']['titulo']);
            console.log("  conteudo: ",event['returnValues']['conteudo']);
            console.log("----");
        }
        
    } catch (error) {
        console.error('Error fetching events:', error);
    } finally {
        // Exit the script after fetching the events
        process.exit();
    }
}

// Execute the function to get and print events
getEvents();
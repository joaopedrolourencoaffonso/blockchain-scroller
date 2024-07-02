require('dotenv').config();
const express = require('express');
const { Web3 } = require('web3');

const app = express();
const port = 3000;

// Carregando variáveis de ambiente
const blockchainAddress = process.env.ADDRESS;
const blockchainPort = process.env.PORT;
const smartContractAddress = process.env.SMART_CONTRACT_ADDRESS;

// Inicializando conexão com a rede
const web3 = new Web3(`http://${blockchainAddress}:${blockchainPort}`);

// pegando a ABI do contrato
const fs = require('fs');
const jsonFile = '..\\hardhat\\artifacts\\contracts\\Scroller.sol\\Scroller.json';
const parsed = JSON.parse(fs.readFileSync(jsonFile));
const contractABI = parsed.abi;

// Cria nova instância do contrato
const contract = new web3.eth.Contract(contractABI, smartContractAddress);

// Função para pegar todos os eventos emitidos desde a inicialização do contrato
async function getEvents() {
    try {
        const events = await contract.getPastEvents('allEvents', {
            fromBlock: 0, // Inicia do primeiro bloco
            toBlock: 'latest' // Até o último bloco
        });

        // Printando os eventos
        for (let event of events) {
            console.log("id do post: ", event['returnValues']['0']);
            console.log("    titulo: ",event['returnValues']['titulo']);
            console.log("  conteudo: ",event['returnValues']['conteudo']);
            console.log("----");
        }
        
    } catch (error) {
        console.error('Error fetching events:', error);
    } finally {
        process.exit();
    }
}

getEvents();
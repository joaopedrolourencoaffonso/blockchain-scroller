//import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";

let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "primeiroAutor",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "titulo",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "conteudo",
        "type": "string"
      }
    ],
    "name": "PostEvent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "novoAutor",
        "type": "address"
      }
    ],
    "name": "addAutor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getStatus",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_titulo",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_conteudo",
        "type": "string"
      }
    ],
    "name": "publicaPost",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "inicio",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "fim",
        "type": "uint256"
      }
    ],
    "name": "retornaPost",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "titulo",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "conteudo",
            "type": "string"
          }
        ],
        "internalType": "struct Scroller.Post[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "novoStatus",
        "type": "string"
      }
    ],
    "name": "setStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function connectMetamask() {
  await provider.send("eth_requestAccounts",[]);

  signer = await provider.getSigner();

  console.log("Account Address = ", await signer.getAddress());
}

async function getBalance() {
  const balance = await signer.getBalance();
  const convertToEth = 1e18;
  console.log("Saldo em ether: ", balance.toString() / convertToEth);
}

async function enviarArtigo() {
  event.preventDefault();
  await connectMetamask();

  const title = document.getElementById('articleTitle').value;
  const articleContent = document.getElementById('articleContent').value;

  const contrato = new ethers.Contract(contractAddress, contractABI, provider);

  const tx = await contrato.connect(signer).publicaPost(title,articleContent);
  await tx.wait();

  console.log(tx);
}
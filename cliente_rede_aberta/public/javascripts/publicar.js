//import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";

let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer

let contractAddress;
let contractABI;


fetch('/contractAddress')
  .then(response => response.json())
  .then(data => {
    //console.log(data[0]['endereco']);
    contractAddress = data[0]['endereco']; // Assuming the ABI is an array or object
    // Now you can use the contractABI in your code
    //console.log(contractAddress);
  })
  .catch(error => {
    console.error('Error fetching contract ABI:', error);
  }
);

// Fetch the contract ABI from the URL
fetch('/json/contractABI.json')
  .then(response => response.json())
  .then(data => {
    contractABI = data; // Assuming the ABI is an array or object
    // Now you can use the contractABI in your code
    //console.log(contractABI);
  })
  .catch(error => {
    console.error('Error fetching contract ABI:', error);
  }
);

async function connectMetamask() {
  await provider.send("eth_requestAccounts",[]);

  signer = await provider.getSigner();
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
//const Web3 = require("web3")
let web3;
let contract;
let contractAddress;
let contractABI;

fetch('/contractAddress')
  .then(response => response.json())
  .then(data => {
    contractAddress = data[0]['endereco'];
  })
  .catch(error => {
    console.error('Error fetching contract address:', error);
  });
  
// Fetch contract ABI from server
fetch('/json/contractABI.json')
  .then(response => response.json())
  .then(data => {
    contractABI = data;
  })
  .catch(error => {
    console.error('Error fetching contract ABI:', error);
});

// Connect to MetaMask
async function connectMetamask() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error('User denied account access:', error);
    }
  } else {
    console.log('MetaMask is not installed!');
  }
}
  
// Send article function
async function enviarArtigo() {
  event.preventDefault();
  //await connectMetamask();
  
  //const accounts = await web3.eth.getAccounts();
  //const account = accounts[0];
  const account = "FUTURO PROGRESSO";
  
  const title = document.getElementById('articleTitle').value;
  const articleContent = document.getElementById('articleContent').value;
  
  contract = new web3.eth.Contract(contractABI, contractAddress);
  
  const txData = contract.methods.publicaPost(title, articleContent).encodeABI();
  
  const txParams = {
    from: account,
    to: contractAddress,
    data: txData,
    gas: 2000000, // Estimate the gas limit
    gasPrice: web3.utils.toWei('10', 'gwei') // Set the gas price
  };
  
  try {
    const signedTx = await web3.eth.accounts.signTransaction(txParams, 'FUTURO PROGRESSO');
    console.log('Signed Transaction:', signedTx);
    // You can send the signed transaction if you want
    // const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    // console.log('Transaction Receipt:', receipt);
  } catch (error) {
    console.error('Error signing transaction:', error);
  }
}
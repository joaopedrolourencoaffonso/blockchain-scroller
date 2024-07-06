let web3 = new Web3();
let contract;
let contractAddress;
let contractABI;
let NONCE;

// Fetch contract address from server
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

async function pegaNonce(address) {
  return new Promise((resolve, reject) => {
    fetch(`/nonce/${address}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        resolve(data.nonce); // Resolve the promise with nonce value
      })
      .catch(error => {
        reject(error); // Reject the promise with error
      });
  });
}

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

// Send signed transaction to server
async function enviarArtigo() {
  event.preventDefault();
  //await connectMetamask();

  //const accounts = await web3.eth.getAccounts();
  //const account = accounts[0];
  
  const title = document.getElementById('articleTitle').value;
  const articleContent = document.getElementById('articleContent').value;
  const privateKey = document.getElementById('chaveprivada').value;
  
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  
  NONCE = await pegaNonce(account.address);
  //console.log(NONCE);
  //const accounts = [account];
  //const publicKey = account.address;
  
  contract = new web3.eth.Contract(contractABI, contractAddress);
  
  const txData = contract.methods.publicaPost(title, articleContent).encodeABI();
  
  const txParams = {
    from: account.address,
    to: contractAddress,
    data: txData,
    gas: 2000000, // Estimate the gas limit
    gasPrice: web3.utils.toWei('10', 'gwei'), // Set the gas price
    chainId: 31337,
    nonce: NONCE
  };
  
  try {
    const signedTx = await web3.eth.accounts.signTransaction(txParams, privateKey);
    //console.log('Signed Transaction:', signedTx);
    
    // Send the signed transaction to the server
    fetch('/enviarArtigo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signedTx),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Transaction sent:', data);
    })
    .catch(error => {
      console.error('Error sending transaction:', error);
    });
  } catch (error) {
    console.error('Error signing transaction:', error);
  }
}
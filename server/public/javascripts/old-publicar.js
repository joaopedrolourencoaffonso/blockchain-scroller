// Initialise the page objects to interact with
const ethereumButton = document.querySelector('.enableEthereumButton');
const mandaPost = document.querySelector('.mandaPost');
const showAccount = document.querySelector('.showAccount');
const showChainId = document.querySelector('.showChainId');
// Initialise the active account and chain id
let activeAccount;
let activeChainId;

// Update the account and chain id when user clicks on button
ethereumButton.addEventListener('click', () => {
  getAccount();
  getChainId();
});

// Espera por um evento de envio de Post
mandaPost.addEventListener('click', () => {
  event.preventDefault();
  mandaPostFunction();
});

// Get the account in the window object
async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== activeAccount) {
    activeAccount = accounts[0];
  }
  showAccount.innerHTML = activeAccount;
}

// Get the connected network chainId
async function getChainId() {
    activeChainId = await ethereum.request({ method: 'eth_chainId' });
    showChainId.innerHTML = activeChainId;
}

//
async function mandaPostFunction() {
  console.log("aqui!");
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your contract address
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
window.ethereum // Or window.ethereum if you don't support EIP-6963.
  .request({
    method: "eth_sendTransaction",
    params: [
      {
        from: "0x1ebC2b0CA6a2cf716f6CFf0AB63BB5dF808852B2",
        to: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        gas: "0x76c", // 30400
        gasPrice: "0x9184e72a000", // 10000000000000
        value: "0x1000", // 2441406250
        data: "0x7075626C0000000000000000000000000000000000000000000000004F6C61204C7561210000000000000000000000000000000000000000000000004F6C61204C756121",
      },
    ]
  })
  .then((result) => {
    // The result varies by RPC method.
    // For example, this method returns a transaction hash hexadecimal string upon success.
  })
  .catch((error) => {
    // If the request fails, the Promise rejects with an error.
  });
  
  //const web3 = new Web3(window.ethereum);
  //const contract = new web3.eth.Contract(contractABI, contractAddress);
  //const tx = await contract.publicaPost("x", "y");
  //console.log("Transaction hash:", tx.hash);
}

// Update the selected account and chain id on change
ethereum.on('accountsChanged', getAccount);
ethereum.on('chainChanged', getChainId);


let provider = new ethers.providers.Web3Provider(window.ethereum);

// inicializando variáveis
let contractAddress;
let contractABI;
let id;
let inicio;
let fim;
let contrato;
let signer;

document.addEventListener('DOMContentLoaded', async (event) => {
    await iniciandoPagina();
});

async function iniciandoPagina() {
    try {
        const addressResponse = await fetch('/contractAddress');
        const addressData = await addressResponse.json();
        contractAddress = addressData[0]['endereco'];
        
        const abiResponse = await fetch('/js/contractABI.json');
        const abiData = await abiResponse.json();
        contractABI = abiData;

        contrato = new ethers.Contract(contractAddress, contractABI, provider);
        id = await contrato.getId();
        id = parseInt(id._hex.slice(2),16);
        inicio = id - 10;
        fim = id;

        if (id <= 10) {
            pegaPost(0,fim);
        } else { 
            pegaPost(inicio,fim);
        }
    } catch (error) {
        console.error('Erro durante a inicialização da página: ', error);
    }
}

async function pegaPost(inicio, fim) {
    const response = await contrato.retornaPost(inicio,fim);
    for (let i = response.length - 1; i > 0; i--) {

        const posts = document.getElementById('posts');
        const postDiv = document.createElement('div');
        postDiv.setAttribute('class', 'post-box');
        
        const title = document.createElement('h2');
        title.textContent = response[i]['titulo'];
        
        const content = document.createElement('p');
        content.innerHTML = response[i]['conteudo'];
        
        postDiv.appendChild(title);
        postDiv.appendChild(content);
        posts.appendChild(postDiv);

        const br = document.createElement('br');
        posts.appendChild(br)
    }
}

async function PegaMaisPosts() {
    fim = inicio;
    inicio = inicio - 5;

    if (inicio >= 0) {
        pegaPost(inicio, fim);
    } else if (fim >=0) {
        pegaPost(0, fim);
    }
}
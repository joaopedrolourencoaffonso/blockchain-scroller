require('dotenv').config();
const express = require('express');
const { Web3 } = require('web3');

const app = express();
const port = process.env.SERVER_PORT;

// Load environment variables
const blockchainAddress = process.env.ADDRESS;
const blockchainPort = process.env.PORT;
const smartContractAddress = process.env.SMART_CONTRACT_ADDRESS;
const path_do_contrato = process.env.path_do_contrato;

// Setup Web3 connection
const web3 = new Web3(`http://${blockchainAddress}:${blockchainPort}`);

// pegando a ABI do contrato
const fs = require('fs');
const contractABI = JSON.parse(fs.readFileSync(path_do_contrato));

// Cria nova instância do contrato
const contract = new web3.eth.Contract(contractABI, smartContractAddress);

// Configure engine de visualização para ejs
app.set('view engine', 'ejs');

// Configure diretório de onde pegar arquivos estáticos
app.use(express.static('public'));

// Página principal
app.get('/', (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

// rota para página para publicar novas matérias
app.get('/publicar', (req, res) => {
    try {
        res.render('publicar', { enderecoDoContrato: smartContractAddress });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

// rota para status do contrato (não do app.js, do contrato)
app.get('/status', async (req, res) => {
    try {
        const status = await contract.methods.getStatus().call();
        
        res.setHeader('Content-Type', 'application/json');
        res.send(`[{"status": "${status}"}]`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

// rota que retorna o endereço do contrato (para o caso do contrato for atualizado)
app.get('/contractAddress', async (req, res) => {
    try {
        // Send the message as the response
        res.setHeader('Content-Type', 'application/json');
        res.send(`[{"endereco": "${smartContractAddress}"}]`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

//rota que retorna o id mais alto atual
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

//rota que retorna os posts em ordem decrescente com base nos ids definidos `inicio` e `fim`
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

            res.setHeader('Content-Type', 'application/json');
            res.send(formattedPosts);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

// retorna todos os posts já publicados através de seus eventos
app.get('/allPosts', async (req, res) => {
    try {
        let events = await contract.getPastEvents('allEvents', {
            fromBlock: 0,
            toBlock: 'latest'
        });

        let answerjson = '[';
        for (let event of events) {
            answerjson = answerjson + '{"id": "' + event['returnValues']['0'] + '","titulo": "' + event['returnValues']['titulo'] + '", "conteudo": "' + event['returnValues']['conteudo'] + '"},';
        }
        answerjson = answerjson.slice(0, -1) + ']';
        
        res.setHeader('Content-Type', 'application/json');
        res.send(answerjson);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

//inicializa o servidor
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

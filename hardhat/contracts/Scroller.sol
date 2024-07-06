// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Scroller {
    uint256 internal id;
    string internal status;
    mapping(uint256 => Post) internal mappingPosts;
    mapping(address => bool) internal mappingAutores;
    event PostEvent(uint256 indexed, string titulo, string conteudo);

    struct Post {
        uint256 id;
        string titulo;
        string conteudo;
    }

    constructor(address primeiroAutor) {
        mappingAutores[primeiroAutor] = true;
        status = "Em Operacao";
        id = 0;
    }

    function getStatus() public view returns (string memory) {
        return status;
    }

    function setStatus(string calldata novoStatus) public {
        require(mappingAutores[msg.sender], "Endereco nao cadastrado como autor");
        status = novoStatus;
    }

    function publicaPost(string calldata _titulo, string calldata _conteudo) external {
        require(mappingAutores[msg.sender], "Endereco nao cadastrado como autor");
        id += 1;
        emit PostEvent(id,_titulo,_conteudo);
        mappingPosts[id] = Post(id,_titulo,_conteudo);
    }

    function retornaPost(uint256 inicio, uint256 fim) public view returns (Post[] memory) {
        require(inicio <= fim, "Inicio nao pode ser maior que o fim");
        require(fim <= id, "Fim maior que o numero de posts");

        uint256 numPosts = fim - inicio + 1;
        Post[] memory posts = new Post[](numPosts);
        
        for (uint256 i = 0; i < numPosts; i++) {
            posts[i] = mappingPosts[inicio + i];
        }
        
        return posts;
    }

    function getId() public view returns (uint256) {
        return id;
    }

    function addAutor(address novoAutor) external {
        require(mappingAutores[msg.sender], "Endereco nao cadastrado como autor");

        mappingAutores[novoAutor] = true;
    }
}
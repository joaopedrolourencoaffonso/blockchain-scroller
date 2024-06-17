// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Scroller {
    uint256 internal id;
    string internal status;
    mapping(address => bool) internal mappingAutores;
    event Post(uint256 indexed, string titulo, string conteudo);

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
        emit Post(id,_titulo,_conteudo);
    }
}
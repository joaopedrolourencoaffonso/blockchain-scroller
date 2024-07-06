# Contrato Inteligente Scroller

## Visão geral

O contrato inteligente Scroller é um aplicativo descentralizado que permite que usuários autorizados publiquem e recuperem postagens no blockchain Ethereum. Gerencia uma lista de postagens e garante que apenas autores autorizados possam publicar novas postagens ou alterar o status do contrato.

## Características

- **Gerenciamento de postagens**: crie e armazene postagens com ID, título e conteúdo exclusivos.
- **Gerenciamento de status**: Defina e recupere o status do contrato.
- **Sistema de Autorização**: Somente endereços autorizados podem publicar postagens ou alterar o status.
- **Emissão de Evento**: Emite um evento sempre que uma nova postagem é criada.
- **Recuperação de postagens**: recupere uma série de postagens por seus IDs.
- **Gerenciamento de autores**: adicione novos autores que podem publicar postagens e gerenciar o status do contrato.

## Detalhes do contrato

### Variáveis ​​de Estado

- `uint256 internal id`: O contador de ID do post atual.
- `string internal status`: O status atual do contrato.
- `mapping(uint256 => Post) internal mappingPosts`: Um mapeamento do ID do post para os detalhes do post.
- `mapping(address => bool) internal mappingAutores`: Um mapeamento para rastrear autores autorizados.

### Estruturas

- `struct Post`: Representa um post com as seguintes propriedades:
 - `uint256 id`: O ID exclusivo da postagem.
 - `string titulo`: O título do post.
 - `string conteudo`: O conteúdo do post.

### Construtor

- `constructor(address primeiroAutor)`: Inicializa o contrato definindo o primeiro autor e o status inicial. O primeiro autor é adicionado ao `mappingAutores`.

### Eventos

- `event PostEvent(uint256 indexed, string titulo, string conteudo)`: Emitido quando um novo post é criado.

### Funções

- `getStatus() retornos de visualização pública (memória de string)`: Retorna o status atual do contrato.
- `setStatus(string calldata novoStatus) public`: Define um novo status para o contrato. Somente pode ser chamado por autores autorizados.
- `publicaPost(string calldata _titulo, string calldata _conteudo) external`: Publica um novo post com o título e conteúdo fornecidos. Somente pode ser chamado por autores autorizados.
- `retornaPost(uint256 inicio, uint256 fim) public view return (Post[] memory)`: Retorna um intervalo de posts por seus IDs.
- `getId() public view return (uint256)`: Retorna o contador de ID da postagem atual.
- `addAutor(address novoAutor) external`: Adiciona um novo autor à lista de autores autorizados. Somente pode ser chamado por autores autorizados existentes.

## Uso

### Implantação

Implante o contrato fornecendo o endereço do primeiro autor:

```solidez
Scroller scroller = new Scroller(firstAuthorAddress);
```

### Interagindo com o Contrato

1. **Verificar status**:
 ```solidez
 string memória currentStatus = scroller.getStatus();
 ```

2. **Definir status**:
 ```solidez
 scroller.setStatus("Novo Status");
 ```

3. **Publicar uma postagem**:
 ```solidez
 scroller.publicaPost("Título", "Conteúdo");
 ```

4. **Recuperar postagens**:
 ```solidez
 Scroller.Post[] postagens de memória = scroller.retornaPost(startId, endId);
 ```

5. **Obter ID da postagem atual**:
 ```solidez
 uint256 currentId = scroller.getId();
 ```

6. **Adicionar um novo autor**:
 ```solidez
 scroller.addAutor(newAuthorAddress);
 ```

## Considerações de segurança

O `Scroller.sol` foi criado como um exercício para aprimorar conhecimentos e Solidity e da criação de Dapps capazes de interagir com o mesmo, sendo assim, não foram realizados testes ou auditoria de possíveis vulnerabilidades do contrato. 

**Não utilize** em ambiente de produção sem testar antes.

## Licença

Este contrato está licenciado sob a licença MIT
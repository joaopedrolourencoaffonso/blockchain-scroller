# blockchain-scroller

Um pequneo aplicativo de blog baseado em blockchain criado como um projeto pessoal para se familiarizar com as tecnologias do mercado. Está disponível em duas versões, uma para rede aberta, no qual o servidor simplesmente provê os arquivos e o usuário interage diretamente com a rede, e um para redes fechadas, no qual o servidor age como um proxy entre o usuário e a rede.

## Status

Concluído. O aplicativo é capaz de:

- requisitar posts do smart contract e listar para o usuário leigo
- Conectar com a metamask e permitir que autores publiquem novos posts

O aplicativo vêem em duas versões: uma para [redes abertas](./cliente_rede_aberta/) (a qual age como um provedor dos arquivos que o cliente efetivamente usa para interagir com a rede) e outra para [redes fechadas](./cliente_rede_fechada/), a qual age como um _proxy_ entre o cliente e a rede.

## Caso de Uso

Como o nome do contrato sugere: `Scroller.sol` foi elaborado com base em redes sociais onde o usuário "_rola_" ("_scrolls_") a tela para visualizar conteúdo, mais especificamente, o contrato se refere a uma aplicações de notíciais, na qual os autores do post podem redigir uma matéria na aba "publicar" e pagar por sua publicação utilizando a metamask (rede aberta) ou provendo sua chave privada (rede fechada).

Não foram implementados mecanismos para aceitar pagamentos, uma vez que estes ultrapassariam o propósito lúdico do projeto, mas é um ponto de desenvolvimento a se considerar no futuro.

## Considerações de Segurança

O presente projeto foi elaborado como um trabalho lúdico com o objetivo de praticar conhecimentos de Soldity, `ethers.js`, `web3.js` e de blockchain assim como um todo pela tentativa e erro. Consequentemente, não foram realizados testes de segurança nem foram tomadas medidas quanto a otimização de execução do código em termos de uso de gas ou recursos computacionais (no caso do servidor).

**Não utilize** nenhum dos códigos aqui disponibilizados em ambiente de produção sem testar antes.

Adicionalmente, destaca-se que o presente projeto foi desenvolvido no sistema Windows 11, portanto, o path dos arquivos está com "/" ao invés do "\" do Linux, se for executar, edite os paths do arquivo.

## Agradecimentos

- Foto de plano de fundo do aplicativo disponibilizada pela <a href="https://unsplash.com/pt-br/@nasa?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">NASA</a> na <a href="https://unsplash.com/pt-br/fotografias/foto-do-espaco-sideral-Q1p7bh3SHj8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
- [Aw Kai Shin](https://medium.com/@kaishinaw?source=post_page-----99c155c56665--------------------------------) obrigado pelo excelente tutorial sobre uso do SDK da metamask: https://medium.com/@kaishinaw/connecting-metamask-to-your-web-application-express-99c155c56665
- [Viktor on Web3](https://www.youtube.com/watch?v=x61ntVrOz_c), obrigado pelo excelente tutorial sobre como usar o ether.js e associá-lo a metamask.
- [Jake Warren](https://medium.com/@thelasthash/solved-nonce-too-high-error-with-metamask-and-hardhat-adc66f092cd), obrigado pela ajuda com o erro de "_nonce too high_".



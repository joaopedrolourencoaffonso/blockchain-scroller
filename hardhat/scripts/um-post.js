const hre = require("hardhat");
const { expect } = require("chai");

async function main() {
  try {
    let titulo = "Tragédia no Polo Norte: Papai Noel Morre abatido por Artilharia Anti-aérea";
    let conteudo = `
Polo Norte, 22 de junho de 2024 - Em um trágico e inesperado evento que abalou o mundo, Papai Noel, a icônica figura natalina, foi abatido por artilharia antiaérea enquanto sobrevoava uma região remota do Ártico. A notícia chocante foi confirmada pelas autoridades do Polo Norte na manhã deste sábado.
<br>
De acordo com testemunhas, o trenó do Papai Noel, carregado com presentes destinados a crianças de todo o mundo, foi atingido por uma série de projéteis antiaéreos de origem desconhecida. O incidente ocorreu em pleno voo, causando a queda do trenó e resultando na morte instantânea do bom velhinho. Os detalhes ainda são escassos, mas fontes internas afirmam que o ataque foi deliberado e bem coordenado.
<br>
O Conselho de Segurança do Polo Norte se reuniu imediatamente após o ataque e emitiu um comunicado oficial prometendo uma resposta firme e decisiva. "Não descansaremos até que os responsáveis por este ato covarde sejam levados à justiça," declarou o chefe de segurança do Polo Norte, Frosty o Boneco de Neve. "Este ataque não ficará impune. Estamos determinados a proteger o legado do Papai Noel e garantir que o espírito natalino continue a brilhar."
<br>
Especulações sobre a autoria do ataque começaram a surgir, com várias teorias apontando para grupos anti-natalinos que há anos têm promovido ações contra a celebração do Natal. O Polo Norte já iniciou uma investigação intensiva para identificar os culpados e está coordenando esforços com forças de segurança internacionais.
<br>
Enquanto isso, os habitantes do Polo Norte estão em luto profundo, com homenagens sendo realizadas em todo o reino gelado. As fadas do inverno, os elfos e até mesmo as renas expressaram seu pesar e indignação. "Perdemos um líder, um amigo e uma figura que simboliza a alegria e a esperança para milhões de crianças ao redor do mundo," disse Rudolph, a rena de nariz vermelho, visivelmente emocionado.
<br>
O ataque contra Papai Noel marca um ponto de virada na segurança do Polo Norte, e medidas de proteção mais rigorosas estão sendo implementadas para garantir que tal tragédia nunca mais aconteça. A comunidade global, por sua vez, uniu-se em solidariedade, com mensagens de apoio e condolências vindo de todos os cantos do planeta.
<br>
Enquanto o Polo Norte prepara sua resposta, uma coisa é certa: o espírito de Papai Noel viverá nos corações de todos que acreditam na magia do Natal. E, como bem disse um dos elfos mais antigos, "Podem ter abatido o trenó, mas jamais conseguirão destruir o que o Papai Noel representa."
<br>
<img src='https://images.unsplash.com/photo-1500252185289-40ca85eb23a7?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>

Foto de <a href="https://unsplash.com/pt-br/@uxgun?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">UX Gun</a> na <a href="https://unsplash.com/pt-br/fotografias/seis-cacas-5Mj4PO7KIFc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
`

    const Contrato = await ethers.getContractFactory("Scroller");
    const contrato = await Contrato.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // Adiciona eleitor
    let approveTx;

    approveTx = await contrato.publicaPost(titulo,conteudo);
    approveTx.wait();
    

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  process.exit(0);
}

main();
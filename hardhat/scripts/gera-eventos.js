const hre = require("hardhat");
const { expect } = require("chai");

async function main() {
  try {
    const Contrato = await ethers.getContractFactory("Scroller");
    const contrato = await Contrato.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // Adiciona eleitor
    let approveTx;

    for (let i = 1; i <= 50; i++) {
      approveTx = await contrato.publicaPost("post " + i,"conteudo");
      approveTx.wait();
      console.log(`Post nº ${i} publicado.`);
    }
    

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  process.exit(0);
}

main();
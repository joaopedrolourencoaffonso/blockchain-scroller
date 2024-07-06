// scripts/deploy-banner.js
require('dotenv').config();
const meuEndereco = process.env.MEUENDERECO;
const { ethers } = require("hardhat");

async function main() {
  const Contrato = await ethers.getContractFactory("Scroller");
  const contrato = await Contrato.deploy("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

  console.log("Contrato deployado em:", contrato.target);

  const contrato2 = await Contrato.attach(contrato.target);
  approveTx = await contrato2.addAutor(meuEndereco);//conta da metamask
  approveTx.wait();
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
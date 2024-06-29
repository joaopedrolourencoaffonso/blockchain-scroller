// scripts/deploy-banner.js

const { ethers } = require("hardhat");

async function main() {
  const Contrato = await ethers.getContractFactory("Scroller");
  const contrato = await Contrato.deploy("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

  console.log("Contrato deployado em:", contrato.target);

  const contrato2 = await Contrato.attach(contrato.target);
  approveTx = await contrato2.addAutor("0x1ebC2b0CA6a2cf716f6CFf0AB63BB5dF808852B2");//conta da metamask
  approveTx.wait();
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
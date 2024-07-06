// transferEth.js
const { ethers } = require("hardhat");
require('dotenv').config();
const meuEndereco = process.env.MEUENDERECO;

async function main() {
  try {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Transfer 100 ETH to the specified address
    const recipientAddress = meuEndereco;
    const valueInWei = ethers.parseEther("100"); // Convert ETH to Wei

    const tx = await deployer.sendTransaction({
      to: recipientAddress,
      value: valueInWei,
    });

    console.log("Transaction hash:", tx.hash);
    console.log("Transfer successful!");
  } catch (error) {
    console.error("Error transferring ETH:", error);
  }
}

main();

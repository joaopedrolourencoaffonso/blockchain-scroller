// transferEth.js
const { ethers } = require("hardhat");

async function main() {
  try {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Transfer 100 ETH to the specified address
    const recipientAddress = "0x1ebC2b0CA6a2cf716f6CFf0AB63BB5dF808852B2";
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

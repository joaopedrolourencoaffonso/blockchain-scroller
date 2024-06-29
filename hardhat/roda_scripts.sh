#!/bin/sh

npx hardhat run .\scripts\deploy-Scroller.js --network localhost;

npx hardhat run .\scripts\gera-eventos.js --network localhost;

npx hardhat run .\scripts\um-post.js --network localhost;

npx hardhat run .\scripts\transfere-eth.js --network localhost;
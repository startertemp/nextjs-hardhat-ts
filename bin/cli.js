#!/usr/bin/env node

// Dependacy
const { execSync } = require("child_process");

// Get Folder name
const repoName = process.argv[2] || "my-app";

// Run command and pass true to return with error
const runCommand = (command, error=true) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    if(error) {
      console.error('\x1b[31m%s\x1b[0m',`Failed to execute ${command} : ${e}`);
    }
    return false;
  }
  return true;
};

// Git Clone Link
const gitCheckoutCommand = `git clone --dept 1 https://github.com/startertemp/nextjs-hardhat-ts ${repoName}`;

//* INSTALLATION PROCEDURE
// Cloning Project
console.log("\x1b[34m%s\x1b[0m",`----- Downloading project template to ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(1);


// Installation of Package : PNPM
console.log("\x1b[34m%s\x1b[0m",`----- Checking if pnpm exits`);
const pnpmExist = runCommand(`pnpm -v`, false);
if(!pnpmExist) {
  console.log("\x1b[31m%s\x1b[0m",`----- Pnpm does not exist. Installing pnpm`);
  const installPnpm = runCommand(`npm i -g pnpm`);
  if (!installPnpm) process.exit(1);
}else {
  console.log("\x1b[32m%s\x1b[0m",`----- Pnpm exists. Moving on.`);
}
const pnpmPeer = runCommand(`pnpm config set auto-install-peers true`);
if (!pnpmPeer) process.exit(1);


// Installing the Front-end dependacies
console.log("\x1b[34m%s\x1b[0m",`----- Installing Frontend dependancies`);
const installFDeps1 = runCommand(`cd ${repoName}/frontend && pnpm install -D @testing-library/jest-dom @testing-library/react @types/node @types/react @types/react-dom @typescript-eslint/eslint-plugin @typescript-eslint/parser autoprefixer eslint eslint-config-next eslint-config-prettier jest jest-environment-jsdom postcss prettier tailwindcss typescript @mui/material @emotion/react @emotion/styled`);
const installFDeps2 = runCommand(`cd ${repoName}/frontend && pnpm install daisyui ethers next next-seo notistack react react-dom web3modal`);
if (!installFDeps1 && !installFDeps2) process.exit(1);

// Installing backend dependancies
console.log("\x1b[34m%s\x1b[0m",`----- Installing Backend dependancies`);
const installBDeps1 = runCommand(`cd ${repoName}/backend && pnpm install -D hardhat @nomicfoundation/hardhat-toolbox typescript ts-node chai @types/node @types/mocha @types/chai @nomicfoundation/hardhat-chai-matchers @nomicfoundation/hardhat-network-helpers @nomiclabs/hardhat-etherscan typechain @typechain/hardhat @typechain/ethers-v5 @nomiclabs/hardhat-ethers @nomiclabs/hardhat-waffle ethereum-waffle hardhat-gas-reporter solidity-coverage ethers @ethersproject/providers`);
const installBDeps2 = runCommand(`cd ${repoName}/backend && pnpm install @openzeppelin/contracts dotenv`);
if (!installBDeps1 && !installBDeps2) process.exit(1);

// Clearing out installation files
console.log("\x1b[34m%s\x1b[0m",`----- Clearing out Installation Directories`);
const clearBin = runCommand(`cd ${repoName} && rm -rf bin`);
const clearPackage = runCommand(`cd ${repoName} && rm -fv package.json`);
const clearGithub = runCommand(`cd ${repoName} && rm -rf .github`);
const clearGit = runCommand(`cd ${repoName} && rm -rf .git`);
const clearCOC = runCommand(`cd ${repoName} && rm -fv CODE_OF_CONDUCT.md`);
const clearC = runCommand(`cd ${repoName} && rm -fv CONTRIBUTING.md`);
const clearL = runCommand(`cd ${repoName} && rm -fv LICENSE`);
if (!clearBin && !clearPackage && !clearGithub && !clearCOC && !clearC && !clearL && !clearGit) process.exit(1);

// Creating new Git
console.log("\x1b[34m%s\x1b[0m",`----- Creating a new Git`);
const newGit = runCommand(`cd ${repoName} && git init`);
if (!newGit) process.exit(1);

// Successfully Installed
console.log('\x1b[32m%s\x1b[0m',`------ Successfully Installed All!`);

// Guide on how to proceed
console.log(`cd frontend && pnpm dev`);

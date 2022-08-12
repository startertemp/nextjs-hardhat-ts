import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      url: process.env.ALCHEMY_API_KEY_URL,
      accounts: [process.env.MUMBAI_PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_KEY as string,
    },
  },
};

export default config;

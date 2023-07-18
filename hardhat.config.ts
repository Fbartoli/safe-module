import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  // Placeholder values are necessary for build and testing steps, as env values are not accessible
  // and Hardhat panics if they are undefined
  networks: {
    goerli: {
      url: process.env.ETHEREUM_RPC_URL || "https://placeholder.com",
      accounts: [process.env.ETHEREUM_PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000001"],
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY || ""
    },
  },
};

export default config
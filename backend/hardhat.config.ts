import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/K4b6icJh2jmCd-AmNO3Fi6uVRvVLCa6j',
      accounts: [
        'd794aeb0e2336dd14d3b98cbb2cd9525c818781dade4a09a418c27dac85b4e72',
      ],
    },
  },
};

export default config;

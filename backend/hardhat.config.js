require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
      hardhat: {
          chainId: 31337,
          // gasPrice: 130000000000,
      },
  
  },
  solidity: {
      compilers: [
          {
              version: "0.8.7",
          },
          {
              version: "0.6.6",
          },
      ],
  },
  namedAccounts: {
      deployer: {
          default: 0, // by default take the first account as deployer
      },
  },
}

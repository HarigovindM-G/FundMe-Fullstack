require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("./task/Block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")

/** @type import('hardhat/config').HardhatUserConfig */

GAN_URL = process.env.GAN_URL || "url"
GAN_PRIVATE_KEY = process.env.GAN_PRIVATE_KEY || "key"
SEP_URL = process.env.SEP_URL || "url"
SEP_PRIVATE_KEY = process.env.SEP_PRIVATE_KEY || "key"
ETHSCAN_API_KEY = process.env.ETHSCAN_API_KEY || "key"
COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        ganache: {
            url: GAN_URL,
            accounts: [GAN_PRIVATE_KEY],
            chainId: 1337,
        },
        sepolia: {
            url: SEP_URL,
            accounts: [SEP_PRIVATE_KEY],
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // Account will be automatically chosen by Hardhat
            chainId: 31337,
        },
    },
    solidity: "0.8.7",
    etherscan: {
        apiKey: ETHSCAN_API_KEY,
    },
    gasReporter: {
        enable: false,
        outputFile: "gas-report.txt",
        currency: "INR",
        // coinmarketcap:COINMARKETCAP_API_KEY,
        // token:MATIC,
    },
}

//imports
require("dotenv").config()
const { ethers, run, network } = require("hardhat")
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deploymentTransaction().wait(1)

    const contractAddr = await simpleStorage.target

    console.log(`Contract deloyed at address : ${contractAddr}`)
    // console.log(network.config.chainId)
    // The chainID 31337 is Hardhat Virtual Machine
    if (
        network.config.chainId != 31337 &&
        network.config.chainId != 1337 &&
        process.env.ETHSCAN_API_KEY
    ) {
        await simpleStorage.deploymentTransaction().wait(6)
        await verify(contractAddr, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current favoutrite number : ${currentValue}`)

    const transactionResponse = await simpleStorage.store(6)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()

    console.log(`Current favoutrite number : ${updatedValue}`)

}

async function verify(contractAddress, args) {
    console.log("Verifing the contract ...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already been verified")) {
            console.log("Already verified")
        } else {
            console.log(error)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })

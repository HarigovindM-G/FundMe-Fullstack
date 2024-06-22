const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

// we can use grep in the terminal to call only requried test or use it.only
describe("SimpleStorage", () => {
    let SimpleStorageFactory, simpleStorage

    beforeEach(async () => {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("It should be initialized to zero", async () => {
        const initialValue = await simpleStorage.retrieve()
        const expectedVallue = "0"

        // We can use assert and expect keyword from chai

        assert.equal(initialValue.toString(), expectedVallue)
    })

    it("It should update when we call store", async () => {
        const transactionResponse = await simpleStorage.store("5")
        await transactionResponse.wait(1)

        const number = await simpleStorage.retrieve()
        const expectedNumber = "5"

        assert.equal(number.toString(), expectedNumber)
    })

    it("It should work when we addPerson", async () => {
        const transactionResponse = await simpleStorage.addPerson("Hari", "25")
        await transactionResponse.wait(1)

        const person = await simpleStorage.people(0)
        assert(person.name, "Hari")
        assert(person.fav_num_,"25")

        const storedNumber = await simpleStorage.persontonum("Hari")
        assert(storedNumber,"25")
    })
})

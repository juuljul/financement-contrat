const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FinanceContrat", function () {
          let financeContrat
          let mockV3Aggregator
          let deployer
          const sendValue = ethers.utils.parseEther("1")
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              financeContrat = await ethers.getContract("FinanceContrat", deployer)
              mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
          })

          describe("constructor", function () {
              it("correct aggregator address", async () => {
                  const response = await financeContrat.getPriceAggregator()
                  assert.equal(response, mockV3Aggregator.address)
              })
          })

          describe("fund", function () {
            it("echec si pas assez de ETH", async () => {
                await expect(financeContrat.fund()).to.be.revertedWith(
                    "Pas assez de ETH pour le contrat!"
                )
            })
            it("met a jour le mapping d adresses", async () => {
                await financeContrat.fund({ value: sendValue })
                const response = await financeContrat.getAmountFromAddress(
                    deployer
                )
                assert.equal(response.toString(), sendValue.toString())
            })
        })
      })

const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("ERC721Basic", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployERC721BasicFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, stranger] = await ethers.getSigners();

    const ERC721Basic = await ethers.getContractFactory("ERC721Basic");
    const erc721Basic = await ERC721Basic.deploy();

    return { erc721Basic, owner, stranger };
  }

  describe("Gas report", function () {
    it("Mint 10 NFT one by one", async function () {
      const { erc721Basic, owner, stranger } = await loadFixture(deployERC721BasicFixture);

      for (let i = 0; i < 10; i++) {
        const tx = await erc721Basic.safeMint(owner.address, i);
        await tx.wait()
      }

      for (let i = 0; i < 10; i++) {
        const tx = await erc721Basic.transferFrom(owner.address, stranger.address, i);
        await tx.wait()
      } 

      for (let i = 0; i < 10; i++) {
        const tx = await erc721Basic.connect(stranger).burn(i);
        await tx.wait()
      } 

    });
  });

  
});

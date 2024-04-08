const hre = require("hardhat");

async function main() {
  const DecentTweet = await hre.ethers.getContractFactory("DecentTweet");
  const decentTweet = await DecentTweet.deploy();

  await decentTweet.waitForDeployment();
//   await decentTweet.deployed();
  console.log(decentTweet.target);
//   console.log("Decent tweet deployed to:", decentTweet.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
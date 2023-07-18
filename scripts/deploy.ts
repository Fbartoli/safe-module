import * as hre from "hardhat";
async function main() {
  const accounts = await hre.ethers.getSigners();
  const contract = await hre.ethers.deployContract("SocialRecovery", [accounts[0].address]);
  console.log(`Deployer address ${accounts[0].address}`)

  const deployedContract = await contract.waitForDeployment();
  await new Promise((resolve) => setTimeout(resolve, 15000));
  await hre.run("verify:verify", {
    address: await deployedContract.getAddress(),
    constructorArguments: [accounts[0].address]
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import * as hre from "hardhat";

async function main() {
  // const accounts = await ethers.getSigners();
  // const contract = await ethers.deployContract("SocialRecovery", [accounts[0].address]);
  // console.log(`Deployer address ${accounts[0].address}`)

  // const deployedContract = await contract.waitForDeployment();
  await new Promise((resolve) => setTimeout(resolve, 15000));
  await hre.run("verify:verify", {
    address: '0x18117Fe4369B9abB3C912A0F569B68B3BaE8F3Bb',
    // contract: qualifiedName[BaseOperators],
    constructorArguments: ['0x78da4fF1DA98034d3BA830785eB4B17551eFAb71']
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

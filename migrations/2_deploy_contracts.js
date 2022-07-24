const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function(deployer) {
  await deployer.deploy(Token);
  token = await Token.deployed();

  await deployer.deploy(EthSwap, token.address);
  ethSwap = await EthSwap.deployed();

  await token.transfer(ethSwap.address, '1000000000000000000000000');
};


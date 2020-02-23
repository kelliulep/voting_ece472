var Election = artifacts.require("./Election.sol");

// deploy with 1 proposal to local blockchain
module.exports = function(deployer) {
  deployer.deploy(Election);   
};
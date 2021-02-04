const Production = artifacts.require("Production");

module.exports = function (deployer) {
  deployer.deploy(Production);
};

// simulate client side interactions
// use Mocha and chai

var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {

    it("initializes with two candidates", function() {
        return Election.deployed().then(function (instance) {
            return instance.candidatesCount();
        }).then(function(count) {
            assert.equal(count,2);  // from chai
        });
    });

    it("initializes the candidates with the correct values", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;    // get instance
            return electionInstance.candidates(1);
        }).then(function(candidate) {
            assert.equal(candidate[0], 1, "contains correct id");
            assert.equal(candidate[2], 0, "contains no votes");
            return electionInstance.candidates(2);
        }).then(function(candidate) {
            assert.equal(candidate[0], 2, "contains correct id");
            assert.equal(candidate[2], 0, "contains no votes");
        });
    });

});
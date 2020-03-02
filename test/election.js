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

    it("allows a voter to cast a vote", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            candidateId = 1;   
            return electionInstance.vote(candidateId, { from: accounts[0] });
        }).then(function(receipt) {
            return electionInstance.voters(accounts[0]);
        }).then(function(voted) {
            assert(voted, "the voter was marked as voted");
            return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
            var voteCount = candidate[2];
            assert.equal(voteCount, 1, "increments the candidate's vote count");
        })
    });

    // it("throws an exception for invalid candidates", function() {
    //     return Election.deployed().then(function(instance) {
    //       electionInstance = instance;
    //       return electionInstance.vote(99, { from: accounts[1] })   // cannot vote for 99th candidate
    //     }).then().catch(function(error) {
    //     //   assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
    //       return electionInstance.candidates(1);
    //     }).then(function(candidate1) {
    //       var voteCount = candidate1[2];
    //       assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
    //       return electionInstance.candidates(2);
    //     }).then(function(candidate2) {
    //       var voteCount = candidate2[2];
    //       assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
    //     });
    //   });

    // not working right now and kind of a messed up version of the example! 
    //   it("throws an exception for double voting", function() {
    //     return Election.deployed().then(function(instance) {
    //       electionInstance = instance;
    //       candidateId = 0;
    //       electionInstance.vote(candidateId, { from: accounts[1] });
    //       return electionInstance.candidates(candidateId);
    //     }).then(function(candidate) {
    //         var voteCount = candidate[0];
    //         assert.equal(voteCount, 1, "accepts first vote");
    //         return candidate;
    //     }).then(async (candidate) => {

    //       // Try to vote again
    //       try {
    //         await electionInstance.vote(0, { from: accounts[1] });
    //       } catch(error) {
    //         assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
    //       }
    //       return electionInstance.candidates(1);
    //     }).then(function(candidate1) {
    //       var voteCount = candidate1[2];
    //       assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
    //       return electionInstance.candidates(2);
    //     }).then(function(candidate2) {
    //       var voteCount = candidate2[2];
    //       assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
    //     });
    //   });

      // Adds 1 more candidate to list 
      it("correctly registers candidate", function() {
        return Election.deployed().then(function(instance) {
            election = instance;
            // should be from admin account
            election.adminAddCandidate("Candidate 3", {from: accounts[0]});
            return instance.candidatesCount();
        }).then(function(count) {
            assert.equal(count,3);  // from chai
        })
      });


    //Tries to Add 1 more candidate to list 
    it("throws exception when non admin tries to add", function() {
        return Election.deployed().then(async (instance) => {
            election = instance;
            try {
                await election.adminAddCandidate("Candidate 3", {from: accounts[3]});
            } 
            // Returned error message should begin with "VM Exception while processing transaction: revert"
            catch(error) {
                assert(error.message.indexOf('revert') >= 0, "Error message should contain 'revert'");
            }
            return instance.candidatesCount();
        }).then(function(count) {
            assert.equal(count, 3, "Did not add candidate"); 
        })
    });




});
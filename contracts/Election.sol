pragma solidity >=0.4.2 <0.6.0;
/// https://www.dappuniversity.com/articles/the-ultimate-ethereum-dapp-tutorial

contract Election {

    struct Candidate {
        uint id;        // 0
        string name;    // 1
        uint voteCount; // 2
    }

    address public admin;

    // Store Candidates
    // Like a hash with key value pair
    mapping(uint => Candidate) public candidates;
    // Keep track of number of candidates (also for iteration)
    uint public candidatesCount;

     // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    // accounts that voted
    mapping(address => bool) public voters;

    // Constructor
    // function Election () public {
    constructor() public {
        admin = msg.sender; // make the deployer of the contract the admin
        // addCandidate("Candidate 1");
        // addCandidate("Candidate 2");
    }

    // admin adds candidate to the Candidate mapping
    function adminAddCandidate(string memory _name) public {
        require(msg.sender == admin, "Only admin can add candidates");
        addCandidate(_name);
    }

    // Adds Candidate to Election
    function addCandidate(string memory _name) private {
        candidatesCount++;   // represents id
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    // allows to vote
    function vote(uint _candidateId) public {
        // require they have not voted
        require(!voters[msg.sender], "double voting");   //account not in voters mapping

        // require valid candidate
        require(_candidateId > 0 && _candidateId < candidatesCount,"invalid candidate");

        // voter has voted (one user, one vote)
        voters[msg.sender] = true;

        // increase candidate's voteCount
        candidates[_candidateId].voteCount++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}
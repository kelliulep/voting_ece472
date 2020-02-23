pragma solidity >=0.4.2 <0.6.0;
/// https://www.dappuniversity.com/articles/the-ultimate-ethereum-dapp-tutorial

contract Election {
    // Read/write candidate
    string public candidate;

    // Constructor
    // function Election () public {
    constructor() public {
        candidate = "Candidate 1";
    }
}
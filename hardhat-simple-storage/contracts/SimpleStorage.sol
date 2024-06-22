// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SimpleStorage {
    uint256 public fav_num;

    struct People{
        uint256 fav_num_;
        string name;
    }
    mapping (string => uint256) public persontonum;

    People[] public people;

    function store(uint256 number) public {
        fav_num=number;
    }

    function retrieve() public view returns(uint256){
        return fav_num;
    }

    function addPerson(string memory name, uint256 number) public {
        people.push(People(number,name));
        persontonum[name]=number;
    }
}

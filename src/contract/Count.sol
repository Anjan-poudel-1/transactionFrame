//SPDX-License-Identifier:MIT
pragma solidity ^0.8.2;

contract Count{

    uint public counter = 0;

    address public owner;
    address public lastCalledBy;

    constructor(){
        owner = msg.sender;
    }

    function addByOwner() public{
        require(msg.sender==owner,"Not an owner address");
        counter++;
    }

    function addNumber() public{
        counter++;
        lastCalledBy=msg.sender;
    }

}
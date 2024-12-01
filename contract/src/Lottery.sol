// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IConduitVRFCoordinator.sol";
import "./IConduitVRFConsumer.sol";
import "./ConduitVRFConsumerBase.sol";

contract Lottery is ConduitVRFConsumerBase {
    IConduitVRFCoordinator public vrf;
    // Change to uint16 to store larger numbers (0-9999)
    mapping(uint256 => uint16) public lotteryNumbers;

    constructor(address _vrf) {
        vrf = IConduitVRFCoordinator(_vrf);
    }

    function _conduitVrf() internal view override returns (address) {
        return address(vrf);
    }

    function generateNumber() external payable returns (uint256) {
        return vrf.request{value: msg.value}(_calculateRound(), 120000, "");
    }

    function _fulfillRandomness(
        uint256 _randomness,
        uint256 _id,
        bytes memory
    ) internal override {
        require(msg.sender == address(vrf), "Only vrf can call callback");
        require(lotteryNumbers[_id] == 0, "Request was already filled");
        
        // Generate number between 0-9999
        lotteryNumbers[_id] = uint16(_randomness % 10000);
    }

    receive() external payable {}

    // Add this function to get formatted number
    function getFormattedNumber(uint256 _id) public view returns (string memory) {
        uint16 number = lotteryNumbers[_id];
        require(number < 10000, "Invalid number");
        
        // Convert to string with leading zeros
        string memory str = new string(4);
        bytes memory bstr = bytes(str);
        
        for(uint i = 3; i >= 0; i--) {
            bstr[i] = bytes1(uint8(48 + number % 10));
            number /= 10;
            if(i == 0) break;
        }
        
        return string(bstr);
    }
} 
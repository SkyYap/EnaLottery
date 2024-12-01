// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IConduitVRFCoordinator.sol";
import "./interfaces/IConduitVRFConsumer.sol";
import "./ConduitVRFConsumerBase.sol";

contract Lottery is ConduitVRFConsumerBase {
    IConduitVRFCoordinator public vrf;
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
} 
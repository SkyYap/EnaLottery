// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IConduitVRFConsumer {
    function fulfillRandomness(
        uint256 randomness,
        uint256 requestId,
        bytes calldata data
    ) external;
}

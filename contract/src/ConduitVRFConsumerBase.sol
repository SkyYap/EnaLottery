// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

abstract contract ConduitVRFConsumerBase {
    uint256 public roundStartTime;
    uint256 public roundDuration;

    event RoundConfigUpdated(uint256 startTime, uint256 duration);

    constructor(uint256 _startTime, uint256 _roundDuration) {
        roundStartTime = _startTime;
        roundDuration = _roundDuration;
    }

    /// @notice Returns the address of the dedicated msg.sender.
    /// @return Address of the ConduitVRFCoordinator.
    function _conduitVrf() internal view virtual returns (address);

    function _calculateRound() internal view returns (uint256) {
        require(block.timestamp >= roundStartTime, "Round not started");
        return ((block.timestamp - roundStartTime) / roundDuration) + 1;
    }

    function _fulfillRandomness(
        uint256 randomness,
        uint256 requestId,
        bytes memory data
    ) internal virtual;

    function fulfillRandomness(
        uint256 randomness,
        uint256 requestId,
        bytes memory data
    ) external {
        require(msg.sender == _conduitVrf(), "Only keeper can call callback");
        _fulfillRandomness(randomness, requestId, data);
    }
}

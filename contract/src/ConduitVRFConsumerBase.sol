// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

abstract contract ConduitVRFConsumerBase {
    uint256 constant GENESIS = 1692803367;
    uint256 constant ROUND_DURATION = 3;

    /// @notice Returns the address of the dedicated msg.sender.
    /// @return Address of the ConduitVRFCoordinator.
    function _conduitVrf() internal view virtual returns (address);

    function _calculateRound() internal view returns (uint256) {
        return ((block.timestamp - GENESIS) / ROUND_DURATION) + 2;
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

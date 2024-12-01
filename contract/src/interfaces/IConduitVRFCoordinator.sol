// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IConduitVRFCoordinator {
    event VRF_RequestRandomNumber(
        uint256 indexed requestId,
        uint256 roundId,
        uint32 gasLimit,
        uint256 revenue,
        bytes data
    );
    event VRF_RandomNumberDelivered(uint256 indexed requestId, uint256 number);
    event VRF_CallbackSuccess(uint256 indexed requestId);
    event VRF_ConfigUpdate(
        uint256 flatFee,
        uint256 gasOverhead,
        uint16 percentageFee,
        bool disableDrand,
        bool disableKms
    );

    error VRF_InsufficientFunds();
    error VRF_RequestNotFound();
    error VRF_RoundTooHigh();
    error VRF_DrandDisabled();
    error VRF_KmsDisabled();

    /// @notice Request a random number (KMS randomness)
    /// @dev under the hood, this is just request(0, _callbackGasLimit), requesting a random number
    /// from Conduit's kms instead of from Drand.
    /// @param _callbackGasLimit The gas limit to set for the callback, `fulfillRandomness`
    /// @param _data The data to send with the request, which will be passed back upon returning
    /// @return requestId The unique identifier for this request
    function request(
        uint32 _callbackGasLimit,
        bytes calldata _data
    ) external payable returns (uint256);

    /// @notice Request a random number (Drand Randomness)
    /// @param _roundId The drand roundId to request a random number for. If it is 0, the
    /// randomness will be sourced from Conduit's KMS instead of Drand. If providing a _roundId,
    /// always make sure that the round has yet to be broadcasted on drand, otherwise your
    /// application risks a front-running attack.
    /// @param _callbackGasLimit The gas limit to set for the callback, `fulfillRandomness`
    /// @param _data The data to send with the request, which will be passed back upon returning
    /// @return requestId The unique identifier for this request
    function request(
        uint256 _roundId,
        uint32 _callbackGasLimit,
        bytes calldata _data
    ) external payable returns (uint256);

    function calculateRequestPrice(
        uint32 _callbackGasLimit
    ) external view returns (uint256);

    function estimateRequestPrice(
        uint32 _callbackGasLimit,
        uint256 _requestGasPriceWei
    ) external view returns (uint256);
}

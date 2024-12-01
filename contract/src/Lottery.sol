// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IConduitVRFCoordinator.sol";
import "./interfaces/IConduitVRFConsumer.sol";
import "./ConduitVRFConsumerBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is ConduitVRFConsumerBase, Ownable {
    IConduitVRFCoordinator public vrf;
    IERC20 public usde;
    
    mapping(uint256 => uint16) public lotteryNumbers;
    mapping(uint256 => Entry[]) public roundEntries;
    mapping(uint256 => bool) public roundFinalized;
    
    uint256 public constant ENTRY_PRICE = 1e18; // 1 USDE
    uint256 public constant MAX_ENTRIES = 1000000;
    
    struct Entry {
        address user;
        uint16 number;
    }
    
    event EntrySubmitted(uint256 indexed round, address indexed user, uint16 number);
    event WinningNumberGenerated(uint256 indexed round, uint16 number);
    event RoundFinalized(uint256 indexed round);

    constructor(
        address _vrf, 
        address _usde,
        uint256 _startTime,
        uint256 _roundDuration
    ) ConduitVRFConsumerBase(_startTime, _roundDuration) Ownable(msg.sender) {
        vrf = IConduitVRFCoordinator(_vrf);
        usde = IERC20(_usde);
    }

    function _conduitVrf() internal view override returns (address) {
        return address(vrf);
    }

    function updateRoundConfig(uint256 _newStartTime, uint256 _newDuration) external onlyOwner {
        require(_newStartTime >= block.timestamp, "Start time must be in future");
        require(_newDuration > 0, "Duration must be positive");
        roundStartTime = _newStartTime;
        roundDuration = _newDuration;
    }

    function getCurrentRound() external view returns (
        uint256 roundId,
        uint256 startTime,
        uint256 endTime,
        uint256 entriesCount,
        bool isFinalized
    ) {
        roundId = _calculateRound();
        startTime = roundStartTime + ((roundId - 1) * roundDuration);
        endTime = startTime + roundDuration;
        entriesCount = roundEntries[roundId].length;
        isFinalized = roundFinalized[roundId];
    }

    function generateNumber() external onlyOwner payable returns (uint256) {
        uint256 currentRound = _calculateRound();
        require(roundEntries[currentRound].length > 0, "No entries for current round");
        require(!roundFinalized[currentRound], "Round already finalized");
        return vrf.request{value: msg.value}(currentRound, 120000, "");
    }

    function submitEntry(uint16 _number) external {
        require(_number <= 9999, "Number must be between 0-9999");
        uint256 currentRound = _calculateRound();
        require(!roundFinalized[currentRound], "Round is finalized");
        require(roundEntries[currentRound].length < MAX_ENTRIES, "Round is full");
        
        // Transfer USDE from user
        require(usde.transferFrom(msg.sender, address(this), ENTRY_PRICE), "USDE transfer failed");
        
        // Record entry
        roundEntries[currentRound].push(Entry({
            user: msg.sender,
            number: _number
        }));
        
        emit EntrySubmitted(currentRound, msg.sender, _number);
    }

    function getEntriesForRound(uint256 _round) external view returns (Entry[] memory) {
        return roundEntries[_round];
    }

    function _fulfillRandomness(
        uint256 _randomness,
        uint256 _id,
        bytes memory
    ) internal override {
        require(msg.sender == address(vrf), "Only vrf can call callback");
        require(lotteryNumbers[_id] == 0, "Request was already filled");
        require(!roundFinalized[_id], "Round already finalized");
        
        // Generate number between 0-9999
        lotteryNumbers[_id] = uint16(_randomness % 10000);
        roundFinalized[_id] = true;
        
        emit WinningNumberGenerated(_id, lotteryNumbers[_id]);
        emit RoundFinalized(_id);
    }

    receive() external payable {}
} 
# Decentralized Lottery dApp

the first No-Loss, fully decentralized lottery application on Ethena Network powered by Conduit VRF for verifiable randomness.

## Features

- Transparent and fair lottery system using Conduit VRF
- User-friendly interface with real-time updates
- Secure wallet integration with Wagmi
- USDe token-based entry system

## Tech Stack

### Smart Contracts
- Solidity ^0.8.19
- Foundry (for development and testing)
- OpenZeppelin Contracts
- Conduit VRF for randomness

### Frontend
- React + TypeScript
- Vite
- Wagmi (for Web3 interactions)
- Framer Motion (for animations)
- TailwindCSS
- React Router

## Getting Started

### Prerequisites
- Node.js >= 16
- Foundry
- Git

### Installation

1. Clone the repository
```
bash
git clone https://github.com/SkyYap/EnaLottery
cd EnaLottery
```

2. Install contract dependencies
```
bash
cd contract
forge install
```

3. Install frontend dependencies
```
bash
cd frontend
npm install
```

### Deployment

#### Smart Contracts
Deploy the lottery contract using Forge:
```
bash
cd contract
forge create src/Lottery.sol:Lottery \
--rpc-url <your_rpc_url> \
--private-key <your_private_key> \
--constructor-args \
<vrf_coordinator_address> \
<usde_token_address> \
$(date +%s) \
1800 \ (round duration in seconds)
```

#### Frontend
1. Create a `.env` file in the frontend directory and add your configuration
2. Run the development server:
```
bash
cd frontend
npm run dev
```

## Usage

1. Connect your wallet using the "Connect Wallet" button
2. Ensure you have USDe tokens in your wallet
3. Approve the lottery contract to spend your USDe tokens
4. Enter the lottery by:
   - Choosing a number between 0000-9999
   - Specifying the amount of USDe to enter with
5. Wait for the round to complete
6. Winners are automatically selected using Conduit VRF

## Contract Architecture

### Core Contracts
- `Lottery.sol`: Main lottery contract handling entries and prize distribution
- `ConduitVRFConsumerBase.sol`: Base contract for VRF functionality

### Interfaces
- `IConduitVRFCoordinator.sol`: Interface for VRF coordination
- `IConduitVRFConsumer.sol`: Interface for VRF consumption

## Security

- Randomness provided by Conduit VRF
- Smart contracts built with OpenZeppelin's secure implementations
- Entry validation and overflow protection
- Round-based timing system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- [Ethena Labs](https://www.ethena.fi/) for USDe integration
- [Conduit](https://www.conduit.xyz/) for providing VRF services
- [OpenZeppelin](https://www.openzeppelin.com/) for secure contract implementations
- [Wagmi](https://wagmi.sh/) for Web3 React hooks

## Support

For support, please open an issue in the GitHub repository or reach out to the team on Discord.
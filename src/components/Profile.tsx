import React from 'react';
import { useAccount, useConnect, useEnsName, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { motion } from 'framer-motion';
import { Wallet, ChevronDown } from 'lucide-react';
import { mainnet, sepolia } from 'wagmi/chains';

export const Profile: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ensName, status } = useEnsName({ address });
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [isNetworkMenuOpen, setIsNetworkMenuOpen] = React.useState(false);

  const networks = [
    { ...mainnet, name: 'Mainnet' },
    { ...sepolia, name: 'Sepolia' }
  ];

  if (!isConnected) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => connect({ connector: connectors[0] })}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 shadow-lg"
      >
        <Wallet className="w-5 h-5" />
        <span>Connect Wallet</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4"
    >
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsNetworkMenuOpen(!isNetworkMenuOpen)}
          className="bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <span>{networks.find(n => n.id === chainId)?.name || 'Unknown Network'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isNetworkMenuOpen ? 'rotate-180' : ''}`} />
        </motion.button>

        {isNetworkMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {networks.map((network) => (
              <button
                key={network.id}
                onClick={() => {
                  switchChain({ chainId: network.id });
                  setIsNetworkMenuOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-purple-50 transition-colors ${
                  network.id === chainId ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                }`}
              >
                {network.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      <div className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
        <Wallet className="w-4 h-4" />
        <span>
          {status === 'pending' ? 'Loading...' : 
           ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`}
        </span>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => disconnect()}
        className="text-white opacity-75 hover:opacity-100 text-sm underline"
      >
        Disconnect
      </motion.button>
    </motion.div>
  );
}; 
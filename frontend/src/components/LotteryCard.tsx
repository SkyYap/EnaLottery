import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Timer, Users, Trophy } from 'lucide-react';

interface LotteryCardProps {
  onEnterLottery: () => void;
  potSize: string;
  timeLeft: string;
  wallets: number;
}

export const LotteryCard: React.FC<LotteryCardProps> = ({
  onEnterLottery,
  potSize,
  timeLeft,
  wallets,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
    >
      <div className="text-center mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Current Pot</h1>
        <p className="text-5xl font-bold text-purple-600">{potSize} USDe</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Timer className="w-6 h-6 text-purple-600" />
            <span className="text-gray-600">Time Left</span>
          </div>
          <span className="font-semibold text-gray-800">{timeLeft}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-purple-600" />
            <span className="text-gray-600">Total Entries</span>
          </div>
          <span className="font-semibold text-gray-800">{wallets}</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onEnterLottery}
        className="w-full py-4 rounded-lg flex items-center justify-center space-x-2 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white"
      >
        <Ticket className="w-6 h-6" />
        <span>Enter Lottery</span>
      </motion.button>
    </motion.div>
  );
}
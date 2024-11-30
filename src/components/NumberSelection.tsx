import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Ticket, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const NumberSelection = () => {
  const [number, setNumber] = useState('');
  const [usdeAmount, setUsdeAmount] = useState('');
  const navigate = useNavigate();

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d{0,4}$/.test(value) && parseInt(value) <= 9999)) {
      setNumber(value);
    }
  };

  const handleUsdeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setUsdeAmount(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (number.length !== 4) {
      toast.error('Please enter a 4-digit number');
      return;
    }
    if (!usdeAmount || parseFloat(usdeAmount) <= 0) {
      toast.error('Please enter a valid USDE amount');
      return;
    }
    // Here you would typically call your smart contract
    toast.success(`Number submitted with ${usdeAmount} USDE entries!`);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="mb-6 text-purple-600 flex items-center gap-2 hover:text-purple-700"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Lottery</span>
        </motion.button>

        <div className="text-center mb-8">
          <Ticket className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Pick Your Lucky Number</h1>
          <p className="text-gray-600">Enter a number between 0000 and 9999</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Lucky Number
              </label>
              <input
                type="text"
                value={number}
                onChange={handleNumberChange}
                placeholder="0000"
                className="w-full text-center text-4xl font-bold tracking-widest py-4 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                maxLength={4}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                USDE Amount (1 USDE = 1 Entry)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={usdeAmount}
                  onChange={handleUsdeChange}
                  placeholder="Enter USDE amount"
                  className="w-full pl-10 pr-4 py-4 text-xl font-semibold border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                The more USDE you spend, the more entries you get!
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={number.length !== 4 || !usdeAmount || parseFloat(usdeAmount) <= 0}
            className={`w-full py-4 rounded-lg flex items-center justify-center space-x-2 text-lg font-semibold ${
              number.length === 4 && usdeAmount && parseFloat(usdeAmount) > 0
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          >
            <Ticket className="w-6 h-6" />
            <span>Submit Number</span>
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Make sure to double-check your number and USDE amount before submitting!</p>
        </div>
      </motion.div>
    </div>
  );
};
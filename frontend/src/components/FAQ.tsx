import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={false}
      className="border-b border-purple-100 last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-purple-50 transition-colors"
      >
        <span className="font-semibold text-gray-800">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-purple-600" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-4 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "What makes this lottery special?",
      answer: "EnaLottery is the first no-loss lottery on Ethena, combining the excitement of traditional lotteries with the security of decentralized finance. Your entry fee isn’t spent—it’s pooled to generate yield, ensuring the prize pool grows sustainably while your initial deposit remains intact."
    },
    {
      question: "How do I participate?",
      answer: "It's simple! Just connect your MetaMask wallet, click 'Enter Lottery', and choose your lucky number between 0000 and 9999. The entry fee is 1 USDe, which goes directly into the prize pool."
    },
    {
      question: "How is the winning number drawn?",
      answer: "The winning number is drawn using ConduitVRF, a secure and transparent random number generator. This ensures that the process is completely fair and tamper-proof."
    },
    {
      question: "When do I get my winnings?",
      answer: "If you win, your rewards will be distributed immediately after the draw ends. You can choose to redeem your winnings in USDe or our token as the payout (we will incentivize you if you choose our token)"
    },
    {
      question: "What happens to my entry fee?",
      answer: "Your entry fee of 1 USDe per entry is not spent. Instead, it is pooled into yield-generating DeFi protocols. These earnings fund the prize pool, while your initial deposit remains untouched and can be withdrawn after the lottery ends."
    },
    {
      question: "Can I enter multiple times?",
      answer: "Yes, you can enter multiple times! Each entry costs 1 USDe, and you can place up to 1,000,000 entries on a single number to maximize your chances of winning."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-8">
        <HelpCircle className="w-12 h-12 text-purple-100 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Common Questions</h2>
        <p className="text-purple-100">Everything you need to know about playing and winning</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </motion.div>
  );
};
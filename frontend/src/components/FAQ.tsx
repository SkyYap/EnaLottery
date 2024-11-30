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
      answer: "Unlike traditional lotteries, ours runs entirely on the Ethereum blockchain, making it completely transparent and trustless. Every aspect - from number selection to winner determination - can be verified by anyone, ensuring absolute fairness."
    },
    {
      question: "How do I participate?",
      answer: "It's simple! Just connect your MetaMask wallet, click 'Enter Lottery', and choose your lucky number between 0000 and 9999. The entry fee is 0.01 ETH, which goes directly into the prize pool."
    },
    {
      question: "How is the winning number drawn?",
      answer: "We use Chainlink's Verifiable Random Function (VRF) - the gold standard for blockchain randomness. This cryptographic system ensures that nobody, not even us, can manipulate the winning number selection."
    },
    {
      question: "When do I get my winnings?",
      answer: "Instantly! If your number matches the winning draw, our smart contract automatically transfers the entire prize pool to your wallet. No forms to fill, no waiting periods - just instant payouts."
    },
    {
      question: "What happens to my entry fee?",
      answer: "95% of every entry fee goes straight into the prize pool. The remaining 5% covers gas fees and platform maintenance to keep the lottery running smoothly and securely."
    },
    {
      question: "Can I enter multiple times?",
      answer: "Yes! You can enter as many times as you'd like with different numbers. Each entry requires a separate 0.01 ETH fee and increases your chances of winning."
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
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { LotteryCard } from './components/LotteryCard';
import { NumberSelection } from './components/NumberSelection';
import { FAQ } from './components/FAQ';
import { Profile } from './components/Profile';

const Home = () => {
  const navigate = useNavigate();
  const [potSize, setPotSize] = useState('1.5');
  const [timeLeft, setTimeLeft] = useState('23:59:59');
  const [entries, setEntries] = useState(156);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const [hours, minutes, seconds] = prev.split(':').map(Number);
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          return '00:00:00';
        }

        return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEnterLottery = () => {
    navigate('/select-number');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="fixed top-4 right-4">
        <Profile />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mt-16 mb-6">
            Decentralized Lottery
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-2">
            Try your luck in the most transparent lottery ever!
          </p>
        </motion.div>

        <LotteryCard
          onEnterLottery={handleEnterLottery}
          potSize={potSize}
          timeLeft={timeLeft}
          entries={entries}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-white text-center mb-6"
        >
          <p className="text-sm opacity-75 flex flex-col items-center gap-1">
            <span>
              Powered by{' '}
              <a 
                href="https://drand.love" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:opacity-80 transition-colors"
              >
                Open Source VRF Drand
              </a>
            </span>
            <a 
              href="https://drand.love/docs/overview/"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-200 hover:text-white transition-colors"
            >
              (click to learn how we make sure the results are random)
            </a>
          </p>
        </motion.div>

        <FAQ />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-number" element={<NumberSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
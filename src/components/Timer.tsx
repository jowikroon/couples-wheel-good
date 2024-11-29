import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  duration: number; // in seconds
  color: 'red' | 'orange';
  onComplete: () => void;
}

export const Timer: React.FC<TimerProps> = ({ duration, color, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  const colors = {
    red: {
      bg: 'bg-[#FF3366]/10',
      text: 'text-[#FF3366]',
      border: 'border-[#FF3366]/20'
    },
    orange: {
      bg: 'bg-[#FF9933]/10',
      text: 'text-[#FF9933]',
      border: 'border-[#FF9933]/20'
    }
  };

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress = (timeLeft / duration) * 100;

  return (
    <motion.div
      className={`px-4 py-2 rounded-full ${colors[color].bg} ${colors[color].text} 
                 border ${colors[color].border} backdrop-blur-sm
                 flex items-center gap-2 relative overflow-hidden`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <motion.div
        className={`absolute left-0 top-0 h-full ${color === 'red' ? 'bg-[#FF3366]/20' : 'bg-[#FF9933]/20'}`}
        initial={{ width: '100%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "linear" }}
      />
      <TimerIcon className="w-4 h-4 relative z-10" />
      <span className="relative z-10 text-sm font-medium">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    </motion.div>
  );
};
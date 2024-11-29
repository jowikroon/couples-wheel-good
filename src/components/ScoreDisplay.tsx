import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  type: 'master' | 'sub';
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, type }) => {
  const colors = {
    master: {
      bg: 'bg-[#FF3366]/10',
      text: 'text-[#FF3366]',
      border: 'border-[#FF3366]/20'
    },
    sub: {
      bg: 'bg-[#FF9933]/10',
      text: 'text-[#FF9933]',
      border: 'border-[#FF9933]/20'
    }
  };

  return (
    <motion.div
      className={`px-4 py-2 rounded-xl ${colors[type].bg} ${colors[type].text} 
                 border ${colors[type].border} backdrop-blur-sm
                 flex items-center gap-2`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Trophy className="w-4 h-4" />
      <span className="font-bold">{score}</span>
      <span className="text-sm opacity-60">pts</span>
    </motion.div>
  );
};
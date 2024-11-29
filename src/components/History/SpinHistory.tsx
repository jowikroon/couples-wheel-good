import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History as HistoryIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useWheelStore } from '../../store/wheelStore';

export const SpinHistory: React.FC = () => {
  const { gameHistory } = useWheelStore();
  const recentSpins = gameHistory.slice(-10).reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <HistoryIcon className="w-5 h-5 text-[#FF3366]" />
        <h2 className="text-xl font-bold">Recent Spins</h2>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {recentSpins.map((spin, index) => (
            <motion.div
              key={spin.timestamp}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-white/90">{spin.activity.text}</p>
                  <p className="text-sm text-white/60">{spin.player}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <Clock className="w-4 h-4" />
                  <span>{format(spin.timestamp, 'HH:mm')}</span>
                </div>
              </div>
              
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-white/60">
                  {spin.activity.duration} minutes
                </span>
                <span className="text-[#FFD700]">
                  +{spin.pointsEarned} pts
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {recentSpins.length === 0 && (
          <div className="text-center text-white/40 py-8">
            No spins yet
          </div>
        )}
      </div>
    </motion.div>
  );
};
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWheelStore } from '../../store/wheelStore';

interface FeedbackSectionProps {
  spinId: string;
  onFeedbackGiven: () => void;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({ spinId, onFeedbackGiven }) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const addFeedback = useWheelStore(state => state.addFeedback);

  const handleFeedback = (isPositive: boolean) => {
    addFeedback(spinId, isPositive);
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      onFeedbackGiven();
    }, 2000);
  };

  return (
    <AnimatePresence mode="wait">
      {!showThankYou ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-8 text-center"
        >
          <p className="text-white/80 mb-4">How was this spin?</p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleFeedback(true)}
              className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm
                       hover:bg-white/10 transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform inline-block">😊</span>
              <p className="text-sm text-white/60 mt-1">Satisfied</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleFeedback(false)}
              className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm
                       hover:bg-white/10 transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform inline-block">😞</span>
              <p className="text-sm text-white/60 mt-1">Not Amused</p>
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="mt-8 text-center"
        >
          <p className="text-white/80 text-lg">Thanks for your feedback! 🎉</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
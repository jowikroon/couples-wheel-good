import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award } from 'lucide-react';

interface AchievementNotificationProps {
  title: string;
  points: number;
  isVisible: boolean;
  onClose: () => void;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  title,
  points,
  isVisible,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 max-w-sm w-full bg-gradient-to-r from-[#FF3366] to-[#FF5C8A]
                   rounded-lg p-4 shadow-lg backdrop-blur-sm"
          onAnimationComplete={() => {
            setTimeout(onClose, 3000);
          }}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Achievement Unlocked!</h3>
              <p className="text-white/90">{title}</p>
              <p className="text-sm text-white/80 mt-1">+{points} points</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PointManagementProps {
  points: number;
  onKeep: () => void;
  onPass: () => void;
  color: 'red' | 'orange';
}

export const PointManagement: React.FC<PointManagementProps> = ({
  points,
  onKeep,
  onPass,
  color
}) => {
  const colors = {
    red: {
      primary: 'from-[#FF3366] to-[#FF5C8A]',
      secondary: 'hover:bg-[#FF3366]/10',
      border: 'border-[#FF3366]/20'
    },
    orange: {
      primary: 'from-[#FF9933] to-[#FFB366]',
      secondary: 'hover:bg-[#FF9933]/10',
      border: 'border-[#FF9933]/20'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-4 justify-center"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onKeep}
        className={`px-6 py-3 rounded-xl bg-gradient-to-r ${colors[color].primary}
                   text-white font-semibold flex items-center gap-2 shadow-lg
                   hover:shadow-xl transition-all duration-300`}
      >
        <Check className="w-4 h-4" />
        Keep Points (+{points})
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPass}
        className={`px-6 py-3 rounded-xl ${colors[color].secondary}
                   text-white/80 font-semibold flex items-center gap-2
                   border ${colors[color].border} backdrop-blur-sm
                   transition-all duration-300`}
      >
        <X className="w-4 h-4" />
        Pass
      </motion.button>
    </motion.div>
  );
};
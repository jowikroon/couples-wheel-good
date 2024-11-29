import React from 'react';
import { motion } from 'framer-motion';

interface ActivityListProps {
  activities: Array<{
    text: string;
    duration: number;
  }>;
  onSelect: (index: number) => void;
  selectedIndex: number | null;
  type: 'master' | 'sub';
}

export const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  onSelect,
  selectedIndex,
  type
}) => {
  const colors = {
    master: {
      hover: 'hover:bg-[#FF3366]/10',
      selected: 'bg-[#FF3366]/20',
      border: 'border-[#FF3366]/20'
    },
    sub: {
      hover: 'hover:bg-[#FF9933]/10',
      selected: 'bg-[#FF9933]/20',
      border: 'border-[#FF9933]/20'
    }
  };

  return (
    <div className="space-y-2 h-[400px] overflow-y-auto pr-4">
      {activities.map((activity, index) => (
        <motion.button
          key={index}
          onClick={() => onSelect(index)}
          className={`w-full text-left p-4 rounded-xl transition-all duration-200
                     ${colors[type].hover} backdrop-blur-sm
                     ${selectedIndex === index ? colors[type].selected : 'bg-white/5'}
                     border ${colors[type].border}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <p className="text-sm font-medium text-white/90 truncate">
            {activity.text}
          </p>
          <p className="text-xs text-white/60 mt-1">
            {activity.duration} minutes
          </p>
        </motion.button>
      ))}
    </div>
  );
};
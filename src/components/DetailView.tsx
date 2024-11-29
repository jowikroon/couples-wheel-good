import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Info } from 'lucide-react';

interface DetailViewProps {
  activity: {
    text: string;
    duration: number;
  } | null;
  type: 'master' | 'sub';
}

export const DetailView: React.FC<DetailViewProps> = ({ activity, type }) => {
  if (!activity) {
    return (
      <div className="h-full flex items-center justify-center text-white/40">
        <p>Select an activity to view details</p>
      </div>
    );
  }

  const colors = {
    master: {
      border: 'border-[#FF3366]/20',
      bg: 'from-[#FF3366]/5 to-transparent',
      text: 'text-[#FF3366]'
    },
    sub: {
      border: 'border-[#FF9933]/20',
      bg: 'from-[#FF9933]/5 to-transparent',
      text: 'text-[#FF9933]'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-6 rounded-2xl border ${colors[type].border} 
                 bg-gradient-to-b ${colors[type].bg} backdrop-blur-sm`}
    >
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Info className={`w-5 h-5 ${colors[type].text} mt-1`} />
          <div>
            <h3 className="text-lg font-medium text-white/90">Activity Details</h3>
            <p className="mt-2 text-white/70">{activity.text}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className={`w-5 h-5 ${colors[type].text} mt-1`} />
          <div>
            <h3 className="text-lg font-medium text-white/90">Duration</h3>
            <p className="mt-2 text-white/70">{activity.duration} minutes</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
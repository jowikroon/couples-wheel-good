import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Save } from 'lucide-react';
import { useWheelStore } from '../store/wheelStore';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'master' | 'sub';
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  type
}) => {
  const [newActivity, setNewActivity] = useState('');
  const [duration, setDuration] = useState(5);
  const addMasterActivity = useWheelStore((state) => state.addMasterActivity);
  const addSubActivity = useWheelStore((state) => state.addSubActivity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.trim()) return;

    const activity = {
      text: newActivity.trim(),
      duration: duration
    };

    if (type === 'master') {
      addMasterActivity(activity);
    } else {
      addSubActivity(activity);
    }

    setNewActivity('');
    setDuration(5);
  };

  const colors = {
    master: {
      bg: 'from-[#FF3366]/20 to-transparent',
      border: 'border-[#FF3366]/20',
      button: 'bg-[#FF3366]',
      hover: 'hover:bg-[#FF3366]/10'
    },
    sub: {
      bg: 'from-[#FF9933]/20 to-transparent',
      border: 'border-[#FF9933]/20',
      button: 'bg-[#FF9933]',
      hover: 'hover:bg-[#FF9933]/10'
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`bg-gradient-to-b ${colors[type].bg} rounded-2xl p-6 max-w-md w-full
                       border ${colors[type].border} backdrop-blur-md shadow-xl`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                Customize {type === 'master' ? 'Master' : 'Sub'} Activities
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-full ${colors[type].hover}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  New Activity
                </label>
                <input
                  type="text"
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white
                           focus:ring-2 focus:ring-white/20 focus:border-transparent"
                  placeholder="Enter new activity..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white
                           focus:ring-2 focus:ring-white/20 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className={`flex-1 ${colors[type].button} text-white px-4 py-2 rounded-xl
                             font-medium flex items-center justify-center gap-2
                             hover:opacity-90 transition-opacity`}
                >
                  <Plus className="w-4 h-4" />
                  Add Activity
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className={`flex-1 bg-white/5 border ${colors[type].border} text-white
                             px-4 py-2 rounded-xl font-medium hover:bg-white/10
                             transition-colors flex items-center justify-center gap-2`}
                >
                  <Save className="w-4 h-4" />
                  Save & Close
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, Music, Bell, Monitor } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const settings = [
    { icon: Volume2, label: 'Sound Effects', value: 80 },
    { icon: Music, label: 'Music', value: 60 },
    { icon: Bell, label: 'Notifications', value: true },
    { icon: Monitor, label: 'Display Mode', value: 'Fullscreen' }
  ];

  return (
    <motion.div
      className="min-h-screen p-4"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <motion.button
            onClick={onBack}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <h2 className="text-2xl font-bold">Settings</h2>
        </div>

        {/* Settings List */}
        <div className="space-y-6">
          {settings.map(({ icon: Icon, label, value }, index) => (
            <motion.div
              key={label}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#FF3366]" />
                  <span className="font-medium">{label}</span>
                </div>
                {typeof value === 'number' ? (
                  <div className="w-32">
                    <input
                      type="range"
                      value={value}
                      className="w-full accent-[#FF3366]"
                      onChange={() => {}}
                    />
                  </div>
                ) : typeof value === 'boolean' ? (
                  <div
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors
                              ${value ? 'bg-[#FF3366]' : 'bg-white/20'}`}
                  >
                    <motion.div
                      className="w-4 h-4 bg-white rounded-full"
                      animate={{ x: value ? 24 : 0 }}
                    />
                  </div>
                ) : (
                  <span className="text-white/60">{value}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
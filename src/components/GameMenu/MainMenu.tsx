import React from 'react';
import { motion } from 'framer-motion';
import { Play, Settings as SettingsIcon, Users, Heart } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (screen: 'main' | 'settings' | 'character') => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  const menuItems = [
    { icon: Play, label: 'Play Game', action: () => onNavigate('character') },
    { icon: SettingsIcon, label: 'Settings', action: () => onNavigate('settings') },
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Logo */}
      <motion.div
        className="mb-12 text-center"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-16 h-16 text-[#FF3366]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Couple's Wheel
        </h1>
        <p className="text-white/60 mt-2">Spin for excitement</p>
      </motion.div>

      {/* Menu Items */}
      <div className="space-y-4 w-full max-w-md">
        {menuItems.map(({ icon: Icon, label, action }, index) => (
          <motion.button
            key={label}
            onClick={action}
            className="w-full p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10
                     hover:bg-white/10 transition-all duration-300 group
                     flex items-center justify-between"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-[#FF3366] group-hover:scale-110 transition-transform" />
              <span className="font-medium">{label}</span>
            </span>
            <motion.div
              className="w-8 h-8 rounded-full bg-[#FF3366]/10 flex items-center justify-center"
              initial={false}
              animate={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              <Play className="w-4 h-4 text-[#FF3366]" />
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Version */}
      <motion.div
        className="mt-12 text-white/40 text-sm"
        variants={itemVariants}
      >
        Version 1.0.0
      </motion.div>
    </motion.div>
  );
};
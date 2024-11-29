import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User } from 'lucide-react';

interface PlayerNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  role: 'master' | 'sub' | null;
}

export const PlayerNameModal: React.FC<PlayerNameModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  role
}) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      setName('');
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
            className="bg-gradient-to-b from-[#2A1E3D]/80 to-[#1F1829]/80 rounded-2xl p-6 max-w-md w-full
                     border border-white/10 backdrop-blur-md shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Enter Your Name</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Player Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 pl-10 text-white
                             focus:ring-2 focus:ring-white/20 focus:border-transparent"
                    placeholder="Enter your name..."
                    autoFocus
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className={`flex-1 bg-gradient-to-r 
                             ${role === 'master' ? 'from-[#FF3366] to-[#FF5C8A]' : 'from-[#FF9933] to-[#FFB366]'}
                             text-white px-4 py-2 rounded-xl font-medium
                             disabled:opacity-50 disabled:cursor-not-allowed
                             hover:opacity-90 transition-opacity`}
                >
                  Start Game
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-white/5 border border-white/10 text-white
                           px-4 py-2 rounded-xl font-medium hover:bg-white/10
                           transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
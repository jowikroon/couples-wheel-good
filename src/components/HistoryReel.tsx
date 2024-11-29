import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History } from 'lucide-react';

interface HistoryReelProps {
  items: string[];
  isSpinning: boolean;
  color: 'red' | 'orange';
}

export const HistoryReel: React.FC<HistoryReelProps> = ({ items, isSpinning, color }) => {
  const colors = {
    red: {
      bg: 'bg-[#FF3366]/5',
      border: 'border-[#FF3366]/20',
      text: 'text-white/90',
      icon: 'text-[#FF3366]'
    },
    orange: {
      bg: 'bg-[#FF9933]/5',
      border: 'border-[#FF9933]/20',
      text: 'text-white/90',
      icon: 'text-[#FF9933]'
    }
  };

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
      rotateX: -90
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }),
    exit: {
      opacity: 0,
      y: -20,
      rotateX: 90,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2 opacity-60">
        <History className={`w-4 h-4 ${colors[color].icon}`} />
        <span className={`text-xs font-medium ${colors[color].text}`}>Previous Spins</span>
      </div>
      <div className="w-full overflow-hidden h-20 relative rounded-xl backdrop-blur-sm border border-white/5">
        <AnimatePresence mode="wait">
          {isSpinning ? (
            <motion.div
              className="flex gap-3 absolute w-full p-3"
              initial={{ y: 0 }}
              animate={{ 
                y: [-80, 0],
                transition: {
                  repeat: Infinity,
                  duration: 0.8,
                  ease: "linear"
                }
              }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={`${index}-${item}`}
                  className={`flex-shrink-0 p-3 rounded-xl border ${colors[color].bg} ${colors[color].border} backdrop-blur-sm min-w-[200px]
                            shadow-lg hover:shadow-xl transition-all duration-300`}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={index}
                  style={{
                    perspective: "1000px"
                  }}
                >
                  <motion.p 
                    className={`text-sm font-medium truncate ${colors[color].text}`}
                    animate={{
                      opacity: [0.7, 1, 0.7],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2
                      }
                    }}
                  >
                    {item}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          ) : items.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4"
            >
              <p className={`text-sm font-medium ${colors[color].text}`}>
                Last: {items[items.length - 1]}
              </p>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-white/40">No previous spins</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
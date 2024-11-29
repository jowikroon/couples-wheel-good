import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trophy, Star, Activity } from 'lucide-react';
import { format } from 'date-fns';
import { useWheelStore } from '../../store/wheelStore';

interface PlayerStats {
  totalSpins: number;
  highestPoints: number;
  totalPoints: number;
  averagePoints: number;
}

export const SpinResultsDisplay: React.FC = () => {
  const { gameHistory, currentPlayer, players } = useWheelStore();

  const calculatePlayerStats = (playerName: string): PlayerStats => {
    const playerSpins = gameHistory.filter(spin => spin.player === playerName);
    const totalPoints = playerSpins.reduce((sum, spin) => sum + spin.pointsEarned, 0);
    const highestPoints = Math.max(...playerSpins.map(spin => spin.pointsEarned), 0);
    
    return {
      totalSpins: playerSpins.length,
      highestPoints,
      totalPoints,
      averagePoints: playerSpins.length ? Math.round(totalPoints / playerSpins.length) : 0
    };
  };

  const masterSpins = gameHistory.filter(spin => 
    players[spin.player]?.role === 'master'
  ).slice(-5).reverse();

  const subSpins = gameHistory.filter(spin => 
    players[spin.player]?.role === 'sub'
  ).slice(-5).reverse();

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
      {/* Master's Column */}
      <SpinColumn
        title="Master's Spins"
        spins={masterSpins}
        stats={calculatePlayerStats(Object.values(players).find(p => p.role === 'master')?.name || '')}
        isActive={players[currentPlayer || '']?.role === 'master'}
        color="red"
      />

      {/* Sub's Column */}
      <SpinColumn
        title="Sub's Spins"
        spins={subSpins}
        stats={calculatePlayerStats(Object.values(players).find(p => p.role === 'sub')?.name || '')}
        isActive={players[currentPlayer || '']?.role === 'sub'}
        color="orange"
      />
    </div>
  );
};

interface SpinColumnProps {
  title: string;
  spins: Array<{
    player: string;
    activity: { text: string; duration: number };
    timestamp: number;
    pointsEarned: number;
  }>;
  stats: PlayerStats;
  isActive: boolean;
  color: 'red' | 'orange';
}

const SpinColumn: React.FC<SpinColumnProps> = ({
  title,
  spins,
  stats,
  isActive,
  color
}) => {
  const colors = {
    red: {
      bg: 'from-[#FF3366]/20',
      border: 'border-[#FF3366]/20',
      text: 'text-[#FF3366]',
      highlight: 'bg-[#FF3366]/10'
    },
    orange: {
      bg: 'from-[#FF9933]/20',
      border: 'border-[#FF9933]/20',
      text: 'text-[#FF9933]',
      highlight: 'bg-[#FF9933]/10'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-2xl bg-gradient-to-b ${colors[color].bg} to-transparent
                 border ${colors[color].border} backdrop-blur-sm p-6`}
    >
      {/* Active Player Indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF3366] to-[#FF5C8A] text-white text-sm font-medium"
          >
            Current Turn
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <History className={`w-5 h-5 ${colors[color].text}`} />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard
          icon={Activity}
          label="Total Spins"
          value={stats.totalSpins}
          color={color}
        />
        <StatCard
          icon={Trophy}
          label="Highest Points"
          value={stats.highestPoints}
          color={color}
        />
        <StatCard
          icon={Star}
          label="Total Points"
          value={stats.totalPoints}
          color={color}
        />
        <StatCard
          icon={Activity}
          label="Average Points"
          value={stats.averagePoints}
          color={color}
        />
      </div>

      {/* Spins List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {spins.map((spin, index) => (
            <motion.div
              key={spin.timestamp}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-xl ${colors[color].highlight} backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-white/90">{spin.activity.text}</p>
                  <p className="text-sm text-white/60">{spin.player}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <span>{format(spin.timestamp, 'HH:mm')}</span>
                </div>
              </div>
              
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-white/60">
                  {spin.activity.duration} minutes
                </span>
                <span className={`${colors[color].text}`}>
                  +{spin.pointsEarned} pts
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {spins.length === 0 && (
          <div className="text-center text-white/40 py-8">
            No spins yet
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface StatCardProps {
  icon: React.FC<{ className?: string }>;
  label: string;
  value: number;
  color: 'red' | 'orange';
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color }) => {
  const colors = {
    red: 'text-[#FF3366]',
    orange: 'text-[#FF9933]'
  };

  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${colors[color]}`} />
        <span className="text-sm text-white/60">{label}</span>
      </div>
      <p className="text-lg font-bold text-white/90">{value}</p>
    </div>
  );
};
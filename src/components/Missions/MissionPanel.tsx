import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Award, Clock } from 'lucide-react';
import { useMissionStore, Mission } from '../../store/missionStore';
import { format, isPast } from 'date-fns';

export const MissionPanel: React.FC = () => {
  const { missions, points } = useMissionStore();

  const activeMissions = missions.filter(m => !isPast(new Date(m.expiresAt)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-[#FF3366]" />
          <h2 className="text-xl font-bold">Missions</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10">
          <Award className="w-4 h-4 text-[#FFD700]" />
          <span className="font-medium">{points}</span>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {activeMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const MissionCard: React.FC<{ mission: Mission }> = ({ mission }) => {
  const progress = (mission.progress / mission.requirement) * 100;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-white/90">{mission.title}</h3>
          <p className="text-sm text-white/60">{mission.description}</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-white/40">
          <Clock className="w-4 h-4" />
          <span>{format(new Date(mission.expiresAt), 'MMM d')}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">
            Progress: {mission.progress}/{mission.requirement}
          </span>
          <span className="text-[#FFD700]">+{mission.reward} pts</span>
        </div>

        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF3366] to-[#FF5C8A]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {mission.multiplier > 1 && (
          <div className="flex items-center gap-1 text-xs text-[#FFD700]">
            <Award className="w-3 h-3" />
            <span>{mission.multiplier}x Multiplier</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
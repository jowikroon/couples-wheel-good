import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown, User } from 'lucide-react';
import { Wheel } from '../Wheel';
import { Timer } from '../Timer';
import { SpinResultsDisplay } from '../SpinResults/SpinResultsDisplay';
import { PlayerNameModal } from './PlayerNameModal';
import { useWheelStore } from '../../store/wheelStore';
import { PointManagement } from '../PointManagement';
import { FeedbackSection } from '../Feedback/FeedbackSection';

interface CharacterSelectProps {
  onBack: () => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({ onBack }) => {
  const [showWheel, setShowWheel] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'master' | 'sub' | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [showTimer, setShowTimer] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentSpinId, setCurrentSpinId] = useState<string | null>(null);

  const {
    players,
    currentPlayer,
    masterActivities,
    subActivities,
    addPlayer,
    setCurrentPlayer,
    addToHistory,
    updatePlayerScore,
    switchTurns
  } = useWheelStore();

  const handleRoleSelect = (role: 'master' | 'sub') => {
    setSelectedRole(role);
    setShowNameModal(true);
  };

  const handleNameSubmit = (name: string) => {
    if (selectedRole) {
      addPlayer(name, selectedRole);
      setCurrentPlayer(name);
      setShowNameModal(false);
      setShowWheel(true);
    }
  };

  const handleSpin = () => {
    if (spinning || !currentPlayer) return;
    
    setSpinning(true);
    const activities = players[currentPlayer].role === 'master' ? masterActivities : subActivities;
    const randomIndex = Math.floor(Math.random() * activities.length);
    setSelectedItem(randomIndex);
    
    setTimeout(() => {
      setSpinning(false);
      setShowTimer(true);
      setCurrentPoints(activities[randomIndex].points);
      
      const spinId = `spin-${Date.now()}`;
      setCurrentSpinId(spinId);
      
      addToHistory({
        player: currentPlayer,
        activity: activities[randomIndex],
        timestamp: Date.now(),
        pointsEarned: activities[randomIndex].points
      });
    }, 4000);
  };

  const handleTimerComplete = () => {
    setShowTimer(false);
    setShowFeedback(true);
  };

  const handleKeepPoints = () => {
    if (currentPlayer) {
      updatePlayerScore(currentPlayer, currentPoints);
      setCurrentPoints(0);
      switchTurns();
    }
  };

  const handlePassPoints = () => {
    setCurrentPoints(0);
    switchTurns();
  };

  const handleFeedbackComplete = () => {
    setShowFeedback(false);
    setCurrentSpinId(null);
  };

  return (
    <motion.div
      className="min-h-[100dvh] p-4 md:p-6 lg:p-8 overflow-y-auto"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header - Made sticky for mobile */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg py-4 -mx-4 px-4 md:static md:bg-transparent md:backdrop-blur-none">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onBack}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Select Your Role</h2>
              <p className="text-white/60 text-sm">Choose your path and begin</p>
            </div>
          </div>
        </div>

        {!showWheel ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto mt-8">
            {/* Role selection cards - Made more touch-friendly */}
            <motion.button
              onClick={() => handleRoleSelect('master')}
              className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#FF3366]/20 to-transparent
                       border border-[#FF3366]/20 backdrop-blur-sm
                       hover:bg-[#FF3366]/10 transition-all duration-300
                       active:scale-95 touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Crown className="w-10 h-10 md:w-12 md:h-12 text-[#FF3366] mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">Master</h3>
              <p className="text-white/60">Take control and lead</p>
            </motion.button>

            <motion.button
              onClick={() => handleRoleSelect('sub')}
              className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#FF9933]/20 to-transparent
                       border border-[#FF9933]/20 backdrop-blur-sm
                       hover:bg-[#FF9933]/10 transition-all duration-300
                       active:scale-95 touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <User className="w-10 h-10 md:w-12 md:h-12 text-[#FF9933] mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">Sub</h3>
              <p className="text-white/60">Follow and embrace</p>
            </motion.button>
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-6xl mx-auto mt-8">
            <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-8 items-start">
              {/* Game content - Optimized for mobile */}
              <div className="flex flex-col items-center">
                <Wheel
                  items={players[currentPlayer!]?.role === 'master' ? masterActivities.map(a => a.text) : subActivities.map(a => a.text)}
                  spinning={spinning}
                  selectedItem={selectedItem}
                  onSpin={handleSpin}
                  color={players[currentPlayer!]?.role === 'master' ? 'red' : 'orange'}
                />

                {showTimer && selectedItem !== null && (
                  <div className="mt-6 md:mt-8 w-full max-w-sm">
                    <Timer
                      duration={(players[currentPlayer!]?.role === 'master' ? masterActivities : subActivities)[selectedItem].duration * 60}
                      color={players[currentPlayer!]?.role === 'master' ? 'red' : 'orange'}
                      onComplete={handleTimerComplete}
                    />
                  </div>
                )}

                {currentPoints > 0 && !spinning && !showTimer && (
                  <div className="mt-6 md:mt-8 w-full max-w-sm">
                    <PointManagement
                      points={currentPoints}
                      onKeep={handleKeepPoints}
                      onPass={handlePassPoints}
                      color={players[currentPlayer!]?.role === 'master' ? 'red' : 'orange'}
                    />
                  </div>
                )}

                {showFeedback && currentSpinId && (
                  <div className="mt-6 md:mt-8 w-full max-w-sm">
                    <FeedbackSection
                      spinId={currentSpinId}
                      onFeedbackGiven={handleFeedbackComplete}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Results display - Made scrollable on mobile */}
            <div className="mt-8 md:mt-12 w-full overflow-x-hidden">
              <SpinResultsDisplay />
            </div>
          </div>
        )}
      </div>

      <PlayerNameModal
        isOpen={showNameModal}
        onClose={() => setShowNameModal(false)}
        onSubmit={handleNameSubmit}
        role={selectedRole}
      />
    </motion.div>
  );
};
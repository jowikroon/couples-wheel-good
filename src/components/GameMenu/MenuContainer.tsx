import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MainMenu } from './MainMenu';
import { Settings } from './Settings';
import { CharacterSelect } from './CharacterSelect';
import { Background } from '../Background';

type MenuScreen = 'main' | 'settings' | 'character';

export const MenuContainer: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<MenuScreen>('main');
  const [exitingScreen, setExitingScreen] = useState<MenuScreen | null>(null);

  const handleNavigate = (screen: MenuScreen) => {
    setExitingScreen(currentScreen);
    setCurrentScreen(screen);
  };

  return (
    <div className="relative min-h-[100dvh] bg-gradient-to-b from-[#1A1625]/95 to-[#2A1E3D]/95 text-white overflow-hidden">
      <Background />
      
      <div className="relative z-10 h-[100dvh] overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentScreen === 'main' && (
            <MainMenu key="main" onNavigate={handleNavigate} />
          )}
          {currentScreen === 'settings' && (
            <Settings key="settings" onBack={() => handleNavigate('main')} />
          )}
          {currentScreen === 'character' && (
            <CharacterSelect key="character" onBack={() => handleNavigate('main')} />
          )}
        </AnimatePresence>
      </div>

      {/* Safe area spacing for mobile */}
      <div className="h-[env(safe-area-inset-bottom)] bg-background" />
    </div>
  );
};
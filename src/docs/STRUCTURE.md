```
Project Structure
================

📁 src/
├── 📁 components/
│   ├── 📁 Achievements/
│   │   └── AchievementNotification.tsx       # Toast notifications for unlocked achievements
│   │
│   ├── 📁 GameMenu/
│   │   ├── MenuContainer.tsx                 # Main container managing menu states
│   │   ├── MainMenu.tsx                      # Home screen with play/settings buttons
│   │   ├── Settings.tsx                      # Settings panel (sound, display, etc.)
│   │   ├── CharacterSelect.tsx               # Role selection (master/sub)
│   │   └── PlayerNameModal.tsx               # Name input modal
│   │
│   ├── 📁 Feedback/
│   │   └── FeedbackSection.tsx               # Post-spin feedback collection
│   │
│   ├── 📁 History/
│   │   └── SpinHistory.tsx                   # Recent spins history
│   │
│   ├── 📁 Missions/
│   │   └── MissionPanel.tsx                  # Daily/weekly missions panel
│   │
│   ├── 📁 SpinResults/
│   │   └── SpinResultsDisplay.tsx            # Displays spin outcome stats
│   │
│   ├── ActivityList.tsx                      # List of available activities
│   ├── Background.tsx                        # Animated background particles
│   ├── DetailView.tsx                        # Activity details panel
│   ├── HistoryReel.tsx                      # Horizontal scrolling history
│   ├── MasterDetailSection.tsx              # Combined activity list + details
│   ├── PointManagement.tsx                  # Points allocation UI
│   ├── ScoreDisplay.tsx                     # Player score component
│   ├── Timer.tsx                           # Countdown timer for activities
│   └── Wheel.tsx                           # Main spinning wheel component
│
├── 📁 store/
│   ├── missionStore.ts                      # Mission state management
│   └── wheelStore.ts                        # Game state management
│
└── 📁 styles/
    └── index.css                           # Global styles and Tailwind

Component Wireframes
==================

Main Menu Flow:
-------------
[MainMenu] → [CharacterSelect] → [Wheel Game]
                ↓
            [Settings]

Game Screen Layout:
-----------------
┌─────────────────────────────┐
│        Score Display        │
├─────────────────────────────┤
│                             │
│          Wheel             │
│                             │
├─────────────────────────────┤
│    Activity List | Details  │
└─────────────────────────────┘

Features:
--------
• Responsive design adapting to mobile/desktop
• Glass morphism UI elements
• Particle background effects
• Smooth animations and transitions
• Real-time updates
• Progress tracking
• Achievement system
• Mission system
• Point management
• History tracking
• Player feedback collection

State Management:
---------------
wheelStore:
  - Player information
  - Game history
  - Activities
  - Current state

missionStore:
  - Daily/weekly missions
  - Progress tracking
  - Rewards system
```
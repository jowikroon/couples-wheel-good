import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  requirement: number;
  progress: number;
  reward: number;
  multiplier: number;
  completed: boolean;
  expiresAt: string;
}

interface MissionState {
  missions: Mission[];
  completedMissions: string[];
  points: number;
  
  // Actions
  addMission: (mission: Omit<Mission, 'id' | 'progress' | 'completed'>) => void;
  updateProgress: (missionId: string, progress: number) => void;
  completeMission: (missionId: string) => void;
  addPoints: (points: number) => void;
  resetDailyMissions: () => void;
  resetWeeklyMissions: () => void;
}

const generateDailyMissions = (): Omit<Mission, 'id' | 'progress' | 'completed'>[] => [
  {
    title: 'Quick Spins',
    description: 'Spin the wheel 5 times',
    type: 'daily',
    requirement: 5,
    reward: 100,
    multiplier: 1,
    expiresAt: format(new Date().setHours(24, 0, 0, 0), 'yyyy-MM-dd HH:mm:ss')
  },
  {
    title: 'Lucky Streak',
    description: 'Land on the same color 3 times',
    type: 'daily',
    requirement: 3,
    reward: 150,
    multiplier: 1.5,
    expiresAt: format(new Date().setHours(24, 0, 0, 0), 'yyyy-MM-dd HH:mm:ss')
  }
];

const generateWeeklyMissions = (): Omit<Mission, 'id' | 'progress' | 'completed'>[] => [
  {
    title: 'Master Spinner',
    description: 'Accumulate 1000 points',
    type: 'weekly',
    requirement: 1000,
    reward: 500,
    multiplier: 2,
    expiresAt: format(new Date().setDate(new Date().getDate() + 7), 'yyyy-MM-dd HH:mm:ss')
  }
];

export const useMissionStore = create<MissionState>()(
  persist(
    (set, get) => ({
      missions: [],
      completedMissions: [],
      points: 0,

      addMission: (mission) => set(state => ({
        missions: [
          ...state.missions,
          {
            ...mission,
            id: `mission-${Date.now()}-${Math.random()}`,
            progress: 0,
            completed: false
          }
        ]
      })),

      updateProgress: (missionId, progress) => set(state => ({
        missions: state.missions.map(mission =>
          mission.id === missionId
            ? {
                ...mission,
                progress: Math.min(mission.progress + progress, mission.requirement),
                completed: mission.progress + progress >= mission.requirement
              }
            : mission
        )
      })),

      completeMission: (missionId) => set(state => ({
        completedMissions: [...state.completedMissions, missionId],
        points: state.points + (
          state.missions.find(m => m.id === missionId)?.reward || 0
        )
      })),

      addPoints: (points) => set(state => ({
        points: state.points + points
      })),

      resetDailyMissions: () => set(state => ({
        missions: [
          ...state.missions.filter(m => m.type !== 'daily'),
          ...generateDailyMissions().map(m => ({
            ...m,
            id: `mission-${Date.now()}-${Math.random()}`,
            progress: 0,
            completed: false
          }))
        ]
      })),

      resetWeeklyMissions: () => set(state => ({
        missions: [
          ...state.missions.filter(m => m.type !== 'weekly'),
          ...generateWeeklyMissions().map(m => ({
            ...m,
            id: `mission-${Date.now()}-${Math.random()}`,
            progress: 0,
            completed: false
          }))
        ]
      }))
    }),
    {
      name: 'wheel-missions'
    }
  )
);
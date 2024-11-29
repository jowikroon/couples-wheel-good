import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Player {
  name: string;
  role: 'master' | 'sub';
  score: number;
}

interface Activity {
  text: string;
  duration: number;
  points: number;
  type: 'truth' | 'dare';
}

interface HistoryEntry {
  id: string;
  player: string;
  activity: Activity;
  timestamp: number;
  pointsEarned: number;
  feedback?: {
    isPositive: boolean;
    timestamp: number;
  };
}

interface WheelState {
  players: Record<string, Player>;
  currentPlayer: string | null;
  masterActivities: Activity[];
  subActivities: Activity[];
  gameHistory: HistoryEntry[];
  addPlayer: (name: string, role: 'master' | 'sub') => void;
  setCurrentPlayer: (name: string) => void;
  addToHistory: (entry: Omit<HistoryEntry, 'id'>) => void;
  addFeedback: (spinId: string, isPositive: boolean) => void;
  addMasterActivity: (activity: Activity) => void;
  addSubActivity: (activity: Activity) => void;
  updatePlayerScore: (name: string, points: number) => void;
  switchTurns: () => void;
}

const defaultMasterActivities: Activity[] = [
  { text: "Truth: What's your deepest fantasy?", duration: 2, points: 50, type: 'truth' },
  { text: "Dare: Give a sensual massage", duration: 10, points: 100, type: 'dare' },
  { text: "Truth: Describe your perfect scene", duration: 3, points: 75, type: 'truth' },
  { text: "Dare: Blindfold play for 5 minutes", duration: 5, points: 150, type: 'dare' },
  { text: "Truth: Share your favorite position", duration: 2, points: 50, type: 'truth' },
  { text: "Dare: Roleplay a fantasy", duration: 10, points: 200, type: 'dare' },
  { text: "Truth: Reveal a secret desire", duration: 3, points: 75, type: 'truth' },
  { text: "Dare: Strip tease performance", duration: 5, points: 150, type: 'dare' },
  { text: "Truth: Most adventurous experience?", duration: 3, points: 75, type: 'truth' },
  { text: "Dare: Ice play for 5 minutes", duration: 5, points: 150, type: 'dare' }
];

const defaultSubActivities: Activity[] = [
  { text: "Truth: What turns you on most?", duration: 2, points: 50, type: 'truth' },
  { text: "Dare: Follow master's commands", duration: 10, points: 100, type: 'dare' },
  { text: "Truth: Share a submissive fantasy", duration: 3, points: 75, type: 'truth' },
  { text: "Dare: Sensory deprivation play", duration: 5, points: 150, type: 'dare' },
  { text: "Truth: Favorite way to submit?", duration: 2, points: 50, type: 'truth' },
  { text: "Dare: Pleasure demonstration", duration: 5, points: 150, type: 'dare' },
  { text: "Truth: Most intense experience?", duration: 3, points: 75, type: 'truth' },
  { text: "Dare: Edge for 5 minutes", duration: 5, points: 150, type: 'dare' },
  { text: "Truth: Deepest submission desire?", duration: 3, points: 75, type: 'truth' },
  { text: "Dare: Restraint challenge", duration: 5, points: 150, type: 'dare' }
];

export const useWheelStore = create<WheelState>()(
  persist(
    (set) => ({
      players: {},
      currentPlayer: null,
      masterActivities: defaultMasterActivities,
      subActivities: defaultSubActivities,
      gameHistory: [],

      addPlayer: (name, role) =>
        set((state) => ({
          players: {
            ...state.players,
            [name]: { name, role, score: 0 }
          }
        })),

      setCurrentPlayer: (name) =>
        set(() => ({
          currentPlayer: name
        })),

      addToHistory: (entry) =>
        set((state) => ({
          gameHistory: [...state.gameHistory, {
            ...entry,
            id: `spin-${Date.now()}-${Math.random()}`
          }]
        })),

      addFeedback: (spinId, isPositive) =>
        set((state) => ({
          gameHistory: state.gameHistory.map(entry =>
            entry.id === spinId
              ? {
                  ...entry,
                  feedback: {
                    isPositive,
                    timestamp: Date.now()
                  }
                }
              : entry
          )
        })),

      addMasterActivity: (activity) =>
        set((state) => ({
          masterActivities: [...state.masterActivities, activity]
        })),

      addSubActivity: (activity) =>
        set((state) => ({
          subActivities: [...state.subActivities, activity]
        })),

      updatePlayerScore: (name, points) =>
        set((state) => ({
          players: {
            ...state.players,
            [name]: {
              ...state.players[name],
              score: (state.players[name]?.score || 0) + points
            }
          }
        })),

      switchTurns: () =>
        set((state) => {
          const players = Object.values(state.players);
          const currentPlayerObj = players.find(p => p.name === state.currentPlayer);
          const nextPlayer = players.find(p => p.role !== currentPlayerObj?.role);
          return { currentPlayer: nextPlayer?.name || null };
        })
    }),
    {
      name: 'wheel-store'
    }
  )
);
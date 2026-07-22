import React, { createContext, useContext, useState, useEffect } from 'react';

export type Breed = 'Shiba Inu' | 'Golden Retriever' | 'Dalmatian' | 'Poodle' | 'Corgi' | 'Husky';

export interface PuppyState {
  name: string;
  breed: Breed;
  happiness: number; // 0-100
  hunger: number;    // 0-100
  energy: number;    // 0-100
  lastUpdated: number;
}

export interface LeaderboardScores {
  fetch: number;
  tricks: number;
  grooming: number;
}

interface GameContextType {
  puppy: PuppyState | null;
  adoptPuppy: (name: string, breed: Breed) => void;
  updateStats: (updates: Partial<PuppyState>) => void;
  interact: (action: 'feed' | 'pet' | 'fetch' | 'trick' | 'groom') => void;
  leaderboard: LeaderboardScores;
  updateLeaderboard: (game: keyof LeaderboardScores, score: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const DECAY_RATE = 2; // points per minute
const MAX_STAT = 100;

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [puppy, setPuppy] = useState<PuppyState | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardScores>({
    fetch: 0,
    tricks: 0,
    grooming: 0
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedPuppy = localStorage.getItem('pup_pals_puppy');
    const savedLeaderboard = localStorage.getItem('pup_pals_leaderboard');
    
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }

    if (savedPuppy) {
      const parsed: PuppyState = JSON.parse(savedPuppy);
      const now = Date.now();
      const minutesPassed = (now - parsed.lastUpdated) / (1000 * 60);
      
      // Decay stats based on time passed
      const decay = Math.floor(minutesPassed * DECAY_RATE);
      
      setPuppy({
        ...parsed,
        happiness: Math.max(0, parsed.happiness - decay * 0.5),
        hunger: Math.max(0, parsed.hunger - decay * 1.5),
        energy: Math.min(MAX_STAT, parsed.energy + decay * 1), // energy regains over time!
        lastUpdated: now
      });
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (puppy) {
      localStorage.setItem('pup_pals_puppy', JSON.stringify({ ...puppy, lastUpdated: Date.now() }));
    }
    localStorage.setItem('pup_pals_leaderboard', JSON.stringify(leaderboard));
  }, [puppy, leaderboard]);

  // Periodic decay while playing (every 1 minute)
  useEffect(() => {
    if (!puppy) return;
    const interval = setInterval(() => {
      setPuppy(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          happiness: Math.max(0, prev.happiness - 1),
          hunger: Math.max(0, prev.hunger - 2),
          energy: Math.min(MAX_STAT, prev.energy + 2),
          lastUpdated: Date.now()
        };
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [puppy]);

  const adoptPuppy = (name: string, breed: Breed) => {
    setPuppy({
      name,
      breed,
      happiness: 100,
      hunger: 100,
      energy: 100,
      lastUpdated: Date.now()
    });
  };

  const updateStats = (updates: Partial<PuppyState>) => {
    setPuppy(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        ...updates,
        happiness: Math.min(MAX_STAT, Math.max(0, updates.happiness ?? prev.happiness)),
        hunger: Math.min(MAX_STAT, Math.max(0, updates.hunger ?? prev.hunger)),
        energy: Math.min(MAX_STAT, Math.max(0, updates.energy ?? prev.energy)),
        lastUpdated: Date.now()
      };
    });
  };

  const interact = (action: 'feed' | 'pet' | 'fetch' | 'trick' | 'groom') => {
    setPuppy(prev => {
      if (!prev) return prev;
      let { happiness, hunger, energy } = prev;
      
      switch (action) {
        case 'feed':
          hunger = Math.min(MAX_STAT, hunger + 30);
          energy = Math.min(MAX_STAT, energy + 10);
          break;
        case 'pet':
          happiness = Math.min(MAX_STAT, happiness + 15);
          break;
        case 'fetch':
          happiness = Math.min(MAX_STAT, happiness + 20);
          energy = Math.max(0, energy - 20);
          hunger = Math.max(0, hunger - 10);
          break;
        case 'trick':
          happiness = Math.min(MAX_STAT, happiness + 10);
          energy = Math.max(0, energy - 10);
          hunger = Math.max(0, hunger - 5);
          break;
        case 'groom':
          happiness = Math.min(MAX_STAT, happiness + 25);
          break;
      }

      return {
        ...prev,
        happiness,
        hunger,
        energy,
        lastUpdated: Date.now()
      };
    });
  };

  const updateLeaderboard = (game: keyof LeaderboardScores, score: number) => {
    setLeaderboard(prev => ({
      ...prev,
      [game]: Math.max(prev[game], score)
    }));
  };

  return (
    <GameContext.Provider value={{ puppy, adoptPuppy, updateStats, interact, leaderboard, updateLeaderboard }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
}

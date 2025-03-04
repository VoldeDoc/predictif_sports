import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { formations } from '../data/formations';
import { Formation, Player, Position, Squad } from '@/types';

// Storage key for localStorage
const SQUAD_STORAGE_KEY = 'fantasySquadData';

// Get initial squad data from localStorage if available
const getInitialSquad = (): Squad => {
  if (typeof window !== 'undefined') {
    const savedSquad = localStorage.getItem(SQUAD_STORAGE_KEY);
    if (savedSquad) {
      try {
        return JSON.parse(savedSquad);
      } catch (e) {
        console.error('Error parsing stored squad data:', e);
      }
    }
  }
  
  return {
    players: [],
    formation: formations[0], // Default to 4-4-2
    budget: 100, // £100M
    totalPoints: 0,
    matchdayReady: false
  };
};

interface SquadContextType {
  squad: Squad;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: number) => void;
  changeFormation: (formation: Formation) => void;
  canAddPlayer: (player: Player) => boolean;
  getPositionCount: (position: Position) => number;
  getPositionLimit: (position: Position) => number;
  getRemainingBudget: () => number;
  simulateGameweek: () => void;
  toggleMatchdaySelection: (playerId: number) => void;
  isSquadComplete: () => boolean;
  isMatchdayReady: () => boolean;
  getMatchdayPlayers: () => Player[];
  getSubstitutePlayers: () => Player[];
}

// const initialSquad: Squad = {
//   players: [],
//   formation: formations[0], // Default to 4-4-2
//   budget: 100, // £100M
//   totalPoints: 0,
//   matchdayReady: false
// };

const SquadContext = createContext<SquadContextType | undefined>(undefined);

export const SquadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const [squad, setSquad] = useState<Squad>(initialSquad);
  const [squad, setSquad] = useState<Squad>(getInitialSquad());
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SQUAD_STORAGE_KEY, JSON.stringify(squad));
    }
  }, [squad]);

  // Check if squad meets requirements whenever it changes
  useEffect(() => {
    const matchdayPlayers = squad.players.filter(p => p.inMatchday);
    const isValid = isSquadComplete() && matchdayPlayers.length === 11;
    
    // Check if we have the right number of players in each position for the formation
    const gkCount = matchdayPlayers.filter(p => p.position === Position.GK).length;
    const defCount = matchdayPlayers.filter(p => p.position === Position.DEF).length;
    const midCount = matchdayPlayers.filter(p => p.position === Position.MID).length;
    const fwdCount = matchdayPlayers.filter(p => p.position === Position.FWD).length;
    
    const formationValid = 
      gkCount === squad.formation.structure.GK &&
      defCount === squad.formation.structure.DEF &&
      midCount === squad.formation.structure.MID &&
      fwdCount === squad.formation.structure.FWD;
    
    setSquad(prev => ({
      ...prev,
      matchdayReady: isValid && formationValid
    }));
  }, [squad.players, squad.formation]);

  const getPositionCount = (position: Position): number => {
    return squad.players.filter(player => player.position === position).length;
  };

  const getPositionLimit = (position: Position): number => {
    return squad.formation.structure[position.split(' ')[0] as keyof typeof squad.formation.structure];
  };

  const getRemainingBudget = (): number => {
    const spent = squad.players.reduce((total, player) => total + player.price, 0);
    return parseFloat((squad.budget - spent).toFixed(1));
  };

  const isSquadComplete = (): boolean => {
    // Check if we have exactly 15 players with the right distribution
    const gkCount = getPositionCount(Position.GK);
    const defCount = getPositionCount(Position.DEF);
    const midCount = getPositionCount(Position.MID);
    const fwdCount = getPositionCount(Position.FWD);
    
    return (
      squad.players.length === 15 &&
      gkCount === 2 &&
      defCount === 5 &&
      midCount === 5 &&
      fwdCount === 3
    );
  };

  const isMatchdayReady = (): boolean => {
    return squad.matchdayReady;
  };

  const getMatchdayPlayers = (): Player[] => {
    return squad.players.filter(p => p.inMatchday);
  };

  const getSubstitutePlayers = (): Player[] => {
    return squad.players.filter(p => !p.inMatchday);
  };

  const canAddPlayer = (player: Player): boolean => {
    // Check if player is already in squad
    if (squad.players.some(p => p.id === player.id)) {
      return false;
    }

    // Check if squad is full
    if (squad.players.length >= 15) {
      return false;
    }

    // Check if we have enough budget
    if (getRemainingBudget() < player.price) {
      return false;
    }

    // Check if we have reached position limit
    const currentCount = getPositionCount(player.position);
    
    // For squad building, we allow up to: 2 GK, 5 DEF, 5 MID, 3 FWD
    const maxLimits = {
      [Position.GK]: 2,
      [Position.DEF]: 5,
      [Position.MID]: 5,
      [Position.FWD]: 3
    };
    
    return currentCount < maxLimits[player.position];
  };

  const addPlayer = (player: Player) => {
    if (canAddPlayer(player)) {
      setSquad(prev => ({
        ...prev,
        players: [...prev.players, {...player, selected: true, inMatchday: false}]
      }));
    }
  };

  const removePlayer = (playerId: number) => {
    setSquad(prev => ({
      ...prev,
      players: prev.players.filter(player => player.id !== playerId)
    }));
  };

  const toggleMatchdaySelection = (playerId: number) => {
    // Only allow toggling if squad is complete
    if (!isSquadComplete()) return;
    
    setSquad(prev => {
      const updatedPlayers = prev.players.map(player => {
        if (player.id === playerId) {
          // If we're trying to add to matchday, check if we can
          if (!player.inMatchday) {
            // Count current matchday players in this position
            const positionPlayers = prev.players.filter(
              p => p.position === player.position && p.inMatchday
            );
            
            // Get limit for this position in the formation
            const positionKey = player.position.split(' ')[0] as keyof typeof prev.formation.structure;
            const limit = prev.formation.structure[positionKey];
            
            // If we've reached the limit, don't add
            if (positionPlayers.length >= limit) {
              return player;
            }
            
            // If we already have 11 players, don't add more
            const matchdayCount = prev.players.filter(p => p.inMatchday).length;
            if (matchdayCount >= 11) {
              return player;
            }
          }
          
          return { ...player, inMatchday: !player.inMatchday };
        }
        return player;
      });
      
      return {
        ...prev,
        players: updatedPlayers
      };
    });
  };

  const changeFormation = (formation: Formation) => {
    // Reset matchday selections when formation changes
    setSquad(prev => ({
      ...prev,
      formation,
      players: prev.players.map(player => ({
        ...player,
        inMatchday: false
      }))
    }));
  };

  const simulateGameweek = () => {
    // Only simulate if matchday is ready
    if (!isMatchdayReady()) return;
    
    // Simulate random points for each player (0-15 points)
    const updatedPlayers = squad.players.map(player => {
      // Only matchday players earn points
      if (player.inMatchday) {
        const randomPoints = Math.floor(Math.random() * 16);
        
        // Use the PlayerPoints structure properly
        return {
          ...player,
          points: {
            current: (player.points?.current || 0) + randomPoints,
            change: randomPoints,
            breakdown: {
              ...(player.points?.breakdown || {}),
              minutes: randomPoints > 0 ? Math.min(3, randomPoints) : 0,
              goals: randomPoints > 5 ? Math.floor(randomPoints / 5) : 0,
              assists: randomPoints > 8 ? Math.floor(randomPoints / 8) : 0,
              cleanSheet: player.position === Position.GK || player.position === Position.DEF ? (randomPoints > 10 ? 4 : 0) : 0,
              saves: player.position === Position.GK ? Math.floor(randomPoints / 3) : 0,
              penalties: 0,
              bonus: randomPoints > 12 ? 3 : randomPoints > 8 ? 2 : randomPoints > 5 ? 1 : 0,
              yellowCards: randomPoints < 3 ? 1 : 0,
              redCards: 0,
              ownGoals: 0
            }
          }
        };
      }
      return player;
    }) as Player[];
  
    // Calculate total points for the gameweek
    const gameweekPoints = updatedPlayers.reduce((total, player) => {
      if (player.inMatchday) {
        const previousPoints = squad.players.find(p => p.id === player.id)?.points?.current || 0;
        const newPoints = player.points?.current || 0;
        return total + (newPoints - previousPoints);
      }
      return total;
    }, 0);
  
    setSquad(prev => ({
      ...prev,
      players: updatedPlayers,
      totalPoints: prev.totalPoints + gameweekPoints
    }));
  };

  return (
    <SquadContext.Provider value={{
      squad,
      addPlayer,
      removePlayer,
      changeFormation,
      canAddPlayer,
      getPositionCount,
      getPositionLimit,
      getRemainingBudget,
      simulateGameweek,
      toggleMatchdaySelection,
      isSquadComplete,
      isMatchdayReady,
      getMatchdayPlayers,
      getSubstitutePlayers
    }}>
      {children}
    </SquadContext.Provider>
  );
};

export const useSquad = (): SquadContextType => {
  const context = useContext(SquadContext);
  if (context === undefined) {
    throw new Error('useSquad must be used within a SquadProvider');
  }
  return context;
};
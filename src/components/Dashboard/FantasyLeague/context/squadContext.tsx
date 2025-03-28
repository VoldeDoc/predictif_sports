import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { formations } from '../data/formations';
import { Formation, Player, Position, Squad } from '@/types';
import useDashBoardManagement from '@/hooks/useDashboard';

// Storage key for localStorage
const SQUAD_STORAGE_KEY = 'fantasySquadData';

// Default budget
const DEFAULT_BUDGET = 100;

// Get initial squad data
const getInitialSquad = (): Squad => {
  return {
    players: [],
    formation: formations[0], // Default to 4-4-2
    budget: DEFAULT_BUDGET, // Use default budget initially
    totalPoints: 0,
    matchdayReady: false,
  };
};

interface SquadContextType {
  squad: Squad;
  isLoading: boolean;
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

const SquadContext = createContext<SquadContextType | undefined>(undefined);

export const SquadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [squad, setSquad] = useState<Squad>(getInitialSquad());
  const [isLoading, setIsLoading] = useState(true);
  
  // Move the hook inside the component
  const { getFantasyPlayerAccount } = useDashBoardManagement();

  // Fetch initial budget from API and update the squad
  useEffect(() => {
    const fetchFantasyPlayerAccount = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching fantasy player account...');
        const response = await getFantasyPlayerAccount();
        
        if (response) {
          setSquad((prev) => {
            const storedSquad = localStorage.getItem(SQUAD_STORAGE_KEY);
            const existingSquad = storedSquad ? JSON.parse(storedSquad) : prev;
            return { ...existingSquad, budget: response[0].budget };
          });
        }
      } catch (error) {
        console.error('Error fetching fantasy player account:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFantasyPlayerAccount();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SQUAD_STORAGE_KEY, JSON.stringify(squad));
    }
  }, [squad]);

  useEffect(() => {
    const matchdayPlayers = squad.players.filter((p) => p.inMatchday);
    const isValid = isSquadComplete() && matchdayPlayers.length === 11;

    const gkCount = matchdayPlayers.filter((p) => p.position === Position.GK).length;
    const defCount = matchdayPlayers.filter((p) => p.position === Position.DEF).length;
    const midCount = matchdayPlayers.filter((p) => p.position === Position.MID).length;
    const fwdCount = matchdayPlayers.filter((p) => p.position === Position.FWD).length;

    const formationValid =
      gkCount === squad.formation.structure.GK &&
      defCount === squad.formation.structure.DEF &&
      midCount === squad.formation.structure.MID &&
      fwdCount === squad.formation.structure.FWD;

    setSquad((prev) => ({
      ...prev,
      matchdayReady: isValid && formationValid,
    }));
  }, [squad.players, squad.formation]);

  const getPositionCount = (position: Position): number => {
    return squad.players.filter((player) => player.position === position).length;
  };

  const getPositionLimit = (position: Position): number => {
    return squad.formation.structure[position.split(' ')[0] as keyof typeof squad.formation.structure];
  };

  const getRemainingBudget = (): number => {
    const spent = squad.players.reduce((total, player) => total + player.price, 0);
    return parseFloat((squad.budget - spent).toFixed(1));
  };

  const isSquadComplete = (): boolean => {
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
    return squad.players.filter((p) => p.inMatchday);
  };

  const getSubstitutePlayers = (): Player[] => {
    return squad.players.filter((p) => !p.inMatchday);
  };

  const canAddPlayer = (player: Player): boolean => {
    if (squad.players.some((p) => p.id === player.id)) {
      return false;
    }

    if (squad.players.length >= 15) {
      return false;
    }

    if (getRemainingBudget() < player.price) {
      return false;
    }

    const currentCount = getPositionCount(player.position);

    const maxLimits = {
      [Position.GK]: 2,
      [Position.DEF]: 5,
      [Position.MID]: 5,
      [Position.FWD]: 3,
    };

    return currentCount < maxLimits[player.position];
  };

  const addPlayer = (player: Player) => {
    if (canAddPlayer(player)) {
      setSquad((prev) => ({
        ...prev,
        players: [...prev.players, { ...player, selected: true, inMatchday: false }],
      }));
    }
  };

  const removePlayer = (playerId: number) => {
    setSquad((prev) => ({
      ...prev,
      players: prev.players.filter((player) => player.id !== playerId),
    }));
  };

  const toggleMatchdaySelection = (playerId: number) => {
    if (!isSquadComplete()) return;

    setSquad((prev) => {
      const updatedPlayers = prev.players.map((player) => {
        if (player.id === playerId) {
          if (!player.inMatchday) {
            const positionPlayers = prev.players.filter(
              (p) => p.position === player.position && p.inMatchday
            );

            const positionKey = player.position.split(' ')[0] as keyof typeof prev.formation.structure;
            const limit = prev.formation.structure[positionKey];

            if (positionPlayers.length >= limit) {
              return player;
            }

            const matchdayCount = prev.players.filter((p) => p.inMatchday).length;
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
        players: updatedPlayers,
      };
    });
  };

  const changeFormation = (formation: Formation) => {
    setSquad((prev) => ({
      ...prev,
      formation,
      players: prev.players.map((player) => ({
        ...player,
        inMatchday: false,
      })),
    }));
  };

  const simulateGameweek = () => {
    if (!isMatchdayReady()) return;

    const updatedPlayers = squad.players.map((player) => {
      if (player.inMatchday) {
        const randomPoints = Math.floor(Math.random() * 16);

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
              cleanSheet:
                player.position === Position.GK || player.position === Position.DEF
                  ? randomPoints > 10
                    ? 4
                    : 0
                  : 0,
              saves: player.position === Position.GK ? Math.floor(randomPoints / 3) : 0,
              penalties: 0,
              bonus: randomPoints > 12 ? 3 : randomPoints > 8 ? 2 : randomPoints > 5 ? 1 : 0,
              yellowCards: randomPoints < 3 ? 1 : 0,
              redCards: 0,
              ownGoals: 0,
            },
          },
        };
      }
      return player;
    }) as Player[];

    const gameweekPoints = updatedPlayers.reduce((total, player) => {
      if (player.inMatchday) {
        const previousPoints = squad.players.find((p) => p.id === player.id)?.points?.current || 0;
        const newPoints = player.points?.current || 0;
        return total + (newPoints - previousPoints);
      }
      return total;
    }, 0);

    setSquad((prev) => ({
      ...prev,
      players: updatedPlayers,
      totalPoints: prev.totalPoints + gameweekPoints,
    }));
  };

  return (
    <SquadContext.Provider
      value={{
        squad,
        isLoading,
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
        getSubstitutePlayers,
      }}
    >
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
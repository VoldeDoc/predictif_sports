import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { formations } from '../data/formations';
import { Formation, Player, Position, Squad } from '@/types';
import useDashBoardManagement from '@/hooks/useDashboard';
import { toast } from 'react-toastify';

// Storage key for localStorage
const SQUAD_STORAGE_KEY = 'fantasySquadData';

// Default budget
const DEFAULT_BUDGET = 100;

// Normalize player data to ensure consistent format
const normalizePlayer = (player: Player): Player => {
  return {
    ...player,
    id: String(player.id),
    price: typeof player.price === 'string' ? parseFloat(player.price) : player.price,
    selected: player.selected || false,
    inMatchday: player.inMatchday || false,
  };
};

const getInitialSquad = (): Squad => {
  if (typeof window !== 'undefined') {
    try {
      const storedSquad = localStorage.getItem(SQUAD_STORAGE_KEY);
      if (storedSquad) {
        const parsedSquad = JSON.parse(storedSquad);
        
        // Ensure all player IDs are normalized as strings
        if (parsedSquad.players && Array.isArray(parsedSquad.players)) {
          parsedSquad.players = parsedSquad.players.map(normalizePlayer);
          
        }
        
        return parsedSquad;
      }
    } catch (error) {
      console.error('Error parsing stored squad:', error);
    }
  }
  
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
  removePlayer: (playerId: number | string) => void;
  changeFormation: (formation: Formation) => void;
  canAddPlayer: (player: Player) => boolean;
  getPositionCount: (position: Position) => number;
  getPositionLimit: (position: Position) => number;
  getRemainingBudget: () => number;
  simulateGameweek: () => void;
  toggleMatchdaySelection: (playerId: number | string) => void;
  isSquadComplete: () => boolean;
  isMatchdayReady: () => boolean;
  getMatchdayPlayers: () => Player[];
  getSubstitutePlayers: () => Player[];
  resetSquad: () => void;
  syncSquadWithAPIPlayers: (apiPlayers: Player[]) => void; 
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
        const response = await getFantasyPlayerAccount();
        
        if (response && response[0]) {
          const budget = response[0].budget || DEFAULT_BUDGET;
          
          setSquad((prev) => {
            return { ...prev, budget };
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
    // Enhanced debugging to trace ID comparison issues
    const normalizedPlayerId = String(player.id);
    
    const existingPlayerById = squad.players.find(p => String(p.id) === normalizedPlayerId);
    
    // 2. Check by name as a fallback (in case IDs are different but it's the same player)
    const existingPlayerByName = squad.players.find(p => 
      p.name === player.name && 
      p.position === player.position &&
      p.team === player.team
    );
    
    if (existingPlayerById || existingPlayerByName) {
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

    const canAdd = currentCount < maxLimits[player.position];
 
    return canAdd;
  };

  const addPlayer = (player: Player) => {
    if (canAddPlayer(player)) {
      
      // Normalize the player data to ensure consistent format
      const normalizedPlayer = normalizePlayer(player);
      
      setSquad((prev) => {
        const newSquad = {
          ...prev,
          players: [...prev.players, { ...normalizedPlayer, selected: true, inMatchday: false }],
        };
        return newSquad;
      });
    }
  };

  const removePlayer = (playerId: number | string) => {
    const normalizedId = String(playerId);
    
    setSquad((prev) => {
      // Find the player to remove with more detailed logging
      const playerToRemove = prev.players.find(p => String(p.id) === normalizedId);
      
      if (playerToRemove) {
      } else {
        console.warn('Player not found with ID:', normalizedId);
      }
      
      // Use strict string comparison to ensure IDs match correctly
      return {
        ...prev,
        players: prev.players.filter((player) => String(player.id) !== normalizedId),
      };
    });
  };

  const toggleMatchdaySelection = (playerId: number | string) => {
    if (!isSquadComplete()) {
      toast.error("Complete your squad before selecting matchday players");
      return;
    }
  
    // Convert to string for consistent comparison
    const normalizedId = String(playerId);
    
    
  
    setSquad((prev) => {
      // Map through players and toggle the matchday status for the selected player
      const updatedPlayers = prev.players.map((player) => {
        // Use string comparison for IDs to avoid type issues
        if (String(player.id) === normalizedId) {
          return {
            ...player,
            inMatchday: !player.inMatchday, // Toggle the matchday status
          };
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
    if (!isMatchdayReady()) {
      return;
    }

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
        const previousPoints = squad.players.find((p) => String(p.id) === String(player.id))?.points?.current || 0;
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

  // Add a reset function for debugging
  const resetSquad = () => {
    localStorage.removeItem(SQUAD_STORAGE_KEY);
    setSquad({
      players: [],
      formation: formations[0],
      budget: DEFAULT_BUDGET,
      totalPoints: 0,
      matchdayReady: false,
    });
  };

  const syncSquadWithAPIPlayers = (apiPlayers: any[]) => {
    // console.log("syncSquadWithAPIPlayers called with", apiPlayers.length, "players");
    
    // // Log the exact structure of the first player to debug
    // if (apiPlayers.length > 0) {
    //   console.log("First player raw structure:", JSON.stringify(apiPlayers[0], null, 2));
    // }
    
    // Map position_short to Position enum values
    const positionMap: Record<string, Position> = {
      'GK': Position.GK,
      'DF': Position.DEF,
      'MF': Position.MID,
      'FW': Position.FWD,
      'Goalkeeper': Position.GK,
      'Defender': Position.DEF,
      'Midfielder': Position.MID, 
      'Forward': Position.FWD,
      'Striker': Position.FWD,
    };
    
    // Transform API players to match expected format
    const validPlayers = apiPlayers.map(player => {
      // Get the correct position from either position_short or position
      const mappedPosition = 
        (player.position_short && positionMap[player.position_short]) || 
        (player.position && positionMap[player.position]) || 
        Position.FWD;  // Default position
      
      if (Array.isArray(player)) {
        player = player[0]; 
      }
      
      // Create the player object with proper data extraction and fallbacks
      return {
        id: player.player_id || player.id || String(Math.random()),
        name: player.name || "Unknown Player",
        position: mappedPosition,
        team: player.current_club_name || player.team || "Unknown Team",
        price: Number(player.transfer_in_value) || Number(player.evaluation) || 5.0,
        photo: player.photo || "",
        selected: true,
        inMatchday: false,
        
        // Add these required properties to match the Player type
        points: {
          current: 0,
          change: 0
        },
        nationality: player.nationality || "Unknown",
        stats: {
          appearances: Number(player.appearance) || 0,
          goals: Number(player.goal) || 0,
          assists: Number(player.assists) || 0,
          cleanSheets: Number(player.clean_sheets) || 0,
          yellowCards: Number(player.yellow_card) || 0,
          redCards: Number(player.red_card) || 0
        },
        
        status: {
          isAvailable: true,
          reason: undefined,
          expectedReturn: undefined
        }
      };
    });
    
    
    // Update the squad state with these players
    setSquad(prev => ({
      ...prev,
      players: validPlayers as Player[],
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
        resetSquad,
        syncSquadWithAPIPlayers, 
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
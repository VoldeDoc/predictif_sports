import React, { useState, useEffect } from 'react';
import { UserCircle2, ArrowUpRight, TrendingUp, TrendingDown, Minus, AlertTriangle, RefreshCw } from 'lucide-react';
import { Player, Position } from '@/types';
import useDashBoardManagement from '@/hooks/useDashboard';

const FantasyPoints: React.FC = () => {
  const { getMatchDay, getMatchDaySquad, getFantasySquadPlayers } = useDashBoardManagement();
  
  const [isLoading, setIsLoading] = useState(true);
  const [matchdaySquad, setMatchdaySquad] = useState<Player[]>([]);
  const [benchSquad, setBenchSquad] = useState<Player[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showingStarters, setShowingStarters] = useState(true);
  const [matchdayDataId, setMatchdayDataId] = useState<string | null>(null);
  const [squadStats, setSquadStats] = useState({
    currentRank: 'N/A',
    previousRank: 'N/A',
    currentGameWeek: '0',
    pointsHistory: { lastChange: 0 }
  });
  
  // First get the matchday ID
  useEffect(() => {
    const checkMatchday = async () => {
      try {
        setIsLoading(true);
        const matchdayResponse = await getMatchDay();
        
        if (matchdayResponse && 
            Array.isArray(matchdayResponse) && 
            matchdayResponse.length > 0 && 
            Array.isArray(matchdayResponse[0]) &&
            matchdayResponse[0].length > 0) {
          
          const matchdayData = matchdayResponse[0][0];          
          setMatchdayDataId(matchdayData.id);
          setSquadStats(prev => ({
            ...prev,
            currentGameWeek: matchdayData.gameweek || '0'
          }));
        } else {
          setFetchError("No active matchday found. Please wait for the next gameweek.");
        }
      }
      catch (error) {
        console.error("Error fetching matchday data:", error);
        setFetchError("Failed to load matchday data. Please try again later.");
      }
    };
    
    checkMatchday();
  }, []);
  
  // Then fetch both matchday squad and full fantasy squad
  useEffect(() => {
    const loadSquadData = async () => {
      if (!matchdayDataId) return;
      
      try {
        // 1. Get the selected players for current matchday
        const matchdayResponse = await getMatchDaySquad(matchdayDataId);
        console.log("Raw matchday response:", matchdayResponse);
        
        // 2. Get all players in fantasy squad
        const allSquadPlayersResponse = await getFantasySquadPlayers();
        
        // Process matchday squad (starting XI)
        const matchdayPlayers: Player[] = [];

        // Handle the response structure with Array[0].player format
        if (matchdayResponse && 
            Array.isArray(matchdayResponse) && 
            matchdayResponse.length > 0 &&
            matchdayResponse[0] && 
            matchdayResponse[0].player && 
            Array.isArray(matchdayResponse[0].player)) {
          
          console.log("Processing players from matchdayResponse[0].player");
          
          // Get game information for stats
          const gameInfo = matchdayResponse[0].game || {};
          setSquadStats(prev => ({
            ...prev,
            currentGameWeek: gameInfo.game_week?.toString() || prev.currentGameWeek,
          }));
          
          // Filter out null players and map valid ones
          const playersData = matchdayResponse[0].player
            .filter((player: any) => player && player.name !== null)
            .map((player: any) => {
              // Map position to Position enum
              let position = Position.MID; // Default position
              if (player.position_short === "GK" || player.position === "Goalkeeper") {
                position = Position.GK;
              } else if (player.position_short === "DF" || player.position_short === "DEF" || player.position === "Defender") {
                position = Position.DEF;
              } else if (player.position_short === "FW" || player.position_short === "FWD" || player.position === "Forward" || player.position === "Striker") {
                position = Position.FWD;
              }
              
              // Extract price from evaluation (e.g., "£40 million")
              let price = 0;
              if (player.evaluation) {
                const priceMatch = player.evaluation.match(/£(\d+)/);
                if (priceMatch && priceMatch[1]) {
                  price = parseFloat(priceMatch[1]);
                }
              }
              
              return {
                id: player.player_id || player.id,
                name: player.name || "Unknown Player",
                team: player.current_club_name || "Unknown Team",
                position: position,
                price: price,
                points: { 
                  current: player.player_point || 0, 
                  total: player.player_point || 0, 
                  change: 0 
                },
                status: { isAvailable: true },
                image: player.photo || null,
                selected: true,
                inMatchday: true,
                nationality: player.nationality || "Unknown",
                stats: {
                  goals: player.goal || 0,
                  assists: player.assists || 0,
                  cleanSheets: player.clean_sheets || 0,
                  yellowCards: player.yellow_card || 0,
                  redCards: player.red_card || 0,
                  appearances: player.appearance || 0,
                  saves: player.saves || 0,
                  goalsConceded: player.goals_conceded || 0
                }
              };
            });
          
          matchdayPlayers.push(...playersData);
          
          // Calculate total points
          const totalMatchdayPoints = gameInfo.week_point || 
            matchdayPlayers.reduce(
              (sum, player) => sum + (player.points?.current || 0), 0
            );
          
          setTotalPoints(totalMatchdayPoints);
        }
        // Handle the data array in the response (data[0] format)
        else if (matchdayResponse && 
            typeof matchdayResponse === 'object' && 
            matchdayResponse.data && 
            Array.isArray(matchdayResponse.data) && 
            matchdayResponse.data.length > 0) {
            
          // Get the first item from the data array
          const matchdaySquadResponse = matchdayResponse.data[0];
          
          // Check for the response structure with game and player properties
          if (matchdaySquadResponse && 
              typeof matchdaySquadResponse === 'object' && 
              matchdaySquadResponse.game && 
              matchdaySquadResponse.player && 
              Array.isArray(matchdaySquadResponse.player)) {
            
            // Get game information for stats
            const gameInfo = matchdaySquadResponse.game;
            setSquadStats(prev => ({
              ...prev,
              currentGameWeek: gameInfo.game_week?.toString() || prev.currentGameWeek,
            }));
            
            // Filter and map players
            const playersData = matchdaySquadResponse.player
              .filter((player: any) => player && player.name !== null)
              .map((player: any) => {
                // Position mapping logic
                let position = Position.MID; 
                if (player.position_short === "GK" || player.position === "Goalkeeper") {
                  position = Position.GK;
                } else if (player.position_short === "DF" || player.position_short === "DEF" || player.position === "Defender") {
                  position = Position.DEF;
                } else if (player.position_short === "FW" || player.position_short === "FWD" || player.position === "Forward" || player.position === "Striker") {
                  position = Position.FWD;
                }
                
                // Price extraction
                let price = 0;
                if (player.evaluation) {
                  const priceMatch = player.evaluation.match(/£(\d+)/);
                  if (priceMatch && priceMatch[1]) {
                    price = parseFloat(priceMatch[1]);
                  }
                }
                
                return {
                  id: player.player_id || player.id,
                  name: player.name || "Unknown Player",
                  team: player.current_club_name || "Unknown Team",
                  position: position,
                  price: price,
                  points: { 
                    current: player.player_point || 0, 
                    total: player.player_point || 0, 
                    change: 0 
                  },
                  status: { isAvailable: true },
                  image: player.photo || null,
                  selected: true,
                  inMatchday: true,
                  nationality: player.nationality || "Unknown",
                  stats: {
                    goals: player.goal || 0,
                    assists: player.assists || 0,
                    cleanSheets: player.clean_sheets || 0,
                    yellowCards: player.yellow_card || 0,
                    redCards: player.red_card || 0,
                    appearances: player.appearance || 0,
                    saves: player.saves || 0,
                    goalsConceded: player.goals_conceded || 0
                  }
                };
              });
            
            matchdayPlayers.push(...playersData);
            
            // Calculate total points
            const totalMatchdayPoints = matchdaySquadResponse.game.week_point || 
              matchdayPlayers.reduce(
                (sum, player) => sum + (player.points?.current || 0), 0
              );
            
            setTotalPoints(totalMatchdayPoints);
          }
        }
        // Try alternative response format (direct object with game and player)
        else if (matchdayResponse && 
            typeof matchdayResponse === 'object' && 
            matchdayResponse.game && 
            matchdayResponse.player && 
            Array.isArray(matchdayResponse.player)) {
          
          // Directly use the response object
          const matchdaySquadResponse = matchdayResponse;
          
          // Get game information for stats
          const gameInfo = matchdaySquadResponse.game;
          setSquadStats(prev => ({
            ...prev,
            currentGameWeek: gameInfo.game_week?.toString() || prev.currentGameWeek,
          }));
          
          // Filter and map players
          const playersData = matchdaySquadResponse.player
            .filter((player: any) => player && player.name !== null)
            .map((player: any) => {
              // Position mapping logic
              let position = Position.MID;
              if (player.position_short === "GK" || player.position === "Goalkeeper") {
                position = Position.GK;
              } else if (player.position_short === "DF" || player.position_short === "DEF" || player.position === "Defender") {
                position = Position.DEF;
              } else if (player.position_short === "FW" || player.position_short === "FWD" || player.position === "Forward" || player.position === "Striker") {
                position = Position.FWD;
              }
              
              // Price extraction
              let price = 0;
              if (player.evaluation) {
                const priceMatch = player.evaluation.match(/£(\d+)/);
                if (priceMatch && priceMatch[1]) {
                  price = parseFloat(priceMatch[1]);
                }
              }
              
              return {
                id: player.player_id || player.id,
                name: player.name || "Unknown Player",
                team: player.current_club_name || "Unknown Team",
                position: position,
                price: price,
                points: { 
                  current: player.player_point || 0, 
                  total: player.player_point || 0, 
                  change: 0 
                },
                status: { isAvailable: true },
                image: player.photo || null,
                selected: true,
                inMatchday: true,
                nationality: player.nationality || "Unknown",
                stats: {
                  goals: player.goal || 0,
                  assists: player.assists || 0,
                  cleanSheets: player.clean_sheets || 0,
                  yellowCards: player.yellow_card || 0,
                  redCards: player.red_card || 0,
                  appearances: player.appearance || 0,
                  saves: player.saves || 0,
                  goalsConceded: player.goals_conceded || 0
                }
              };
            });
          
          matchdayPlayers.push(...playersData);
          
          // Calculate total points
          const totalMatchdayPoints = matchdaySquadResponse.game.week_point || 
            matchdayPlayers.reduce(
              (sum, player) => sum + (player.points?.current || 0), 0
            );
          
          setTotalPoints(totalMatchdayPoints);
        }
        
        // Process full squad to identify bench players
        const benchPlayers: Player[] = [];
        if (allSquadPlayersResponse && 
            Array.isArray(allSquadPlayersResponse) && 
            allSquadPlayersResponse.length > 0) {
          
          // Get the first array if response is nested
          const squadData = Array.isArray(allSquadPlayersResponse[0]) 
            ? allSquadPlayersResponse[0] 
            : allSquadPlayersResponse;
          
          if (Array.isArray(squadData)) {
            // Map all squad players
            const allPlayers = squadData
              .filter((player: any) => player && player.name !== null)
              .map((player: any) => {
                // Map position to Position enum
                let position = Position.MID; // Default position
                if (player.position_short === "GK" || player.position === "Goalkeeper") {
                  position = Position.GK;
                } else if (player.position_short === "DEF" || player.position === "Defender") {
                  position = Position.DEF;
                } else if (player.position_short === "FWD" || player.position === "Forward" || player.position === "Striker") {
                  position = Position.FWD;
                }
                
                // Check if this player is in the matchday squad by comparing IDs
                const isInMatchday = matchdayPlayers.some(mp => {
                  // Compare various ID formats that might be used
                  const matchdayPlayerId = mp.id?.toString();
                  const currentPlayerId = player.id?.toString();
                  const playerPlayerId = player.player_id?.toString();
                  
                  return matchdayPlayerId === currentPlayerId || 
                        matchdayPlayerId === playerPlayerId;
                });
                
                return {
                  id: player.id || player.player_id,
                  name: player.name || "Unknown Player",
                  team: player.current_club_name || "Unknown Team",
                  position: position,
                  price: player.price || 0,
                  points: { 
                    current: player.fantasy_points || player.player_point || 0, 
                    total: player.fantasy_points || player.player_point || 0, 
                    change: 0 
                  },
                  status: { isAvailable: true },
                  image: player.photo || null,
                  selected: false,
                  inMatchday: isInMatchday,
                  nationality: player.nationality || "Unknown",
                  stats: {
                    goals: player.goals || player.goal || 0,
                    assists: player.assists || 0,
                    cleanSheets: player.clean_sheets || 0,
                    yellowCards: player.yellow_cards || player.yellow_card || 0,
                    redCards: player.red_cards || player.red_card || 0,
                    appearances: player.appearances || player.appearance || 0,
                    saves: player.saves || 0,
                    goalsConceded: player.goals_conceded || 0
                  }
                };
              });
            
            // Filter out players who are not in the matchday squad - these are bench players
            benchPlayers.push(...allPlayers.filter(player => !player.inMatchday));
          }
        }
        
        console.log("Final matchday players:", matchdayPlayers);
        setMatchdaySquad(matchdayPlayers);
        setBenchSquad(benchPlayers);
        
        if (matchdayPlayers.length === 0 && benchPlayers.length === 0) {
          setFetchError("No squad data found for this matchday. Please make sure you've selected your team.");
        } else if (matchdayPlayers.length === 0) {
          setFetchError("You haven't selected any starting players for this matchday.");
        }
      } catch (error) {
        console.error("Error loading squad data:", error);
        setFetchError("Failed to load your squad data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSquadData();
  }, [matchdayDataId]);
  
  const getPositionColor = (position: string) => {
    switch(position) {
      case Position.GK: return 'bg-yellow-500 text-white';
      case Position.DEF: return 'bg-blue-500 text-white';
      case Position.MID: return 'bg-green-500 text-white';
      case Position.FWD: return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  const getPointChange = (player: Player) => {
    const change = player.points?.change || 0;
    
    if (change > 0) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp size={14} className="mr-1" />
          <span>+{change}</span>
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center text-red-600">
          <TrendingDown size={14} className="mr-1" />
          <span>{change}</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center text-gray-400">
        <Minus size={14} className="mr-1" />
        <span>0</span>
      </div>
    );
  };
  
  const renderPlayerList = (players: Player[]) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {players.length > 0 ? (
          players.map(player => (
            <div 
              key={player.id}
              className="bg-white rounded-lg shadow p-4 flex items-center border-l-4 border-indigo-500"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3 relative">
                {player.image ? (
                  <img 
                    src={player.image} 
                    alt={player.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircle2 className="text-gray-400 w-full h-full" />
                )}
                
                <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-xs text-white font-bold">
                  {player.position?.charAt(0) || '?'}
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">{player.name}</p>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getPositionColor(player.position)}`}>
                        {player.position}
                      </span>
                      <span className="text-xs text-gray-500">{player.team}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-indigo-700">
                      {player.points?.current || 0}
                    </p>
                    {getPointChange(player)}
                  </div>
                </div>
                
                {player.points?.breakdown && (
                  <div className="mt-2 text-xs text-gray-500 grid grid-cols-2 gap-x-4 gap-y-1">
                    {Object.entries(player.points.breakdown).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span>{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Show performance stats for the player */}
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    {(player.stats?.goals ?? 0) > 0 && (
                      <div className="text-center bg-gray-50 rounded p-1">
                        <span className="block font-medium">{player.stats?.goals ?? 0}</span>
                        <span className="text-gray-500">Goals</span>
                      </div>
                    )}
                    
                    {(player.stats?.assists ?? 0) > 0 && (
                      <div className="text-center bg-gray-50 rounded p-1">
                        <span className="block font-medium">{player.stats?.assists ?? 0}</span>
                        <span className="text-gray-500">Assists</span>
                      </div>
                    )}
                    
                    {(player.stats?.cleanSheets ?? 0) > 0 && (
                      <div className="text-center bg-gray-50 rounded p-1">
                        <span className="block font-medium">{player.stats?.cleanSheets ?? 0}</span>
                        <span className="text-gray-500">Clean Sheets</span>
                      </div>
                    )}
                    
                    {(player.stats?.yellowCards ?? 0) > 0 && (
                      <div className="text-center bg-gray-50 rounded p-1">
                        <span className="block font-medium">{player.stats?.yellowCards ?? 0}</span>
                        <span className="text-gray-500">Yellow Cards</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-gray-50 rounded-lg p-6 text-center text-gray-500">
            {showingStarters ? 
              "No players in your starting XI. Please select your team for this matchday." : 
              "No players on your bench."}
          </div>
        )}
      </div>
    );
  };
  
  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto pt-6 pb-12 flex items-center justify-center min-h-[70vh]">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Your Points</h2>
          <p className="text-gray-500 mt-2">Please wait while we fetch your fantasy points...</p>
        </div>
      </div>
    );
  }
  
  // If there was an error
  if (fetchError) {
    return (
      <div className="container mx-auto pt-6 pb-12 flex items-center justify-center min-h-[70vh]">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <AlertTriangle size={48} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Could Not Load Points</h2>
          <p className="text-gray-600 mb-4">{fetchError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md flex items-center justify-center mx-auto"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto pt-6 pb-12">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          This Gameweek's Points
        </h1>
        
        <div className="bg-white shadow-sm rounded-full p-1 flex">
          <button 
            onClick={() => setShowingStarters(true)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              showingStarters 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Starting XI ({matchdaySquad.length})
          </button>
          <button 
            onClick={() => setShowingStarters(false)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              !showingStarters 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Bench ({benchSquad.length})
          </button>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-lg p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-lg font-medium opacity-90">Gameweek {squadStats.currentGameWeek}</h2>
            <p className="text-4xl font-bold mt-2">{totalPoints} pts</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-center">
            <div className="flex items-center">
              <div className="text-center mr-6">
                <p className="text-sm opacity-90">Current Rank</p>
                <p className="text-xl font-semibold">{squadStats.currentRank}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-90">Previous</p>
                <p className="text-xl font-semibold">{squadStats.previousRank}</p>
              </div>
            </div>
            <div className="flex items-center mt-3 bg-white bg-opacity-20 rounded-lg px-3 py-1">
              <ArrowUpRight size={16} className="mr-1" />
              <span className="text-sm font-medium">
                {(squadStats.pointsHistory?.lastChange ?? 0) > 0 ? '+' : ''}
                {squadStats.pointsHistory?.lastChange ?? 0} pts since last update
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {showingStarters ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Starting XI</h2>
            {renderPlayerList(matchdaySquad)}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Substitutes</h2>
            {renderPlayerList(benchSquad)}
          </div>
        )}
      </div>
    </div>
  );
};

export default FantasyPoints;
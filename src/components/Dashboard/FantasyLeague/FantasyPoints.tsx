import React, { useState, useEffect } from 'react';
import { UserCircle2, ArrowUpRight, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { Player, Position } from '@/types';
import useDashBoardManagement from '@/hooks/useDashboard';

const FantasyPoints: React.FC = () => {
  const { getMatchDay, getMatchDaySquad, getFantasySquadPlayers } = useDashBoardManagement();
  
  const [isLoading, setIsLoading] = useState(true);
  const [ setMatchdayData] = useState<any>(null);
  const [matchdaySquad, setMatchdaySquad] = useState<Player[]>([]);
  const [benchSquad, setBenchSquad] = useState<Player[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showingStarters, setShowingStarters] = useState(true);
  const [squadStats, setSquadStats] = useState({
    currentRank: 'N/A',
    previousRank: 'N/A',
    currentGameWeek: '0',
    pointsHistory: { lastChange: 0 }
  });
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);
        
        // Step 1: Get active matchday data
        const matchdays = await getMatchDay();
        console.log("Matchday API response:", matchdays);
        
        if (!matchdays || !Array.isArray(matchdays) || matchdays.length === 0) {
          setFetchError("No active matchdays found.");
          return;
        }
        
        // Use the first matchday (most recent)
        const currentMatchday = matchdays[0];
        setMatchdayData(currentMatchday);
        console.log("Using matchday:", currentMatchday);
        
        // Step 2: Get matchday squad using the matchday ID
        const matchdaySquadData = await getMatchDaySquad(currentMatchday.id);
        console.log("Matchday squad data:", matchdaySquadData);
        
        if (matchdaySquadData && Array.isArray(matchdaySquadData)) {
          // Process and prepare the matchday squad data
          const processedSquad = matchdaySquadData.map((player: any) => ({
            ...player,
            inMatchday: true,
            points: {
              current: player.points || 0,
              change: player.points_change || 0,
              breakdown: player.points_breakdown ? JSON.parse(player.points_breakdown) : null
            }
          }));
          
          setMatchdaySquad(processedSquad);
          
          // Calculate total points
          const total = processedSquad.reduce((sum, player) => sum + (player.points?.current || 0), 0);
          setTotalPoints(total);
          
          // Step 3: Get all squad players to determine bench
          const allSquadPlayers = await getFantasySquadPlayers();
          console.log("All squad players:", allSquadPlayers);
          
          if (allSquadPlayers && Array.isArray(allSquadPlayers)) {
            // Flatten if nested
            const playersData = Array.isArray(allSquadPlayers[0]) ? allSquadPlayers[0] : allSquadPlayers;
            
            // Filter out players that are in the matchday squad to get bench players
            const matchdayPlayerIds = processedSquad.map(p => p.id.toString());
            const benchPlayers = playersData.filter(
              (p: any) => !matchdayPlayerIds.includes(p.id.toString())
            ).map((player: any) => ({
              ...player,
              inMatchday: false,
              points: {
                current: 0,
                change: 0
              }
            }));
            
            setBenchSquad(benchPlayers);
          }
          
          // Set squad stats (using matchday data where available)
          setSquadStats({
            currentRank: currentMatchday.current_rank || 'N/A',
            previousRank: currentMatchday.previous_rank || 'N/A',
            currentGameWeek: currentMatchday.game_week?.toString() || '0',
            pointsHistory: { 
              lastChange: currentMatchday.points_change || 0
            }
          });
        } else {
          setFetchError("No players found in your matchday squad.");
        }
      } catch (error) {
        console.error("Error loading fantasy points data:", error);
        setFetchError("Failed to load fantasy points data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
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
                  {player.id || '?'}
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
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-gray-50 rounded-lg p-6 text-center text-gray-500">
            No players found in this category
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
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Matchweek has not arrived yet</h2>
          <p className="text-gray-600 mb-4">{fetchError}</p>
          {/* <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md flex items-center justify-center mx-auto"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </button> */}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto pt-6 pb-12">
      <div className="mb-8 flex justify-between items-center">
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
            Starting XI
          </button>
          <button 
            onClick={() => setShowingStarters(false)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              !showingStarters 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Bench
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
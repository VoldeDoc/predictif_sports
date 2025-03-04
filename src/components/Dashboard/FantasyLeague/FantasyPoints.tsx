import React, { useState } from 'react';
import { useSquad } from './context/squadContext';
import { UserCircle2, ArrowUpRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Player, Position } from '@/types';

const FantasyPoints: React.FC = () => {
  const { squad, getMatchdayPlayers, getSubstitutePlayers } = useSquad();
  const [showingStarters, setShowingStarters] = useState(true);

  const matchdayPlayers = getMatchdayPlayers();
  const substitutes = getSubstitutePlayers();
  
  // Calculate total points
  const totalPoints = matchdayPlayers.reduce((sum, player) => sum + (player.points?.current || 0), 0);
  
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
        {players.map(player => (
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
        ))}
      </div>
    );
  };
  
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
            <h2 className="text-lg font-medium opacity-90">Gameweek {squad.currentGameWeek}</h2>
            <p className="text-4xl font-bold mt-2">{totalPoints} pts</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-center">
            <div className="flex items-center">
              <div className="text-center mr-6">
                <p className="text-sm opacity-90">Current Rank</p>
                <p className="text-xl font-semibold">{squad.currentRank || 'N/A'}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-90">Previous</p>
                <p className="text-xl font-semibold">{squad.previousRank || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center mt-3 bg-white bg-opacity-20 rounded-lg px-3 py-1">
              <ArrowUpRight size={16} className="mr-1" />
              <span className="text-sm font-medium">
                {(squad.pointsHistory?.lastChange ?? 0) > 0 ? '+' : ''}
                {squad.pointsHistory?.lastChange ?? 0} pts since last update
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {showingStarters ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Starting XI</h2>
            {renderPlayerList(matchdayPlayers)}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Substitutes</h2>
            {substitutes.length > 0 ? (
              renderPlayerList(substitutes)
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
                All players are in your starting XI
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FantasyPoints;
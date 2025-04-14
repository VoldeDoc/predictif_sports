import React from 'react';
import { UserCircle2, AlertCircle, Check, XCircle } from 'lucide-react';
import { useSquad } from '../context/squadContext';
import { Position } from '@/types';

interface SquadViewProps {
  viewMode: 'squad';
}

const SquadView: React.FC<SquadViewProps> = () => {
  const { 
    squad, 
    getPositionCount, 
    isSquadComplete,
    removePlayer
  } = useSquad();

 
   
  const renderPositionGroup = (position: Position) => {
    const positionLimits = {
      [Position.GK]: 2,
      [Position.DEF]: 5,
      [Position.MID]: 5,
      [Position.FWD]: 3,
    };
    
    
const players = squad.players.filter(player => player.position === position);    const limit = positionLimits[position];
    const count = getPositionCount(position);
    
    const getPositionColor = (pos: Position) => {
      switch (pos) {
        case Position.GK:
          return 'bg-yellow-500';
        case Position.DEF:
          return 'bg-blue-500';
        case Position.MID:
          return 'bg-green-500';
        case Position.FWD:
          return 'bg-red-500';
        default:
          return 'bg-gray-500';
      }
    };
    const handleRemovePlayer = (playerId: string | number, e: React.MouseEvent) => {
      e.stopPropagation();
      if (window.confirm('Remove this player from your squad?')) {
        removePlayer(playerId);
      }
    };
    
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className={`font-semibold ${getPositionColor(position).replace('bg-', 'text-')}`}>
            {position}s ({count}/{limit} selected)
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {Array.from({ length: limit }).map((_, index) => {
            const player = players[index];
            return (
              <div 
                key={index} 
                className={`relative flex flex-col items-center justify-center p-2 rounded-lg ${
                  player ? getPositionColor(position) : 'bg-gray-200'
                } text-white h-24 ${player ? 'cursor-pointer hover:opacity-90' : ''}`}
              >
                {player && (
                  <div 
                    className="absolute top-1 right-1 bg-white rounded-full hover:bg-red-100"
                    onClick={(e) => handleRemovePlayer(player.id, e)}
                    title="Remove player"
                  >
                    <XCircle size={18} className="text-red-500" />
                  </div>
                )}
                
                {player ? (
                  <>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-1 overflow-hidden">
                      {player.photo ? (
                        <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                      ) : (
                        <UserCircle2 className="text-gray-400" size={24} />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-center truncate w-full">{player.name}</span>
                    <span className="text-xs opacity-80">{player.team}</span>
                  </>
                ) : (
                  <UserCircle2 className="text-gray-400" size={24} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Squad</h2>
      </div>
      
      {/* Squad Status */}
      <div className="mb-4">
        {isSquadComplete() ? (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center">
            <Check size={18} className="mr-2" />
            <span>Squad complete! You can now proceed to matchday selection.</span>
          </div>
        ) : (
          <div className="bg-amber-50 text-amber-700 p-3 rounded-lg flex items-center">
            <AlertCircle size={18} className="mr-2" />
            <span>
              Complete your squad: You need exactly 2 goalkeepers, 5 defenders, 5 midfielders, and 3 forwards.
            </span>
          </div>
        )}
      </div>
      
      {/* Position Groups */}
      {renderPositionGroup(Position.GK)}
      {renderPositionGroup(Position.DEF)}
      {renderPositionGroup(Position.MID)}
      {renderPositionGroup(Position.FWD)}
      
      {/* Empty Squad Message */}
      {squad.players.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Your squad is empty. Start adding players!
        </div>
      )}
    </div>
  );
};

export default SquadView;
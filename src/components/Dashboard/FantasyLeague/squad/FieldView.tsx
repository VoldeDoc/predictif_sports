import React from 'react';
import { UserCircle2 } from 'lucide-react';
import { Position } from '@/types';
import { useSquad } from '../context/squadContext';
const FieldView: React.FC = () => {
  const { squad, toggleMatchdaySelection, getMatchdayPlayers } = useSquad();
  
  const matchdayPlayers = getMatchdayPlayers();
  
  const getPositionColor = (position: string) => {
    switch(position) {
      case 'Goalkeeper': return 'bg-yellow-500';
      case 'Defender': return 'bg-blue-500';
      case 'Midfielder': return 'bg-green-500';
      case 'Forward': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const renderPositionRow = (position: Position) => {
    const players = matchdayPlayers.filter(p => p.position === position);
    const positionKey = position.split(' ')[0] as keyof typeof squad.formation.structure;
    const limit = squad.formation.structure[positionKey];
    
    return (
      <div className="flex justify-center items-center mb-8">
        <div className={`grid grid-cols-${limit} gap-4 w-full max-w-3xl`} style={{ gridTemplateColumns: `repeat(${limit}, minmax(0, 1fr))` }}>
          {players.map(player => (
            <div 
              key={player.id}
              className={`flex flex-col items-center cursor-pointer transition-transform hover:scale-105`}
              onClick={() => toggleMatchdaySelection(player.id)}
            >
              <div className={`w-16 h-16 rounded-full ${getPositionColor(player.position)} flex items-center justify-center mb-1 border-2 border-white shadow-md`}>
                {player.image ? (
                  <img 
                    src={player.image} 
                    alt={player.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle2 className="text-white" size={32} />
                )}
              </div>
              <span className="text-xs font-semibold text-center bg-white/80 rounded-full px-2 py-0.5 truncate max-w-full">
                {player.name}
              </span>
            </div>
          ))}
          
          {/* Empty slots */}
          {Array.from({ length: limit - players.length }).map((_, i) => (
            <div key={`empty-${position}-${i}`} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-300/50 flex items-center justify-center mb-1 border-2 border-white/30">
                <UserCircle2 className="text-gray-400" size={32} />
              </div>
              <span className="text-xs text-gray-400 bg-white/50 rounded-full px-2 py-0.5">
                Empty
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="relative mb-8 pt-4">
      <div className="absolute inset-0 bg-gradient-to-b from-green-600 to-green-700 rounded-lg -z-10"></div>
      
      {/* Field markings */}
      <div className="absolute inset-0 flex flex-col items-center -z-10">
        <div className="w-3/4 h-full border-2 border-white/30 rounded-lg mt-8 mb-4 mx-auto"></div>
        <div className="absolute w-1/3 h-1/5 border-2 border-white/30 bottom-4 left-1/2 transform -translate-x-1/2"></div>
        <div className="absolute w-40 h-40 rounded-full border-2 border-white/30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="py-8 px-4">
        {/* Formation name */}
        <div className="text-center mb-6">
          <span className="bg-white/80 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
            Formation: {squad.formation.name}
          </span>
        </div>
        
        {/* Players by position */}
        {renderPositionRow(Position.FWD)}
        {renderPositionRow(Position.MID)}
        {renderPositionRow(Position.DEF)}
        {renderPositionRow(Position.GK)}
      </div>
    </div>
  );
};

export default FieldView;
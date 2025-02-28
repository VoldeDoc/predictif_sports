import React from 'react';
import { PlusCircle, MinusCircle, Check } from 'lucide-react';
import { Player } from '@/types';
import { useSquad } from '../context/squadContext';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { addPlayer, removePlayer, canAddPlayer, squad, toggleMatchdaySelection, isSquadComplete } = useSquad();
  
  const isSelected = squad.players.some((p: Player) => p.id === player.id);
  const isInMatchday = squad.players.some((p: Player) => p.id === player.id && p.inMatchday);
  
  const handleClick = () => {
    if (isSelected) {
      // If squad is complete, toggle matchday selection
      if (isSquadComplete()) {
        toggleMatchdaySelection(player.id);
      } else {
        removePlayer(player.id);
      }
    } else if (canAddPlayer(player)) {
      addPlayer(player);
    }
  };

  const getPositionColor = (position: string) => {
    switch(position) {
      case 'Goalkeeper': return 'bg-yellow-500';
      case 'Defender': return 'bg-blue-500';
      case 'Midfielder': return 'bg-green-500';
      case 'Forward': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div 
      className={`relative flex items-center p-3 rounded-lg shadow-md transition-all ${
        isSelected 
          ? isInMatchday 
            ? 'bg-indigo-100 border-2 border-indigo-600' 
            : 'bg-indigo-50 border-2 border-indigo-300'
          : 'bg-white hover:bg-gray-50'
      } ${!isSelected && !canAddPlayer(player) ? 'opacity-50' : 'cursor-pointer'}`}
      onClick={handleClick}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden mr-3">
        <img 
          src={player.image || `https://images.unsplash.com/photo-1511886929837-354d1a99fc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80`} 
          alt={player.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{player.name}</h3>
        <div className="flex items-center text-sm">
          <span className={`${getPositionColor(player.position)} text-white px-2 py-0.5 rounded-full text-xs mr-2`}>
            {player.position}
          </span>
          <span className="text-gray-600">{player.team}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-bold text-green-600">£{player.price}M</span>
        <span className="text-sm text-gray-500">{player.points} pts</span>
      </div>
      <div className="absolute top-2 right-2">
        {isInMatchday ? (
          <Check size={20} className="text-indigo-600" />
        ) : isSelected ? (
          <MinusCircle size={20} className="text-red-500" />
        ) : canAddPlayer(player) ? (
          <PlusCircle size={20} className="text-green-500" />
        ) : null}
      </div>
    </div>
  );
};

export default PlayerCard;
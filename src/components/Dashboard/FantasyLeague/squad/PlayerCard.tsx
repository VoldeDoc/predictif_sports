import React from 'react';
import { PlusCircle, MinusCircle, Check } from 'lucide-react';
import { Player } from '@/types';
import { useSquad } from '../context/squadContext';

interface PlayerCardProps {
  player: Player;
  isInSquad?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isInSquad }) => {
  const { addPlayer, removePlayer, canAddPlayer, squad, toggleMatchdaySelection, isSquadComplete } = useSquad();
  
  // Use the isInSquad prop if provided, otherwise check the squad state
  const isSelected = isInSquad !== undefined ? isInSquad : 
    squad.players.some((p: Player) => String(p.id) === String(player.id));
  
  const isInMatchday = squad.players.some((p: Player) => 
    String(p.id) === String(player.id) && p.inMatchday);

  const handleClick = () => {
    // If specifically flagged as in squad from parent but not in context, don't try to add
    if (isInSquad === true && !squad.players.some(p => String(p.id) === String(player.id))) {
      console.log("Player already in squad from previous tab. Not modifying:", player.name);
      return;
    }
    
    if (isSelected) {
      console.log("Player is already selected:", player.name);
      if (isSquadComplete()) {
        console.log("Squad is complete. Toggling matchday selection.");
        toggleMatchdaySelection(String(player.id));
      } else {
        console.log("Removing player from squad:", player.name);
        removePlayer(String(player.id));
      }
    } else if (canAddPlayer(player)) {
      console.log("Adding player to squad:", player.name);
      addPlayer(player);
    } else {
      console.log("Cannot add player to squad:", player.name);
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
          src={player.photo || `https://images.unsplash.com/photo-1511886929837-354d1a99fc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80`} 
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
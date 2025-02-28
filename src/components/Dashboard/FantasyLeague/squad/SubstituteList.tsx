import React from 'react';
import { UserCircle2 } from 'lucide-react';
import { useSquad } from '../context/squadContext';

const SubstitutesList: React.FC = () => {
  const { getSubstitutePlayers, toggleMatchdaySelection } = useSquad();
  
  const substitutes = getSubstitutePlayers();
  
  const getPositionColor = (position: string) => {
    switch(position) {
      case 'Goalkeeper': return 'bg-yellow-500 text-white';
      case 'Defender': return 'bg-blue-500 text-white';
      case 'Midfielder': return 'bg-green-500 text-white';
      case 'Forward': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Substitutes</h3>
      
      {substitutes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {substitutes.map(player => (
            <div 
              key={player.id}
              className="flex items-center p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => toggleMatchdaySelection(player.id)}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                {player.image ? (
                  <img 
                    src={player.image} 
                    alt={player.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircle2 className="text-gray-400 w-full h-full" />
                )}
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">{player.name}</p>
                <div className="flex items-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getPositionColor(player.position)}`}>
                    {player.position}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
          No substitutes available. All players are in the matchday squad.
        </div>
      )}
    </div>
  );
};

export default SubstitutesList;
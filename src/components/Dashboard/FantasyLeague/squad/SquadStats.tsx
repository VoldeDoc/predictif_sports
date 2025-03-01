import React from 'react';
import { Wallet, Users, CheckCircle } from 'lucide-react';
import { useSquad } from '../context/squadContext';

const SquadStats: React.FC = () => {
  const { squad, getRemainingBudget, isSquadComplete } = useSquad();
  
  const remainingBudget = getRemainingBudget();
  const playerCount = squad.players.length;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold mb-3">Squad Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center p-3 bg-green-50 rounded-lg">
          <Wallet className="text-green-600 mr-3" size={24} />
          <div>
            <p className="text-sm text-gray-600">Remaining Budget</p>
            <p className="text-xl font-bold text-green-600">£{remainingBudget}M</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-blue-50 rounded-lg">
          <Users className="text-blue-600 mr-3" size={24} />
          <div>
            <p className="text-sm text-gray-600">Squad Size</p>
            <p className="text-xl font-bold text-blue-600">{playerCount}/15</p>
          </div>
        </div>
        
        {/* <div className="flex items-center p-3 bg-purple-50 rounded-lg">
          <Trophy className="text-purple-600 mr-3" size={24} />
          <div>
            <p className="text-sm text-gray-600">Total Points</p>
            <p className="text-xl font-bold text-purple-600">{squad.totalPoints}</p>
          </div>
        </div> */}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className={`flex items-center p-2 rounded-lg ${isSquadComplete() ? 'bg-green-50' : 'bg-gray-50'}`}>
          <CheckCircle className={`mr-2 ${isSquadComplete() ? 'text-green-500' : 'text-gray-400'}`} size={18} />
          <span className={`text-sm ${isSquadComplete() ? 'text-green-700' : 'text-gray-500'}`}>
            Squad Complete
          </span>
        </div>
{/*         
        <div className={`flex items-center p-2 rounded-lg ${isMatchdayReady() ? 'bg-green-50' : 'bg-gray-50'}`}>
          <CheckCircle className={`mr-2 ${isMatchdayReady() ? 'text-green-500' : 'text-gray-400'}`} size={18} />
          <span className={`text-sm ${isMatchdayReady() ? 'text-green-700' : 'text-gray-500'}`}>
            Matchday Ready
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default SquadStats;
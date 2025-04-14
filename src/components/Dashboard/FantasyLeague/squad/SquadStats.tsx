import React from 'react';
import { Wallet, Users, CheckCircle, Shield, Shirt } from 'lucide-react';
import { useSquad } from '../context/squadContext';
import { Position } from '@/types';

const SquadStats: React.FC = () => {
  const { squad, getRemainingBudget, isSquadComplete, getPositionCount } = useSquad();

  const remainingBudget = getRemainingBudget();
  const playerCount = squad.players.length;

  // Get position counts
  const gkCount = getPositionCount(Position.GK);
  const defCount = getPositionCount(Position.DEF);
  const midCount = getPositionCount(Position.MID);
  const fwdCount = getPositionCount(Position.FWD);

  // Position limits
  const positionLimits = {
    [Position.GK]: 2,
    [Position.DEF]: 5,
    [Position.MID]: 5,
    [Position.FWD]: 3,
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold mb-3">Squad Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center p-3 bg-green-50 rounded-lg">
          <Wallet className="text-green-600 mr-3" size={24} />
          <div>
            <p className="text-sm text-gray-600">Remaining Budget</p>
            <p className="text-xl font-bold text-green-600">£{(remainingBudget / 1000).toFixed(1)}B</p>
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

      {/* Position counts */}
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Positions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className={`flex items-center p-2 rounded-lg ${gkCount === positionLimits[Position.GK] ? 'bg-yellow-50' : 'bg-gray-50'}`}>
            <Shield className={`mr-2 ${gkCount === positionLimits[Position.GK] ? 'text-yellow-500' : 'text-gray-400'}`} size={18} />
            <span className="text-sm">
              GK: <span className={`font-bold ${gkCount === positionLimits[Position.GK] ? 'text-yellow-600' : 'text-gray-600'}`}>{gkCount}/{positionLimits[Position.GK]}</span>
            </span>
          </div>

          <div className={`flex items-center p-2 rounded-lg ${defCount === positionLimits[Position.DEF] ? 'bg-blue-50' : 'bg-gray-50'}`}>
            <Shield className={`mr-2 ${defCount === positionLimits[Position.DEF] ? 'text-blue-500' : 'text-gray-400'}`} size={18} />
            <span className="text-sm">
              DEF: <span className={`font-bold ${defCount === positionLimits[Position.DEF] ? 'text-blue-600' : 'text-gray-600'}`}>{defCount}/{positionLimits[Position.DEF]}</span>
            </span>
          </div>

          <div className={`flex items-center p-2 rounded-lg ${midCount === positionLimits[Position.MID] ? 'bg-green-50' : 'bg-gray-50'}`}>
            <Shirt className={`mr-2 ${midCount === positionLimits[Position.MID] ? 'text-green-500' : 'text-gray-400'}`} size={18} />
            <span className="text-sm">
              MID: <span className={`font-bold ${midCount === positionLimits[Position.MID] ? 'text-green-600' : 'text-gray-600'}`}>{midCount}/{positionLimits[Position.MID]}</span>
            </span>
          </div>

          <div className={`flex items-center p-2 rounded-lg ${fwdCount === positionLimits[Position.FWD] ? 'bg-red-50' : 'bg-gray-50'}`}>
            <Shirt className={`mr-2 ${fwdCount === positionLimits[Position.FWD] ? 'text-red-500' : 'text-gray-400'}`} size={18} />
            <span className="text-sm">
              FWD: <span className={`font-bold ${fwdCount === positionLimits[Position.FWD] ? 'text-red-600' : 'text-gray-600'}`}>{fwdCount}/{positionLimits[Position.FWD]}</span>
            </span>
          </div>
        </div>
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
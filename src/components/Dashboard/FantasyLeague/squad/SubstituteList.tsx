import React, { useMemo } from 'react';
import { UserCircle2, AlertCircle } from 'lucide-react';
import { useSquad } from '../context/squadContext';
import { Player, Position } from '@/types';

const FORMATIONS: { [key: string]: number[] } = {
  "4-4-2": [1, 4, 4, 2],
  "4-3-3": [1, 4, 3, 3],
  "3-5-2": [1, 3, 5, 2],
  "5-3-2": [1, 5, 3, 2],
  "4-2-3-1": [1, 4, 2, 3, 1],
  "3-4-3": [1, 3, 4, 3]
};

const SubstitutesList: React.FC = () => {
  const { squad, getSubstitutePlayers, getMatchdayPlayers, toggleMatchdaySelection } = useSquad();

  const substitutes = getSubstitutePlayers();
  const matchdayPlayers = getMatchdayPlayers();
  const formationName = `${squad.formation.structure.DEF}-${squad.formation.structure.MID}-${squad.formation.structure.FWD}`;
  const formationPattern = FORMATIONS[formationName] || FORMATIONS["4-4-2"];

  // Calculate position limits based on formation
  const positionLimits = useMemo(() => {
    const limits = {
      [Position.GK]: formationPattern[0],
      [Position.DEF]: formationPattern[1],
      [Position.MID]: formationPattern[2],
      [Position.FWD]: formationPattern[3]
    };

    // Handle special formations like 4-2-3-1
    if (formationName === "4-2-3-1") {
      limits[Position.MID] = formationPattern[2] + formationPattern[3]; // 2 + 3 = 5 midfielders
      limits[Position.FWD] = formationPattern[4]; // 1 forward
    }

    return limits;
  }, [formationPattern, formationName]);

  // Get current count of players by position
  const currentPositionCounts = useMemo(() => {
    return matchdayPlayers.reduce((counts, p) => {
      counts[p.position] = (counts[p.position] || 0) + 1;
      return counts;
    }, {} as Record<Position, number>);
  }, [matchdayPlayers]);

  const handlePlayerSelection = (playerId: number) => {
    const player = substitutes.find(p => p.id === playerId);
    if (!player) return;

    // Check if adding this player would exceed position limit
    const currentCount = currentPositionCounts[player.position] || 0;
    if (currentCount >= positionLimits[player.position]) {
      alert(`Formation ${formationName} only allows ${positionLimits[player.position]} ${player.position}s`);
      return;
    }

    toggleMatchdaySelection(playerId);
  };

  const getStatusColor = (status: Player['status'] | undefined) => {
    if (!status) return '';

    if (!status.isAvailable && status.reason) {
      switch (status.reason) {
        case 'SUSPENDED': return 'bg-red-50 border border-red-300';
        case 'INJURED': return 'bg-amber-50 border border-amber-300';
        case 'UNAVAILABLE': return 'bg-slate-50 border border-slate-300';
        default: return 'bg-gray-50 border border-gray-300';
      }
    }
    return '';
  };

  const getStatusText = (status: Player['status'] | undefined) => {
    if (!status) return '';

    if (!status.isAvailable) {
      const reason = status.reason || 'UNAVAILABLE';
      const returnDate = status.expectedReturn ?
        new Date(status.expectedReturn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
      return `${reason}${returnDate ? ` - Returns ${returnDate}` : ''}`;
    }
    return '';
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case Position.GK: return 'bg-yellow-500 text-white';
      case Position.DEF: return 'bg-blue-500 text-white';
      case Position.MID: return 'bg-green-500 text-white';
      case Position.FWD: return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Choose squad for matchday</h3>

      {substitutes.length > 0 ? (
        <>
          <div className="mb-3 text-sm">
            <p className="font-semibold">Formation {formationName} limits:</p>
            <div className="flex justify-start gap-4 mt-1">
              <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                GK: {currentPositionCounts[Position.GK] || 0}/{positionLimits[Position.GK]}
              </span>
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                DEF: {currentPositionCounts[Position.DEF] || 0}/{positionLimits[Position.DEF]}
              </span>
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                MID: {currentPositionCounts[Position.MID] || 0}/{positionLimits[Position.MID]}
              </span>
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                FWD: {currentPositionCounts[Position.FWD] || 0}/{positionLimits[Position.FWD]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
            {substitutes.map(player => {
              const currentCount = currentPositionCounts[player.position] || 0;
              const isDisabled = currentCount >= positionLimits[player.position];
              const statusColor = getStatusColor(player.status);
              const statusText = getStatusText(player.status);

              return (
                <div
                  key={player.id}
                  className={`flex flex-col lg:flex-col items-center p-4 rounded-lg border ${statusColor || 'bg-gray-50'
                    } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
                    }`}
                  onClick={() => !isDisabled && handlePlayerSelection(player.id)}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
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
                  <div className="text-center">
                    <p className="text-sm font-medium">{player.name}</p>
                      <p className={`text-xs px-2 py-0.5 rounded-full ${getPositionColor(player.position)}`}>
                        {player.position}
                      </p>
                      <p className="text-xs text-gray-600">{player.team}</p>
                  </div>
                  {player.status && !player.status.isAvailable && (
                    <div className={`text-xs px-2 py-1 rounded flex items-center mt-2 ${player.status.reason === 'SUSPENDED' ? 'bg-red-100 text-red-700' :
                        player.status.reason === 'INJURED' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-700'
                      }`}>
                      <AlertCircle size={12} className="mr-1 flex-shrink-0" />
                      <span className="font-medium">{statusText}</span>
                    </div>
                  )}
                </div>

              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
          No substitutes available. All players are in the matchday squad.
        </div>
      )}
    </div>
  );
};

export default SubstitutesList;
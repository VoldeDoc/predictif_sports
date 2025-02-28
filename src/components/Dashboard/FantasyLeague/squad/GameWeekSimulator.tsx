import React, { useState } from 'react';
import { gameweeks } from '../data/gameweeks';
import { Play, AlertCircle, Check } from 'lucide-react';
import { useSquad } from '../context/squadContext';

const GameweekSimulator: React.FC = () => {
  const { squad, simulateGameweek, isMatchdayReady } = useSquad();
  const [currentGameweek, setCurrentGameweek] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState<{points: number, message: string} | null>(null);
  
  const handleSimulate = () => {
    if (!isMatchdayReady()) {
      setResults({
        points: 0,
        message: "Your matchday squad is not ready! Select 11 players according to your formation."
      });
      return;
    }
    
    setIsSimulating(true);
    
    // Simulate loading
    setTimeout(() => {
      const previousPoints = squad.totalPoints;
      simulateGameweek();
      
      setCurrentGameweek(prev => prev + 1);
      
      // Calculate points gained in this gameweek
      setTimeout(() => {
        const pointsGained = squad.totalPoints - previousPoints;
        setResults({
          points: pointsGained,
          message: getResultMessage(pointsGained)
        });
        setIsSimulating(false);
      }, 500);
    }, 1500);
  };
  
  const getResultMessage = (points: number): string => {
    if (points > 70) return "Incredible gameweek! Your team dominated!";
    if (points > 50) return "Excellent performance from your squad!";
    if (points > 30) return "Solid gameweek, good job!";
    if (points > 15) return "Average performance, room for improvement.";
    return "Tough gameweek. Consider making some transfers.";
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold mb-3">Gameweek Simulator</h2>
      
      {currentGameweek < gameweeks.length ? (
        <div>
          <div className="mb-4">
            <h3 className="font-medium text-gray-700">
              {currentGameweek === 0 ? "Ready to start the season!" : `Completed: ${currentGameweek}/${gameweeks.length} gameweeks`}
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${(currentGameweek / gameweeks.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {results && (
            <div className={`mb-4 p-3 rounded-lg ${results.points > 30 ? 'bg-green-50' : 'bg-yellow-50'}`}>
              <h4 className="font-semibold">
                {results.points > 30 ? 'Great result!' : 'Average result'}
              </h4>
              <p className="text-sm text-gray-700">{results.message}</p>
              <p className="font-bold mt-1">
                Points earned: <span className="text-indigo-600">{results.points}</span>
              </p>
            </div>
          )}
          
          <button
            className={`w-full py-2 px-4 rounded-lg flex items-center justify-center ${
              isSimulating 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
            onClick={handleSimulate}
            disabled={isSimulating}
          >
            {isSimulating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Simulating {gameweeks[currentGameweek]?.name}...
              </>
            ) : (
              <>
                <Play size={18} className="mr-2" />
                {currentGameweek === 0 
                  ? "Start Season" 
                  : `Simulate ${gameweeks[currentGameweek]?.name}`}
              </>
            )}
          </button>
          
          {!isMatchdayReady() && (
            <div className="mt-3 flex items-start text-sm text-amber-700 bg-amber-50 p-2 rounded">
              <AlertCircle size={16} className="mr-1 flex-shrink-0 mt-0.5" />
              <span>Your matchday squad is not ready. Select 11 players according to your formation.</span>
            </div>
          )}
          
          {isMatchdayReady() && (
            <div className="mt-3 flex items-start text-sm text-green-700 bg-green-50 p-2 rounded">
              <Check size={16} className="mr-1 flex-shrink-0 mt-0.5" />
              <span>Your matchday squad is ready! You can simulate the gameweek.</span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <h3 className="font-bold text-lg mb-2">Season Complete!</h3>
          <p className="text-gray-600 mb-3">You finished with {squad.totalPoints} points.</p>
          <button
            className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={() => {
              setCurrentGameweek(0);
              setResults(null);
            }}
          >
            Start New Season
          </button>
        </div>
      )}
    </div>
  );
};

export default GameweekSimulator;
import React from "react";

interface Player {
  name: string;
  number: number;
  position: string;
}

interface FormationProps {
  formation: string;
  players: Player[];
}

const FORMATIONS: { [key: string]: number[] } = {
  "4-4-2": [1, 4, 4, 2], 
  "4-3-3": [1, 4, 3, 3],
  "3-5-2": [1, 3, 5, 2],
  "5-3-2": [1, 5, 3, 2],
  "4-2-3-1": [1, 4, 2, 3, 1]
};

const FootballFormation: React.FC<FormationProps> = ({ formation, players }) => {
  const formationPattern = FORMATIONS[formation] || FORMATIONS["4-4-2"];
  let playerIndex = 0;

  return (
    <div className="relative w-full max-w-md mx-auto bg-green-600 p-4 rounded-lg shadow-lg">
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold">
        {formation} Formation
      </div>

      <div className="grid grid-rows-5 gap-4 mt-10">
        {formationPattern.map((count, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-4">
            {Array(count)
              .fill(null)
              .map((_, colIndex) => {
                const player = players[playerIndex++] || { name: "?", number: 0, position: "" };
                return (
                  <div key={colIndex} className="flex flex-col items-center text-white">
                    <div className="w-10 h-10 bg-blue-500 text-center rounded-full flex items-center justify-center">
                      {player.number}
                    </div>
                    <span className="text-xs font-bold">{player.name}</span>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

interface MatchLineupProps {
  formation: string;
  players: Player[];
}

const MatchLineup: React.FC<MatchLineupProps> = ({ formation, players }) => {
  return <FootballFormation formation={formation} players={players} />;
};

export default MatchLineup;
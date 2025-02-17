import React from "react";

interface Player {
  name: string;
  number: number;
  position: string;
}

interface FormationProps {
  formation: string;
  players: Player[];
  isHomeTeam: boolean;
}

const FORMATIONS: { [key: string]: number[] } = {
  "4-4-2": [1, 4, 4, 2],
  "4-3-3": [1, 4, 3, 3],
  "3-5-2": [1, 3, 5, 2],
  "5-3-2": [1, 5, 3, 2],
  "4-2-3-1": [1, 4, 2, 3, 1]
};

const SoccerField: React.FC<{ homeFormation: FormationProps; awayFormation: FormationProps }> = ({ homeFormation, awayFormation }) => {
  return (
    <div className="relative w-full aspect-[2/3] max-w-3xl mx-auto bg-green-700 rounded-lg shadow-lg border-white border-4">
      {/* Field markings */}
      <div className="absolute inset-0">
        {/* Midfield line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white"></div>
        
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 w-20 h-20 md:w-28 md:h-28 border-white border-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Penalty areas */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/6 border-white border-2"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/6 border-white border-2"></div>
        
        {/* Goal areas */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[8%] border-white border-2"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[8%] border-white border-2"></div>
      </div>

      {/* Teams */}
      <FootballFormation {...homeFormation} />
      <FootballFormation {...awayFormation} />
    </div>
  );
};

const FootballFormation: React.FC<FormationProps> = ({ formation, players, isHomeTeam }) => {
  const formationPattern = FORMATIONS[formation] || FORMATIONS["4-4-2"];
  let playerIndex = 0;

  const getRowPositions = (rowIndex: number, totalRows: number, isGoalkeeper: boolean) => {
    if (isGoalkeeper) {
      return isHomeTeam ? 92 : 8; // Position goalkeepers at 8% and 92% of field height
    }

    if (isHomeTeam) {
      // Home team (bottom half)
      const basePosition = 85; // Start from 85% down
      const totalSpace = 35; // Use 35% of field height
      const spacing = totalSpace / totalRows;
      return basePosition - (rowIndex * spacing);
    } else {
      // Away team (top half)
      const basePosition = 15; // Start from 15% down
      const totalSpace = 35; // Use 35% of field height
      const spacing = totalSpace / totalRows;
      return basePosition + (rowIndex * spacing);
    }
  };

  return (
    <>
      {formationPattern.map((playersInRow, rowIndex) => {
        return Array(playersInRow).fill(null).map((_, colIndex) => {
          const player = players[playerIndex++] || { name: "?", number: 0, position: "" };
          const isGoalkeeper = player.position === "GK";
          const yPosition = getRowPositions(rowIndex, formationPattern.length, isGoalkeeper);
          
          // Center goalkeeper, space other players across the width
          const xPosition = isGoalkeeper 
            ? 50 // Center goalkeeper
            : 10 + ((80 / (playersInRow + (rowIndex === 0 ? -1 : 1))) * (colIndex + (rowIndex === 0 ? 0 : 1))); // Adjust spacing for non-goalkeepers

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${yPosition}%`,
                left: `${xPosition}%`,
              }}
            >
              <div className={`
                flex flex-col items-center
                transition-transform hover:scale-110
                ${isGoalkeeper ? "text-yellow-400" : isHomeTeam ? "text-blue-400" : "text-red-400"}
              `}>
                <div className={`
                  w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10
                  rounded-full flex items-center justify-center
                  ${isGoalkeeper ? "bg-yellow-500" : isHomeTeam ? "bg-blue-500" : "bg-red-500"}
                  text-white text-[10px] sm:text-xs md:text-sm font-bold
                  shadow-md
                `}>
                  {player.number}
                </div>
                <span className="mt-1 text-[8px] sm:text-[10px] md:text-xs font-semibold text-white whitespace-nowrap">
                  {player.name}
                </span>
              </div>
            </div>
          );
        });
      })}
    </>
  );
};

interface MatchLineupProps {
  homeFormation: string;
  awayFormation: string;
  homePlayers: Player[];
  awayPlayers: Player[];
}

const MatchLineup: React.FC<MatchLineupProps> = ({ homeFormation, awayFormation, homePlayers, awayPlayers }) => {
  return (
    <SoccerField
      homeFormation={{ formation: homeFormation, players: homePlayers, isHomeTeam: true }}
      awayFormation={{ formation: awayFormation, players: awayPlayers, isHomeTeam: false }}
    />
  );
};

export default MatchLineup;

export const SquadLineUp: React.FC<MatchLineupProps> = ({ homeFormation, awayFormation, homePlayers, awayPlayers }) => {
  return (
    <SoccerField
      homeFormation={{ formation: homeFormation, players: homePlayers, isHomeTeam: true }}
      awayFormation={{ formation: awayFormation, players: awayPlayers, isHomeTeam: false }}
    />
  );
}
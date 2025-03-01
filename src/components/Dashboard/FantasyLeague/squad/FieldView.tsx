import React from "react";
import { useSquad } from "../context/squadContext";
import { Player, Position } from "@/types";

// Updated to include goalkeeper in formation patterns
const FORMATIONS: { [key: string]: number[] } = {
  "4-4-2": [1, 4, 4, 2],
  "4-3-3": [1, 4, 3, 3],
  "3-5-2": [1, 3, 5, 2],
  "5-3-2": [1, 5, 3, 2],
  "4-2-3-1": [1, 4, 2, 3, 1],
  "3-4-3": [1, 3, 4, 3]  // Add the missing 3-4-3 formation
};

const FieldView: React.FC = () => {
  const { squad, getMatchdayPlayers, toggleMatchdaySelection } = useSquad();
  const matchdayPlayers = getMatchdayPlayers();
  const formationName = `${squad.formation.structure.DEF}-${squad.formation.structure.MID}-${squad.formation.structure.FWD}`;
  // const formationPattern = FORMATIONS[formationName] || FORMATIONS["4-4-2"];

  const goalkeeper = matchdayPlayers.find((p) => p.position === Position.GK);
  const defenders = matchdayPlayers.filter((p) => p.position === Position.DEF);
  const midfielders = matchdayPlayers.filter((p) => p.position === Position.MID);
  const forwards = matchdayPlayers.filter((p) => p.position === Position.FWD);

  const orderedPlayers = [
    goalkeeper,
    ...defenders,
    ...midfielders,
    ...forwards,
  ].filter((player): player is Player => player !== undefined);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold mb-3">Match Day Squad</h2>
      <div className="relative w-full aspect-[2/3] max-w-3xl mx-auto bg-green-700 rounded-lg shadow-lg border-white border-4">
        {/* Field markings */}
        <div className="absolute inset-0">
          {/* Center line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white"></div>

          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 w-20 h-20 md:w-28 md:h-28 border-white border-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

          {/* Penalty area - bottom */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/5 border-white border-2 border-b-0"></div>

          {/* Goal area - bottom */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[8%] border-white border-2 border-b-0"></div>
        </div>

        <FootballFormation
          formation={formationName}
          players={orderedPlayers}
          onPlayerClick={toggleMatchdaySelection}
        />
      </div>
    </div>
  );
};

interface FootballFormationProps {
  formation: string;
  players: Player[];
  onPlayerClick: (playerId: number) => void;
}

const FootballFormation: React.FC<FootballFormationProps> = ({
  formation,
  players,
  onPlayerClick
}) => {
  const formationPattern = FORMATIONS[formation] || FORMATIONS["4-4-2"];

  const goalkeepers = players.filter(p => p.position === Position.GK);
  const defenders = players.filter(p => p.position === Position.DEF);
  const midfielders = players.filter(p => p.position === Position.MID);
  const forwards = players.filter(p => p.position === Position.FWD);

  // Build position groups based on formation pattern
  const positionGroups = [
    { players: goalkeepers, count: formationPattern[0] },
    { players: defenders, count: formationPattern[1] },
    { players: midfielders, count: formationPattern[2] },
    { players: forwards, count: formationPattern[3] }
  ];

  // If there's a 5th number in the formation (like 4-2-3-1), adjust midfielders split
  if (formationPattern.length > 4) {
    const totalMidfielders = formationPattern[2] + formationPattern[3];
    positionGroups[2] = { 
      players: midfielders.slice(0, totalMidfielders), 
      count: totalMidfielders 
    };
    positionGroups[3] = { 
      players: forwards, 
      count: formationPattern[4] 
    };
  }

  // Ensure we're using the correct number of players per position
  positionGroups.forEach((group) => {
    group.players = group.players.slice(0, group.count);
  });

  return (
    <>
      {positionGroups.map((group, rowIndex) => {
        const { players: positionPlayers, count } = group;

        return Array(Math.min(count, positionPlayers.length))
          .fill(null)
          .map((_, colIndex) => {
            const player = positionPlayers[colIndex];
            if (!player) return null;

            // Adjust positioning - goalkeeper at bottom, forwards at top
            const yPosition = 90 - rowIndex * 20;

            // Center goalkeeper, spread other players across width
            const xPosition = rowIndex === 0
              ? 50 // Center goalkeeper
              : 10 + (80 / (count + 1)) * (colIndex + 1);

            // Determine position color
            let bgColor;
            switch (player.position) {
              case Position.GK:
                bgColor = 'bg-yellow-500';
                break;
              case Position.DEF:
                bgColor = 'bg-blue-500';
                break;
              case Position.MID:
                bgColor = 'bg-green-500';
                break;
              case Position.FWD:
                bgColor = 'bg-red-500';
                break;
              default:
                bgColor = 'bg-gray-500';
            }

            return (
              <div
                key={player.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${yPosition}%`, left: `${xPosition}%` }}
                onClick={() => onPlayerClick(player.id)}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md ${bgColor}`}>
                  {player.id % 99 + 1}
                </div>
                <span className="mt-1 text-xs text-white font-semibold">{player.name}</span>
              </div>
            );
          });
      })}
    </>
  );
};

export default FieldView;
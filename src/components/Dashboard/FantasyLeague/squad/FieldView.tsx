import React, { useState, useEffect } from "react";
import { useSquad } from "../context/squadContext";
import { Player, Position } from "@/types";
import { Info } from "lucide-react";

const FORMATIONS: { [key: string]: number[] } = {
  "4-4-2": [1, 4, 4, 2],
  "4-3-3": [1, 4, 3, 3],
  "3-5-2": [1, 3, 5, 2],
  "5-3-2": [1, 5, 3, 2],
  "4-2-3-1": [1, 4, 2, 3, 1],
  "3-4-3": [1, 3, 4, 3]
};

// Remove the props interface since we're using context
const FieldView: React.FC = () => {
  const { squad, getMatchdayPlayers, toggleMatchdaySelection } = useSquad();
  const [showHelp, setShowHelp] = useState(true);



  // Get players to display on field
  const matchdayPlayers = getMatchdayPlayers();
  const formationName = `${squad.formation.structure.DEF}-${squad.formation.structure.MID}-${squad.formation.structure.FWD}`;

  // Get players by position for the field
  const goalkeeper = matchdayPlayers.find((p) => p.position === Position.GK);
  const defenders = matchdayPlayers.filter((p) => p.position === Position.DEF);
  const midfielders = matchdayPlayers.filter((p) => p.position === Position.MID);
  const forwards = matchdayPlayers.filter((p) => p.position === Position.FWD);

  // Create properly ordered array of players
  const orderedPlayers = [
    goalkeeper,
    ...defenders,
    ...midfielders,
    ...forwards,
  ].filter((player): player is Player => player !== undefined);

  // Calculate missing players by position based on formation
  const formationPattern = FORMATIONS[formationName] || FORMATIONS["4-4-2"];
  const missingGK = formationPattern[0] - (goalkeeper ? 1 : 0);
  const missingDEF = formationPattern[1] - defenders.length;
  const missingMID = formationPattern[2] - midfielders.length;
  const missingFWD = formationPattern[3] - forwards.length;

  const hasMissingPlayers = missingGK > 0 || missingDEF > 0 || missingMID > 0 || missingFWD > 0;

  // Function to handle player selection from the field (for removing players)
  const handlePlayerClick = (playerId: number | string) => {
    console.log("FIELD VIEW - Toggling player matchday status:", playerId);
    toggleMatchdaySelection(playerId);
  };

  // Hide help message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelp(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Match Day Squad</h2>

        {/* Missing players indicator */}
        {hasMissingPlayers && (
          <div className="text-amber-600 text-sm font-medium flex items-center">
            <Info className="w-4 h-4 mr-1" />
            <span>
              Missing: {missingGK > 0 ? `${missingGK} GK ` : ''}
              {missingDEF > 0 ? `${missingDEF} DEF ` : ''}
              {missingMID > 0 ? `${missingMID} MID ` : ''}
              {missingFWD > 0 ? `${missingFWD} FWD` : ''}
            </span>
          </div>
        )}
      </div>

      {/* Help text */}
      {showHelp && (
        <div className="bg-blue-50 p-2 rounded-md mb-3 text-sm text-blue-800">
          Click players on the field to remove them. Select players from the substitute bench to add them.
        </div>
      )}



      {/* Football field */}
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

        {/* Show empty placeholder positions if no players are selected */}
        {orderedPlayers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 px-4 py-2 rounded text-center">
              <p className="text-sm text-gray-600">Select players from the bench to build your team</p>
            </div>
          </div>
        )}

        {/* Simplified direct player rendering instead of nested component */}
        {/* GOALKEEPER */}

        {/* // GOALKEEPER */}
        {goalkeeper && (
          <div
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
            style={{ top: "85%", left: "50%" }}
            onClick={() => handlePlayerClick(goalkeeper.id)}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md bg-yellow-500 hover:ring-2 hover:ring-white">
              {isNaN(Number(goalkeeper.id)) ? '1' : (Number(goalkeeper.id) % 99 + 1).toString()}
            </div>
            <span className="mt-1 text-xs text-white font-semibold text-center block whitespace-nowrap bg-black bg-opacity-50 px-1 rounded">
              {goalkeeper.name}
            </span>
          </div>
        )}

        {/* // DEFENDERS */}
        {defenders.map((player, index) => {
          const total = defenders.length;
          const spacing = 80 / (total + 1);
          const xPosition = 10 + spacing * (index + 1);

          return (
            <div
              key={`def-${player.id}`}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
              style={{ top: "65%", left: `${xPosition}%` }}
              onClick={() => handlePlayerClick(player.id)}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md bg-blue-500 hover:ring-2 hover:ring-white">
                {isNaN(Number(player.id)) ? (index + 2).toString() : (Number(player.id) % 99 + 1).toString()}
              </div>
              <span className="mt-1 text-xs text-white font-semibold text-center block whitespace-nowrap bg-black bg-opacity-50 px-1 rounded">
                {player.name}
              </span>
            </div>
          );
        })}

        {/* // MIDFIELDERS */}
        {midfielders.map((player, index) => {
          const total = midfielders.length;
          const spacing = 80 / (total + 1);
          const xPosition = 10 + spacing * (index + 1);

          return (
            <div
              key={`mid-${player.id}`}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
              style={{ top: "40%", left: `${xPosition}%` }}
              onClick={() => handlePlayerClick(player.id)}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md bg-green-500 hover:ring-2 hover:ring-white">
                {isNaN(Number(player.id)) ? (index + 6).toString() : (Number(player.id) % 99 + 1).toString()}
              </div>
              <span className="mt-1 text-xs text-white font-semibold text-center block whitespace-nowrap bg-black bg-opacity-50 px-1 rounded">
                {player.name}
              </span>
            </div>
          );
        })}

        {/* // FORWARDS */}
        {forwards.map((player, index) => {
          const total = forwards.length;
          const spacing = 80 / (total + 1);
          const xPosition = 10 + spacing * (index + 1);

          return (
            <div
              key={`fwd-${player.id}`}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
              style={{ top: "15%", left: `${xPosition}%` }}
              onClick={() => handlePlayerClick(player.id)}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md bg-red-500 hover:ring-2 hover:ring-white">
                {isNaN(Number(player.id)) ? (index + 10).toString() : (Number(player.id) % 99 + 1).toString()}
              </div>
              <span className="mt-1 text-xs text-white font-semibold text-center block whitespace-nowrap bg-black bg-opacity-50 px-1 rounded">
                {player.name}
              </span>
            </div>
          );
        })}

        {/* EMPTY POSITIONS */}
        {/* Show empty goalkeeper slot if missing */}
        {missingGK > 0 && !goalkeeper && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: "85%", left: "50%" }}
          >
            <div className="w-10 h-10 rounded-full border-2 border-white border-dashed flex items-center justify-center">
              <span className="text-white text-xs">GK</span>
            </div>
          </div>
        )}

        {/* Show empty defender slots if missing */}
        {Array.from({ length: formationPattern[1] - defenders.length }).map((_, index) => {
          const total = formationPattern[1];
          const filledCount = defenders.length;
          const spacing = 80 / (total + 1);
          const xPosition = 10 + spacing * (filledCount + index + 1);

          return (
            <div
              key={`empty-def-${index}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: "65%", left: `${xPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full border-2 border-white border-dashed flex items-center justify-center">
                <span className="text-white text-xs">DEF</span>
              </div>
            </div>
          );
        })}

        {/* Show empty midfielder slots if missing */}
        {Array.from({ length: formationPattern[2] - midfielders.length }).map((_, index) => {
          const total = formationPattern[2];
          const filledCount = midfielders.length;
          const spacing = 80 / (total + 1);
          const xPosition = 10 + spacing * (filledCount + index + 1);

          return (
            <div
              key={`empty-mid-${index}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: "40%", left: `${xPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full border-2 border-white border-dashed flex items-center justify-center">
                <span className="text-white text-xs">MID</span>
              </div>
            </div>
          );
        })}

        {/* Show empty forward slots if missing */}
        {Array.from({ length: formationPattern[3] - forwards.length }).map((_, index) => {
          const total = formationPattern[3];
          const filledCount = forwards.length;
          const spacing = 80 / (total + 1);
          const xPosition = 10 + spacing * (filledCount + index + 1);

          return (
            <div
              key={`empty-fwd-${index}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: "15%", left: `${xPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full border-2 border-white border-dashed flex items-center justify-center">
                <span className="text-white text-xs">FWD</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FieldView;
import React from "react";
import Card from "../Ui/Card";

interface Match {
  homeTeam: {
    name: string;
    logo: string;
    score?: number;
  };
  awayTeam: {
    name: string;
    logo: string;
    score?: number;
  };
  startTime: Date;
  isLive?: boolean;
}

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const currentTime = new Date();
  const matchEnded = currentTime > match.startTime;

  return (
    <Card className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4">
      <div className="grid grid-cols-3 items-center text-center">
        {/* Home Team */}
        <div className="flex flex-col items-center space-y-2">
          <img
            src={match.homeTeam.logo}
            alt={`${match.homeTeam.name} logo`}
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
          />
          <div className="text-sm sm:text-lg font-semibold">{match.homeTeam.name}</div>
        </div>

        {/* Match Status & Score */}
        <div className="flex flex-col items-center space-y-2">
          <span className={`px-2 py-1 text-xs sm:text-sm font-semibold text-white rounded-full ${matchEnded ? 'bg-gray-500' : 'bg-red-500'}`}>
            {matchEnded ? "ENDED" : "LIVE"}
          </span>
          <div className="flex items-center space-x-2 sm:space-x-4 text-xl sm:text-2xl font-bold text-gray-800">
            <span>{match.homeTeam.score ?? 0}</span>
            <span className="text-lg sm:text-xl font-semibold text-gray-600">-</span>
            <span>{match.awayTeam.score ?? 0}</span>
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center space-y-2">
          <img
            src={match.awayTeam.logo}
            alt={`${match.awayTeam.name} logo`}
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
          />
          <div className="text-sm sm:text-lg font-semibold">{match.awayTeam.name}</div>
        </div>
      </div>
    </Card>
  );
};

export default MatchCard;

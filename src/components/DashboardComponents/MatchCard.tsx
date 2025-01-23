import React from "react";
import Card from "../Ui/Card";

interface Match {
  homeTeam: {
    name: string;
    logo: string;
    score?: number; // Add home team score
  };
  awayTeam: {
    name: string;
    logo: string;
    score?: number; // Add away team score
  };
  startTime: Date;
  isLive?: boolean;
  predictedScore?: {
    home: number;
    away: number;
  };
}

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const currentTime = new Date();
  const isLive = match.isLive || currentTime >= match.startTime;

  const matchTime = match.startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Card className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col p-4 space-y-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        {/* Home Team */}
        <div className="flex flex-col items-center space-y-2">
          <img
            src={match.homeTeam.logo}
            alt={`${match.homeTeam.name} logo`}
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          />
          <div className="text-sm sm:text-lg font-semibold text-center">
            {match.homeTeam.name}
          </div>
        </div>

        {/* Match Status and Scores */}
        <div className="flex flex-col items-center space-y-2 text-center">
          {isLive ? (
            <span className="px-2 py-1 text-xs sm:text-sm font-semibold text-white bg-red-500 rounded-full">
              LIVE
            </span>
          ) : (
            <span className="text-xs sm:text-sm text-gray-500">{matchTime}</span>
          )}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-lg sm:text-2xl font-bold text-gray-800">
              {match.homeTeam.score !== undefined ? match.homeTeam.score : 0} {/* Default to 0 if score is undefined */}
            </span>
            <span className="text-base sm:text-lg font-semibold text-gray-600">-</span>
            <span className="text-lg sm:text-2xl font-bold text-gray-800">
              {match.awayTeam.score !== undefined ? match.awayTeam.score : 0} {/* Default to 0 if score is undefined */}
            </span>
          </div>
          {match.predictedScore && (
            <div className="text-xs sm:text-sm text-gray-500">
              Predicted: {match.predictedScore.home} - {match.predictedScore.away}
            </div>
          )}
          <span className="text-xs text-gray-400">Today</span>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center space-y-2">
          <img
            src={match.awayTeam.logo}
            alt={`${match.awayTeam.name} logo`}
            className="w-12 h-12 sm:w-20 sm:h-20 object-contain"
          />
          <div className="text-sm sm:text-lg font-semibold text-center">
            {match.awayTeam.name}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MatchCard;
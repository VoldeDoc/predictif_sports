import React from "react";
import MatchCard from "./MatchCard";

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

interface ResultsMatchesProps {
  matches: Match[];
  loading: boolean;
}

const ResultsMatches: React.FC<ResultsMatchesProps> = ({ matches, loading }) => {
  if (loading) {
    return <div>Loading matches...</div>;
  }

  return (
    <div className="space-y-4 overflow-y-auto h-96 p-2">
      {matches.length > 0 ? (
        matches.map((match, index) => <MatchCard key={index} match={match} />)
      ) : (
        <div className="text-center text-gray-500">No matches have ended yet.</div>
      )}
    </div>
  );
};

export default ResultsMatches;

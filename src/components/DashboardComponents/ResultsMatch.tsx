import useDashBoardManagement from "@/hooks/useDashboard";
import MatchCard from "./MatchCard";
import { useEffect, useState } from "react";

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

const ResultsMatches = () => {
  const { getResultMatch } = useDashBoardManagement();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const apiData = await getResultMatch();
        const transformedMatches: Match[] = apiData[0].map((match: any) => ({
          homeTeam: {
            name: match.home_club_name,
            logo: match.home_club_logo,
            score: match.home_score,
          },
          awayTeam: {
            name: match.away_club_name,
            logo: match.away_club_logo,
            score: match.away_score,
          },
          startTime: new Date(`${match.game_start_date}T${match.game_start_time}`),
        }));
        setMatches(transformedMatches);
      } catch (error) {
        setLoading(false)
        console.error("Failed to fetch matches", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [getResultMatch]);

  if (loading) {
    return <div>Loading matches...</div>;
  }

  return (
    <div className="space-y-4 overflow-y-auto h-96">
      {matches.length > 0 ? (
        matches.map((match, index) => <MatchCard key={index} match={match} />)
      ) : (
        <div>No matches have ended yet.</div>
      )}
    </div>
  );
};

export default ResultsMatches;

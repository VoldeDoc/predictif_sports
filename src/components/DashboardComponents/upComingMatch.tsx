import useDashBoardManagement from "@/hooks/useDashboard";
import { useEffect, useState } from "react";

export default function UpcomingMatches() {
  const { getUpcomingMatch } = useDashBoardManagement();
  const [upcomingMatch, setUpcomingMatch] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getUpcomingMatch();
        setUpcomingMatch(response[0]); // Assumes data is an array of matches
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    })();
  }, []);

  return (
    <div className="max-h-screen overflow-y-auto p-4 h-96">
      {upcomingMatch.map((match: any, index: number) => (
        <div key={index} className="mb-4">
          {/* League and Country */}
          <div className="flex flex-row space-x-2">
            <div>
              <img
                src="assets/images/dashboard/dashboard/99.svg"
                alt=""
                className="w-7 h-7"
              />
            </div>
            <div>
              <h1 className="text-xs">Premier League</h1>
              <h1 className="text-sm">England</h1>
            </div>
          </div>
          <hr className="border-t-2 py-2 bg-gray-200" />

          {/* Match Details */}
          <div className="flex flex-row space-x-3 mt-4 rounded-lg bg-slate-200 px-4 py-4 border-l-4 border-green-500">
            {/* Game Start Time */}
            <div className="text-center flex items-center justify-center">
              <h1>{match.game_start_time}</h1>
            </div>

            {/* Teams */}
            <div className="space-y-5">
              <div className="flex flex-row space-x-2 items-center">
                <img
                  src={match.home_club_logo}
                  alt={`${match.home_club_name} Logo`}
                  className="w-6 h-6"
                />
                <h1>{match.home_club_name}</h1>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <img
                  src={match.away_club_logo}
                  alt={`${match.away_club_name} Logo`}
                  className="w-6 h-6"
                />
                <h1>{match.away_club_name}</h1>
              </div>
            </div>

            {/* Scores */}
            <div className="space-y-5">
              <h1>{match.home_score}</h1>
              <h1>{match.away_score}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

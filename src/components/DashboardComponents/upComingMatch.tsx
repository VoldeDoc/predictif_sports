interface UpcomingMatchesProps {
  matches: any[];
  loading: boolean;
}

export default function UpcomingMatches({ matches, loading }: UpcomingMatchesProps) {
  if (loading) {
    return <div className="text-center py-4">Loading matches...</div>;
  }

  return (
    <div className="max-h-screen overflow-y-auto p-4 h-96">
      {matches.map((match: any, index: number) => (
        <div key={index} className="mb-4">
          {/* League and Country */}
          <div className="flex items-center space-x-2">
            <img src="assets/images/dashboard/dashboard/99.svg" alt="" className="w-6 h-6 md:w-7 md:h-7" />
            <div>
              <h1 className="text-xs md:text-sm">Premier League</h1>
              <h1 className="text-sm md:text-base">England</h1>
            </div>
          </div>
          <hr className="border-t-2 my-2 bg-gray-200" />

          {/* Match Details */}
          <div className="rounded-lg bg-slate-200 px-4 py-4 border-l-4 border-green-500">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-3 mt-2">
              {/* Game Start Time */}
              <div className="text-center md:text-left">
                <h1 className="text-sm font-medium">{match.game_start_time}</h1>
              </div>

              {/* Teams */}
              <div className="flex flex-col space-y-3 w-full">
                <div className="flex items-center space-x-2">
                  <img src={match.home_club_logo} alt={`${match.home_club_name} Logo`} className="w-5 h-5 md:w-6 md:h-6" />
                  <h1 className="text-sm md:text-base">{match.home_club_name}</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <img src={match.away_club_logo} alt={`${match.away_club_name} Logo`} className="w-5 h-5 md:w-6 md:h-6" />
                  <h1 className="text-sm md:text-base">{match.away_club_name}</h1>
                </div>
              </div>
            </div>

            {/* Predictive Scores */}
            <div className="flex justify-center md:justify-start py-3">
              <div className="text-sm md:text-base">
                <span className="font-medium">Predictive Scores:</span>  
                <span className="ml-2">{match.home_score}</span> - <span>{match.away_score}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

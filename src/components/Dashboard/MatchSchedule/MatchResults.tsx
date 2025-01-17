const matchData = [
    { home: "Brentford", away: "Newcastle United", homeScore: 2, awayScore: 4, status: "FT", homeLogo: "brentford.png", awayLogo: "newcastle.png" },
    { home: "Sheffield United", away: "Tottenham Hotspur", homeScore: 0, awayScore: 3, status: "FT", homeLogo: "sheffield.png", awayLogo: "tottenham.png" },
    { home: "Manchester City", away: "West Ham United", homeScore: 3, awayScore: 1, status: "FT", homeLogo: "mancity.png", awayLogo: "westham.png" },
    { home: "Chelsea", away: "AFC Bournemouth", homeScore: 2, awayScore: 1, status: "FT", homeLogo: "chelsea.png", awayLogo: "bournemouth.png" },
    { home: "Burnley", away: "Nottingham Forest", homeScore: 1, awayScore: 2, status: "FT", homeLogo: "burnley.png", awayLogo: "nottingham.png" },
    { home: "Liverpool", away: "Wolverhampton Wanderers", homeScore: 2, awayScore: 0, status: "FT", homeLogo: "liverpool.png", awayLogo: "wolves.png" },
    { home: "Arsenal", away: "Everton", homeScore: 2, awayScore: 1, status: "FT", homeLogo: "arsenal.png", awayLogo: "everton.png" },
    { home: "Crystal Palace", away: "Aston Villa", homeScore: 5, awayScore: 0, status: "FT", homeLogo: "palace.png", awayLogo: "villa.png" },
    { home: "Brighton & Hove Albion", away: "Manchester United", homeScore: 0, awayScore: 2, status: "FT", homeLogo: "brighton.png", awayLogo: "manutd.png" },
    { home: "Luton Town", away: "Fulham", homeScore: 2, awayScore: 4, status: "FT", homeLogo: "luton.png", awayLogo: "fulham.png" },
];

export default function MatchTable() {
    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
            <div className="w-full max-w-4xl p-4">
                {matchData.map((match, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-10 sm:grid-cols-8 gap-4 items-center py-2 border-b border-gray-200"
                    >
                        {/* Match Status */}
                        <span className="col-span-1 text-xs text-gray-600 sm:col-span-1">{match.status}</span>

                        {/* Home Team */}
                        <div className="col-span-3 sm:col-span-2 flex flex-col sm:flex-row items-center sm:justify-end">
                            <img src={`/logos/${match.homeLogo}`} alt="" className="w-8 h-8 sm:w-6 sm:h-6 mr-2 sm:mr-2" />
                            <span className="font-medium text-xs sm:text-sm text-center sm:text-right">{match.home}</span>
                        </div>
                        
                        {/* Match Score */}
                        <div className="col-span-2 sm:col-span-1 flex justify-center items-center">
                            <span className="px-3 py-1 bg-gray-100 rounded-md font-semibold text-xs sm:text-sm">
                                {match.homeScore} - {match.awayScore}
                            </span>
                        </div>

                        {/* Away Team */}
                        <div className="col-span-3 sm:col-span-2 flex flex-col sm:flex-row items-center sm:justify-start">
                            <img src={`/logos/${match.awayLogo}`} alt="" className="w-8 h-8 sm:w-6 sm:h-6 mr-2 sm:mr-2" />
                            <span className="font-medium text-xs sm:text-sm text-center sm:text-left">{match.away}</span>
                        </div>

                        {/* Details Link */}
                        <span className="col-span-1 text-red-500 cursor-pointer text-xs sm:text-sm hidden lg:block">Details</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
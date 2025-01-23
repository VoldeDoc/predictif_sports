import { useEffect, useState } from "react";
import useDashBoardManagement from "@/hooks/useDashboard";
import { Link } from "react-router-dom";
import Loader from "@/pages/Ui/loader"; // Assuming you have a Loader component

export default function MatchTable() {
    const { getMatchAlert } = useDashBoardManagement();
    const [matchData, setMatchData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await getMatchAlert();
                if (data.length > 0 && data[0].meta_data) {
                    setMatchData(data[0].meta_data);
                }
                setError(null);
            } catch (err) {
                setError('Failed to fetch match data. Please try again later.');
            } finally {
                setLoading(false);
            }
        })();
    }, [getMatchAlert]);

    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
            <div className="w-full max-w-4xl p-4">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader loading={loading} color="#123abc" size={40} />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : matchData.length > 0 ? (
                    matchData.map((match, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-10 sm:grid-cols-8 gap-4 items-center py-2 border-b border-gray-200"
                        >
                            {/* Game Start Date and Time */}
                            <span className="col-span-1 text-xs text-gray-600 sm:col-span-1">
                                {match.game_start_date} {match.game_start_time}
                            </span>

                            {/* Home Team */}
                            <div className="col-span-3 sm:col-span-2 flex flex-col sm:flex-row items-center sm:justify-end">
                                <img src={match.home_club_logo} alt={match.home_club} className="w-8 h-8 sm:w-6 sm:h-6 mr-2 sm:mr-2" />
                                <span className="font-medium text-xs sm:text-sm text-center sm:text-right">{match.home_club}</span>
                            </div>
                            
                            {/* Match Score */}
                            <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
                                <span className="px-3 py-1 bg-gray-100 rounded-md font-semibold text-xs sm:text-sm">
                                    {match.home_score} - {match.away_scrore}
                                </span>
                                <span className="text-xs text-gray-500">{match.minute_played}</span>
                            </div>

                            {/* Away Team */}
                            <div className="col-span-3 sm:col-span-2 flex flex-col sm:flex-row items-center sm:justify-start">
                                <img src={match.away_club_logo} alt={match.away_club} className="w-8 h-8 sm:w-6 sm:h-6 mr-2 sm:mr-2" />
                                <span className="font-medium text-xs sm:text-sm text-center sm:text-left">{match.away_club}</span>
                            </div>

                            {/* Details Link */}
                            <Link to={`/match-schedule/${match.id}`} className="col-span-1 text-blue-500 cursor-pointer text-xs sm:text-sm hidden lg:block">
                                <span className="col-span-1 text-red-500 cursor-pointer text-xs sm:text-sm hidden lg:block">Details</span>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 p-4">No match data available.</p>
                )}
            </div>
        </div>
    );
}
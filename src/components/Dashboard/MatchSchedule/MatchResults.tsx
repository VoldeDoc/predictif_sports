import { useEffect, useState } from "react";
import useDashBoardManagement from "@/hooks/useDashboard";
import { Link } from "react-router-dom";
import Loader from "@/pages/Ui/loader"; // Assuming you have a Loader component

export default function MatchTable() {
    const { getMatchAlert } = useDashBoardManagement();
    const [matchData, setMatchData] = useState<any[]>([]);
    const [filteredMatches, setFilteredMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");

    // Generate date tabs for the next 7 days
    const generateDateTabs = () => {
        const tabs = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);

            // Format date for display (e.g., "19 May, Sun")
            const displayDate = date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                weekday: "short",
            });

            // Format date for filtering (YYYY-MM-DD)
            const filterDate = date.toISOString().split("T")[0];

            tabs.push({ displayDate, filterDate });
        }
        return tabs;
    };

    const dateTabs = generateDateTabs();

    useEffect(() => {
        (async () => {
            try {
                const data = await getMatchAlert();
                console.log("Match Data:", data); 
                const extractedData = data.flatMap((entry: any) =>
                    entry.map((item: any) => item.meta_data).flat()
                );
                setMatchData(extractedData);
                setFilteredMatches(extractedData); // Initially show all matches
            } catch (err) {
                setError("Failed to fetch match data. Please try again later.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Filter matches by selected date
    useEffect(() => {
        if (selectedDate) {
            const filtered = matchData.filter(
                (match) => match.game_start_date === selectedDate
            );
            setFilteredMatches(filtered);
        } else {
            setFilteredMatches(matchData);
        }
    }, [selectedDate, matchData]);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <div className="w-full max-w-4xl p-4">
                {/* Date Tabs */}
                <div className="flex overflow-x-auto border-b mb-4">
                    {dateTabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedDate(tab.filterDate)}
                            className={`px-4 py-2 text-sm font-medium ${
                                selectedDate === tab.filterDate
                                    ? "text-blue-700 border-b-2 border-blue-700"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                        >
                            {tab.displayDate}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader loading={loading} color="#123abc" size={40} />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : filteredMatches.length > 0 ? (
                    filteredMatches.map((match, index) => (
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
                                <img
                                    src={match.home_club_logo}
                                    alt={match.home_club}
                                    className="w-8 h-8 sm:w-6 sm:h-6 mr-2 sm:mr-2"
                                />
                                <span className="font-medium text-xs sm:text-sm text-center sm:text-right">
                                    {match.home_club}
                                </span>
                            </div>

                            {/* Match Score */}
                            <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
                                <span className="px-3 py-1 bg-gray-100 rounded-md font-semibold text-xs sm:text-sm">
                                    {match.home_score} - {match.away_scrore}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {match.minute_played || "Not started"}
                                </span>
                            </div>

                            {/* Away Team */}
                            <div className="col-span-3 sm:col-span-2 flex flex-col sm:flex-row items-center sm:justify-start">
                                <img
                                    src={match.away_club_logo}
                                    alt={match.away_club}
                                    className="w-8 h-8 sm:w-6 sm:h-6 mr-2 sm:mr-2"
                                />
                                <span className="font-medium text-xs sm:text-sm text-center sm:text-left">
                                    {match.away_club}
                                </span>
                            </div>

                            {/* Details Link */}
                            <Link
                                to={`/match-schedule/${match.id}`}
                                className="col-span-1 text-blue-500 cursor-pointer text-xs sm:text-sm hidden lg:block"
                            >
                                Details
                            </Link>

                            {/* Mobile Link */}
                            <Link
                                to={`/match-schedule/${match.id}`}
                                className="col-span-10 sm:hidden block text-blue-500 text-center mt-2"
                            >
                                View Details
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-center text-gray-500">
                            No matches available for the selected date.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
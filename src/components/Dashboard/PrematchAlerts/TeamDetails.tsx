import { useEffect, useState } from "react";
import { FaInfoCircle, FaCalendarAlt, FaTrophy, FaUsers, FaNewspaper } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { ProgressBar } from "@/components/DashboardComponents/ProgressBar";
import { AuthLayout } from "@/components/Layout/layout";
import Button from "@/components/Ui/Button";
import useDashBoardManagement from "@/hooks/useDashboard";
import Loader from "@/pages/Ui/loader";

interface Match {
    home_club_id: string;
    away_club_id: string;
    home_club_name: string;
    away_club_name: string;
    home_club_logo: string;
    away_club_logo: string;
    home_club_manager: string;
    away_club_manager: string;
    home_score: number;
    away_score: number;
    home_red_card: number;
    away_red_card: number;
    home_yellow_card: number;
    away_yellow_card: number;
    home_corner_kick: number;
    away_corner_kick: number;
    home_penalty_kick: number;
    away_penalty_kick: number;
    home_free_kick: number;
    away_free_kick: number;
    home_throwing: number;
    away_throwing: number;
}

interface Team {
    team_id: string;
    name: string;
    logo: string;
    manager: string;
    league_name: string;
    league_logo: string;
    upcoming_match: Match[] | null;
    result: Match | null;
    players: { id: string; player: string; avatar: string; position: string; position_short: string }[];
    history: Match[] | null;
}
 
interface NewsEvent{
    id:number;
    subject_id:number;
    heading:string,
    sub_heading:string;
    description:string;
    sub_descripton:string;
    created_at:string;
    updated_at:string;
}

const tabs = [
    { key: "bio", label: "Bio", icon: <FaInfoCircle /> },
    { key: "upcoming_match", label: "Upcoming Match", icon: <FaCalendarAlt /> },
    { key: "result", label: "Result", icon: <FaTrophy /> },
    { key: "players", label: "Players", icon: <FaUsers /> },
    { key: "news_event", label: "News & Events", icon: <FaNewspaper /> },
    { key: "history", label: "History", icon: <FaNewspaper /> },
];

export default function TeamDetails() {
    const { getTeamById,getNewsEventBySubject } = useDashBoardManagement();
    const [team, setTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("bio");
    const [news, SetNews] = useState<NewsEvent[] | null>(null);
    const { team_id } = useParams<{ team_id: string }>();
    useEffect(() => {
        (async () => {
            // setLoading(true)
            try {
                if (!team_id) {
                    throw new Error("Team ID is undefined");
                }
                const response = await getTeamById(team_id);
                const newsResponse=  await getNewsEventBySubject(team_id);
                const teamData = response[0];
                const team: Team = {
                    team_id: teamData.bio.id,
                    name: teamData.bio.club_name,
                    logo: teamData.bio.club_logo,
                    manager: teamData.bio.club_manager,
                    league_name: teamData.bio.club_leagues_name,
                    league_logo: teamData.bio.club_leagues_logo,
                    upcoming_match: teamData.coming_match,
                    result: teamData.result_match[0],
                    players: Array.isArray(teamData.players) ? teamData.players : [teamData.players],
                    history: teamData.result_match || [],
                };
                SetNews(newsResponse[0])
                setTeam(team);
                setLoading(false)
            } catch (err) {
                setLoading(false)
                setError("Failed to load team details. Please try again later.");
            }
        })();
    }, []);

   
const renderTabContent = () => {
        switch (activeTab) {
            case "bio":
                return (
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                            Team Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Team Information */}
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={team?.logo}
                                    alt={`${team?.name} logo`}
                                    className="w-24 h-24 object-contain rounded-full border-4 border-gray-200 shadow-md mb-4"
                                />
                                <h3 className="text-xl font-bold text-gray-800">{team?.name}</h3>
                                <p className="text-gray-500 text-sm">
                                    <FaInfoCircle className="inline text-gray-400 mr-1" />
                                    Managed by <span className="font-medium text-gray-700">{team?.manager}</span>
                                </p>
                            </div>

                            {/* League Information */}
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={team?.league_logo}
                                    alt={`${team?.league_name} logo`}
                                    className="w-24 h-24 object-contain rounded-full border-4 border-gray-200 shadow-md mb-4"
                                />
                                <h3 className="text-xl font-bold text-gray-800">League</h3>
                                <p className="text-gray-500 text-sm">
                                    <FaTrophy className="inline text-gray-400 mr-1" />
                                    {team?.league_name}
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case "upcoming_match":
                return (
                    <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Match</h2>
                        {team?.upcoming_match && team.upcoming_match.length > 0 ? (
                            team.upcoming_match.map((match, index) => (
                                <div key={index} className="mb-6">
                                    <div className="flex flex-col sm:flex-row justify-center items-center mb-6">
                                        {/* Home Team */}
                                        <div className="text-center w-full sm:w-1/3 mb-4 sm:mb-0">
                                            <img
                                                src={match.home_club_logo}
                                                alt={match.home_club_name}
                                                className="w-16 h-16 object-contain mx-auto"
                                            />
                                            <p className="text-gray-700 font-medium">{match.home_club_name}</p>
                                        </div>

                                        {/* VS */}
                                        <div className="mx-8 w-full sm:w-1/3 text-center mb-4 sm:mb-0">
                                            <p className="text-2xl font-bold text-gray-800">VS</p>
                                        </div>

                                        {/* Away Team */}
                                        <div className="text-center w-full sm:w-1/3">
                                            <img
                                                src={match.away_club_logo}
                                                alt={match.away_club_name}
                                                className="w-16 h-16 object-contain mx-auto"
                                            />
                                            <p className="text-gray-700 font-medium">{match.away_club_name}</p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg text-gray-700">Managed by {match.home_club_manager} vs {match.away_club_manager}</p>
                                        <p className="text-sm text-gray-500">Stay tuned for more details!</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No upcoming match scheduled.</p>
                        )}
                    </div>
                );

            case "result":
                return (
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Match</h2>
                        {team?.result ? (
                            <div>
                                <div className="flex flex-col sm:flex-row justify-center items-center mb-6">
                                    {/* Home Team */}
                                    <div className="text-center w-full sm:w-1/3 mb-4 sm:mb-0">
                                        <img
                                            src={team.result.home_club_logo}
                                            alt={team.result.home_club_name}
                                            className="w-16 h-16 object-contain mx-auto"
                                        />
                                        <p className="text-gray-700 font-medium">{team.result.home_club_name}</p>
                                    </div>

                                    {/* Score */}
                                    <div className="mx-8 w-full sm:w-1/3 text-center mb-4 sm:mb-0">
                                        <p className="text-4xl font-bold text-gray-800">
                                            {team.result.home_score} - {team.result.away_score}
                                        </p>
                                        <p className="text-gray-500 text-sm">Final Score</p>
                                    </div>

                                    {/* Away Team */}
                                    <div className="text-center w-full sm:w-1/3">
                                        <img
                                            src={team.result.away_club_logo}
                                            alt={team.result.away_club_name}
                                            className="w-16 h-16 object-contain mx-auto"
                                        />
                                        <p className="text-gray-700 font-medium">{team.result.away_club_name}</p>
                                    </div>
                                </div>

                                <div className="">
                                    <h3 className="text-lg font-bold text-gray-700 mb-2">Team Statistics</h3>
                                    <div className="flex justify-between">
                                        <div>
                                            <strong>Home Manager:</strong> {team.result.home_club_manager}
                                        </div>
                                        <div>
                                            <strong>Away Manager:</strong> {team.result.away_club_manager}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-700 my-4">Match Statistics</h3>

                                    <div>
                                        <li className="pb-4">
                                            <strong>Red Cards:</strong>
                                            <ProgressBar homeValue={team.result.home_red_card} awayValue={team.result.away_red_card} />
                                        </li>

                                        <li className="pb-4">
                                            <strong>Yellow Cards:</strong>
                                            <ProgressBar homeValue={team.result.home_yellow_card} awayValue={team.result.away_yellow_card} />
                                        </li>
                                        <li className="pb-4">
                                            <strong>Corner Kicks:</strong>
                                            <ProgressBar homeValue={team.result.home_corner_kick} awayValue={team.result.away_corner_kick} />
                                        </li>
                                        <li className="pb-4">
                                            <strong>Free Kicks:</strong>
                                            <ProgressBar homeValue={team.result.home_free_kick} awayValue={team.result.away_free_kick} />
                                        </li>
                                        <li className="pb-4">
                                            <strong>Penalty Kicks:</strong>
                                            <ProgressBar homeValue={team.result.home_penalty_kick} awayValue={team.result.away_penalty_kick} />
                                        </li>
                                        <li className="pb-4">
                                            <strong>Throw-ins:</strong>
                                            <ProgressBar homeValue={team.result.home_throwing} awayValue={team.result.away_throwing} />
                                        </li>
                                    </div>

                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">No results available.</p>
                        )}
                    </div>
                );
            case "players":
                return (
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Players</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {team?.players.map((player) => (
                                <Link to={`/user/player/${player.id}`} key={player.id}>
                                    <div key={player.id} className="flex flex-col items-center text-center bg-gray-100 p-4 rounded-lg shadow">
                                    <img
                                        src={player.avatar || "https://example.com/default-avatar.jpg"}
                                        alt={player.player}
                                        className="w-24 h-24 object-cover rounded-full mb-4"
                                    />
                                    <h3 className="text-lg font-bold text-gray-800">{player.player}</h3>
                                    <div className="flex space-x-5">
                                        <p className="text-gray-500">{player.position_short}</p>
                                        <p className="text-gray-500">{player.position}</p>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                );

          
                case "news_event":
                    return (
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">News & Events</h2>
                            {news && news.length > 0 ? (
                                news.map((newsItem, index) => (
                                    <div key={index} className="mb-6 border-b pb-4">
                                        <h3 className="text-xl font-bold text-gray-800">{newsItem.heading}</h3>
                                        <p className="text-gray-600 mt-2">{newsItem.description}</p>
                                        <p className="text-gray-500 text-sm mt-2">{newsItem.sub_descripton}</p>
                                        <p className="text-gray-400 text-xs mt-1"> {new Date(newsItem.created_at).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No news or events available.</p>
                            )}
                        </div>
                    );
           


            case "history":
                return (
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Match History</h2>
                        {team?.history && team.history.length > 0 ? (
                            team.history.map((match, index) => (
                                <div key={index} className="mb-6">
                                    <div className="flex flex-col sm:flex-row justify-center items-center mb-6">
                                        {/* Home Team */}
                                        <div className="text-center w-full sm:w-1/3 mb-4 sm:mb-0">
                                            <img
                                                src={match.home_club_logo}
                                                alt={match.home_club_name}
                                                className="w-16 h-16 object-contain mx-auto"
                                            />
                                            <p className="text-gray-700 font-medium">{match.home_club_name}</p>
                                        </div>

                                        {/* Score */}
                                        <div className="mx-8 w-full sm:w-1/3 text-center mb-4 sm:mb-0">
                                            <p className="text-4xl font-bold text-gray-800">
                                                {match.home_score} - {match.away_score}
                                            </p>
                                            <p className="text-gray-500 text-sm">Final Score</p>
                                        </div>

                                        {/* Away Team */}
                                        <div className="text-center w-full sm:w-1/3">
                                            <img
                                                src={match.away_club_logo}
                                                alt={match.away_club_name}
                                                className="w-16 h-16 object-contain mx-auto"
                                            />
                                            <p className="text-gray-700 font-medium">{match.away_club_name}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab(`history-${index}`)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded shadow flex items-center"
                                    >
                                        <svg
                                            className="w-4 h-4 ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No match history available.</p>
                        )}
                    </div>
                );
                default:
                    if (activeTab.startsWith("history-")) {
                      const index = parseInt(activeTab.split("-")[1], 10);
                      const match = team?.history?.[index];
                      if (match) {
                        return (
                          <div className="p-6 bg-white rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Match Details</h2>
                            <div className="flex flex-col sm:flex-row justify-center items-center mb-6">
                              {/* Home Team */}
                              <div className="text-center w-full sm:w-1/3 mb-4 sm:mb-0">
                                <img
                                  src={match.home_club_logo}
                                  alt={match.home_club_name}
                                  className="w-16 h-16 object-contain mx-auto"
                                />
                                <p className="text-gray-700 font-medium">{match.home_club_name}</p>
                              </div>
                  
                              {/* Score */}
                              <div className="mx-8 w-full sm:w-1/3 text-center mb-4 sm:mb-0">
                                <p className="text-4xl font-bold text-gray-800">
                                  {match.home_score} - {match.away_score}
                                </p>
                                <p className="text-gray-500 text-sm">Final Score</p>
                              </div>
                  
                              {/* Away Team */}
                              <div className="text-center w-full sm:w-1/3">
                                <img
                                  src={match.away_club_logo}
                                  alt={match.away_club_name}
                                  className="w-16 h-16 object-contain mx-auto"
                                />
                                <p className="text-gray-700 font-medium">{match.away_club_name}</p>
                              </div>
                            </div>
                  
                            <div className="">
                              <h3 className="text-lg font-bold text-gray-700 mb-2">Team Statistics</h3>
                              <div className="flex justify-between">
                                <div>
                                  <strong>Home Manager:</strong> {match.home_club_manager}
                                </div>
                                <div>
                                  <strong>Away Manager:</strong> {match.away_club_manager}
                                </div>
                              </div>
                  
                              <h3 className="text-lg font-bold text-gray-700 my-4">Match Statistics</h3>
                  
                              <div>
                                <li className="pb-4">
                                  <strong>Red Cards:</strong>
                                  <ProgressBar homeValue={match.home_red_card} awayValue={match.away_red_card} />
                                </li>
                  
                                <li className="pb-4">
                                  <strong>Yellow Cards:</strong>
                                  <ProgressBar homeValue={match.home_yellow_card} awayValue={match.away_yellow_card} />
                                </li>
                                <li className="pb-4">
                                  <strong>Corner Kicks:</strong>
                                  <ProgressBar homeValue={match.home_corner_kick} awayValue={match.away_corner_kick} />
                                </li>
                                <li className="pb-4">
                                  <strong>Free Kicks:</strong>
                                  <ProgressBar homeValue={match.home_free_kick} awayValue={match.away_free_kick} />
                                </li>
                                <li className="pb-4">
                                  <strong>Penalty Kicks:</strong>
                                  <ProgressBar homeValue={match.home_penalty_kick} awayValue={match.away_penalty_kick} />
                                </li>
                                <li className="pb-4">
                                  <strong>Throw-ins:</strong>
                                  <ProgressBar homeValue={match.home_throwing} awayValue={match.away_throwing} />
                                </li>
                              </div>
                            </div>
                            <button
                              onClick={() => setActiveTab("history")}
                              className="bg-blue-600 text-white px-4 py-2 rounded shadow mt-4"
                            >
                              Back to History
                            </button>
                          </div>
                        );
                    }

        }
    }
}



    

    // if (loading) {
    //     return (
            
    //             <div className="flex items-center justify-center min-h-screen">
    //                 <Loader loading={loading} color="#123abc" size={40} />
    //                 <p className="text-gray-500 text-lg ml-4">Loading team details...</p>
    //             </div>
    //     );
    // }

    // if (error) {
    //     return (
    //             <div className="flex items-center justify-center min-h-screen">
    //                 <p className="text-red-500 text-lg">{error}</p>
    //             </div>
    //     );
    // }

    return (
        <AuthLayout>
            <div className="min-h-screen py-10">
                <div className="container mx-auto px-6">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Button
                            text="Back"
                            onClick={() => window.history.back()}
                            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
                        />
                    </div>
    
                    {/* Page Title */}
                    <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
                        Team Spotlight
                    </h1>
    
                    {/* Loader and Error Handling */}
                    {loading ? (
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <Loader loading={loading} color="#123abc" size={40} />
                            <p className="text-gray-500 text-lg ml-4">Loading team details...</p>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <p className="text-red-500 text-lg">{error}</p>
                        </div>
                    ) : (
                        <>
                            {/* Team Logo and Info */}
                            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                                <div className="flex flex-col items-center">
                                    {/* Team Logo */}
                                    <img
                                        src={team?.logo}
                                        alt={team?.name}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-md mb-6"
                                    />
                                    {/* Team Name and Manager */}
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{team?.name}</h2>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium">Manager:</span> {team?.manager}
                                    </p>
                                </div>
                            </div>
        {/* Tabs Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
                        {/* Wrapper for scrollable container */}
                        <div
                            className="flex overflow-x-auto"
                            style={{
                                msOverflowStyle: "none", /* IE 10+ */
                                scrollbarWidth: "none",  /* Firefox */
                            }}
                        >
                            <div
                                className="flex flex-nowrap space-x-2 sm:space-x-6"
                                style={{
                                    WebkitOverflowScrolling: "touch", /* Smooth scrolling on iOS */
                                }}
                            >
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`lg:py-2 px-4 sm:px-6  text-base flex items-center justify-center space-x-2 transition ${activeTab === tab.key
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center justify-center">
                                            {tab.icon}
                                            <span className="ml-2">{tab.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
    
                            {/* Tab Content */}
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                {renderTabContent()}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthLayout>
    );
    
}
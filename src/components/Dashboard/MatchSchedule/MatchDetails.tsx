import { AuthLayout } from "@/components/Layout/layout";
import { FaCalendar, FaFutbol, FaExclamationTriangle, FaArrowDown, FaArrowUp, FaSquareFull, FaFlag, FaBullseye, FaFistRaised } from "react-icons/fa";
import { MdStadium } from "react-icons/md";
import { GiWhistle } from "react-icons/gi";
import { useEffect, useState, lazy, Suspense } from "react";
import MatchTimeline from "./Event";
import Tabs from "./Tool/Tab";
import useDashBoardManagement from "@/hooks/useDashboard";
import { useParams } from "react-router-dom";
import Loader from "@/pages/Ui/loader";
import MatchLineup from "./MatchLineup";
// import MatchLineUp from "./MatchLineup";

const Stats = lazy(() => import("./MatchStats"));

export default function MatchDetails() {
    const tabs = [
        { key: 'Match Preview', label: 'Preview' },
        { key: 'Stats', label: 'Stats' },
        { key: 'Lineup', label: 'Lineup' },
        { key: 'Timeline', label: 'Timeline' },
        { key: 'H2H', label: 'H2H' }
    ];

    const [matchData, setMatchData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('Match Preview');
    const [expandedMatches, setExpandedMatches] = useState<number[]>([]);
    const { getMatchDetail } = useDashBoardManagement();
    const { id } = useParams<{ id: string }>();

    const homeFormation = "4-4-2";
    const awayFormation = "4-3-3";
  
    const homePlayers = [
      { name: "Goalkeeper", number: 1, position: "GK" },
      { name: "Left Back", number: 3, position: "LB" },
      { name: "Center Back", number: 4, position: "CB" },
      { name: "Center Back", number: 5, position: "CB" },
      { name: "Right Back", number: 2, position: "RB" },
      { name: "Left Midfielder", number: 6, position: "LM" },
      { name: "Center Midfielder", number: 8, position: "CM" },
      { name: "Center Midfielder", number: 10, position: "CM" },
      { name: "Right Midfielder", number: 7, position: "RM" },
      { name: "Striker", number: 9, position: "ST" },
      { name: "Striker", number: 11, position: "ST" },
    ];
  
    const awayPlayers = [
      { name: "Goalkeeper", number: 1, position: "GK" },
      { name: "Left Back", number: 3, position: "LB" },
      { name: "Center Back", number: 4, position: "CB" },
      { name: "Center Back", number: 5, position: "CB" },
      { name: "Right Back", number: 2, position: "RB" },
      { name: "Left Midfielder", number: 6, position: "LM" },
      { name: "Center Midfielder", number: 8, position: "CM" },
      { name: "Center Midfielder", number: 10, position: "CM" },
      { name: "Right Midfielder", number: 7, position: "RM" },
      { name: "Striker", number: 9, position: "ST" },
      { name: "Striker", number: 11, position: "ST" },
    ];
  
    useEffect(() => {
        (async () => {
            try {
                if (id) {
                    const response = await getMatchDetail(id);
                    setMatchData(response[0]);
                }
            } catch (error) {
                setLoading(false)
                setError('Failed to fetch match data. Please try again later.');
            } finally {
                setLoading(false);
            }
        })();
    }, [getMatchDetail, id]);

    const toggleExpand = (index: number) => {
        setExpandedMatches((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader loading={loading} color="#123abc" size={40} />
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <AuthLayout>
            <div className="px-8 sm:px-20">
                <button
                    onClick={() => window.history.back()}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Back
                </button>

                <div className="bg-[#35363B] py-5 px-4">
                    <div className="flex justify-center items-center text-center">
                        <div className="flex space-x-5 pb-4 mb-4">
                            <div className="w-9 h-9 flex items-center justify-center bg-white shadow rounded-full">
                                <img
                                    src="/assets/images/dashboard/dashboard/99.svg"
                                    alt=""
                                    className="w-6 h-6"
                                />
                            </div>
                            <h1 className="text-base sm:text-2xl text-white">
                                Premier League | Round 38
                            </h1>
                        </div>
                    </div>

                    <div className="flex justify-center items-center text-center pb-5">
                        <div className="grid grid-cols-6 space-x-6">
                            {matchData && matchData.meta_data && (
                                <>
                                    {/* Team 1 Section */}
                                    <div className="col-span-2 flex flex-col items-center">
                                        <div>
                                            <img
                                                src={matchData.meta_data.home_club_logo}
                                                alt={matchData.meta_data.home_club}
                                                className="h-16 w-16"
                                            />
                                        </div>
                                        <div className="hidden lg:block">
                                            <ul className="text-white text-center">
                                                <li>{matchData.meta_data.home_club}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Score Section */}
                                    <div className="col-span-2 flex flex-col items-center space-y-1">
                                        <p className="text-white">FT</p>
                                        <p className="px-4 text-white rounded-xl bg-black-900">
                                            {matchData.live_data.home_score} - {matchData.live_data.away_score}
                                        </p>
                                    </div>

                                    {/* Team 2 Section */}
                                    <div className="col-span-2 flex flex-col items-center">
                                        <div>
                                            <img
                                                src={matchData.meta_data.away_club_logo}
                                                alt={matchData.meta_data.away_club}
                                                className="h-16 w-16"
                                            />
                                        </div>
                                        <div className="hidden lg:block">
                                            <ul className="text-white text-center">
                                                <li>{matchData.meta_data.away_club}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="flex flex-col sm:flex-row text-center items-center justify-between px-5 space-y-4 sm:space-y-0">
                        <div className="flex items-center text-white">
                            <FaCalendar className="mr-2" />
                            <h1>19 May, 24 Sunday</h1>
                        </div>
                        <div className="flex items-center text-white">
                            <MdStadium className="mr-2" />
                            <h1>Bramall Lane</h1>
                        </div>
                        <div className="flex items-center text-white">
                            <GiWhistle className="mr-2" />
                            <h1>A.Madley</h1>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <Tabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabSelect={setActiveTab}
                        className="mb-4"
                        activeClassName="border-b-2 border-red-500"
                    />
                </div>
                {activeTab === 'Match Preview' && (
                    <div className="bg-white p-4 flex flex-col justify-center text-center">
                        <h2 className="text-lg font-bold">Match Preview</h2>
                        <p className="text-2xl font-bold"> Home Team: {matchData?.meta_data?.home_club}</p>
                        <p className="text-2xl font-bold"> Away Team: {matchData?.meta_data?.away_club}</p>
                        <p className="text-2xl font-bold">Score: {matchData?.meta_data?.home_score} - {matchData?.meta_data?.away_scrore}</p>
                    </div>
                )}
                {activeTab === 'Stats' && (
                    <div className="bg-white p-4">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Stats liveData={matchData?.live_data} predictData={matchData?.predict_data} />
                        </Suspense>
                    </div>
                )}
                {activeTab === 'Lineup' && (
                    <div className="bg-white p-4">
                        <h3 className="text-md font-semibold">Home Team Lineup</h3>
                        <MatchLineup formation={homeFormation} players={homePlayers} />
                        <h3 className="text-md font-semibold mt-4">Away Team Lineup</h3>
                        <MatchLineup formation={awayFormation} players={awayPlayers} />
                    </div>
                )}
                {activeTab === 'Timeline' && (
                    <div className="bg-white">
                        <div className="flex justify-between bg-gray-200 px-4 py-1">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={matchData?.meta_data?.home_club_logo}
                                    alt=""
                                    className="h-10 w-10"
                                />
                                <h1 className="font-bold text-lg">{matchData?.meta_data?.home_club}</h1>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img
                                    src={matchData?.meta_data?.away_club_logo}
                                    alt=""
                                    className="h-10 w-10"
                                />
                                <h1 className="font-bold text-lg">{matchData?.meta_data?.away_club}</h1>
                            </div>
                        </div>
                        <MatchTimeline events={matchData?.events || []} />
                    </div>
                )}
                {activeTab === 'H2H' && (
                    <div className="bg-white p-4">
                        <h2 className="text-lg font-bold">Head to Head</h2>
                        {matchData.H2H?.map((match: any, index: number) => (
                            <div key={index} className="mb-4 border-b pb-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{match.home_club} vs {match.away_club}</p>
                                        <p className="text-gray-600">Score: {match.home_score} - {match.away_score}</p>
                                    </div>
                                    <button
                                        className="text-blue-500"
                                        onClick={() => toggleExpand(index)}
                                    >
                                        {expandedMatches.includes(index) ? (
                                            <FaArrowUp />
                                        ) : (
                                            <FaArrowDown />
                                        )}
                                    </button>
                                </div>
                                {expandedMatches.includes(index) && (
                                    <div className="mt-2">
                                        <p><FaExclamationTriangle className="inline mr-1 text-red-500" /> Red Cards: {match.home_red_card} - {match.away_red_card}</p>
                                        <p><FaSquareFull className="inline mr-1 text-yellow-500" /> Yellow Cards: {match.home_yellow_card} - {match.away_yellow_card}</p>
                                        <p><FaFlag className="inline mr-1 text-blue-500" /> Corner Kicks: {match.home_corner_kick} - {match.away_corner_kick}</p>
                                        <p><FaBullseye className="inline mr-1 text-green-500" /> Penalty Kicks: {match.home_penalty_kick} - {match.away_penalty_kick}</p>
                                        <p><FaFistRaised className="inline mr-1 text-purple-500" /> Free Kicks: {match.home_free_kick} - {match.away_free_kick}</p>
                                        <p><FaFutbol className="inline mr-1 text-gray-500" /> Throw-ins: {match.home_throwing} - {match.away_throwing}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthLayout>
    );
}
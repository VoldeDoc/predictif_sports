import { AuthLayout } from "@/components/Layout/layout";
import { FaCalendar } from "react-icons/fa";
import { MdStadium } from "react-icons/md";
import { GiWhistle } from "react-icons/gi";
import { useEffect, useState, lazy, Suspense } from "react";
import MatchTimeline from "./Event";
import Tabs from "./Tool/Tab";
import useDashBoardManagement from "@/hooks/useDashboard";

const Stats = lazy(() => import("./MatchStats"));

export default function MatchDetails() {
    const tabs = [
        { key: 'Match Preview', label: 'Preview' },
        { key: 'Stats', label: 'Stats' },
        { key: 'Lineup', label: 'Lineup' },
        { key: 'Events', label: 'Events' },
        { key: 'Standing', label: 'Standing' },
        { key: 'Head2Head', label: 'H2H' }
    ];

    const events = [
        {
            time: "90 +5",
            player: "Neal Maupay",
            eventType: "yellow-card" as const,
            team: "home" as const,
        },
        {
            time: "90 +5",
            player: "Nick Pope",
            eventType: "yellow-card" as const,
            team: "away" as const,
        },
        {
            time: "81",
            player: "Callum Wilson",
            subPlayer: "Alexander Isak",
            eventType: "goal" as const,
            team: "away" as const,
        },
        {
            time: "76",
            player: "Lewis Hall",
            eventType: "penalty-cancelled" as const,
            team: "away" as const,
        },
        {
            time: "74",
            player: "Kevin Schade",
            eventType: "red-card" as const,
            team: "home" as const,
        },
    ];

    const { getMatchAlert } = useDashBoardManagement();
    const [matchdata, setMatchData] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getMatchAlert();
                setMatchData(response);
            } catch (error) {
                console.log('error getting data', error);
            }
        })();
    }, [getMatchAlert]);

    const [activeTab, setActiveTab] = useState('Match Preview');

    return (
        <AuthLayout>
            <div className="px-8 sm:px-20">
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
                            {matchdata.length > 0 && matchdata[0].meta_data && (
                                <>
                                    {/* Team 1 Section */}
                                    <div className="col-span-2 flex flex-col items-center">
                                        <div>
                                            <img
                                                src={matchdata[0].meta_data.home_club_logo}
                                                alt={matchdata[0].meta_data.home_club}
                                                className="h-16 w-16"
                                            />
                                        </div>
                                        <div className="hidden lg:block">
                                            <ul className="text-white text-center">
                                                <li>{matchdata[0].meta_data.home_club}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Score Section */}
                                    <div className="col-span-2 flex flex-col items-center space-y-1">
                                        <p className="text-white">FT</p>
                                        <p className="px-4 text-white rounded-xl bg-black-900">
                                            {matchdata[0].live_data.home_score} - {matchdata[0].live_data.away_score}
                                        </p>
                                        {/* <p className="text-xs text-white">(0-1)</p> */}
                                    </div>

                                    {/* Team 2 Section */}
                                    <div className="col-span-2 flex flex-col items-center">
                                        <div>
                                            <img
                                                src={matchdata[0].meta_data.away_club_logo}
                                                alt={matchdata[0].meta_data.away_club}
                                                className="h-16 w-16"
                                            />
                                        </div>
                                        <div className="hidden lg:block">
                                            <ul className="text-white text-center">
                                                <li>{matchdata[0].meta_data.away_club}</li>
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
                {activeTab === 'Events' && (
                    <div className="bg-white">
                        <div className="flex justify-between bg-gray-200 px-4 py-1">
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/assets/images/landingPage/Arsenal.svg"
                                    alt=""
                                    className="h-10 w-10"
                                />
                                <h1 className="font-bold text-lg">ARS</h1>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/assets/images/landingPage/Chelsea-FC-logo-480x480 1.svg"
                                    alt=""
                                    className="h-10 w-10"
                                />
                                <h1 className="font-bold text-lg">CHE</h1>
                            </div>
                        </div>
                        <MatchTimeline events={events} />
                    </div>
                )}
              {activeTab === 'Stats' && (
    <div className="bg-white">
        <div className="flex justify-between bg-gray-200 px-4 py-1">
            <div className="flex items-center space-x-2">
                <img
                    src={matchdata[0]?.meta_data?.home_club_logo}
                    alt=""
                    className="h-10 w-10"
                />
                <h1 className="font-bold text-lg">{matchdata[0]?.meta_data?.home_club}</h1>
            </div>
            <div className="flex items-center space-x-2">
                <img
                    src={matchdata[0]?.meta_data?.away_club_logo}
                    alt=""
                    className="h-10 w-10"
                />
                <h1 className="font-bold text-lg">{matchdata[0]?.meta_data?.away_club}</h1>
            </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
            <Stats />
        </Suspense>
    </div>
)}
            </div>
        </AuthLayout>
    );
}
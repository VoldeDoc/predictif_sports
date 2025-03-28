import React, { useState, useEffect, useMemo, useRef } from 'react';
import MatchDetails from '../Tools/MatchDetails';
import MatchInfo from '../MatchInfo/MatchInfo';
import Tabs from '@/pages/Ui/tab';
import useDashBoardManagement from '@/hooks/useDashboard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/date-picker.css';

type MatchDetail = {
    id: string;
    time: string;
    team1: string;
    team2: string;
    score: string;
    homelogo: string;
    awaylogo: string;
    homescore?: string;
    awayscore?: string;
    game_start_date: string;
    game_start_time: string;
    match_type?: "Latest Match" | "Coming Match";
};

type MatchDetailsType = {
    "Latest Match": MatchDetail[];
    "Coming Match": MatchDetail[];
};

const Football: React.FC = () => {
    const { getUpcomingMatchPublic, getResultMatchPublic, getMatchDetail } = useDashBoardManagement();
    const [selectedMatch, setSelectedMatch] = useState<MatchDetail | null>(null);
    const tabs2 = ["Latest Match", "Coming Match"]; // Removed "Live Match"
    const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
    const [loadingUpcomingPubl, setLoadingUpcomingPublic] = useState(true);
    const [resultMatches, setResultMatches] = useState<any[]>([]);
    const [loadingResultPublic, setLoadingResultPublic] = useState(true);
    const [matchDetails, setMatchDetails] = useState<any>(null);
    const initialTab = localStorage.getItem('footballActiveTab') || "Latest Match";
    const [activeFootballTab, setActiveFootballTab] = useState(initialTab);
    const [isMounted, setIsMounted] = useState(false);

    const sortMatchesByDateTime = (matches: any[]) => {
        return [...matches].sort((a, b) => {
            const dateTimeA = new Date(`${a.game_start_date}T${a.game_start_time}`);
            const dateTimeB = new Date(`${b.game_start_date}T${b.game_start_time}`);
            return dateTimeA.getTime() - dateTimeB.getTime();
        });
    };

    const fetchFunctions = useMemo(() => ({
        fetchUpcomingMatches: async () => {
            if (upcomingMatches.length > 0) return;
            try {
                const response = await getUpcomingMatchPublic();
                const sortedMatches = sortMatchesByDateTime(response[0]);
                setUpcomingMatches(sortedMatches);
            } catch (error) {
                console.error("Failed to fetch upcoming matches", error);
            } finally {
                setLoadingUpcomingPublic(false);
            }
        },
        fetchResultMatches: async () => {
            if (resultMatches.length > 0) return;
            try {
                const response = await getResultMatchPublic();
                const sortedMatches = sortMatchesByDateTime(response[0]);
                setResultMatches(sortedMatches);
            } catch (error) {
                console.error("Failed to fetch result matches", error);
            } finally {
                setLoadingResultPublic(false);
            }
        }
    }), [getUpcomingMatchPublic, getResultMatchPublic, upcomingMatches.length, resultMatches.length]);

    // Initialize data
    useEffect(() => {
        if (!isMounted) {
            const initializeData = async () => {
                await Promise.all([
                    fetchFunctions.fetchUpcomingMatches(),
                    fetchFunctions.fetchResultMatches()
                ]);
                setIsMounted(true);
            };
            initializeData();
        }
    }, [isMounted, fetchFunctions]);

    const handleTabChange = (tab: string) => {
        setActiveFootballTab(tab);
        localStorage.setItem('footballActiveTab', tab);
    };

    const handleMatchClick = async (match: MatchDetail, activeTab: string) => {
        setSelectedMatch(match);
        setMatchDetails(null);
        try {
            if (match.id) {
                const response = await getMatchDetail(match.id);
                const matchDetailsWithType = {
                    ...response[0],
                    meta_data: {
                        ...response[0].meta_data,
                        match_type: activeTab as "Latest Match" | "Coming Match"
                    }
                };
                setMatchDetails(matchDetailsWithType);
            }
        } catch (error) {
            console.error("Failed to fetch match details", error);
        }
    };

    const handleBackClick = () => {
        setSelectedMatch(null);
    };

    // Memoize RenderSecondContent to prevent unnecessary rerenders
    const memoizedRenderContent = useMemo(() => (activeTab: string) =>
        RenderSecondContent(
            activeTab as keyof MatchDetailsType,
            handleMatchClick,
            upcomingMatches,
            loadingUpcomingPubl,
            resultMatches,
            loadingResultPublic
        ),
        [upcomingMatches, resultMatches, loadingUpcomingPubl, loadingResultPublic]);

    return (
        <div>
            <div className="space-x-5">
                <div className=' '>
                    <h1 className='font-bold text-xl'>Football Match </h1>
                    <div className="mt-4">
                        {selectedMatch ? (
                            <>
                                <button onClick={handleBackClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded mb-3">
                                    Back
                                </button>
                                <MatchInfo matchDetails={matchDetails} />
                            </>
                        ) : (
                            <Tabs
                                tabs={tabs2}
                                defaultTab={initialTab}
                                onTabChange={handleTabChange}
                                renderContent={memoizedRenderContent}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const RenderSecondContent = (
    activeTab: keyof MatchDetailsType,
    handleMatchClick: (match: MatchDetail, activeTab: string) => void,
    upcomingMatches: any[],
    loadingUpcomingPublic: boolean,
    resultMatches: any[],
    loadingResultPublic: boolean
): JSX.Element => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const sortMatchesByTime = (matches: MatchDetail[]) => {
        return [...matches].sort((a, b) => {
            return a.time.localeCompare(b.time);
        });
    };

    const groupMatchesByDate = (matches: MatchDetail[]) => {
        const groups: { [key: string]: MatchDetail[] } = {};

        matches.forEach(match => {
            const date = match.game_start_date;
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(match);
        });

        Object.keys(groups).forEach(date => {
            groups[date] = sortMatchesByTime(groups[date]);
        });

        return groups;
    };

    const latestMatchDetails = loadingResultPublic
        ? [{
            id: "loading",
            time: "Loading...",
            team1: "Loading...",
            team2: "Loading...",
            score: "-",
            homelogo: "",
            awaylogo: "",
            homescore: "-",
            awayscore: "-",
            game_start_date: new Date().toISOString().split('T')[0],
            game_start_time: "loading",
            match_type: "Latest Match" as const
        }]
        : resultMatches.map(match => ({
            id: match.id,
            time: match.game_start_time,
            team1: match.home_club_name,
            team2: match.away_club_name,
            score: `${match.home_score} - ${match.away_score}`,
            homelogo: match.home_club_logo,
            awaylogo: match.away_club_logo,
            homescore: match.home_score.toString(),
            awayscore: match.away_score.toString(),
            game_start_date: match.game_start_date,
            game_start_time: match.game_start_time,
            match_type: "Latest Match" as const
        } as MatchDetail));

    const comingMatchDetails = loadingUpcomingPublic
        ? [{
            id: "loading", time: "Loading...", team1: "Loading...", team2: "Loading...", score: "vs", homelogo: "", awaylogo: "", homescore: undefined, awayscore: undefined, game_start_date: new Date().toISOString().split('T')[0],
            game_start_time: "loading", match_type: "Coming Match" as const
        }]
        : upcomingMatches.map(match => ({
            id: match.id,
            time: match.game_start_time,
            team1: match.home_club_name,
            team2: match.away_club_name,
            score: "vs",
            homescore: undefined,
            awayscore: undefined,
            homelogo: match.home_club_logo,
            awaylogo: match.away_club_logo,
            game_start_date: match.game_start_date,
            game_start_time: match.game_start_time,
            match_type: "Coming Match" as const
        } as MatchDetail));

    const matchDetails = {
        "Latest Match": latestMatchDetails,
        "Coming Match": comingMatchDetails,
    };

    const groupedMatches = groupMatchesByDate(matchDetails[activeTab]);
    const dates = Object.keys(groupedMatches).sort((a, b) =>
        new Date(a).getTime() - new Date(b).getTime()
    );

    useEffect(() => {
        const today = new Date();
        let closestDate = dates.find(date => new Date(date) >= today) || dates[0];
        if (!selectedDate || !groupedMatches[selectedDate]) {
            setSelectedDate(closestDate);
        }
    }, [dates, activeTab, groupedMatches]);

    return (
        <div>
            <div className='bg-[#FBFBFB] py-4 px-4'>
                <h1 className='font-bold'>{activeTab.toUpperCase()}</h1>

                {/* Date selector */}
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    {dates.map(date => (
                        <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap
                                ${selectedDate === date
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            {new Date(date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </button>
                    ))}
                </div>
            </div>

            {selectedDate ? (
                <div className="mt-4">
                    {groupedMatches[selectedDate] && groupedMatches[selectedDate].length > 0 ? (
                        groupedMatches[selectedDate].map((match, index) => (
                            <MatchDetails
                                key={`${match.id}-${index}`}
                                id={match.id}
                                time={match.game_start_time}
                                team1={match.team1}
                                team2={match.team2}
                                score={match.score}
                                homelogo={match.homelogo}
                                awaylogo={match.awaylogo}
                                homescore={match.homescore}
                                awayscore={match.awayscore}
                                game_start_date={match.game_start_date}
                                game_start_time={match.game_start_time}
                                index={index}
                                onClick={() => handleMatchClick(match as MatchDetail, activeTab)}
                            />
                        ))
                    ) : (
                        <div className="flex justify-center items-center py-8">
                            <p className="text-gray-500 text-lg">
                                No matches available for {new Date(selectedDate).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center py-8">
                    <p className="text-gray-500 text-lg">Please select a date to view matches</p>
                </div>
            )}
        </div>
    );
};

export default Football;
import React, { useState, useEffect, useMemo, useRef } from 'react';
import MatchDetails from '../Tools/MatchDetails';
import MatchInfo from '../MatchInfo/MatchInfo';
import Tabs from '@/pages/Ui/tab';
import useDashBoardManagement from '@/hooks/useDashboard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/date-picker.css'
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
    match_type?: "Latest Match" | "Live Match" | "Coming Match";
};

type MatchDetailsType = {
    "Latest Match": MatchDetail[];
    "Live Match": MatchDetail[];
    "Coming Match": MatchDetail[];
};

const DashBoardFootball: React.FC = () => {
    const { getUpcomingMatch, getResultMatch, getTodayMatch, getMatchDetail } = useDashBoardManagement();
    const [selectedMatch, setSelectedMatch] = useState<MatchDetail | null>(null);
    const tabs2 = ["Latest Match", "Live Match", "Coming Match"];
    const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
    const [loadingUpcomingPubl, setLoadingUpcomingPublic] = useState(true);
    const [resultMatches, setResultMatches] = useState<any[]>([]);
    const [loadingResultPublic, setLoadingResultPublic] = useState(true);
    const [todayMatches, setTodayMatches] = useState<any[]>([]);
    const [loadingTodayPublic, setLoadingTodayPublic] = useState(true);
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
                const response = await getUpcomingMatch();
                console.log(response);
                
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
                const response = await getResultMatch();
                const sortedMatches = sortMatchesByDateTime(response[0]);
                setResultMatches(sortedMatches);
            } catch (error) {
                console.error("Failed to fetch result matches", error);
            } finally {
                setLoadingResultPublic(false);
            }
        },
        fetchTodayMatches: async () => {
            if (todayMatches.length > 0) return;
            try {
                const response = await getTodayMatch();
                const sortedMatches = sortMatchesByDateTime(response[0]);
                setTodayMatches(sortedMatches);
            } catch (error) {
                console.error("Failed to fetch today's matches", error);
            } finally {
                setLoadingTodayPublic(false);
            }
        }
    }), [getUpcomingMatch, getResultMatch, getTodayMatch, upcomingMatches.length, resultMatches.length, todayMatches.length]);

    // Initialize data
    useEffect(() => {
        if (!isMounted) {
            const initializeData = async () => {
                await Promise.all([
                    fetchFunctions.fetchUpcomingMatches(),
                    fetchFunctions.fetchResultMatches(),
                    fetchFunctions.fetchTodayMatches()
                ]);
                setIsMounted(true);
            };
            initializeData();
        }
    }, [isMounted, fetchFunctions]);

    // Refresh function for manual updates
    const refreshData = async () => {
        setLoadingUpcomingPublic(true);
        setLoadingResultPublic(true);
        setLoadingTodayPublic(true);

        await Promise.all([
            fetchFunctions.fetchUpcomingMatches(),
            fetchFunctions.fetchResultMatches(),
            fetchFunctions.fetchTodayMatches()
        ]);
    };
    // Auto-refresh for live matches
    useEffect(() => {
        if (activeFootballTab === "Live Match") {
            const interval = setInterval(refreshData, 60000);
            return () => clearInterval(interval);
        }
    }, [activeFootballTab]);

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
                        match_type: activeTab as "Latest Match" | "Live Match" | "Coming Match"
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
            loadingResultPublic,
            todayMatches,
            loadingTodayPublic
        ),
        [upcomingMatches, resultMatches, todayMatches, loadingUpcomingPubl, loadingResultPublic, loadingTodayPublic]);

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
    loadingResultPublic: boolean,
    todayMatches: any[],
    loadingTodayPublic: boolean
): JSX.Element => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);

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

    // Handle clicks outside the date picker to close it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setShowDatePicker(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Determine how many dates to show initially (responsive approach)
    const [visibleDates, setVisibleDates] = useState(6);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) setVisibleDates(8);
            else if (window.innerWidth >= 1024) setVisibleDates(6);
            else if (window.innerWidth >= 768) setVisibleDates(5);
            else if (window.innerWidth >= 640) setVisibleDates(4);
            else setVisibleDates(3);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const liveMatchDetails = loadingTodayPublic
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
            match_type: "Live Match" as const
        }]
        : todayMatches.map(match => ({
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
            match_type: "Live Match" as const
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
        "Live Match": liveMatchDetails,
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
                    {/* Fix: Show dates starting from today or nearest date */}
                    {dates.sort((a, b) => {
                        const today = new Date();
                        const diffA = Math.abs(new Date(a).getTime() - today.getTime());
                        const diffB = Math.abs(new Date(b).getTime() - today.getTime());
                        return diffA - diffB;
                    }).slice(0, visibleDates).map(date => (
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

                    {/* Calendar button */}
                    <div className="relative" ref={datePickerRef}>
                        <button
                            onClick={() => {
                                setShowDatePicker(!showDatePicker);
                            }}
                            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 whitespace-nowrap"
                        >
                            More Dates
                        </button>

                        {showDatePicker && (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-start justify-center"
                                onClick={(e) => {
                                    if (e.target === e.currentTarget) {
                                        setShowDatePicker(false);
                                    }
                                }}
                            >
                                <div
                                    className="mt-20 bg-white shadow-lg rounded-md p-2 border"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        minWidth: '300px',
                                        maxHeight: '80vh',
                                        overflow: 'auto'
                                    }}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold">Select Date</h3>
                                        <button
                                            onClick={() => setShowDatePicker(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <DatePicker
                                        selected={selectedDate ? new Date(selectedDate) : new Date()}
                                        onChange={(date: Date | null) => {
                                            if (date) {
                                                const formattedDate = date.toISOString().split('T')[0];
                                                if (dates.includes(formattedDate)) {
                                                    setSelectedDate(formattedDate);
                                                } else {
                                                    const closestDate = dates.reduce((prev, curr) => {
                                                        return Math.abs(new Date(curr).getTime() - date.getTime()) <
                                                            Math.abs(new Date(prev).getTime() - date.getTime())
                                                            ? curr : prev;
                                                    });
                                                    setSelectedDate(closestDate);
                                                }
                                                setShowDatePicker(false);
                                            }
                                        }}
                                        inline
                                        minDate={dates.length > 0 ? new Date(dates[0]) : undefined}
                                        maxDate={dates.length > 0 ? new Date(dates[dates.length - 1]) : undefined}
                                        highlightDates={dates.map(date => new Date(date))}
                                        yearDropdownItemNumber={10}
                                        showYearDropdown
                                        scrollableYearDropdown
                                        filterDate={(date) => {
                                            const dateStr = date.toISOString().split('T')[0];
                                            return dates.includes(dateStr);
                                        }}
                                        calendarClassName="custom-datepicker"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {matchDetails[activeTab].length === 0 ? (
    <div className="flex justify-center items-center py-8">
        <p className="text-gray-500 text-lg">No matches currently available</p>
    </div>
) : selectedDate ? (
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
}
export default DashBoardFootball;
import React, { useState } from 'react';
import Tabs from '@/pages/Ui/tab';
import MatchDetails from '../Tools/MatchDetails';
import nbaLogo from '/assets/images/landingPage/premier.svg';
import BasketballMatchInfo from '../MatchInfo/BasketballMatchInfo';

const Basketball: React.FC = () => {
    const [selectedMatch, setSelectedMatch] = useState<MatchDetail | null>(null);
    const tabs2: (keyof MatchDetailsType)[] = ["Latest Match", "Live Match", "Coming Match"];

    const handleMatchClick = (match: MatchDetail) => {
        setSelectedMatch(match);
    };

    const handleBackClick = () => {
        setSelectedMatch(null);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row space-x-5">
                <div className='w-full md:w-2/3'>
                    <h1 className='font-bold text-xl'>Basketball Match</h1>
                    <div className="mt-4">
                        {selectedMatch ? (
                            <>
                                <BasketballMatchInfo matchDetails={selectedMatch} />
                                <button onClick={handleBackClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                                    Back to Matches
                                </button>
                            </>
                        ) : (
                            <Tabs
                                tabs={tabs2}
                                renderContent={(activeTab) => RenderSecondContent(activeTab as keyof MatchDetailsType, handleMatchClick)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

type MatchDetail = {
    time: string;
    team1: string;
    team2: string;
    score: string;
    homelogo?: string;
    awaylogo?: string;
    logo: string;
    id: string;
    game_start_date: string;
    game_start_time: string;
};

type MatchDetailsType = {
    "Latest Match": MatchDetail[];
    "Live Match": MatchDetail[];
    "Coming Match": MatchDetail[];
};

const RenderSecondContent = (activeTab: keyof MatchDetailsType, handleMatchClick: (match: MatchDetail) => void) => {
    const latestMatchDetails: MatchDetail[] = [
        {
            time: "4th Qtr",
            team1: "Lakers",
            team2: "Warriors",
            score: "102-99",
            logo: nbaLogo,
            id: "1",
            game_start_date: "2024-01-20",
            game_start_time: "19:00",
        },
        {
            time: "4th Qtr",
            team1: "Lakers",
            team2: "Warriors",
            score: "102-99",
            logo: nbaLogo,
            id: "2",
            game_start_date: "2024-01-20",
            game_start_time: "19:00",
        },
        {
            time: "4th Qtr",
            team1: "Lakers",
            team2: "Warriors",
            score: "102-99",
            logo: nbaLogo,
            id: "3",
            game_start_date: "2024-01-20",
            game_start_time: "19:00",
        },
    ];

    const liveMatchDetails: MatchDetail[] = [
        {
            time: "2nd Qtr",
            team1: "Heat",
            team2: "Celtics",
            score: "45 - 50",
            logo: nbaLogo,
            id: "4",
            game_start_date: "2024-01-20",
            game_start_time: "20:00",
        },
        {
            time: "2nd Qtr",
            team1: "Heat",
            team2: "Celtics",
            score: "45 - 50",
            logo: nbaLogo,
            id: "5",
            game_start_date: "2024-01-20",
            game_start_time: "20:00",
        },
        {
            time: "2nd Qtr",
            team1: "Heat",
            team2: "Celtics",
            score: "45 - 50",
            logo: nbaLogo,
            id: "6",
            game_start_date: "2024-01-20",
            game_start_time: "20:00",
        },
    ];

    const comingMatchDetails: MatchDetail[] = [
        {
            time: "Tomorrow",
            team1: "Bulls",
            team2: "Knicks",
            score: "-",
            logo: nbaLogo,
            id: "7",
            game_start_date: "2024-01-21",
            game_start_time: "19:30",
        },
        {
            time: "Tomorrow",
            team1: "Bulls",
            team2: "Knicks",
            score: "-",
            logo: nbaLogo,
            id: "8",
            game_start_date: "2024-01-21",
            game_start_time: "19:30",
        },
        {
            time: "Tomorrow",
            team1: "Bulls",
            team2: "Knicks",
            score: "-",
            logo: nbaLogo,
            id: "9",
            game_start_date: "2024-01-21",
            game_start_time: "19:30",
        },
    ];

    const matchDetails: MatchDetailsType = {
        "Latest Match": latestMatchDetails,
        "Live Match": liveMatchDetails,
        "Coming Match": comingMatchDetails,
    };

    return (
        <div>
            <div className='bg-[#FBFBFB] py-4 px-4'>
                <h1 className='font-bold'>{activeTab.toUpperCase()}</h1>
            </div>

            {matchDetails[activeTab].map((match, index) => (
                <MatchDetails
                    key={index}
                    time={match.time}
                    team1={match.team1}
                    team2={match.team2}
                    score={match.score}
                    homelogo={match.logo}  // Use the single logo for both
                    awaylogo={match.logo}
                    index={index}
                    onClick={() => handleMatchClick(match)}
                    id={match.id}
                    game_start_date={match.game_start_date}
                    game_start_time={match.game_start_time}
                />
            ))}
        </div>
    );
};

export default Basketball;
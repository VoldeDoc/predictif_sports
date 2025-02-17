import React, { useState } from 'react';
import Tabs from '@/pages/Ui/tab';
import MatchDetails from '../Tools/MatchDetails';
import nbaLogo from '/assets/images/landingPage/premier.svg';
import MatchInfo from '../MatchInfo/MatchInfo';

const Basketball: React.FC = () => {
    const [selectedMatch, setSelectedMatch] = useState(null);
    const tabs2: (keyof MatchDetailsType)[] = ["Latest Match", "Live Match", "Coming Match"];

    const handleMatchClick = (match: any) => {
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
                                <MatchInfo />
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
    logo: string;
};

type MatchDetailsType = {
    "Latest Match": MatchDetail[];
    "Live Match": MatchDetail[];
    "Coming Match": MatchDetail[];
};

const RenderSecondContent = (activeTab: keyof MatchDetailsType, handleMatchClick: (match: MatchDetail) => void) => {
    const latestMatchDetails = [
        {
            time: "4th Qtr",
            team1: "Lakers",
            team2: "Warriors",
            score: "102-99",
            logo: nbaLogo,
        },
        {
            time: "4th Qtr",
            team1: "Lakers",
            team2: "Warriors",
            score: "102-99",
            logo: nbaLogo,
        },
        {
            time: "4th Qtr",
            team1: "Lakers",
            team2: "Warriors",
            score: "102-99",
            logo: nbaLogo,
        },
    ];

    const liveMatchDetails = [
        {
            time: "2nd Qtr",
            team1: "Heat",
            team2: "Celtics",
            score: "45 - 50",
            logo: nbaLogo,
        },
        {
            time: "2nd Qtr",
            team1: "Heat",
            team2: "Celtics",
            score: "45 - 50",
            logo: nbaLogo,
        },
        {
            time: "2nd Qtr",
            team1: "Heat",
            team2: "Celtics",
            score: "45 - 50",
            logo: nbaLogo,
        },
    ];

    const comingMatchDetails = [
        {
            time: "Tomorrow",
            team1: "Bulls",
            team2: "Knicks",
            score: "-",
            logo: nbaLogo,
        },
        {
            time: "Tomorrow",
            team1: "Bulls",
            team2: "Knicks",
            score: "-",
            logo: nbaLogo,
        },
        {
            time: "Tomorrow",
            team1: "Bulls",
            team2: "Knicks",
            score: "-",
            logo: nbaLogo,
        },
    ];

    const matchDetails = {
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
                    logo={match.logo}
                    index={index}
                    onClick={() => handleMatchClick(match)} // Pass the handleMatchClick function
                />
            ))}
        </div>
    );
};

export default Basketball;
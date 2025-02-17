import React, { useState } from 'react';
import MatchDetails from '../Tools/MatchDetails';
import premierLeagueLogo from '/assets/images/landingPage/premier.svg';
import MatchInfo from '../MatchInfo/MatchInfo';
import Tabs from '@/pages/Ui/tab';

const Football: React.FC = () => {
    const [selectedMatch, setSelectedMatch] = useState<MatchDetail | null>(null);
    const tabs2 = ["Latest Match", "Live Match", "Coming Match"];

    const handleMatchClick = (match: MatchDetail) => {
        setSelectedMatch(match);
    };

    const handleBackClick = () => {
        setSelectedMatch(null);
    };

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
                                <MatchInfo />
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

const RenderSecondContent = (activeTab: keyof MatchDetailsType, handleMatchClick: (match: MatchDetail) => void): JSX.Element => {
    const latestMatchDetails = [
        {
            time: "87'",
            team1: "Portugal",
            team2: "Italy",
            score: "1 - 2",
            logo: premierLeagueLogo,
        },
        {
            time: "87'",
            team1: "Portugal",
            team2: "Italy",
            score: "1 - 2",
            logo: premierLeagueLogo,
        },
        {
            time: "87'",
            team1: "Portugal",
            team2: "Italy",
            score: "1 - 2",
            logo: premierLeagueLogo,
        },
    ];

    const liveMatchDetails = [
        {
            time: "45'",
            team1: "Spain",
            team2: "Germany",
            score: "0 - 1",
            logo: premierLeagueLogo,
        },
        {
            time: "45'",
            team1: "Spain",
            team2: "Germany",
            score: "0 - 1",
            logo: premierLeagueLogo,
        },
        {
            time: "45'",
            team1: "Spain",
            team2: "Germany",
            score: "0 - 1",
            logo: premierLeagueLogo,
        },
    ];

    const comingMatchDetails = [
        {
            time: "Tomorrow",
            team1: "France",
            team2: "Brazil",
            score: "-",
            logo: premierLeagueLogo,
        },
        {
            time: "Tomorrow",
            team1: "France",
            team2: "Brazil",
            score: "-",
            logo: premierLeagueLogo,
        },
        {
            time: "Tomorrow",
            team1: "France",
            team2: "Brazil",
            score: "-",
            logo: premierLeagueLogo,
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
                    onClick={() => handleMatchClick(match)} 
                />
            ))}
        </div>
    );
};

export default Football;
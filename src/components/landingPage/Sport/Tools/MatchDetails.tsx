import React from 'react';

interface MatchDetailsProps {
    time: string;
    team1: string;
    team2: string;
    score: string;
    logo: string;
    index: number;
    onClick: () => void; // Add this line
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ time, team1, team2, score, logo, index, onClick }) => { // Modify this line
    return (
        <div className={`${index % 2 === 0 ? 'bg-[#FBFBFB]' : ''} py-4 px-4 hover:bg-gray-200 cursor-pointer`} onClick={onClick}> {/* Add hover and cursor styles */}
            <div className='hidden md:flex space-x-3 sm:space-x-12 pb-4'>
                <p>{time}</p>
                <div className="flex items-center">
                    <img src={logo} alt="Team Logo" className="mr-2" />
                    {team1}
                </div>
                <p className='bg-[#5742A91A] rounded-full text-[#5742A9] px-4 py-1 font-semibold'>{score}</p>
                <div className="flex items-center">
                    <img src={logo} alt="Team Logo" className="mr-2" />
                    {team2}
                </div>
            </div>

            <div className='flex space-x-4 md:hidden'>
                <div className="text-center items-center">
                    <p>{time}</p>
                </div>
                <div className="flex space-x-12">
                    <div className='space-y-2'>
                        <div className="flex items-center">
                            <img src={logo} alt="Team Logo" className="mr-2" />
                            {team1}
                        </div>
                        <div className="flex items-center">
                            <img src={logo} alt="Team Logo" className="mr-2" />
                            {team2}
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <p>{score.split(' - ')[0]}</p>
                        <p>{score.split(' - ')[1]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchDetails;
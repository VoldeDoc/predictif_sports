import React from 'react';

interface MatchDetailsProps {
    id: string;
    time: string;
    team1: string;
    team2: string;
    score: string;
    homelogo: string;
    awaylogo: string;
    index: number;
    logo? :string
    homescore?: string;
    awayscore?: string;
    isUpcoming?: boolean;
    game_start_date: string;
    game_start_time: string;
    onClick: () => void;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ 
    time, 
    team1, 
    team2, 
    score, 
    homelogo, 
    awaylogo, 
    index, 
    homescore, 
    awayscore, 
    isUpcoming, 
    onClick 
}) => {
    return (
        <div className={`${index % 2 === 0 ? 'bg-[#FBFBFB]' : ''} py-4 px-4 hover:bg-gray-200 cursor-pointer`} onClick={onClick}>
            <div className='hidden md:grid md:grid-cols-12 md:gap-2 items-center'>
                {/* Time Column */}
                <div className="col-span-2 flex justify-center">
                    <p className="text-gray-600 font-medium text-sm whitespace-nowrap">
                        {isUpcoming ? 'Upcoming' : time}
                    </p>
                </div>

                {/* Home Team Column */}
                <div className="col-span-3 flex items-center justify-end gap-3">
                    <p className="font-medium text-right text-sm truncate">{team1}</p>
                    <img src={homelogo} alt="Home Logo" className="w-8 h-8 object-contain flex-shrink-0" />
                </div>

                {/* Score Column */}
                <div className="col-span-2 flex justify-center">
                    <p className={`${isUpcoming ? 'bg-green-100 text-green-600' : 'bg-[#5742A91A] text-[#5742A9]'} rounded-full px-4 py-1 font-semibold text-sm whitespace-nowrap`}>
                        {isUpcoming ? 'VS' : score}
                    </p>
                </div>

                {/* Away Team Column */}
                <div className="col-span-3 flex items-center gap-3">
                    <img src={awaylogo} alt="Away Logo" className="w-8 h-8 object-contain flex-shrink-0" />
                    <p className="font-medium text-sm truncate">{team2}</p>
                </div>

                {/* Arrow Column */}
                <div className="col-span-2 flex justify-center">
                    <div className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className='flex space-x-4 md:hidden'>
                <div className="text-center items-center">
                    <p>{isUpcoming ? 'Upcoming' : time}</p>
                </div>
                <div className="flex space-x-12">
                    <div className='space-y-2'>
                        <div className="flex items-center">
                            <img src={homelogo} alt="Team Logo" className="mr-2 w-8 h-8" />
                            {team1}
                        </div>
                        <div className="flex items-center">
                            <img src={awaylogo} alt="Team Logo" className="mr-2 w-8 h-8" />
                            {team2}
                        </div>
                    </div>
                    {!isUpcoming && (
                        <div className='space-y-2'>
                            <p>{homescore}</p>
                            <p>{awayscore}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatchDetails;
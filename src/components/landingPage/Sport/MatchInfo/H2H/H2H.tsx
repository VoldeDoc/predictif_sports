import  { useState } from 'react';
import { FaFutbol, FaRegFutbol, FaRegClock, FaRegCalendarAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const h2hData = [
    {
        date: '2025-02-10',
        team1: 'Arsenal',
        team2: 'Chelsea',
        score: '2-1',
        details: 'Arsenal won with a late goal in the 90th minute.',
        stats: {
            cards: 3,
            freeKicks: 10,
            corners: 5
        }
    },
    {
        date: '2024-11-05',
        team1: 'Chelsea',
        team2: 'Arsenal',
        score: '1-1',
        details: 'A tightly contested match ending in a draw.',
        stats: {
            cards: 2,
            freeKicks: 8,
            corners: 6
        }
    },
    {
        date: '2024-08-20',
        team1: 'Arsenal',
        team2: 'Chelsea',
        score: '0-3',
        details: 'Chelsea dominated the match with three goals.',
        stats: {
            cards: 1,
            freeKicks: 12,
            corners: 4
        }
    }
];

export default function H2H() {
    const [selectedMatch, setSelectedMatch] = useState<number | null>(null);

    const toggleDetails = (index: number) => {
        setSelectedMatch(selectedMatch === index ? null : index);
    };

    return (
        <div className="h2h-container p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Head-to-Head Fixtures</h1>
            <div className="space-y-4">
                {h2hData.map((match, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDetails(index)}>
                            <div>
                                <p className="text-lg font-semibold">{match.team1} vs {match.team2}</p>
                                <p className="text-sm text-gray-600"><FaRegCalendarAlt className="inline mr-1" />{match.date}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-lg font-semibold mr-2">{match.score}</p>
                                {selectedMatch === index ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                        </div>
                        {selectedMatch === index && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <p>{match.details}</p>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                                    <div className="flex items-center">
                                        <FaFutbol className="text-yellow-500 mr-2" />
                                        <span>{match.stats.cards} Cards</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaRegFutbol className="text-blue-500 mr-2" />
                                        <span>{match.stats.freeKicks} Free Kicks</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaRegClock className="text-green-500 mr-2" />
                                        <span>{match.stats.corners} Corners</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
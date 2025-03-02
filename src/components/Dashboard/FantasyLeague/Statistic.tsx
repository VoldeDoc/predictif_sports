import { useEffect, useState } from 'react';
import { Player, Position } from '@/types';

export default function FantasyStatistic() {
    const [player, setPlayer] = useState<Player | null>(null);

    useEffect(() => {
        const playerId = localStorage.getItem('selectedPlayerForStats');
        if (playerId) {
            // Get the players data from localStorage
            const playersData = localStorage.getItem('players');
            if (playersData) {
                try {
                    const players = JSON.parse(playersData);
                    const selectedPlayer = players.find((p: Player) => p.id === parseInt(playerId));
                    if (selectedPlayer) {
                        setPlayer(selectedPlayer);
                    } else {
                        console.error('Selected player not found');
                    }
                } catch (error) {
                    console.error('Error parsing players data:', error);
                }
            } else {
                // If players data is not in localStorage, try to get it from the data file
                import('./data/players').then(({ players }) => {
                    const selectedPlayer = players.find((p: Player) => p.id === parseInt(playerId));
                    if (selectedPlayer) {
                        setPlayer(selectedPlayer);
                        // Store the players data in localStorage for future use
                        localStorage.setItem('players', JSON.stringify(players));
                    }
                }).catch(error => {
                    console.error('Error loading players data:', error);
                });
            }
        }
    }, []);

    if (!player) {
        return <div>Loading...</div>;
    }

    const renderStats = () => {
        switch (player.position) {
            case Position.GK:
                return (
                    <>
                        <div className='text-white'>
                            <h1 className="font-semibold">Clean Sheets</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.cleanSheets}</h1>
                        </div>
                        <div className='text-white'>
                            <h1 className="font-semibold">Saves</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.saves}</h1>
                        </div>
                        <div className='text-white'>
                            <h1 className="font-semibold">Goals Conceded</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.goalsConceded}</h1>
                        </div>
                        <div className='text-white'>
                            <h1 className="font-semibold">Penalty Saves</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.penaltySaves}</h1>
                        </div>
                    </>
                );
            case Position.DEF:
                return (
                    <>
                        <div className='text-white'>
                            <h1 className="font-semibold">Goals</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.goals}</h1>
                        </div>
                        <div className='text-white'>
                            <h1 className="font-semibold">Assists</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.assists}</h1>
                        </div>
                        <div className='text-white'>
                            <h1 className="font-semibold">Clean Sheets</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.cleanSheets}</h1>
                        </div>
                        <div className='text-white'>
                            <h1 className="font-semibold">Tackles</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.tackles}</h1>
                        </div>
                    </>
                );
            case Position.MID:
                return (
                    <>
                        <div className='text-white'>
                            <h1 className="font-semibold">Goals</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.goals}</h1>
                        </div>
                        <div className='text-white'>
                            <h1 className="font-semibold">Assists</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.assists}</h1>
                        </div>
                        <div className='text-white'>
                            <h1 className="font-semibold">Passes</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.passes}</h1>
                        </div>
                        <div className='text-white'>
                            <h1 className="font-semibold">Dribbles</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.dribbles}</h1>
                        </div>
                    </>
                );
            case Position.FWD:
                return (
                    <>
                        <div className='text-white'>
                            <h1 className="font-semibold">Goals</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.goals}</h1>
                        </div>
                        <div className='text-white'>
                            <h1 className="font-semibold">Assists</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.assists}</h1>
                        </div>
                        <div className='text-white'>
                            <h1 className="font-semibold">Shots</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.shots}</h1>
                        </div>
                        <div className='text-white'>
                            <h1 className="font-semibold">Shots on Target</h1>
                            <h1 className='font-bold text-3xl'>{player.stats.shotsOnTarget}</h1>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold">Statistic</h1>

            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                <div className="w-full md:w-1/2">
                    <div className="px-5 py-5" style={{ background: 'linear-gradient(to bottom right, #0C21C1, #6D748B)' }}>
                        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                            <div>
                                <img src={player.image} alt={player.name} className="h-42 w-42" />
                            </div>
                            <div>
                                <div className="text-white">
                                    <h1 className="font-semibold text-lg">Name:</h1>
                                    <h1 className="font-bold text-2xl">{player.name}</h1>
                                </div>
                                <div className="text-white">
                                    <h1 className="font-semibold text-lg">Position:</h1>
                                    <h1 className="font-bold text-2xl">{player.position}</h1>
                                </div>
                                {/* <div className="text-white">
                                    <h1 className="font-semibold text-lg">Overall Rating</h1>
                                    <h1 className="font-bold text-2xl">{player.stats.overallRating || 'N/A'}</h1>
                                </div> */}
                            </div>
                            <div>
                                <div className="text-white">
                                    <h1 className="font-semibold text-lg">Nationality:</h1>
                                    <img
                                        src={`https://flagcdn.com/w80/${player.nationality?.toLowerCase()}.png`}
                                        alt={player.nationality || ''}
                                        className="w-14 h-10"
                                    />
                                </div>
                                <div className="text-white">
                                    <h1 className="font-semibold text-lg">Team:</h1>
                                    <img src={`/assets/images/teams/${player.team.toLowerCase()}.png`} className='w-14 h-14' alt={player.team} />
                                </div>
                            </div>
                        </div>
                        <div className="border-white border-2 my-3"></div>
                        <div className="flex space-x-20">
                            <div className='space-y-9 py-9'>
                                {renderStats()}
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>

                <div className="w-full md:w-1/2">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'>
                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/hand.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-xl font-semibold'>APPEARANCES</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                {player.stats.appearances}
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/mm.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>OVERALL GOALS</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                {player.stats.goals || 0}
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/money.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>PRICE</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                £{player.price}m
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/budget.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>Clean Sheets</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                {player.stats.cleanSheets || 0}
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/red.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>Red Cards</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                {player.stats.redCards}
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/yellow.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>Yellow Cards</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                {player.stats.yellowCards}
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/budget.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>Assists</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                {player.stats.assists || 0}
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/budget.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>Pass Accuracy</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                {player.stats.passAccuracy || 0}%
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer mt-5">
                        <div className='flex flex-col'>
                            <p className='font-bold text-2xl'>PRICE CHART</p>
                            <p className='text-2xl'>£{player.price}m</p>
                        </div>
                        <div className='text-center items-center font-bold text-blue-800 text-xl py-3'>
                            <p>Player Value</p>
                            <p>Current Season</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
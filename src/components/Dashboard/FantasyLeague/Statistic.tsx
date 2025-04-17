import { Position } from '@/types';
import { useViewContext } from './FantasyLeague';
import { useEffect } from 'react';

// Define interface for player data to fix TypeScript errors
interface PlayerData {
  id?: string;
  player_id?: string;
  name?: string;
  photo?: string;
  position?: string;
  position_short?: string;
  current_club_name?: string;
  current_club?: {
    current_club_name?: string;
    appearance?: number;
    goal?: number;
    assists?: number;
    clean_sheets?: number;
    red_card?: number;
    yellow_card?: number;
  };
  evaluation?: string;
  nationality?: string;
  appearance?: number;
  goal?: number;
  assists?: number;
  clean_sheets?: number;
  red_card?: number;
  yellow_card?: number;
  bio?: any; // This can be either a string or an object
  dob?: string;
  height?: string;
  weight?: string;
  earning?: string;
}

export default function FantasyStatistic() {
    const { selectedPlayer } = useViewContext();
    
    // Add type assertion for selectedPlayer
    const typedPlayer = selectedPlayer as PlayerData | null;
    
    // Log full player data for debugging
    useEffect(() => {
        if (typedPlayer) {
            console.log("Selected player data:", typedPlayer);
        }
    }, [typedPlayer]);

    // If no player is selected, show a message
    if (!typedPlayer) {
        return (
            <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-gray-700">No player selected</h3>
                <p className="text-gray-500 mt-2">Please select a player from the list to view their statistics.</p>
            </div>
        );
    }

    // Extract bio data - first check if bio is an object or directly in the player object
    const bioData = typeof typedPlayer.bio === 'object' && typedPlayer.bio !== null 
        ? typedPlayer.bio as PlayerData
        : typedPlayer;

    // Extract current club data
    const clubData = typedPlayer.current_club || {};

    // Map API position format to our Position enum
    const getPosition = (positionStr?: string): Position => {
        if (!positionStr) return Position.MID;
        
        const positionMap: Record<string, Position> = {
            'GK': Position.GK,
            'Goalkeeper': Position.GK,
            'DEF': Position.DEF,
            'Defender': Position.DEF,
            'MID': Position.MID,
            'Midfielder': Position.MID,
            'FWD': Position.FWD,
            'Forward': Position.FWD,
            'Striker': Position.FWD
        };

        return positionMap[positionStr] || Position.MID;
    };

    // Parse price from evaluation (e.g., "£20 million" -> 20)
    const parsePrice = (evaluation?: string): number => {
        if (!evaluation) return 0;
        const match = evaluation.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    };

    // Create a player object from API data that matches our expected format
    const player = {
        id: typedPlayer.id || typedPlayer.player_id || bioData.player_id || '',
        name: typedPlayer.name || bioData.name || 'Unknown Player',
        image: typedPlayer.photo || bioData.photo || '',
        position: getPosition(typedPlayer.position_short || bioData.position_short || typedPlayer.position || bioData.position),
        team: typedPlayer.current_club_name || clubData.current_club_name || '',
        price: parsePrice(typedPlayer.evaluation || bioData.evaluation),
        nationality: typedPlayer.nationality || bioData.nationality || 'gb',        
        stats: {
            appearances: typedPlayer.appearance || clubData.appearance || 0,
            goals: typedPlayer.goal || clubData.goal || 0,
            assists: typedPlayer.assists || clubData.assists || 0,
            cleanSheets: typedPlayer.clean_sheets || clubData.clean_sheets || 0,
            redCards: typedPlayer.red_card || clubData.red_card || 0,
            yellowCards: typedPlayer.yellow_card || clubData.yellow_card || 0,
            saves: 0,
            goalsConceded: 0,
            penaltySaves: 0,
            tackles: 0,
            passes: 0,
            dribbles: 0,
            shots: 0,
            shotsOnTarget: 0,
            passAccuracy: 75 // Default value
        }
    };

    // Extract personal details, checking both main object and bio object
    const dob = bioData.dob || typedPlayer.dob || "Not available";
    const height = bioData.height || typedPlayer.height || "Not available";
    const weight = bioData.weight || typedPlayer.weight || "Not available";
    const earning = bioData.earning || typedPlayer.earning || "Not available";
    
    // For bio content, construct from available data if no actual bio text is available
    let bioContent = '';
    try {
        // Check if there's a direct bio string
        if (typeof typedPlayer.bio === 'string') {
            bioContent = typedPlayer.bio;
        } else {
            // Create a biography from available data
            bioContent = `${player.name} is a professional footballer who plays as a ${bioData.position || player.position} for ${player.team}. `;
            
            if (dob !== "Not available") {
                bioContent += `Born on ${dob}, `;
            }
            
            if (height !== "Not available" || weight !== "Not available") {
                bioContent += `with a physical profile of ${height} tall and weighing ${weight}. `;
            }
            
            if (earning !== "Not available") {
                bioContent += `Currently earning ${earning}. `;
            }
            
            if (player.price > 0) {
                bioContent += `Current market value is estimated at £${player.price}m.`;
            }
        }
    } catch (error) {
        console.error("Error processing bio content:", error);
        bioContent = '';
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
            <h1 className="text-3xl font-bold">Player Statistics</h1>

            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mt-6">
                <div className="w-full md:w-1/2">
                    <div className="px-5 py-5" style={{ background: 'linear-gradient(to bottom right, #0C21C1, #6D748B)' }}>
                        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                            <div>
                                <img 
                                    src={player.image} 
                                    alt={player.name} 
                                    className="h-42 w-42 object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/assets/images/player-placeholder.png'; // Fallback image
                                    }} 
                                />
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
                            </div>
                            <div>
                                {/* <div className="text-white">
                                    <h1 className="font-semibold text-lg">Nationality:</h1>
                                    <img
                                        src={`https://flagcdn.com/w80/${player.nationality?.toLowerCase()}.png`}
                                        alt={player.nationality || ''}
                                        className="w-14 h-10"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/assets/images/flag-placeholder.png';
                                        }}
                                    />
                                </div> */}
                                <div className="text-white">
                                    <h1 className="font-semibold text-lg">Team:</h1>
                                    <h1 className="font-bold text-xl">{player.team}</h1>
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

                    {/* Bio section */}
                    <div className="bg-blue-50 rounded-lg p-8 mt-5">
                        <h3 className="font-bold text-2xl mb-4">Player Bio</h3>
                        <p className="text-gray-700">
                            {bioContent || "No biography available for this player."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
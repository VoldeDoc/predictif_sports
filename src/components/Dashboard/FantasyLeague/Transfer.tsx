import { useState, useEffect } from 'react';
import { useSquad } from './context/squadContext';
import { Position, Player } from '@/types';
import { toast } from 'react-toastify';
import { Search, Filter, RefreshCw, ArrowRight } from 'lucide-react';
import useDashBoardManagement from '@/hooks/useDashboard';

// Define substitution type - also used for transfers since API structure is the same
interface SubstitutionValues {
    game_id: string;
    player_squad_id_out: string;
    player_squad_id: string;
    player_squad_position: string;
}

export default function Transfer() {
    const { getRemainingBudget, syncSquadWithAPIPlayers } = useSquad();
    const { getPlayer, getTeam, getFantasySquadPlayers, getMatchDay, substitute } = useDashBoardManagement();

    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [selectedSquadPlayer, setSelectedSquadPlayer] = useState<Player | null>(null);
    const [filterPosition, setFilterPosition] = useState<Position | 'ALL'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [squadSearchTerm, setSquadSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [matchDayData, setMatchDayData] = useState<any>(null);

    // State for API data
    const [isLoading, setIsLoading] = useState(true);
    const [clubs, setClubs] = useState<any[]>([]);
    const [selectedClub, setSelectedClub] = useState<string | null>(null);
    const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
    const [mySquadPlayers, setMySquadPlayers] = useState<Player[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const remainingBudget = getRemainingBudget?.() ;

    useEffect(() => {
        const fetchMatchdayData = async () => {
            try {
                const matchdayData = await getMatchDay();
                console.log(matchdayData);
                    setMatchDayData(matchdayData[0]);
                    
            } catch (error) {
                console.error("Error fetching matchday data:", error);
                toast.error("Failed to load matchday data. Transfers may not work correctly.");
            }
        };
    
        fetchMatchdayData();
    }, []);

    // Fetch current squad from API with better error handling
    useEffect(() => {
        const fetchMySquad = async () => {
            try {
                setIsLoading(true);
                const squadData = await getFantasySquadPlayers();
                
                if (!squadData) {
                    throw new Error("Failed to fetch squad data from API");
                }
                
                console.log("Raw squad data:", squadData);

                // Safely access the players array
                const playersData = Array.isArray(squadData[0]) 
                    ? squadData[0] 
                    : Array.isArray(squadData) 
                        ? squadData 
                        : [];

                if (playersData && playersData.length > 0) {
                    console.log("Processed players data:", playersData.length, "players");

                    // Transform API response to match your Player type
                    const transformedPlayers = playersData.map((player: any) => {
                        // Extract price from "£20 million" format if available
                        let price = 5.0; // Default price
                        if (player.evaluation) {
                            const priceMatch = player.evaluation.match(/£(\d+)/);
                            if (priceMatch && priceMatch[1]) {
                                price = parseFloat(priceMatch[1]);
                            }
                        }

                        // Map position to your Position enum
                        let position = Position.MID; // Default position
                        if (player.position_short === "GK" || player.position === "Goalkeeper") {
                            position = Position.GK;
                        } else if (player.position_short === "DEF" || player.position === "Defender") {
                            position = Position.DEF;
                        } else if (player.position_short === "FWD" || player.position === "Forward" || player.position === "Striker") {
                            position = Position.FWD;
                        }

                        return {
                            id: player.id,
                            name: player.name,
                            team: player.current_club_name || "Unknown Team",
                            position: position,
                            price: price,
                            points: { current: 0, total: 0, change: 0 },
                            status: { isAvailable: true },
                            image: player.photo,
                            stats: {
                                goals: player.goal || 0,
                                assists: player.assists || 0,
                                cleanSheets: player.clean_sheets || 0,
                                yellowCards: player.yellow_cards || 0,
                                redCards: player.red_cards || 0,
                                appearances: player.appearances || 0,
                                saves: player.saves || 0,
                                goalsConceded: player.goals_conceded || 0
                            },
                            selected: false,
                            inMatchday: player.in_matchday === true,
                            nationality: player.nationality || "Unknown"
                        };
                    });

                    setMySquadPlayers(transformedPlayers);

                    // Also sync with context for consistency
                    if (typeof syncSquadWithAPIPlayers === 'function') {
                        syncSquadWithAPIPlayers(transformedPlayers);
                    }
                } else {
                    console.warn("No squad players found in API response");
                    // Set empty array rather than error if no players found
                    setMySquadPlayers([]);
                    setFetchError("No players found in your squad. Please build your squad first.");
                }
            } catch (error) {
                console.error("Error fetching squad players:", error);
                setFetchError("Failed to load your squad players. Please try refreshing the page.");
                // Set empty array to avoid undefined errors
                setMySquadPlayers([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMySquad();
    }, []);

    // Fetch clubs with better error handling
    useEffect(() => {
        const fetchClubs = async () => {
            try {
                setIsLoading(true);
                const teamsResponse = await getTeam("eyJpdiI6IndmQ1R5VEdmM2Ewd1A3MHkwMjA3Y3c9PSIsInZhbHVlIjoiMjJDNnJDVzFtVy9WNnVwU0xFSW5sZz09IiwibWFjIjoiNzQ0Yzk2NGEwYmZiMjMyNzM0ZmJhMDNiZThhMzUzYmRlMGQzNjNhNzc3MDFjZjRiZTY3YTNhM2I2OTk5Y2YzZSIsInRhZyI6IiJ9S");
                
                if (!teamsResponse) {
                    throw new Error("Failed to fetch clubs from API");
                }

                console.log("Clubs fetched:", teamsResponse);

                // Safely access the clubs array
                const clubsData = Array.isArray(teamsResponse[0]) 
                    ? teamsResponse[0] 
                    : Array.isArray(teamsResponse) 
                        ? teamsResponse 
                        : [];

                if (clubsData && clubsData.length > 0) {
                    setClubs(clubsData);
                } else {
                    setFetchError("No clubs available in the transfer market.");
                    setClubs([]);
                }
            } catch (error) {
                console.error("Error fetching clubs:", error);
                setFetchError("Failed to load available clubs. Please try again.");
                setClubs([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClubs();
    }, []);

    // Filter squad players
    const filteredSquadPlayers = mySquadPlayers.filter(player => {
        if (!player || !player.name) return false;

        try {
            const matchesSearch = player.name.toLowerCase().includes(squadSearchTerm.toLowerCase());
            const matchesPosition = filterPosition === 'ALL' || player.position === filterPosition;
            return matchesSearch && matchesPosition;
        } catch (error) {
            console.error("Error filtering player:", player, error);
            return false;
        }
    });

    // Fetch players when a club is selected with better error handling
    const handleClubSelect = async (clubId: string) => {
        if (!clubId) {
            setSelectedClub(null);
            setAvailablePlayers([]);
            return;
        }

        setIsLoading(true);
        setSelectedClub(clubId);
        setAvailablePlayers([]);

        try {
            const playersResponse = await getPlayer(clubId);
            
            if (!playersResponse) {
                throw new Error("Failed to fetch players from API");
            }

            console.log("Players fetched:", playersResponse);

            // Safely access the players array
            const playersData = Array.isArray(playersResponse[0]) 
                ? playersResponse[0] 
                : Array.isArray(playersResponse) 
                    ? playersResponse 
                    : [];

            if (playersData && playersData.length > 0) {
                // Transform API response to match your Player type
                const transformedPlayers = playersData.map((player: any) => {
                    // Extract price from "£20 million" format if available
                    let price = 5.0; // Default price
                    if (player.evaluation) {
                        const priceMatch = player.evaluation.match(/£(\d+)/);
                        if (priceMatch && priceMatch[1]) {
                            price = parseFloat(priceMatch[1]);
                        }
                    }

                    // Map position to your Position enum
                    let position = Position.MID; // Default position
                    if (player.position_short === "GK" || player.position === "Goalkeeper") {
                        position = Position.GK;
                    } else if (player.position_short === "DEF" || player.position === "Defender") {
                        position = Position.DEF;
                    } else if (player.position_short === "FWD" || player.position === "Forward" || player.position === "Striker") {
                        position = Position.FWD;
                    }

                    return {
                        id: player.id,
                        name: player.name,
                        team: player.current_club_name || "Unknown Team",
                        position: position,
                        price: price,
                        points: { current: 0, total: 0, change: 0 },
                        status: { isAvailable: true },
                        image: player.photo,
                        stats: {
                            goals: player.goal || 0,
                            assists: player.assists || 0,
                            cleanSheets: player.clean_sheets || 0,
                            yellowCards: player.yellow_cards || 0,
                            redCards: player.red_cards || 0,
                            appearances: player.appearances || 0,
                            saves: player.saves || 0,
                            goalsConceded: player.goals_conceded || 0
                        },
                        selected: false,
                        inMatchday: false,
                        nationality: player.nationality || "Unknown"
                    };
                });

                setAvailablePlayers(transformedPlayers);
            } else {
                setFetchError("No players available for this club.");
                setAvailablePlayers([]);
            }
        } catch (error) {
            console.error("Error fetching players:", error);
            setFetchError("Failed to load club players. Please try again.");
            setAvailablePlayers([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter players by position and search term
    const filteredPlayers = availablePlayers.filter(player => {
        if (!player || !player.name) return false;

        const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPosition = filterPosition === 'ALL' || player.position === filterPosition;
        const notInSquad = !mySquadPlayers.some(squadPlayer => squadPlayer.id === player.id);
        return matchesSearch && matchesPosition && notInSquad;
    });

    const handlePlayerSelect = (player: Player) => {
        setSelectedPlayer(player);
    };

    const handleSquadPlayerSelect = (player: Player) => {
        setSelectedSquadPlayer(player);
    };

    const handleTransfer = async () => {
        if (!selectedPlayer || !selectedSquadPlayer) {
            toast.error("Please select both players for transfer");
            return;
        }
    
        if (selectedPlayer.position !== selectedSquadPlayer.position) {
            toast.error("Players must have the same position for transfer");
            return;
        }
    
        const transferCost = selectedPlayer.price - selectedSquadPlayer.price;
    
        if (transferCost > remainingBudget) {
            toast.error(`Not enough budget for this transfer. Need £${transferCost.toFixed(1)}M more.`);
            return;
        }
    
        if (!matchDayData) {
            toast.error("Match day information not available. Please try again later.");
            return;
        }
    
        try {
            setLoading(true);
            
            // Convert position to the format expected by the API
            let positionForAPI = "";
            switch(selectedPlayer.position) {
                case Position.GK:
                    positionForAPI = "GK";
                    break;
                case Position.DEF:
                    positionForAPI = "DEF";
                    break;
                case Position.MID:
                    positionForAPI = "MID";
                    break;
                case Position.FWD:
                    positionForAPI = "FWD";
                    break;
                default:
                    positionForAPI = String(selectedPlayer.position);
            }
            
            // Use the substitution API for transfer (same data structure)
            const substitutionData: SubstitutionValues = {
                game_id: matchDayData.id,
                player_squad_id_out: String(selectedSquadPlayer.id),
                player_squad_id: String(selectedPlayer.id),
                player_squad_position: positionForAPI
            };
    
            console.log("Sending transfer data:", substitutionData);
            
            const result = await substitute(substitutionData);
            
            // if (!result) {
            //     throw new Error("No response received from server");
            // }

            if (!result) {
                toast.success("Player transferred successfully");
            }
            
            console.log("Transfer result:", result);
            
            toast.success(`Successfully transferred in ${selectedPlayer.name}`);
            
            // Reset selections
            setSelectedPlayer(null);
            setSelectedSquadPlayer(null);
            
            // Optionally refresh the page to show updated squad
            window.location.reload();
        } catch (error: any) {
            console.error("Transfer failed:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to complete transfer. Please try again later.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Show detailed error message when API fails
    if (fetchError && mySquadPlayers.length === 0) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md mx-auto mt-10">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Unable to Access Transfer Market</h2>
                <p className="text-gray-500 mb-4">{fetchError}</p>
                
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-700">Loading Transfer Market</h2>
                    <p className="text-gray-500 mt-2">Please wait...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className='flex flex-col gap-4'>
                {/* Transfer Box */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-lg shadow-lg p-5 mb-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Transfer Market</h2>
                        <div className="bg-white text-blue-800 px-4 py-2 rounded-lg font-bold">
                            Budget: £{remainingBudget.toFixed(1)}M
                        </div>
                    </div>

                    <div className="mt-4 bg-white/10 p-4 rounded-lg">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="w-full md:w-1/2 flex flex-col">
                                <h3 className="text-sm uppercase tracking-wide mb-2">Player Out</h3>
                                {selectedSquadPlayer ? (
                                    <div className="bg-white/20 rounded-lg p-3 flex items-center">
                                        <div className="bg-blue-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                            {selectedSquadPlayer.position?.charAt(0) || '?'}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{selectedSquadPlayer.name}</p>
                                            <p className="text-xs">{selectedSquadPlayer.team} • £{selectedSquadPlayer.price}M</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white/5 border border-dashed border-white/30 rounded-lg p-3 text-center text-sm">
                                        Select a player from your squad
                                    </div>
                                )}
                            </div>

                            <div className="bg-blue-800 rounded-full p-2">
                                <RefreshCw className="h-5 w-5" />
                            </div>

                            <div className="w-full md:w-1/2 flex flex-col">
                                <h3 className="text-sm uppercase tracking-wide mb-2">Player In</h3>
                                {selectedPlayer ? (
                                    <div className="bg-white/20 rounded-lg p-3 flex items-center">
                                        <div className="bg-blue-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                            {selectedPlayer.position?.charAt(0) || '?'}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{selectedPlayer.name}</p>
                                            <p className="text-xs">{selectedPlayer.team} • £{selectedPlayer.price}M</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white/5 border border-dashed border-white/30 rounded-lg p-3 text-center text-sm">
                                        Select a player from the market
                                    </div>
                                )}
                            </div>
                        </div>

                        {selectedPlayer && selectedSquadPlayer && (
                            <div className="mt-4 flex items-center justify-between">
                                <div>
                                    <span className="text-sm">Transfer cost: </span>
                                    <span className={`font-bold ${selectedPlayer.price > selectedSquadPlayer.price ? 'text-red-300' : 'text-green-300'}`}>
                                        £{(selectedPlayer.price - selectedSquadPlayer.price).toFixed(1)}M
                                    </span>
                                </div>
                                <button
                                    onClick={handleTransfer}
                                    disabled={loading}
                                    className={`${
                                        loading ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'
                                    } text-white px-4 py-2 rounded-lg font-semibold flex items-center`}
                                >
                                    <span>{loading ? 'Processing...' : 'Complete Transfer'}</span>
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main content */}
                <div className='flex flex-col md:flex-row gap-4'>
                    {/* Your Squad Players */}
                    <div className="w-full md:w-1/2">
                        <div className="bg-blue-50 px-4 py-3 rounded-md mb-4">
                            <h2 className="font-bold text-lg">Your Squad ({mySquadPlayers.length} Players)</h2>

                            <div className="mt-2 flex items-center">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Search className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search your players..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={squadSearchTerm}
                                        onChange={(e) => setSquadSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='bg-blue-50 px-2 py-2 mb-4'>
                            <div className='flex gap-2 justify-start overflow-x-auto'>
                                <button
                                    className={`px-4 py-1 rounded-lg ${filterPosition === 'ALL' ? 'bg-blue-800 text-white' : 'bg-gray-200'} whitespace-nowrap`}
                                    onClick={() => setFilterPosition('ALL')}
                                >
                                    All
                                </button>
                                <button
                                    className={`px-4 py-1 rounded-lg ${filterPosition === Position.GK ? 'bg-blue-800 text-white' : 'bg-gray-200'} whitespace-nowrap`}
                                    onClick={() => setFilterPosition(Position.GK)}
                                >
                                    Goalkeepers
                                </button>
                                <button
                                    className={`px-4 py-1 rounded-lg ${filterPosition === Position.DEF ? 'bg-blue-800 text-white' : 'bg-gray-200'} whitespace-nowrap`}
                                    onClick={() => setFilterPosition(Position.DEF)}
                                >
                                    Defenders
                                </button>
                                <button
                                    className={`px-4 py-1 rounded-lg ${filterPosition === Position.MID ? 'bg-blue-800 text-white' : 'bg-gray-200'} whitespace-nowrap`}
                                    onClick={() => setFilterPosition(Position.MID)}
                                >
                                    Midfielders
                                </button>
                                <button
                                    className={`px-4 py-1 rounded-lg ${filterPosition === Position.FWD ? 'bg-blue-800 text-white' : 'bg-gray-200'} whitespace-nowrap`}
                                    onClick={() => setFilterPosition(Position.FWD)}
                                >
                                    Forwards
                                </button>
                            </div>
                        </div>

                        {/* Squad Players List */}
                        {mySquadPlayers && mySquadPlayers.length > 0 ? (
                            <div className="space-y-3">
                                <div className="bg-blue-50 px-4 py-2 rounded-md mb-4 text-sm text-gray-600">
                                    Displaying {filteredSquadPlayers.length} out of {mySquadPlayers.length} squad players
                                </div>

                                {filteredSquadPlayers.map(player => (
                                    <div
                                        key={player.id}
                                        className={`bg-blue-50 px-4 py-3 rounded-lg transition-all ${selectedSquadPlayer?.id === player.id ? 'ring-2 ring-blue-600' : ''
                                            } hover:bg-blue-100 cursor-pointer`}
                                        onClick={() => handleSquadPlayerSelect(player)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="flex items-center">
                                                    <p className='bg-blue-800 text-white font-semibold px-2 py-1 rounded-full w-10 h-10 flex items-center justify-center mr-3'>
                                                        {player.position?.slice(0, 3) || '???'}
                                                    </p>
                                                    <div>
                                                        <p className='font-semibold text-lg'>{player.name}</p>
                                                        <p className='text-sm text-gray-600'>{player.team}</p>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-5 mt-2">
                                                    <div>
                                                        <p className="text-xs text-gray-500">Value</p>
                                                        <p className="font-medium">£{player.price}M</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Points</p>
                                                        <p className="font-medium">{player.points?.current || 0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {player.image && (
                                                <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                                                    <img src={player.image} alt={player.name} className="h-full w-full object-cover" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-blue-50 p-8 rounded-lg text-center">
                                <h3 className="text-gray-500 mb-2">
                                    {mySquadPlayers.length === 0
                                        ? "No players in your squad yet. Please build your squad first."
                                        : "No players match your filters"}
                                </h3>
                                {mySquadPlayers.length > 0 && (
                                    <button
                                        onClick={() => {
                                            setSquadSearchTerm('');
                                            setFilterPosition('ALL');
                                        }}
                                        className="text-blue-600 underline"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Available Players - Club selection first */}
                    <div className='w-full md:w-1/2'>
                        <div className="bg-blue-50 px-4 py-3 rounded-md mb-4">
                            <h2 className="font-bold text-lg">Transfer Market</h2>

                            <div className="mt-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Select Team
                                </label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedClub || ''}
                                    onChange={(e) => handleClubSelect(e.target.value)}
                                >
                                    <option value="">-- Select a team --</option>
                                    {clubs.map((club) => (
                                        <option key={club.id} value={club.id}>
                                            {club.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4 flex items-center">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Search className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search players..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="ml-2 bg-gray-200 p-2 rounded-lg">
                                    <Filter className="h-5 w-5 text-gray-700" />
                                </button>
                            </div>
                        </div>

                        <div className='bg-blue-50 px-2 py-2 mb-4'>
                            <div className='flex gap-2 justify-start overflow-x-auto'>
                                <button
                                    className={`px-4 py-1 rounded-lg ${filterPosition === 'ALL' ? 'bg-blue-800 text-white' : 'bg-gray-200'} whitespace-nowrap`}
                                    onClick={() => setFilterPosition('ALL')}
                                >
                                    All
                                </button>
                                <button
                                    className={`px-4 py-1 rounded-lg ${filterPosition === Position.GK ? 'bg-blue-800 text-white' : 'bg-gray-200'} whitespace-nowrap`}
                                    onClick={() => setFilterPosition(Position.GK)}
                                >
                                    Goalkeepers
                                </button>
                                <button
                                    className={`px-4 py-1 rounded-lg ${filterPosition === Position.DEF ? 'bg-blue-800 text-white' : 'bg-gray-200'} whitespace-nowrap`}
                                    onClick={() => setFilterPosition(Position.DEF)}
                                >
                                    Defenders
                                </button>
                                <button
                                    className={`px-4 py-1 rounded-lg ${filterPosition === Position.MID ? 'bg-blue-800 text-white' : 'bg-gray-200'} whitespace-nowrap`}
                                    onClick={() => setFilterPosition(Position.MID)}
                                >
                                    Midfielders
                                </button>
                                <button
                                    className={`px-4 py-1 rounded-lg ${filterPosition === Position.FWD ? 'bg-blue-800 text-white' : 'bg-gray-200'} whitespace-nowrap`}
                                    onClick={() => setFilterPosition(Position.FWD)}
                                >
                                    Forwards
                                </button>
                            </div>
                        </div>

                        {/* Selected club players */}
                        {selectedClub && filteredPlayers.length > 0 ? (
                            <div className="space-y-3">
                                <div className="bg-blue-50 px-4 py-2 rounded-md mb-4 text-sm text-gray-600">
                                    Showing {filteredPlayers.length} players from {clubs.find(club => club.id === selectedClub)?.name || "selected team"}
                                </div>

                                {filteredPlayers.map(player => (
                                    <div
                                        key={player.id}
                                        className={`bg-blue-50 px-4 py-3 rounded-lg transition-all ${selectedPlayer?.id === player.id ? 'ring-2 ring-blue-600' : ''
                                            } hover:bg-blue-100 cursor-pointer`}
                                        onClick={() => handlePlayerSelect(player)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="flex items-center">
                                                    <p className='bg-blue-800 text-white font-semibold px-2 py-1 rounded-full w-10 h-10 flex items-center justify-center mr-3'>
                                                        {player.position?.slice(0, 3) || '???'}
                                                    </p>
                                                    <div>
                                                        <p className='font-semibold text-lg'>{player.name}</p>
                                                        <p className='text-sm text-gray-600'>{player.team}</p>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-5 mt-2">
                                                    <div>
                                                        <p className="text-xs text-gray-500">Value</p>
                                                        <p className="font-medium">£{player.price}M</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Points</p>
                                                        <p className="font-medium">{player.points?.current || 0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {player.image && (
                                                <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                                                    <img src={player.image} alt={player.name} className="h-full w-full object-cover" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : selectedClub ? (
                            <div className="bg-blue-50 p-8 rounded-lg text-center">
                                <h3 className="text-gray-500 mb-2">No players match your criteria</h3>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilterPosition('ALL');
                                    }}
                                    className="text-blue-600 underline"
                                >
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            <div className="bg-blue-50 p-8 rounded-lg text-center">
                                <h3 className="text-gray-500 mb-2">Select a team to see available players</h3>
                                <p className="text-xs text-gray-400">
                                    Browse players by team to make transfer decisions
                                </p>
                            </div>
                        )}

                        {/* Player Details */}
                        {selectedPlayer && (
                            <div className="bg-blue-50 px-4 py-4 mt-4 rounded-lg">
                                <h3 className="font-bold text-xl mb-3">{selectedPlayer.name}</h3>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">{selectedPlayer.team}</p>
                                        <div className="mt-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <p className="text-xs text-gray-500">Position</p>
                                                    <p className="font-medium">{selectedPlayer.position}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Price</p>
                                                    <p className="font-medium">£{selectedPlayer.price}M</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Total Points</p>
                                                    <p className="font-medium">{selectedPlayer.points?.current || 0}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {selectedPlayer.image && (
                                        <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                                            <img src={selectedPlayer.image} alt={selectedPlayer.name} className="h-full w-full object-cover" />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <h4 className="font-semibold text-sm text-gray-600 uppercase">Key Stats</h4>
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {selectedPlayer.stats?.goals !== undefined && (
                                            <div className="bg-white p-2 rounded">
                                                <p className="text-xs text-gray-500">Goals</p>
                                                <p className="font-bold">{selectedPlayer.stats.goals}</p>
                                            </div>
                                        )}
                                        {selectedPlayer.stats?.assists !== undefined && (
                                            <div className="bg-white p-2 rounded">
                                                <p className="text-xs text-gray-500">Assists</p>
                                                <p className="font-bold">{selectedPlayer.stats.assists}</p>
                                            </div>
                                        )}
                                        {selectedPlayer.stats?.cleanSheets !== undefined && (
                                            <div className="bg-white p-2 rounded">
                                                <p className="text-xs text-gray-500">Clean Sheets</p>
                                                <p className="font-bold">{selectedPlayer.stats.cleanSheets}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
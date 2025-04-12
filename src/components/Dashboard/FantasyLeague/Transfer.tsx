import { useState, useEffect } from 'react';
import { useSquad } from './context/squadContext';
import { Position, Player } from '@/types';
import { toast } from 'react-toastify';
import { Search, Filter, RefreshCw, ArrowRight, UserMinus } from 'lucide-react';
import useDashBoardManagement from '@/hooks/useDashboard';

// Define substitution type
interface SubstitutionValues {
    game_id: string;
    player_squad_id_out: string;
    player_squad_id: string;
    player_squad_position: string;
}

export default function Transfer() {
    const {   getRemainingBudget, syncSquadWithAPIPlayers } = useSquad();
    const { getPlayer, getTeam, getFantasySquadPlayers, getMatchDay,substitute } = useDashBoardManagement();

    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [selectedSquadPlayer, setSelectedSquadPlayer] = useState<Player | null>(null);
    const [filterPosition, setFilterPosition] = useState<Position | 'ALL'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [squadSearchTerm, setSquadSearchTerm] = useState('');
    const [isSubstituting, setIsSubstituting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [matchDayId, setMatchDayId] = useState<string | null>(null);

    // State for API data
    const [isLoading, setIsLoading] = useState(true);
    const [clubs, setClubs] = useState<any[]>([]);
    const [selectedClub, setSelectedClub] = useState<string | null>(null);
    const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
    const [mySquadPlayers, setMySquadPlayers] = useState<Player[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    // State to track expanded clubs

    const remainingBudget = getRemainingBudget();

    // Fetch current match day
    useEffect(() => {
        const fetchMatchDay = async () => {
            try {
                const matchDayResponse = await getMatchDay();
                if (matchDayResponse && matchDayResponse[0]) {
                    const matchday = matchDayResponse[0];
                    setMatchDayId(matchday.id || null);
                    console.log("Match day fetched:", matchday);
                }
            } catch (error) {
                console.error("Error fetching match day:", error);
            }
        };
        fetchMatchDay();
    }, []);

    // Fetch current squad from API
    useEffect(() => {
        const fetchMySquad = async () => {
            try {
                const squadData = await getFantasySquadPlayers();
                console.log("Raw squad data:", squadData);

                // Directly use the playersData array
                const playersData = Array.isArray(squadData[0]) ? squadData[0] : squadData;

                if (playersData && Array.isArray(playersData) && playersData.length > 0) {
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
                            inMatchday: false,
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
                    setFetchError("No players found in your squad");
                }
            } catch (error) {
                console.error("Error fetching squad players:", error);
                setFetchError("Failed to load your squad players");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMySquad();
    }, []);

    // Fetch clubs on component mount
    useEffect(() => {
        const fetchClubs = async () => {
            try {
                setIsLoading(true);
                const teamsResponse = await getTeam("eyJpdiI6IndmQ1R5VEdmM2Ewd1A3MHkwMjA3Y3c9PSIsInZhbHVlIjoiMjJDNnJDVzFtVy9WNnVwU0xFSW5sZz09IiwibWFjIjoiNzQ0Yzk2NGEwYmZiMjMyNzM0ZmJhMDNiZThhMzUzYmRlMGQzNjNhNzc3MDFjZjRiZTY3YTNhM2I2OTk5Y2YzZSIsInRhZyI6IiJ9S");
                console.log("Clubs fetched:", teamsResponse[0]);

                if (teamsResponse && teamsResponse[0] && teamsResponse[0].length > 0) {
                    setClubs(teamsResponse[0] || []);
                } else {
                    setFetchError("No clubs available in the transfer market.");
                }
            } catch (error) {
                console.error("Error fetching clubs:", error);
                setFetchError("Failed to load available clubs. Please try again.");
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

    // Fetch players when a club is selected
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
            console.log("Players fetched:", playersResponse);

            if (playersResponse && playersResponse[0] && playersResponse[0].length > 0) {
                // Transform API response to match your Player type
                const transformedPlayers = playersResponse[0].map((player: any) => {
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
                            cleanSheets: player.clean_sheets || 0
                        }
                    };
                });

                setAvailablePlayers(transformedPlayers);

               
            } else {
                setFetchError("No players available for this club.");
            }
        } catch (error) {
            console.error("Error fetching players:", error);
            setFetchError("Failed to load club players. Please try again.");
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
            toast.error(`Not enough budget for this transfer. Need ${transferCost.toFixed(1)}M more.`);
            return;
        }
    
        if (!matchDayId) {
            toast.error("Match day information not available");
            return;
        }
    
        try {
            setLoading(true);
            
            // Prepare the substitution data - use the same structure for transfers
            const substitutionData: SubstitutionValues = {
                game_id: matchDayId,
                player_squad_id_out: selectedSquadPlayer.id.toString(),
                player_squad_id: selectedPlayer.id.toString(),
                player_squad_position: selectedPlayer.position.toString()
            };
    
            const result = await substitute(substitutionData);
            console.log(result)
            
            // Fetch updated squad from API
            const squadData = await getFantasySquadPlayers();
            const playersData = Array.isArray(squadData[0]) ? squadData[0] : squadData;
    
            if (playersData && Array.isArray(playersData)) {
                // Transform API response to match your Player type
              
            }
    
            toast.success(`Successfully transferred in ${selectedPlayer.name}`);
    
            // Reset selections
            setSelectedPlayer(null);
            setSelectedSquadPlayer(null);
        } catch (error: any) {
            console.error("Transfer failed:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to complete transfer. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

   

  

    // Toggle between transfer and substitution mode
    const toggleSubstitutionMode = () => {
        setIsSubstituting(!isSubstituting);
        // Reset selections when switching modes
        setSelectedPlayer(null);
        setSelectedSquadPlayer(null);
    };

    // Debug logs to help troubleshoot
    console.log("MySquadPlayers state:", mySquadPlayers);
    console.log("Filtered squad players:", filteredSquadPlayers);

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

    // Show error state if fetching failed
    if (fetchError && mySquadPlayers.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Something went wrong</h2>
                    <p className="text-gray-500 mb-4">{fetchError}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className='flex flex-col gap-4'>
                {/* Mode Selector */}
                <div className="flex justify-end mb-2">
                    <div className="bg-white rounded-lg shadow p-1 inline-flex">
                        <button
                            className={`px-4 py-2 rounded-md font-medium ${!isSubstituting ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                            onClick={() => !isSubstituting || toggleSubstitutionMode()}
                        >
                            Transfer
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md font-medium ${isSubstituting ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                            onClick={() => isSubstituting || toggleSubstitutionMode()}
                        >
                            Substitution
                        </button>
                    </div>
                </div>

                {/* Transfer/Substitution Box */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-lg shadow-lg p-5 mb-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">
                            {isSubstituting ? 'Player Substitution' : 'Transfer Market'}
                        </h2>
                        {!isSubstituting && (
                            <div className="bg-white text-blue-800 px-4 py-2 rounded-lg font-bold">
                                Budget: £{remainingBudget.toFixed(1)}M
                            </div>
                        )}
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
                                {isSubstituting ? <UserMinus className="h-5 w-5" /> : <RefreshCw className="h-5 w-5" />}
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
                                        Select a player {isSubstituting ? 'from your bench' : 'from the market'}
                                    </div>
                                )}
                            </div>
                        </div>

                        {selectedPlayer && selectedSquadPlayer && (
                            <div className="mt-4 flex items-center justify-between">
                                {!isSubstituting && (
                                    <div>
                                        <span className="text-sm">Transfer cost: </span>
                                        <span className={`font-bold ${selectedPlayer.price > selectedSquadPlayer.price ? 'text-red-300' : 'text-green-300'}`}>
                                            £{(selectedPlayer.price - selectedSquadPlayer.price).toFixed(1)}M
                                        </span>
                                    </div>
                                )}
                                <button
                                    onClick={ handleTransfer}
                                    disabled={loading}
                                    className={`${
                                        loading ? 'bg-gray-500' : isSubstituting ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'
                                    } text-white px-4 py-2 rounded-lg font-semibold flex items-center ml-auto`}
                                >
                                    <span>{loading ? 'Processing...' : isSubstituting ? 'Complete Substitution' : 'Complete Transfer'}</span>
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
                                        ? "No players in your squad yet"
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
                            <h2 className="font-bold text-lg">{isSubstituting ? 'Bench Players' : 'Transfer Market'}</h2>

                            {!isSubstituting && (
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
                            )}

                            <div className="mt-4 flex items-center">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Search className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={isSubstituting ? "Search bench players..." : "Search players..."}
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

                        {/* Selected club players or bench players for substitution */}
                        {isSubstituting ? (
                            // Show bench players for substitution mode
                            mySquadPlayers.filter(p => !p.inMatchday).length > 0 ? (
                                <div className="space-y-3">
                                    <div className="bg-blue-50 px-4 py-2 rounded-md mb-4 text-sm text-gray-600">
                                        Available bench players
                                    </div>
                                    {mySquadPlayers.filter(p => !p.inMatchday).map(player => (
                                        <div
                                            key={player.id}
                                            className={`bg-blue-50 px-4 py-3 rounded-lg transition-all ${
                                                selectedPlayer?.id === player.id ? 'ring-2 ring-blue-600' : ''
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
                            ) : (
                                <div className="bg-blue-50 p-8 rounded-lg text-center">
                                    <h3 className="text-gray-500 mb-2">No players available on the bench</h3>
                                    <p className="text-xs text-gray-400">
                                        All players are currently in your starting lineup
                                    </p>
                                </div>
                            )
                        ) : (
                            // Show transfer market players for transfer mode
                            selectedClub && filteredPlayers.length > 0 ? (
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
                            )
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
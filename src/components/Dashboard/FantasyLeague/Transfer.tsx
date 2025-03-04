import  { useState } from 'react';
// import ChelseaLogo from '/assets/images/landingPage/chelsea.png';
// import ArsenalLogo from '/assets/images/landingPage/arsenal.png';
// import TinyLineChart from './chart/Line';
// import PlayerFeaturesPieChart from './chart/pie';
import { useSquad } from './context/squadContext';
import { Position, Player } from '@/types';
import { players } from './data/players';
import { toast } from 'react-toastify';
import { Search, Filter, RefreshCw, ArrowRight } from 'lucide-react';

export default function Transfer() {
    const { squad, addPlayer, removePlayer, getRemainingBudget, canAddPlayer } = useSquad();
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [selectedSquadPlayer, setSelectedSquadPlayer] = useState<Player | null>(null);
    const [filterPosition, setFilterPosition] = useState<Position | 'ALL'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    const remainingBudget = getRemainingBudget();
    
    const filteredPlayers = players.filter(player => {
        const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPosition = filterPosition === 'ALL' || player.position === filterPosition;
        const notInSquad = !squad.players.some(squadPlayer => squadPlayer.id === player.id);
        return matchesSearch && matchesPosition && notInSquad;
    });

    const handlePlayerSelect = (player: Player) => {
        setSelectedPlayer(player);
    };

    const handleSquadPlayerSelect = (player: Player) => {
        setSelectedSquadPlayer(player);
    };

    const handleTransfer = () => {
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

        // Remove the selected squad player
        removePlayer(selectedSquadPlayer.id);
        
        // Add the new player
        if (!canAddPlayer(selectedPlayer)) {
            toast.error("Cannot add this player to your squad");
            return;
        }
        
        addPlayer(selectedPlayer);
        toast.success(`Successfully transferred in ${selectedPlayer.name}`);
        
        // Reset selections
        setSelectedPlayer(null);
        setSelectedSquadPlayer(null);
    };

    return (
        <>
            <div className='flex flex-col gap-4'>
                {/* Transfer Budget Box */}
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
                                            {selectedSquadPlayer.position.charAt(0)}
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
                                            {selectedPlayer.position.charAt(0)}
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
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center"
                                >
                                    <span>Complete Transfer</span>
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
                            <h2 className="font-bold text-lg">Your Squad</h2>
                            
                            <div className="mt-2 flex items-center">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Search className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Search your players..." 
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        <div className="space-y-3">
                            {squad.players.filter(p => 
                                (filterPosition === 'ALL' || p.position === filterPosition)
                            ).map(player => (
                                <div 
                                    key={player.id} 
                                    className={`bg-blue-50 px-4 py-3 rounded-lg transition-all ${
                                        selectedSquadPlayer?.id === player.id ? 'ring-2 ring-blue-600' : ''
                                    } hover:bg-blue-100 cursor-pointer`}
                                    onClick={() => handleSquadPlayerSelect(player)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center">
                                                <p className='bg-blue-800 text-white font-semibold px-2 py-1 rounded-full w-10 h-10 flex items-center justify-center mr-3'>
                                                    {player.position.slice(0, 3)}
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
                                                    <p className="font-medium">{player.points.current}</p>
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
                    </div>

                    {/* Available Players */}
                    <div className='w-full md:w-1/2'>
                        <div className="bg-blue-50 px-4 py-3 rounded-md mb-4">
                            <h2 className="font-bold text-lg">Available Players</h2>
                            
                            <div className="mt-2 flex items-center">
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

                        {/* Player Details */}
                        {selectedPlayer && (
                            <div className="bg-blue-50 px-4 py-4 mb-4 rounded-lg">
                                <h3 className="font-bold text-xl mb-3">{selectedPlayer.name}</h3>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">{selectedPlayer.team} • {selectedPlayer.nationality}</p>
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
                                                    <p className="font-medium">{selectedPlayer.points.current}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Status</p>
                                                    <p className={`font-medium ${selectedPlayer.status.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                                                        {selectedPlayer.status.isAvailable ? 'Available' : selectedPlayer.status.reason}
                                                    </p>
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
                                        {selectedPlayer.stats.goals !== undefined && (
                                            <div className="bg-white p-2 rounded">
                                                <p className="text-xs text-gray-500">Goals</p>
                                                <p className="font-bold">{selectedPlayer.stats.goals}</p>
                                            </div>
                                        )}
                                        {selectedPlayer.stats.assists !== undefined && (
                                            <div className="bg-white p-2 rounded">
                                                <p className="text-xs text-gray-500">Assists</p>
                                                <p className="font-bold">{selectedPlayer.stats.assists}</p>
                                            </div>
                                        )}
                                        {selectedPlayer.stats.cleanSheets !== undefined && (
                                            <div className="bg-white p-2 rounded">
                                                <p className="text-xs text-gray-500">Clean Sheets</p>
                                                <p className="font-bold">{selectedPlayer.stats.cleanSheets}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            {filteredPlayers.slice(0, 10).map(player => (
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
                                                    {player.position.slice(0, 3)}
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
                                                    <p className="font-medium">{player.points.current}</p>
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
                    </div>
                </div>
            </div>
        </>
    );
}
import React, { useState } from 'react';
import PlayerCard from './PlayerCard';
import { Search, Filter } from 'lucide-react';
import { Position, Player } from '@/types';

interface PlayersListProps {
  players: Player[];
  
}

const PlayersList: React.FC<PlayersListProps> = ({ players }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<Position | 'All'>('All');
  const [teamFilter, setTeamFilter] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const teams = Array.from(new Set(players.map(player => player.team)));
  
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'All' || player.position === positionFilter;
    const matchesTeam = teamFilter === 'All' || player.team === teamFilter;
    const matchesPrice = (!minPrice || player.price >= parseInt(minPrice)) && (!maxPrice || player.price <= parseInt(maxPrice));
    return matchesSearch && matchesPosition && matchesTeam && matchesPrice;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search players..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center">
          <Filter size={16} className="mr-1 text-gray-500" />
          <span className="text-sm text-gray-600 mr-2">Filters:</span>
        </div>
        
        <select
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setPositionFilter(e.target.value as Position | 'All')}
        >
          <option value="All">All Positions</option>
          <option value={Position.GK}>{Position.GK}</option>
          <option value={Position.DEF}>{Position.DEF}</option>
          <option value={Position.MID}>{Position.MID}</option>
          <option value={Position.FWD}>{Position.FWD}</option>
        </select>
        
        <select
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
        >
          <option value="All">All Teams</option>
          {teams.map(team => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min £"
            className="px-3 py-1 text-sm border border-gray-300 rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
            step="0.1"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max £"
            className="px-3 py-1 text-sm border border-gray-300 rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
            step="0.1"
          />
        </div>
      </div>
      
      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No players found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersList;
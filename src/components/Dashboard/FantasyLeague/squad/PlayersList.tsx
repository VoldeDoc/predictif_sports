import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import { Search, Filter, Info } from "lucide-react";
import { Position, Player } from "@/types";
import { useViewContext } from "../FantasyLeague";
import useDashBoardManagement from "@/hooks/useDashboard";
import { toast } from "react-toastify";

interface PlayersListProps {
  players: Player[];
}

const PlayersList: React.FC<PlayersListProps> = ({ players }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState<Position | "All">("All");
  const [teamFilter, setTeamFilter] = useState<string>("All");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const { getFantasyPlayerById } = useDashBoardManagement();
  const { setActiveTab, setSelectedPlayer } = useViewContext();

  const teams = Array.from(new Set(players.map((player) => player.team)));

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === "All" || player.position === positionFilter;
    const matchesTeam = teamFilter === "All" || player.team === teamFilter;
    const matchesPrice =
      (!minPrice || player.price >= parseInt(minPrice)) &&
      (!maxPrice || player.price <= parseInt(maxPrice));
    return matchesSearch && matchesPosition && matchesTeam && matchesPrice;
  });

  const handleViewPlayerDetails = async (playerId: string) => {
    try {
      console.log("Fetching player details for ID:", playerId);
      
      setIsLoading(playerId); // Indicate loading state
      const {data: response, status} = await getFantasyPlayerById(playerId);

      if (status !== 200) {
        throw new Error("Error fetching player details");
      }
  
      // Find the player with the matching ID in the response
      // const selectedPlayer = response.find((player: Player) => String(player.id) === playerId);
  
      if (response.length > 0) {
        const selectedPlayer = response[0];
        console.log("Selected Player:", selectedPlayer);
        
        setSelectedPlayer(selectedPlayer); 
        setActiveTab("Statistic"); 
      } else {
        toast.error("Player details not found.");
      }
    } catch (error) {
      console.error("Error fetching player details:", error);
      toast.error(
        typeof error === 'string' 
          ? error 
          : error instanceof Error 
            ? error.message 
            : "Error loading player details. Please try again later."
      );
    } finally {
      setIsLoading(null); // Reset loading state
    }
  };

return (
  <div className="bg-white rounded-lg shadow-md p-4">
    <div className="mb-4">
      {/* Search input */}
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

    {/* Filters section */}
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="flex items-center">
        <Filter size={16} className="mr-1 text-gray-500" />
        <span className="text-sm text-gray-600 mr-2">Filters:</span>
      </div>

      <select
        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={(e) => setPositionFilter(e.target.value as Position | "All")}
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
        {teams.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>

      {/* Price filters */}
      <input
        type="number"
        placeholder="Min Price"
        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>

    {/* Players list */}
    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
      {filteredPlayers.length > 0 ? (
        filteredPlayers.map((player) => (
          <div key={player.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-grow">
                <PlayerCard player={player} />
              </div>
              <div className="w-full sm:w-auto mt-2 sm:mt-0">
                <button
                  onClick={() => handleViewPlayerDetails(String(player.id))}
                  disabled={isLoading === String(player.id)}
                  className="w-full sm:w-auto px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1 disabled:bg-indigo-400"
                >
                  {isLoading === String(player.id) ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                  ) : (
                    <Info size={16} />
                  )}
                  {isLoading === String(player.id) ? "Loading..." : "View Details"}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">No players found matching your filters.</div>
      )}
    </div>
  </div>
);
};

export default PlayersList;
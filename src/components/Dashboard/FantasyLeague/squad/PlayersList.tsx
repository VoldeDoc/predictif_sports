import React, { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard";
import { Search, Filter, Info, ArrowLeft } from "lucide-react";
import { Position, Player } from "@/types";
import { useViewContext } from "../FantasyLeague";
import useDashBoardManagement from "@/hooks/useDashboard";
import { toast } from "react-toastify";

interface PlayersListProps {
  players: Player[];
  clubs: any[]; // Club objects from API
  onSelectClub: (clubId: string) => void;
  loading?: boolean;
}

const PlayersList: React.FC<PlayersListProps> = ({ players, clubs, onSelectClub, loading = false }) => {
  // Initialize all state from localStorage where available
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('fantasySearchTerm') || "";
  });
  
  const [positionFilter, setPositionFilter] = useState<Position | "All">(() => {
    const saved = localStorage.getItem('fantasyPositionFilter');
    return (saved as Position | "All") || "All";
  });
  
  const [teamFilter, setTeamFilter] = useState<string>(() => {
    return localStorage.getItem('fantasyTeamFilter') || "All";
  });
  
  const [minPrice, setMinPrice] = useState<string>(() => {
    return localStorage.getItem('fantasyMinPrice') || "";
  });
  
  const [maxPrice, setMaxPrice] = useState<string>(() => {
    return localStorage.getItem('fantasyMaxPrice') || "";
  });
  
  const [isLoading, setIsLoading] = useState<string | null>(null);
  
  // Initialize selectedClub from localStorage if available
  const [selectedClub, setSelectedClub] = useState<any | null>(() => {
    const savedClub = localStorage.getItem('fantasySelectedClub');
    if (savedClub) {
      try {
        return JSON.parse(savedClub);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const { getPlayerById } = useDashBoardManagement();
  const { setActiveTab, setSelectedPlayer } = useViewContext();

  // Effect to restore the selected club's players when component mounts
  useEffect(() => {
    if (selectedClub && selectedClub.id && clubs.length > 0) {
      // Make sure club still exists in the current clubs list
      const clubExists = clubs.some(club => club.id === selectedClub.id);
      if (clubExists) {
        onSelectClub(selectedClub.id);
      } else {
        // If club no longer exists, reset selection
        setSelectedClub(null);
        localStorage.removeItem('fantasySelectedClub');
      }
    }
  }, [clubs]);
  
  // Save states to localStorage when they change
  useEffect(() => {
    if (selectedClub) {
      localStorage.setItem('fantasySelectedClub', JSON.stringify(selectedClub));
    } else {
      localStorage.removeItem('fantasySelectedClub');
    }
  }, [selectedClub]);

  useEffect(() => {
    localStorage.setItem('fantasySearchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('fantasyPositionFilter', positionFilter);
  }, [positionFilter]);

  useEffect(() => {
    localStorage.setItem('fantasyTeamFilter', teamFilter);
  }, [teamFilter]);

  useEffect(() => {
    localStorage.setItem('fantasyMinPrice', minPrice);
  }, [minPrice]);

  useEffect(() => {
    localStorage.setItem('fantasyMaxPrice', maxPrice);
  }, [maxPrice]);

  const handleClubSelect = (club: any) => {
    setSelectedClub(club);
    onSelectClub(club.id);
  };

  const handleBackToClubs = () => {
    setSelectedClub(null);
    setTeamFilter("All");
    // Clear from localStorage
    localStorage.removeItem('fantasySelectedClub');
  };

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
      setIsLoading(playerId);
      
      const response = await getPlayerById(playerId);
      console.log("Player details response:", response);
      
      // Handle different possible response formats
      if (Array.isArray(response)) {
        // Direct array response (as shown in your example)
        if (response.length > 0) {
          const selectedPlayer = response[0];
          setSelectedPlayer(selectedPlayer);
          setActiveTab("Statistic");
        } else {
          toast.error("Player details not found.");
        }
      } 
      else if (response && response.data) {
        // Response with data property
        if (response.status !== 200) {
          throw new Error(`Error fetching player details: ${response.status}`);
        }
        
        if (Array.isArray(response.data) && response.data.length > 0) {
          const selectedPlayer = response.data[0];
          setSelectedPlayer(selectedPlayer);
          setActiveTab("Statistic");
        } else {
          toast.error("Player details not found.");
        }
      } 
      else {
        // Invalid response format
        toast.error("Invalid response format from API");
      }
    } catch (error) {
      console.error("Error fetching player details:", error);
      toast.error("Error loading player details. Please try again later.");
    } finally {
      setIsLoading(null);
    }
  };

  // If no club is selected, show club selection grid
  if (!selectedClub) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Select a Club</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {clubs.map((club) => (
            <div
              key={club.id}
              onClick={() => handleClubSelect(club)}
              className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg cursor-pointer transition-colors flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 mb-2 flex items-center justify-center">
                <img 
                  src={club.logo} 
                  alt={club.name} 
                  className="max-w-full max-h-full"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.src = "https://via.placeholder.com/50?text=" + club.name.substring(0, 2);
                  }}
                />
              </div>
              <h3 className="font-semibold text-center">{club.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If a club is selected but players are loading
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          <button
            onClick={handleBackToClubs}
            className="mr-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center">
            <img 
              src={selectedClub.logo} 
              alt={selectedClub.name} 
              className="w-8 h-8 mr-2"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/30?text=" + selectedClub.name.substring(0, 2);
              }}
            />
            <h2 className="text-xl font-bold text-gray-800">{selectedClub.name} Players</h2>
          </div>
        </div>
        <div className="flex justify-center items-center py-16">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mr-3"></div>
          <p className="text-gray-600">Loading players...</p>
        </div>
      </div>
    );
  }

  // If a club is selected, show players for that club
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <button
          onClick={handleBackToClubs}
          className="mr-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center">
          <img 
            src={selectedClub.logo} 
            alt={selectedClub.name} 
            className="w-8 h-8 mr-2"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/30?text=" + selectedClub.name.substring(0, 2);
            }}
          />
          <h2 className="text-xl font-bold text-gray-800">{selectedClub.name} Players</h2>
        </div>
      </div>

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
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value as Position | "All")}
        >
          <option value="All">All Positions</option>
          <option value={Position.GK}>{Position.GK}</option>
          <option value={Position.DEF}>{Position.DEF}</option>
          <option value={Position.MID}>{Position.MID}</option>
          <option value={Position.FWD}>{Position.FWD}</option>
        </select>

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
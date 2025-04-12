import { useState, useEffect } from "react";
import { Trophy, Users, ListFilter, Save, RefreshCw } from "lucide-react";
import { useSquad } from "./context/squadContext";
import { useViewContext } from "./FantasyLeague";
import SquadView from "./squad/SquadView";
import PlayersList from "./squad/PlayersList";
import SquadStats from "./squad/SquadStats";
import useDashBoardManagement from "@/hooks/useDashboard";
import { Player } from "@/types";
import { toast } from "react-toastify";

function Squad() {
  const [activeTab, setActiveTab] = useState<"squad" | "players">("squad");
  const { isSquadComplete, squad } = useSquad();
  const { setShowGameweek } = useViewContext();
  const { getPlayer, getTeam, TransferPlayerIn } = useDashBoardManagement();

  const [clubs, setClubs] = useState<any[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // State for tracking transfers
  const [transferring, setTransferring] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);
  const [transferResults, setTransferResults] = useState<{ 
    success: string[], 
    failed: string[] 
  }>({ success: [], failed: [] });

  useEffect(() => {
    localStorage.setItem('fantasySquadActiveTab', activeTab);
  }, [activeTab]);
  
  // Fetch clubs on component mount
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const teamsResponse = await getTeam("eyJpdiI6IndmQ1R5VEdmM2Ewd1A3MHkwMjA3Y3c9PSIsInZhbHVlIjoiMjJDNnJDVzFtVy9WNnVwU0xFSW5sZz09IiwibWFjIjoiNzQ0Yzk2NGEwYmZiMjMyNzM0ZmJhMDNiZThhMzUzYmRlMGQzNjNhNzc3MDFjZjRiZTY3YTNhM2I2OTk5Y2YzZSIsInRhZyI6IiJ9S");
        console.log("Clubs fetched:", teamsResponse[0]);
        setClubs(teamsResponse[0] || []);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  // Handler for when a club is selected
  const handleClubSelect = async (clubId: string) => {
    setLoading(true);
    setPlayers([]); // Clear previous players
    
    try {
      // Fetch all players
      const allPlayersResponse = await getPlayer(clubId);
      console.log("All players response:", allPlayersResponse);
      
      // Find the selected club
      const selectedClub = clubs.find(club => club.id === clubId);
      console.log("Selected club:", selectedClub);
      
      if (selectedClub && allPlayersResponse && allPlayersResponse[0]) {
        // Filter players by current_club (encrypted ID) matching the club's ID
        const teamPlayers = allPlayersResponse[0].filter((player: any) => 
          player.current_club === selectedClub.id
        );
        
        console.log("Filtered team players by ID:", teamPlayers);
        
        if (teamPlayers && teamPlayers.length > 0) {
          // Map to the Player type with proper price extraction
          const clubPlayers = teamPlayers.map((player: any) => {
            // Extract price from "£20 million" format
            let price = 0;
            if (player.evaluation) {
              const matches = player.evaluation.match(/\d+/g);
              if (matches && matches.length > 0) {
                price = parseInt(matches[0]);
              }
            }
            
            return {
              id: player.id,
              name: player.name,
              photo: player.photo || "",
              position: player.position || "Unknown",
              team: player.current_club_name || selectedClub.name,
              price: price,
            };
          });
          
          console.log("Mapped club players:", clubPlayers);
          setPlayers(clubPlayers);
        } else {
          // Try filtering by club name instead of ID
          const teamPlayersByName = allPlayersResponse[0].filter((player: any) => 
            player.current_club_name === selectedClub.name
          );
          
          console.log("Filtered team players by name:", teamPlayersByName);
          
          if (teamPlayersByName && teamPlayersByName.length > 0) {
            const clubPlayers = teamPlayersByName.map((player: any) => {
              // Extract price from "£20 million" format
              let price = 0;
              if (player.evaluation) {
                const matches = player.evaluation.match(/\d+/g);
                if (matches && matches.length > 0) {
                  price = parseInt(matches[0]);
                }
              }
              
              return {
                id: player.id,
                name: player.name,
                photo: player.photo || "",
                position: player.position || "Unknown",
                team: player.current_club_name || selectedClub.name,
                price: price,
              };
            });
            
            console.log("Mapped club players by name:", clubPlayers);
            setPlayers(clubPlayers);
          } else {
            console.log("No players found for this club");
            setPlayers([]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching players for club:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle batch transfer of all players
  const handleBatchTransfer = async () => {
    if (!isSquadComplete()) {
      toast.error("Complete your squad before transferring players");
      return;
    }

    if (!window.confirm("This will transfer all 15 players to your official fantasy squad before proceeding. Continue?")) {
      return;
    }

    setTransferring(true);
    setTransferProgress(0);
    setTransferResults({ success: [], failed: [] });

    const playerIds = squad.players.map(player => player.id.toString());
    const totalPlayers = playerIds.length;
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < playerIds.length; i++) {
      const playerId = playerIds[i];
      const playerName = squad.players.find(p => p.id.toString() === playerId)?.name || playerId;
      
      try {
        const result = await TransferPlayerIn(playerId);
        if (result.status === 200) {
          successCount++;
          setTransferResults(prev => ({
            ...prev,
            success: [...prev.success, playerName]
          }));
          toast.success(`Transferred: ${playerName} (${i+1}/${totalPlayers})`);
        } else {
          failCount++;
          setTransferResults(prev => ({
            ...prev,
            failed: [...prev.failed, playerName]
          }));
          toast.error(`Failed to transfer: ${playerName}`);
        }
      } catch (error) {
        failCount++;
        setTransferResults(prev => ({
          ...prev,
          failed: [...prev.failed, playerName]
        }));
        toast.error(`Error transferring: ${playerName}`);
      }
      
      // Update progress
      setTransferProgress(Math.round(((i + 1) / totalPlayers) * 100));
    }
    
    setTransferring(false);
    
    // If all players transferred successfully or user wants to proceed anyway
    if (successCount === totalPlayers) {
      toast.success("All players transferred successfully!");
      handleProceedToGameweek();
    } else if (successCount > 0) {
      const shouldProceed = window.confirm(
        `Transferred ${successCount} of ${totalPlayers} players. Some players (${failCount}) failed to transfer. Do you want to proceed anyway?`
      );
      if (shouldProceed) {
        handleProceedToGameweek();
      }
    } else {
      toast.error("Failed to transfer any players. Please try again.");
    }
  };

  const handleProceedToGameweek = () => {
    setShowGameweek(true);
    localStorage.setItem('fantasyHasSquad', JSON.stringify(true));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Trophy size={28} className="mr-2" />
              <h1 className="text-2xl font-bold">Fantasy League</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md mb-4">
              <div className="flex">
                <button
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "squad"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("squad")}
                >
                  <div className="flex items-center justify-center">
                    <Users size={18} className="mr-2" />
                    My Squad
                  </div>
                </button>
                <button
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "players"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("players")}
                >
                  <div className="flex items-center justify-center">
                    <ListFilter size={18} className="mr-2" />
                    Player List
                  </div>
                </button>
              </div>
            </div>

            {activeTab === "players" ? (
              <PlayersList 
                players={players} 
                clubs={clubs} 
                onSelectClub={handleClubSelect}
                loading={loading}
              />
            ) : (
              <SquadView viewMode="squad" />
            )}

            {/* Transfer progress display */}
            {transferring && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h3 className="font-bold text-lg mb-2">Transferring Players</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${transferProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">
                  Progress: {transferProgress}% ({transferResults.success.length} of {squad.players.length} players transferred)
                </div>
              </div>
            )}

            {/* Transfer results summary */}
            {!transferring && (transferResults.success.length > 0 || transferResults.failed.length > 0) && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h3 className="font-bold text-lg mb-2">Transfer Results</h3>
                {transferResults.success.length > 0 && (
                  <div className="mb-2">
                    <span className="font-medium text-green-600">Successfully transferred ({transferResults.success.length}):</span>
                    <div className="text-sm mt-1 ml-2 text-gray-700">{transferResults.success.join(', ')}</div>
                  </div>
                )}
                {transferResults.failed.length > 0 && (
                  <div>
                    <span className="font-medium text-red-600">Failed to transfer ({transferResults.failed.length}):</span>
                    <div className="text-sm mt-1 ml-2 text-gray-700">{transferResults.failed.join(', ')}</div>
                  </div>
                )}
              </div>
            )}

            {isSquadComplete() && (
              <div className="flex justify-center py-4">
                <button
                  onClick={transferring ? undefined : handleBatchTransfer}
                  disabled={transferring}
                  className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                    transferring 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {transferring ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Transferring Squad ({transferProgress}%)...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Save Squad & Proceed to Matchweek</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3 order-first lg:order-last">
            <SquadStats />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Squad;
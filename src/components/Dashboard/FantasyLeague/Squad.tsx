import  { useState, useEffect } from "react";
import { Trophy, Users, ListFilter, Save } from "lucide-react";
import { useSquad } from "./context/squadContext";
import { useViewContext } from "./FantasyLeague";
import SquadView from "./squad/SquadView";
import PlayersList from "./squad/PlayersList";
import SquadStats from "./squad/SquadStats";
import useDashBoardManagement from "@/hooks/useDashboard";
import { Player } from "@/types";

function Squad() {
  const [activeTab, setActiveTab] = useState<"squad" | "players">("squad");
  const { isSquadComplete } = useSquad();
  const { setShowGameweek } = useViewContext();
  const { getPlayersByLeague } = useDashBoardManagement();

  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await getPlayersByLeague();
        const extractedPlayers = response[0].map((team: any) => ({
          id: team.player?.id ,
          name: team.player?.name ,
          photo: team.player?.photo,
          position: team.player?.position ,
          team: team.name,
          price: team.player?.evaluation
            ? parseInt(team.player.evaluation.replace(/[^0-9]/g, ""))
            : 0,
        }));
        setPlayers(extractedPlayers);
        
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  const handleProceedToGameweek = () => {
    setShowGameweek(true);
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
              <PlayersList players={players} />
            ) : (
              <SquadView viewMode="squad" />
            )}

            {isSquadComplete() && (
              <div className="flex justify-center py-4">
                <button
                  onClick={handleProceedToGameweek}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save size={18} />
                  <span>Squad Selection Complete - Proceed to Matchweek</span>
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
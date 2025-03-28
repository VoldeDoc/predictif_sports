import React, { createContext, useContext, useState, useEffect } from "react";
import useDashBoardManagement from "@/hooks/useDashboard";
import { Player } from "@/types";

interface PlayersContextType {
  players: Player[];
  fetchPlayers: () => Promise<void>;
}

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export const PlayersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const { getPlayersByLeague } = useDashBoardManagement();

  const fetchPlayers = async () => {
    try {
      if (players.length > 0) return; // Prevent re-fetch if already loaded

      const response = await getPlayersByLeague();
      console.log("API Response:", response);

      const extractedPlayers = response[0]?.map((team: any) => ({
        id: team.player?.id || "",
        name: team.player?.name || "Unknown",
        photo: team.player?.photo || "",
        position: team.player?.position || "Unknown",
        team: team.name || "Unknown",
        price: team.player?.evaluation ? parseInt(team.player.evaluation.replace(/[^0-9]/g, "")) : 0,
      })) || [];

      setPlayers(extractedPlayers);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <PlayersContext.Provider value={{ players, fetchPlayers }}>
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (!context) {
    throw new Error("usePlayers must be used within a PlayersProvider");
  }
  return context;
};

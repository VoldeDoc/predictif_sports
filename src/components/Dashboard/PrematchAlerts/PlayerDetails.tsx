import { AuthLayout } from "@/components/Layout/layout";
import Button from "@/components/Ui/Button";
import useDashBoardManagement from "@/hooks/useDashboard";
import Loader from "@/pages/Ui/loader";
import { useEffect, useState } from "react";
import { FaInfoCircle, FaHistory, FaNewspaper, FaCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface Player {
    player_id: string;
    name: string;
    photo: string;
    position: string;
    earning: string;
    evaluation: string;
    dob: string;
    height: string;
    weight: string;
    position_short: string;
    current_club_name: string;
    goal: string | null;
    assists: string | null;
    clean_sheets: string | null;
    appearance: string | null;
    substitution: string | null;
    red_card: string | null;
    yellow_card: string | null;
    club_history: any[];
    news_event: any[];
}

const tabs = [
    { key: "bio", label: "Bio", icon: <FaInfoCircle /> },
    { key: "current club", label: "Current club", icon: <FaHistory /> },
    { key: "news", label: "News", icon: <FaNewspaper /> },
    { key: "events", label: "Events", icon: <FaCalendarAlt /> },
];

export default function PlayerDetails() {
    const { getPlayerById } = useDashBoardManagement();
    const [player, setPlayer] = useState<Player | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("bio");
    const { player_id } = useParams<{ player_id: string }>();

    useEffect(() => {
        (async () => {
            try {
                if (!player_id) {
                    throw new Error("Player ID is undefined");
                }
                const response = await getPlayerById(player_id);
                const playerData = response[0];
                const player: Player = {
                    player_id: playerData.bio.player_id,
                    name: playerData.bio.name,
                    photo: playerData.bio.photo,
                    position: playerData.bio.position,
                    earning: playerData.bio.earning,
                    evaluation: playerData.bio.evaluation,
                    dob: playerData.bio.dob,
                    height: playerData.bio.height,
                    weight: playerData.bio.weight,
                    position_short: playerData.bio.position_short,
                    current_club_name: playerData.current_club.current_club_name,
                    goal: playerData.current_club.goal,
                    assists: playerData.current_club.assists,
                    clean_sheets: playerData.current_club.clean_sheets,
                    appearance: playerData.current_club.appearance,
                    substitution: playerData.current_club.substitution,
                    red_card: playerData.current_club.red_card,
                    yellow_card: playerData.current_club.yellow_card,
                    club_history: playerData.club_history || [],
                    news_event: playerData.news_event || [],
                };
                setPlayer(player);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError("Failed to load player details. Please try again later.");
            }
        })();
    }, [player_id, getPlayerById]);

    if (loading) {
        return (
            <AuthLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <Loader loading={loading} color="#123abc" size={40} />
                    <p className="text-gray-500 text-lg ml-4">Loading player details...</p>
                </div>
            </AuthLayout>
        );
    }

    if (error) {
        return (
            <AuthLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-red-500 text-lg">{error}</p>
                </div>
            </AuthLayout>
        );
    }

    if (!player) {
        return (
            <AuthLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-gray-500 text-lg">No player details available.</p>
                </div>
            </AuthLayout>
        );
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case "bio":
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries({
                            Position: player.position,
                            Earnings: player.earning,
                            Evaluation: player.evaluation,
                            "Date of Birth": player.dob,
                            Height: player.height,
                            Weight: player.weight,
                        }).map(([key, value]) => (
                            <p key={key} className="text-sm text-gray-600">
                                <span className="font-semibold">{key}:</span> {value}
                            </p>
                        ))}
                    </div>
                );
            case "current club":
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries({
                            "Current Club": player.current_club_name,
                            Goals: player.goal || "N/A",
                            Assists: player.assists || "N/A",
                            "Clean Sheets": player.clean_sheets || "N/A",
                            Appearances: player.appearance || "N/A",
                            Substitutions: player.substitution || "N/A",
                            "Yellow Cards": player.yellow_card || "N/A",
                            "Red Cards": player.red_card || "N/A",
                        }).map(([key, value]) => (
                            <p key={key} className="text-sm text-gray-600">
                                <span className="font-semibold">{key}:</span> {value}
                            </p>
                        ))}
                    </div>
                );
            case "club_history":
                return player.club_history.length ? (
                    player.club_history.map((history, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-sm text-gray-600">{history}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-600">No club history available.</p>
                );
            case "news":
                return player.news_event.length ? (
                    player.news_event.map((news, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-sm text-gray-600">{news}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-600">No news available.</p>
                );
            case "events":
                return player.news_event.length ? (
                    player.news_event.map((event, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-sm text-gray-600">{event}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-600">No events available.</p>
                );
            default:
                return null;
        }
    };

    return (
        <AuthLayout>

      <div className="bg-gray-100 min-h-screen py-8">
        <div className="py-5 px-5">
                <Button
                    text="Back"
                    onClick={() => window.history.back()}
                />
            </div>
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                    Player Spotlight
                </h1>
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                        <div className="flex-shrink-0">
                            <img
                                src={player.photo}
                                alt={player.name}
                                className="w-48 h-48 rounded-full object-cover border-4 border-gray-200 shadow-md"
                            />
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-3xl font-semibold text-gray-700">{player.name}</h2>
                            <p className="text-lg text-gray-500 mb-4">
                                <span className="font-medium">Club:</span> {player.current_club_name}
                            </p>
                            <div className="flex justify-center md:justify-start space-x-4 mb-4">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`py-2 px-4 rounded flex items-center space-x-2 ${activeTab === tab.key
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {tab.icon}
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthLayout >
  );
}
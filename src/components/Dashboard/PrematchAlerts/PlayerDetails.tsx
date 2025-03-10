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
}

interface NewsEvent {
    id: number;
    subject_id: number;
    heading: string;
    sub_heading: string;
    description: string;
    sub_description: string;
    created_at: string;
    updated_at: string;
}

const tabs = [
    { key: "bio", label: "Bio", icon: <FaInfoCircle /> },
    { key: "current club", label: "Current Club", icon: <FaHistory /> },
    { key: "news", label: "News", icon: <FaNewspaper /> },
    { key: "history", label: "History", icon: <FaCalendarAlt /> },
];

export default function PlayerDetails() {
    const { getPlayerById, getNewsEventBySubject } = useDashBoardManagement();
    const [player, setPlayer] = useState<Player | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("bio");
    const [news, setNews] = useState<NewsEvent[]>([]);
    const { player_id } = useParams<{ player_id: string }>();

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                if (!player_id) throw new Error("Player ID is undefined");
                const response = await getPlayerById(player_id);
                const playerData = response[0];
                setPlayer({
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
                });
                const newsResponse = await getNewsEventBySubject(player_id);
                console.log(newsResponse);
                setNews(newsResponse[0] );
                setLoading(false)
            } catch (err) {
                setLoading(false)
                console.error(err);
                setError("Failed to load player details. Please try again later.");
            }
        };
        fetchPlayerData();
    }, []);

    

 

    const renderTabContent = () => {
        switch (activeTab) {
            case "bio":
                return (
                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {Object.entries({
                                Position: player?.position,
                                Earnings: player?.earning,
                                Evaluation: player?.evaluation,
                                "Date of Birth": player?.dob,
                                Height: player?.height,
                                Weight: player?.weight,
                            }).map(([key, value]) => (
                                <div key={key} className="p-4 bg-gray-100 shadow-sm rounded-lg text-center">
                                    <p className="text-lg text-gray-700">
                                        <span className="font-semibold text-2xl">{key}</span>
                                    </p>
                                    <p className="text-lg text-gray-700">
                                        <span className=" text-lg">{value}</span> 
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
                case "current club":
                    return (
                        <div className="p-4 bg-white shadow-md rounded-lg">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {Object.entries({
                                    "Current Club": player?.current_club_name,
                                    Goals: player?.goal || "N/A",
                                    Assists: player?.assists || "N/A",
                                    "Clean Sheets": player?.clean_sheets || "N/A",
                                    Appearances: player?.appearance || "N/A",
                                    Substitutions: player?.substitution || "N/A",
                                    "Yellow Cards": player?.yellow_card || "N/A",
                                    "Red Cards": player?.red_card || "N/A",
                                }).map(([key, value]) => (
                                    <div key={key} className="p-4 bg-gray-100 shadow-sm rounded-lg text-center">
                                        <p className="text-lg text-gray-700">
                                            <span className="font-semibold text-2xl">{key}</span> 
                                        </p>
                                        <p className="text-lg text-gray-700">
                                            <span className=" text-lg">{value}</span> 
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
            case "news":
                return news.length ? (
                    news.map((newsItem) => (
                        <div key={newsItem.id} className="mb-4 border p-4 rounded-md shadow-sm bg-white">
                            <h3 className="text-lg font-semibold text-blue-600">{newsItem.heading}</h3>
                            <h4 className="text-md font-medium text-gray-700">{newsItem.sub_heading}</h4>
                            <p className="text-sm text-gray-600">{newsItem.sub_description}</p>
                            <p className="text-sm text-gray-500 mt-2">{newsItem.description}</p>
                            <p className="text-xs text-gray-400 mt-2">Published on: {new Date(newsItem.created_at).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-600">No news available.</p>
                );
            case "history":
                return player?.club_history.length ? (
                    player.club_history.map((history, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-sm text-gray-600">{history}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-600">No club history available.</p>
                );
            default:
                return null;
        }
    };
    return (
        <AuthLayout>
            <div className="bg-gray-100 min-h-screen">
                <div className="py-2 px-4">
                    <Button
                        text="Back"
                        onClick={() => window.history.back()}
                    />
                </div>
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <Loader loading={loading} color="#123abc" size={40} />
                            <p className="text-gray-500 text-lg ml-4">Loading player details...</p>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <p className="text-red-500 text-lg">{error}</p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-gradient-to-b from-blue-300 to-blue-500 relative pb-20">
                                <div className="flex space-x-5 px-4 py-7">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={player?.photo}
                                            alt={player?.name}
                                            className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-gray-200 shadow-md"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center mt-4 sm:mt-0 sm:ml-5">
                                        <h2 className="text-3xl sm:text-5xl font-semibold text-white italic">
                                            {player?.name.split(' ')[0]}
                                        </h2>
                                        <h2
                                            className="text-3xl sm:text-5xl font-semibold text-white"
                                            style={{ fontStyle: "oblique" }}
                                        >
                                            {player?.name.split(' ')[1]}
                                        </h2>
                                        <p className="text-lg text-white mb-4">
                                            <span className="font-medium">Club:</span> {player?.current_club_name}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-wrap justify-center sm:justify-start text-center space-x-2 sm:space-x-4 py-3 px-4 absolute w-full lg:pl-48 bottom-0 bg-white"
                                    style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    <div
                                        className="flex space-x-2 sm:space-x-4"
                                        style={{ display: 'flex', flexWrap: 'nowrap' }}
                                    >
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveTab(tab.key)}
                                                className={`py-2 px-4 rounded flex items-center space-x-2 ${
                                                    activeTab === tab.key
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-gray-200 text-gray-600"
                                                }`}
                                                style={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                {tab.icon}
                                                <span>{tab.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 px-4">
                                {renderTabContent()}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthLayout>
    );
}
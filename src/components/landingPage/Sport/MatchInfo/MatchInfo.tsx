import Tabs from "@/pages/Ui/tab";
import Info from "./Info/Info";
import MatchLineup from "./Lineup/Lineup";
import Table from "./Table/Table";
import News from "./News/News";
import H2H from "./H2H/H2H";

export default function MatchInfo() {
    const tabs3 = ["Info", "Prediction", "Lineups", "Table", "News", "H2H"];

    // Home & Away Team Data
    const homeTeam = {
        name: "Arsenal",
        logo: "/assets/images/landingPage/arsenal.png",
        formation: "4-4-2",
        players: [
            { name: "Ramsdale", number: 1, position: "GK" },
            { name: "White", number: 4, position: "DF" },
            { name: "Saliba", number: 2, position: "DF" },
            { name: "Gabriel", number: 6, position: "DF" },
            { name: "Zinchenko", number: 35, position: "DF" },
            { name: "Partey", number: 5, position: "MF" },
            { name: "Xhaka", number: 34, position: "MF" },
            { name: "Saka", number: 7, position: "MF" },
            { name: "Odegaard", number: 8, position: "MF" },
            { name: "Martinelli", number: 11, position: "FW" },
            { name: "Jesus", number: 9, position: "FW" }
        ]
    };

    const awayTeam = {
        name: "Chelsea",
        logo: "/assets/images/landingPage/chelsea.png",
        formation: "4-3-3",
        players: [
            { name: "Kepa", number: 1, position: "GK" },
            { name: "James", number: 24, position: "DF" },
            { name: "Silva", number: 6, position: "DF" },
            { name: "Koulibaly", number: 26, position: "DF" },
            { name: "Chilwell", number: 21, position: "DF" },
            { name: "Fernandez", number: 5, position: "MF" },
            { name: "Kovacic", number: 8, position: "MF" },
            { name: "Mount", number: 19, position: "MF" },
            { name: "Felix", number: 11, position: "FW" },
            { name: "Havertz", number: 29, position: "FW" },
            { name: "Sterling", number: 17, position: "FW" }
        ]
    };

    // Renders content based on active tab
    const renderContent = (tab: string) => {
        switch (tab) {
            case "Info":
                return <Info />;
            case "Prediction":
                return (
                    <div>
                        <h2 className="text-center font-bold text-lg">Head-to-Head Prediction</h2>
                        <MatchLineup homeFormation={homeTeam.formation} awayFormation={awayTeam.formation} homePlayers={homeTeam.players} awayPlayers={awayTeam.players} />
                    </div>
                );
                return null;
            case "Lineups":
                return (
                    <div>
                        <h2 className="text-center font-bold text-lg">Head-to-Head Lineup</h2>
                        <MatchLineup homeFormation={homeTeam.formation} awayFormation={awayTeam.formation} homePlayers={homeTeam.players} awayPlayers={awayTeam.players} />
                    </div>
            );
            case "Table":
                return <Table />
            case "News":
                return <News />
            case "H2H":
                return <H2H />
            default:
                return null;
        }
    };

    return (
        <div className="px-4">
            {/* Match Details (Logos & Time) */}
            <div className="flex justify-between items-center py-4 bg-gray-100 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <img src={homeTeam.logo} alt={homeTeam.name} className="w-20 h-20" />
                    <p className="font-bold">{homeTeam.name}</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-xl">20:45</p>
                    <p className="text-gray-600">Today</p>
                </div>
                <div className="flex flex-col items-center">
                    <img src={awayTeam.logo} alt={awayTeam.name} className="w-20 h-20" />
                    <p className="font-bold">{awayTeam.name}</p>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-white mt-4 shadow-md rounded-lg">
                <Tabs tabs={tabs3} renderContent={renderContent} />
            </div>
        </div>
    );
}

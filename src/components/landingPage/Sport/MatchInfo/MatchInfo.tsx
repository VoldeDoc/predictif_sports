import Tabs from "@/pages/Ui/tab";
import Info from "./Info/Info";
import MatchLineup from "./Lineup/Lineup";
import Table from "./Table/Table";
import News from "./News/News";
import H2H from "./H2H/H2H";
interface MatchInfoProps {
    matchDetails: {
        meta_data: {
            id: string;
            home_club: string;
            away_club: string;
            home_club_logo: string;
            away_club_logo: string;
            game_start_time?: string;
            match_type: "Latest Match" | "Live Match" | "Coming Match"; 
        };
        live_data?: {
            home_score: number;
            away_score: number;
        };
    } | null;
}
export default function MatchInfo({ matchDetails }: MatchInfoProps) {

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
                return matchDetails ? (
                    <Info matchDetails={matchDetails} />
                ) : (
                    <div className="flex justify-center items-center p-4">
                        <p className="text-gray-500">Loading match details...</p>
                    </div>
                );
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

    if (!matchDetails) {
        return (
            <div className="flex justify-center items-center p-4">
                <p className="text-gray-500">Loading match details...</p>
            </div>
        );
    }

    const isUpcoming = (matchType?: string) => {
      
        // If matchType is undefined, check game_start_time
        if (!matchType) {
            if (!meta_data.game_start_time) return false;
            return new Date(meta_data.game_start_time) > new Date();
        }
        
        return matchType === "Coming Match";
    };
    
    const { meta_data, live_data } = matchDetails;
    const isUpcomingMatch = isUpcoming(meta_data.match_type);
    
   
    return (
        <div className="px-2 sm:px-4">
            <div className="flex justify-between items-center py-4 px-2 sm:px-4 bg-gray-100 rounded-lg shadow-md">
            {/* Home Team */}
            <div className="flex flex-col items-center flex-1">
                <img
                src={meta_data.home_club_logo}
                alt={meta_data.home_club}
                className="w-12 h-12 sm:w-20 sm:h-20"
                />
                <p className="font-bold text-sm sm:text-base text-center">{meta_data.home_club}</p>
                {/* Remove score for upcoming matches */}
                {!isUpcomingMatch && live_data && (
                <p className="text-lg sm:text-xl mt-2">{live_data.home_score}</p>
                )}
            </div>
        
            {/* Center Score/VS Section */}
            <div className="text-center mx-2 sm:mx-4 flex-1">
                {isUpcomingMatch ? (
                <div>
                    <p className="font-bold text-lg sm:text-xl text-green-600">VS</p>
                    {meta_data.game_start_time && (
                    <p className="text-xs sm:text-sm text-gray-600">
                        {new Date(meta_data.game_start_time).toLocaleString()}
                    </p>
                    )}
                </div>
                ) : (
                live_data && (
                    <p className="font-bold text-lg sm:text-xl">
                    {`${live_data.home_score} - ${live_data.away_score}`}
                    </p>
                )
                )}
            </div>
        
            {/* Away Team */}
            <div className="flex flex-col items-center flex-1">
                <img
                src={meta_data.away_club_logo}
                alt={meta_data.away_club}
                className="w-12 h-12 sm:w-20 sm:h-20"
                />
                <p className="font-bold text-sm sm:text-base text-center">{meta_data.away_club}</p>
                {/* Remove score for upcoming matches */}
                {!isUpcomingMatch && live_data && (
                <p className="text-lg sm:text-xl mt-2">{live_data.away_score}</p>
                )}
            </div>
            </div>
        
            {/* Tabs Section */}
            <div className="bg-white mt-4 shadow-md rounded-lg">
            <Tabs tabs={tabs3} renderContent={renderContent} />
            </div>
        </div>
    );
}

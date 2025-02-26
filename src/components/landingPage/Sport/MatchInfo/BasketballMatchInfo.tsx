import Tabs from "@/pages/Ui/tab";

interface BasketballMatchInfoProps {
    matchDetails: {
        time: string;
        team1: string;
        team2: string;
        score: string;
        logo: string;
    } | null;
}

export default function BasketballMatchInfo({ matchDetails }: BasketballMatchInfoProps) {
    const tabs3 = ["Info", "Statistics", "Play by Play", "Lineups", "News", "H2H"];

    const renderContent = (tab: string) => {
        switch (tab) {
            case "Info":
                return (
                    <div className="p-4">
                        <h2>Match Information</h2>
                        {/* Add basketball-specific match information */}
                    </div>
                );
            case "Statistics":
                return (
                    <div className="p-4">
                        <h2>Match Statistics</h2>
                        {/* Add basketball statistics */}
                    </div>
                );
            case "Play by Play":
                return (
                    <div className="p-4">
                        <h2>Play by Play</h2>
                        {/* Add play-by-play information */}
                    </div>
                );
            case "Lineups":
                return (
                    <div className="p-4">
                        <h2>Team Lineups</h2>
                        {/* Add basketball lineups */}
                    </div>
                );
            case "News":
                return (
                    <div className="p-4">
                        <h2>Match News</h2>
                        {/* Add match news */}
                    </div>
                );
            case "H2H":
                return (
                    <div className="p-4">
                        <h2>Head to Head</h2>
                        {/* Add H2H statistics */}
                    </div>
                );
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

    return (
        <div className="px-2 sm:px-4">
            <div className="flex justify-between items-center py-4 px-2 sm:px-4 bg-gray-100 rounded-lg shadow-md">
                {/* Home Team */}
                <div className="flex flex-col items-center flex-1">
                    <img
                        src={matchDetails.logo}
                        alt={matchDetails.team1}
                        className="w-12 h-12 sm:w-20 sm:h-20"
                    />
                    <p className="font-bold text-sm sm:text-base text-center">{matchDetails.team1}</p>
                </div>

                {/* Center Score Section */}
                <div className="text-center mx-2 sm:mx-4 flex-1">
                    <p className="font-bold text-lg sm:text-xl">{matchDetails.score}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{matchDetails.time}</p>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center flex-1">
                    <img
                        src={matchDetails.logo}
                        alt={matchDetails.team2}
                        className="w-12 h-12 sm:w-20 sm:h-20"
                    />
                    <p className="font-bold text-sm sm:text-base text-center">{matchDetails.team2}</p>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-white mt-4 shadow-md rounded-lg">
                <Tabs tabs={tabs3} renderContent={renderContent} />
            </div>
        </div>
    );
}
import React from "react";

interface StatsProps {
    liveData: any;
    predictData: any;
}

const Stats: React.FC<StatsProps> = ({ liveData, predictData }) => {
    const liveStats = liveData ? [
        { label: "Home Score", homeValue: liveData.home_score, awayValue: liveData.away_score },
        { label: "Red Cards", homeValue: liveData.home_red_card, awayValue: liveData.away_red_card },
        { label: "Yellow Cards", homeValue: liveData.home_yellow_card, awayValue: liveData.away_yellow_card },
        { label: "Corner Kicks", homeValue: liveData.home_corner_kick, awayValue: liveData.away_corner_kick },
        { label: "Penalty Kicks", homeValue: liveData.home_penalty_kick, awayValue: liveData.away_penalty_kick },
        { label: "Free Kicks", homeValue: liveData.home_free_kick, awayValue: liveData.away_free_kick },
        { label: "Throw-ins", homeValue: liveData.home_throwing, awayValue: liveData.away_throwing },
    ] : [];

    const predictedStats = predictData ? [
        { label: "Home Score", homeValue: predictData.home_score, awayValue: predictData.away_score },
        { label: "Red Cards", homeValue: predictData.home_red_card, awayValue: predictData.away_red_card },
        { label: "Yellow Cards", homeValue: predictData.home_yellow_card, awayValue: predictData.away_yellow_card },
        { label: "Corner Kicks", homeValue: predictData.home_corner_kick, awayValue: predictData.away_corner_kick },
        { label: "Penalty Kicks", homeValue: predictData.home_penalty_kick, awayValue: predictData.away_penalty_kick },
        { label: "Free Kicks", homeValue: predictData.home_free_kick, awayValue: predictData.away_free_kick },
        { label: "Throw-ins", homeValue: predictData.home_throwing, awayValue: predictData.away_throwing },
    ] : [];

    return (
        <div className="w-full flex flex-col space-y-4 py-8">
            <h1 className="text-2xl font-bold">Predictive Data</h1>
            {predictedStats.map((stat, index) => (
                <div key={index} className="flex flex-col space-y-2 mb-10">
                    <div className="flex justify-between">
                        <span className="text-blue-600">{stat.homeValue}</span>
                        <span className="text-gray-600">{stat.label}</span>
                        <span className="text-black">{stat.awayValue}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${(stat.homeValue / (stat.homeValue + stat.awayValue)) * 100}%` }}
                            ></div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 flex justify-end">
                            <div
                                className="bg-black-500 h-2.5 rounded-full"
                                style={{ width: `${(stat.awayValue / (stat.homeValue + stat.awayValue)) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}

            <h1 className="text-2xl font-bold">Live Data</h1>
            {liveStats.map((stat, index) => (
                <div key={index} className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                        <span className="text-blue-600">{stat.homeValue}</span>
                        <span className="text-gray-600">{stat.label}</span>
                        <span className="text-black">{stat.awayValue}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${(stat.homeValue / (stat.homeValue + stat.awayValue)) * 100}%` }}
                            ></div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 flex justify-end">
                            <div
                                className="bg-black-500 h-2.5 rounded-full"
                                style={{ width: `${(stat.awayValue / (stat.homeValue + stat.awayValue)) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Stats;
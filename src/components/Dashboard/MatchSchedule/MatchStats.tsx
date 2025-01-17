import React, { useEffect, useState } from "react";
import useDashBoardManagement from "@/hooks/useDashboard";

const Stats: React.FC = () => {
    const { getMatchAlert, loading } = useDashBoardManagement();
    const [liveData, setLiveData] = useState<any>(null);
    const [predictedData, setPredictedData] = useState<any>(null);
    useEffect(() => {
        (async () => {
            try {
                const response = await getMatchAlert();
                setLiveData(response[0].live_data);
                setPredictedData(response[0].predict_data);
            } catch (error) {
                console.log('error getting data', error);
            }
        })();
    }, []);

    const liveStats = liveData ? [
        { label: "Home Score", homeValue: liveData.home_score, awayValue: liveData.away_score },
        { label: "Red Cards", homeValue: liveData.home_red_card, awayValue: liveData.away_red_card },
        { label: "Yellow Cards", homeValue: liveData.home_yellow_card, awayValue: liveData.away_yellow_card },
        { label: "Corner Kicks", homeValue: liveData.home_corner_kick, awayValue: liveData.away_corner_kick },
        { label: "Penalty Kicks", homeValue: liveData.home_penalty_kick, awayValue: liveData.away_penalty_kick },
        { label: "Free Kicks", homeValue: liveData.home_free_kick, awayValue: liveData.away_free_kick },
        { label: "Throw-ins", homeValue: liveData.home_throwing, awayValue: liveData.away_throwing },
    ] : [];

    const predictedStats = predictedData ? [
        { label: "Home Score", homeValue: predictedData.home_score, awayValue: predictedData.away_score },
        { label: "Red Cards", homeValue: predictedData.home_red_card, awayValue: predictedData.away_red_card },
        { label: "Yellow Cards", homeValue: predictedData.home_yellow_card, awayValue: predictedData.away_yellow_card },
        { label: "Corner Kicks", homeValue: predictedData.home_corner_kick, awayValue: predictedData.away_corner_kick },
        { label: "Penalty Kicks", homeValue: predictedData.home_penalty_kick, awayValue: predictedData.away_penalty_kick },
        { label: "Free Kicks", homeValue: predictedData.home_free_kick, awayValue: predictedData.away_free_kick },
        { label: "Throw-ins", homeValue: predictedData.home_throwing, awayValue: predictedData.away_throwing },
    ] : [];

    if (loading) return <div className="text-2xl font-bold text-center items-center">Loading...</div>;

    if (!liveData) {
        return <div className="text-2xl font-bold">No data available</div>;
    }

    return (
        <div className="w-full flex flex-col space-y-4 py-8">
             <h1 className="text-2xl font-bold">Predicted Data</h1>
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
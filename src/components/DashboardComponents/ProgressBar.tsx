import { useState, useEffect } from "react";

interface ProgressBarProps {
    homeValue: number;
    awayValue: number;
}

export const ProgressBar = ({ homeValue, awayValue }: ProgressBarProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsVisible(true), 50); // Delay to trigger animation
        return () => clearTimeout(timeout);
    }, []);

    const total = homeValue + awayValue;
    const homePercentage = total > 0 ? (homeValue / total) * 100 : 0;
    const awayPercentage = total > 0 ? (awayValue / total) * 100 : 0;

    return (
        <div className="relative pt-1">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-blue-600">Home: {homeValue} ({homePercentage.toFixed(1)}%)</span>
                <span className="text-sm font-medium text-black">Away: {awayValue} ({awayPercentage.toFixed(1)}%)</span>
            </div>
            <div className="flex items-center gap-4">
                {/* Home Progress Bar */}
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className={`h-full bg-blue-600 transition-all duration-500 ease-in-out ${
                            isVisible ? "w-full" : "w-0"
                        }`}
                        style={{ width: `${homePercentage}%` }}
                    />
                </div>
                {/* Away Progress Bar */}
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className={`h-full bg-black-500 transition-all duration-500 ease-in-out ${
                            isVisible ? "w-full" : "w-0"
                        }`}
                        style={{ width: `${awayPercentage}%`, marginLeft: "auto" }}
                    />
                </div>
            </div>
        </div>
    );
};

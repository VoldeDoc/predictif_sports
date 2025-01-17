import React from "react";

interface Event {
    time: string;
    player: string;
    subPlayer?: string;
    eventType: "goal" | "yellow-card" | "red-card" | "substitution" | "penalty-cancelled";
    team: "home" | "away";
}

interface MatchTimelineProps {
    events: Event[];
}

const MatchTimeline: React.FC<MatchTimelineProps> = ({ events }) => {
    return (
        <div className="w-full flex flex-col items-center space-y-4 py-8">
            {events.map((event, index) => (
                <div
                    key={index}
                    className="flex w-full max-w-3xl items-center"
                >
                    {/* Home Team Event */}
                    <div className={`flex-1 flex ${event.team === "home" ? "justify-end" : "justify-start"}`}>
                        <div className="flex items-center space-x-3">
                            {event.team === "home" && (
                                <>
                                    {event.eventType === "goal" && (
                                        <span className="text-lg">⚽</span>
                                    )}
                                    {event.eventType === "yellow-card" && (
                                        <div className="w-4 h-6 bg-yellow-400 rounded-sm"></div>
                                    )}
                                    {event.eventType === "red-card" && (
                                        <div className="w-4 h-6 bg-red-500 rounded-sm"></div>
                                    )}
                                    <div className="text-right">
                                        <p className="text-black">{event.player}</p>
                                        {event.subPlayer && (
                                            <p className="text-xs text-gray-500">
                                                ({event.subPlayer})
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Event Time (Center) */}
                    <div className="w-20 text-center">
                        <span className="text-gray-500 text-sm">{event.time}</span>
                    </div>

                    {/* Away Team Event */}
                    <div className={`flex-1 flex ${event.team === "away" ? "justify-start" : "justify-end"}`}>
                        <div className="flex items-center space-x-3">
                            {event.team === "away" && (
                                <>
                                    <div className="text-left">
                                        <p className="text-black">{event.player}</p>
                                        {event.subPlayer && (
                                            <p className="text-xs text-gray-500">
                                                ({event.subPlayer})
                                            </p>
                                        )}
                                    </div>
                                    {event.eventType === "goal" && (
                                        <span className="text-lg">⚽</span>
                                    )}
                                    {event.eventType === "yellow-card" && (
                                        <div className="w-4 h-6 bg-yellow-400 rounded-sm"></div>
                                    )}
                                    {event.eventType === "red-card" && (
                                        <div className="w-4 h-6 bg-red-500 rounded-sm"></div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MatchTimeline;

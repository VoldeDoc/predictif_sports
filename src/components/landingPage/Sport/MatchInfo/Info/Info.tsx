interface InfoProps {
    matchDetails: {
        meta_data: {
            id: string;
            home_club: string;
            away_club: string;
            home_club_logo: string;
            away_club_logo: string;
            home_score?: number;
            away_score?: number;
            game_start_time?: string;
        };
    } | null
}
export default function Info({matchDetails}:InfoProps) {
    if (!matchDetails) {
        return (
            <div className="flex justify-center items-center p-4">
                <p className="text-gray-500">No details currently</p>
            </div>
        );
    }

    const { meta_data } = matchDetails;

    return (
        <div className="px-4">
            {/* Header */}
            <div className="bg-blue-800 px-2 py-2">
                <h1 className="text-white font-bold text-center">Match Info</h1>

            </div>

            <div className="px-3">
                {/* Form Header */}
                <h4 className="pb-2 font-semibold text-center md:text-left">FORM</h4>

                <div className="bg-blue-50 px-3 py-3 flex flex-col items-center gap-4 md:flex-row md:justify-between">
                    {/* Home Team Section */}
                    <div className="flex flex-col items-center md:flex-row gap-3 w-full md:w-auto">
                        <img src={meta_data.home_club_logo} alt={`${meta_data.home_club} Logo`} className="h-14 w-14 md:h-16 md:w-16" />
                        <div className="flex flex-col items-center md:items-start">
                            <p className="font-bold">{meta_data.home_club}</p>
                            <div className="flex gap-1">
                                <span className="bg-green-600 px-3 py-2 rounded-md"></span>
                                <span className="bg-red-600 px-3 py-2 rounded-md"></span>
                                <span className="bg-green-600 px-3 py-2 rounded-md"></span>
                                <span className="bg-green-600 px-3 py-2 rounded-md"></span>
                                <span className="bg-green-600 px-3 py-2 rounded-md"></span>
                            </div>
                        </div>
                    </div>

                    {/* VS Section */}
                    <div className="text-center">
                        <p className="font-bold text-2xl">VS</p>
                        {meta_data.game_start_time && (
                            <p className="text-sm text-gray-600">{meta_data.game_start_time}</p>
                        )}
                    </div>

                    {/* Away Team Section */}
                    <div className="flex flex-col items-center md:flex-row gap-3 w-full md:w-auto">
                        <img src={meta_data.away_club_logo} alt={`${meta_data.away_club} Logo`} className="h-14 w-14 md:h-16 md:w-16" />
                        <div className="flex flex-col items-center md:items-start">
                            <p className="font-bold">{meta_data.away_club}</p>
                            <div className="flex gap-1">
                                <span className="bg-green-600 px-3 py-2 rounded-md"></span>
                                <span className="bg-red-600 px-3 py-2 rounded-md"></span>
                                <span className="bg-green-600 px-3 py-2 rounded-md"></span>
                                <span className="bg-green-600 px-3 py-2 rounded-md"></span>
                                <span className="bg-green-600 px-3 py-2 rounded-md"></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TV / Streaming Section */}
                <div className="bg-blue-50 px-3 py-3 mt-3">
                    <p className="text-lg bg-white py-2 px-2 font-semibold text-center md:text-left">TV / LIVE STREAMING</p>
                    <p className="py-2 text-gray-600 text-center md:text-left">
                        TV channel: ANAL+ Sport (Cze/Svk), Optus Sport (Aus), Sport 24 At Sea (USA)
                    </p>
                </div>

                {/* Match Information Section (Fixed Alignment) */}
                <div className="bg-blue-50 px-3 py-3 mt-3">
                    <p className="text-lg bg-white py-2 px-2 font-semibold text-center md:text-left">MATCH INFORMATION</p>
                    <div className="grid grid-cols-2 gap-4 py-2 px-2 text-center">
                        <p className="text-gray-600 font-medium">Venue:</p>
                        <p className="text-gray-600">Stamford Bridge, London</p>

                        <p className="text-gray-600 font-medium">Capacity:</p>
                        <p className="text-gray-600">40,341</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import ChelseaLogo from '/assets/images/landingPage/chelsea.png'
import ArsenalLogo from '/assets/images/landingPage/arsenal.png'

export default function Info() {
    return (
        <div className="px-4">
            {/* Header */}
            <div className="bg-blue-800 px-2 py-2">
                <h1 className="text-white font-bold text-center">Match Info</h1>
            </div>

            <div className="px-3">
                {/* Form Header */}
                <h4 className="pb-2 font-semibold text-center md:text-left">FORM</h4>

                {/* Teams Section */}
                <div className="bg-blue-50 px-3 py-3 flex flex-col items-center gap-4 md:flex-row md:justify-between">
                    {/* Chelsea Section */}
                    <div className="flex flex-col items-center md:flex-row gap-3 w-full md:w-auto">
                        <img src={ChelseaLogo} alt="Chelsea Logo" className="h-14 w-14 md:h-16 md:w-16" />
                        <div className="flex flex-col items-center md:items-start">
                            <p className="font-bold">Chelsea FC</p>
                            <div className="flex gap-1">
                                <span className="bg-green-600 px-3 py-1 rounded-md"></span>
                                <span className="bg-red-600 px-3 py-1 rounded-md"></span>
                                <span className="bg-green-600 px-3 py-1 rounded-md"></span>
                                <span className="bg-green-600 px-3 py-1 rounded-md"></span>
                                <span className="bg-green-600 px-3 py-1 rounded-md"></span>
                            </div>
                        </div>
                    </div>

                    {/* VS Section */}
                    <p className="font-bold text-2xl text-center">VS</p>

                    {/* Arsenal Section */}
                    <div className="flex flex-col items-center md:flex-row gap-3 w-full md:w-auto">
                        <img src={ArsenalLogo} alt="Arsenal Logo" className="h-14 w-14 md:h-16 md:w-16" />
                        <div className="flex flex-col items-center md:items-start">
                            <p className="font-bold">Arsenal FC</p>
                            <div className="flex gap-1">
                                <span className="bg-green-600 px-3 py-1 rounded-md"></span>
                                <span className="bg-red-600 px-3 py-1 rounded-md"></span>
                                <span className="bg-green-600 px-3 py-1 rounded-md"></span>
                                <span className="bg-green-600 px-3 py-1 rounded-md"></span>
                                <span className="bg-green-600 px-3 py-1 rounded-md"></span>
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

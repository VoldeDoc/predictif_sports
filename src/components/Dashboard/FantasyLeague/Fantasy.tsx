import premierLeagueLogo from '/assets/images/landingPage/premier.svg';
import ChelseaLogo from '/assets/images/landingPage/chelsea.png';
import ArsenalLogo from '/assets/images/landingPage/arsenal.png';
import LeagueTable from "@/components/landingPage/Sport/MatchInfo/Table/Tool/TableComponent";

const tableData = [
    {
        position: 1,
        logo: "/path/to/logoA.png",
        team: "Manchester City",
        mp: 30,
        w: 20,
        d: 5,
        l: 5,
        gf: 60,
        ga: 30,
        gd: 30,
        pts: 65
    },
    {
        position: 2,
        logo: "/path/to/logoB.png",
        team: "Liverpool",
        mp: 30,
        w: 18,
        d: 6,
        l: 6,
        gf: 55,
        ga: 28,
        gd: 27,
        pts: 60
    },
    {
        position: 3,
        logo: "/path/to/logoC.png",
        team: "Arsenal",
        mp: 30,
        w: 15,
        d: 10,
        l: 5,
        gf: 50,
        ga: 25,
        gd: 25,
        pts: 55
    }
];

export default function FantasySquadMatch() {
    return (
        <div className=''>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-2">
                    <div className="bg-blue-50">
                        <div className="font-bold flex justify-between items-center p-4">
                            <h1>Next Match</h1>
                            <h1 className="text-blue-800">View Calendar</h1>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center p-4">
                                <img src={premierLeagueLogo} alt="" className="w-12 h-12 mr-2" />
                                <p className="text-xl">Premier League</p>
                            </div>
                            <div className="flex justify-between items-center p-4">
                                <div className="text-center">
                                    <img src={ChelseaLogo} alt="" className="w-16 h-16 mx-auto" />
                                    <p className="text-lg font-bold">Chelsea FC</p>
                                </div>
                                <div>
                                    <p className="text-2xl">VS</p>
                                </div>
                                <div className="text-center">
                                    <img src={ArsenalLogo} alt="" className="w-16 h-16 mx-auto" />
                                    <p className="text-lg font-bold">Arsenal FC</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <p className="text-center font-bold text-xl">18:45  15/02/2025</p>
                            </div>
                        </div>
                        <div className='py-8'>
                            <LeagueTable tableData={tableData} className="bg-blue-50" />
                        </div>
                    </div>
                </div>

                <div className='w-full md:w-1/2 p-2'>
                    <div className="font-bold flex justify-between items-center p-4 bg-blue-50">
                        <h1>Game Statistic</h1>
                        <h1 className="text-blue-800">View All Statistic</h1>
                    </div>
                    <div className="bg-blue-50 mt-4 p-4">
                        <div className='flex justify-between pt-16 lg:flex-row flex-col text-center items-center'>
                            <div className="flex  items-center">
                                <img src={ChelseaLogo} alt="" className='w-16 h-16 mr-4' />
                                <div>
                                    <p className='font-bold'>Chelsea FC</p>
                                    <div className="flex space-x-1">
                                        <div className="flex flex-col items-center">
                                            <span className="bg-green-500 px-2 py-1 rounded-md"></span>
                                            <p>W</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="bg-green-500 px-2 py-1 rounded-md"></span>
                                            <p>W</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="bg-green-500 px-2 py-1 rounded-md"></span>
                                            <p>L</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="bg-green-500 px-2 py-1 rounded-md"></span>
                                            <p>W</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="bg-green-500 px-2 py-1 rounded-md"></span>
                                            <p>W</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center mt-4 ">
                                <img src={ArsenalLogo} alt="" className='w-16 h-16 mr-4' />
                                <div>
                                    <p className='font-bold'>Arsenal FC</p>
                                    <div className="flex space-x-1">
                                        <div className="flex flex-col items-center">
                                            <span className="bg-green-500 px-2 py-1 rounded-md"></span>
                                            <p>W</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="bg-green-500 px-2 py-1 rounded-md"></span>
                                            <p>W</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="bg-green-500 px-2 py-1 rounded-md"></span>
                                            <p>L</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="bg-green-500 px-2 py-1 rounded-md"></span>
                                            <p>W</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="bg-green-500 px-2 py-1 rounded-md"></span>
                                            <p>W</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'>
                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/hand.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-3xl font-semibold'>Posession</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                75%
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/mm.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>OVERALL PRICE</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                $975.6m
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/money.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>Transfer budget</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                $975.6m
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/budget.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>Average Score</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                7.5
                            </div>
                        </div>


                    </div>
                    <div className="bg-blue-50 rouunded-lg p-8 hover:bg-gray-300 hover:cursor-pointer mt-5">
                        <div className='flex items-center'>
                            <p className='font-bold'>Don't forget</p>
                        </div>
                        <div className='text-center items-center font-bold text-blue-800 text-xl py-3'>
                            <p>To setup your squad</p>
                            <p>For next week</p>
                        </div>
                        <div className='items-center text-center py-3'>
                            <button className='bg-blue-800 text-white px-1 py-1 rounded-md'>Go to squad menu to do that</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
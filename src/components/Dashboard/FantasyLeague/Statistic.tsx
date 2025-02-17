import ChelseaLogo from '/assets/images/landingPage/chelsea.png';

export default function FantasyStatistic() {
    return (
        <div>
            <h1 className="text-3xl font-bold">Statistic</h1>

            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                <div className="w-full md:w-1/2">
                    <div className="px-5 py-5" style={{ background: 'linear-gradient(to bottom right, #0C21C1, #6D748B)' }}>
                        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                            <div>
                                <img src="/assets/images/landingPage/Player photo.png" alt="" className="h-42 w-42" />
                            </div>
                            <div>
                                <div className="text-white">
                                    <h1 className="font-semibold text-lg">Name:</h1>
                                    <h1 className="font-bold text-2xl">Lukaku</h1>
                                </div>
                                <div className="text-white">
                                    <h1 className="font-semibold text-lg">Position:</h1>
                                    <h1 className="font-bold text-2xl">ST</h1>
                                </div>
                                <div className="text-white">
                                    <h1 className="font-semibold text-lg">Overall Rating</h1>
                                    <h1 className="font-bold text-2xl">88</h1>
                                </div>
                            </div>
                            <div>
                                <div className="text-white">
                                    <h1 className="font-semibold text-lg">Nationality:</h1>
                                    <img src="" alt="" />
                                </div>
                                <div className="text-white">
                                    <h1 className="font-semibold text-lg">Team:</h1>
                                    <img src={ChelseaLogo} className='w-14 h-14' alt="" />
                                </div>

                            </div>
                        </div>
                        <div className="border-white border-2 my-3"></div>
                        <div className="flex space-x-20">
                            <div className='space-y-9 py-9'>
                                <div className='text-white '>
                                    <h1 className=" font-semibold">Pace</h1>
                                    <h1 className='font-bold text-3xl'>84</h1>
                                </div>
                                <div className='text-white'>
                                    <h1 className=" font-semibold">Shooting</h1>
                                    <h1 className='font-bold text-3xl'>87</h1>
                                </div>
                                <div className='text-white'>
                                    <h1 className=" font-semibold">Passing</h1>
                                    <h1 className='font-bold text-3xl'>74</h1>
                                </div>
                            </div>
                            <div className='space-y-9 py-9'>
                                <div className='text-white '>
                                    <h1 className=" font-semibold">Dribbling</h1>
                                    <h1 className='font-bold text-3xl'>78</h1>
                                </div>
                                <div className='text-white'>
                                    <h1 className=" font-semibold">Defence</h1>
                                    <h1 className='font-bold text-3xl'>39</h1>
                                </div>
                                <div className='text-white'>
                                    <h1 className=" font-semibold">Physical</h1>
                                    <h1 className='font-bold text-3xl'>83</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>

                </div>

                <div className="w-full md:w-1/2">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'>
                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/hand.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-xl font-semibold'>POSSESSION</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                75%
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/mm.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>OVERALL GOALS</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                375
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/money.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>Transfer budget</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                $375.6m
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/budget.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>Injuring time</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                10
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/red.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>Red Card</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                10
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center '>
                                <img src="/assets/images/landingPage/yellow.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold text-center items-center flex justify-center'>Yellow card</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                25
                            </div>
                        </div>
                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/budget.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold'>Minutes Played</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                9756
                            </div>
                        </div>

                        <div className='bg-blue-50 rounded-lg p-8 hover:bg-gray-300 hover:cursor-pointer'>
                            <div className='flex items-center'>
                                <img src="/assets/images/landingPage/budget.png" alt="" className='w-10 h-10 rounded-full mr-2' />
                                <p className='text-sm font-bold text-center items-center flex justify-center'>Match Played</p>
                            </div>
                            <div className='text-3xl font-semibold text-blue-700 text-center'>
                                245
                            </div>
                        </div>


                    </div>
                    <div className="bg-blue-50 rouunded-lg p-8 hover:bg-gray-300 hover:cursor-pointer mt-5">
                        <div className='flex  flex-col'>
                            <p className='font-bold text-2xl'>PRICE CHART</p>
                            <p className='text-2xl'>00 <sup className='text-green-500 text-sm'>00%</sup></p>
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
    )
}
import ChelseaLogo from '/assets/images/landingPage/chelsea.png';
import ArsenalLogo from '/assets/images/landingPage/arsenal.png';
import TinyLineChart from './chart/Line';
import PlayerFeaturesPieChart from './chart/pie';
export default function Transfer() {

    return (
        <>
            <div className='flex flex-col md:flex-row gap-4'>
                <div className="w-full md:w-1/2">
                    <div className="bg-blue-50 px-4 py-5 rounded-md flex space-x-5 items-center text-center justify-center">
                        <img src={ChelseaLogo} alt="" className='w-14 h-14' />
                        <img src={ArsenalLogo} alt="" className='w-14 h-14' />
                        <img src={ChelseaLogo} alt="" className='w-14 h-14' />
                        <img src={ArsenalLogo} alt="" className='w-14 h-14' />
                    </div>
                    <div className='bg-blue-50 px-2 py-2 my-4'>
                        <p className='text-center font-bold text-lg py-2'>Position</p>
                        <div className='flex gap-2 justify-center'>
                            <p className='px-8 py-2 rounded-lg text-white font-semibold bg-blue-800 items-center text-center'>GK</p>
                            <p className='px-8 py-2 rounded-lg text-white font-semibold bg-blue-800 items-center text-center'>DM</p>
                            <p className='px-8 py-2 rounded-lg text-white font-semibold bg-blue-800 items-center text-center'>CF</p>
                            <p className='px-8 py-2 rounded-lg text-white font-semibold bg-blue-800 items-center text-center'>ST</p>
                        </div>
                    </div>
                    <div className="bg-blue-50 px-4 my-5 py-4">
                        <div className="flex justify-between">
                            <div>
                                <p className='bg-blue-800 text-white font-semi-bold px-2 py-1 rounded-full w-16 text-center'>GK</p>
                                <div className='py-4'>
                                    <p className='font-semibold text-2xl'>Manuel </p>
                                    <p className='font-semibold text-2xl'>Neuer</p>
                                </div>
                                <div className="flex space-x-5">
                                    <div>
                                        <p>Value</p>
                                        <p><span className='bg-blue-800 text-white px-1 py-1'>$</span> 800k</p>
                                    </div>
                                    <div>
                                        <p>Salary</p>
                                        <p><span className='bg-blue-800 text-white px-1 py-1'>$</span> 650k</p>
                                    </div>
                                    <div>
                                        <img src={ArsenalLogo} alt="" className='w-12 h-12' />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src="/assets/images/landingPage/image 10.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 px-4 my-5 py-4">
                        <div className="flex justify-between">
                            <div>
                                <p className='bg-blue-800 text-white font-semi-bold px-2 py-1 rounded-full w-16 text-center'>GK</p>
                                <div className='py-4'>
                                    <p className='font-semibold text-2xl'>Manuel </p>
                                    <p className='font-semibold text-2xl'>Neuer</p>
                                </div>
                                <div className="flex space-x-5">
                                    <div>
                                        <p>Value</p>
                                        <p><span className='bg-blue-800 text-white px-1 py-1'>$</span> 800k</p>
                                    </div>
                                    <div>
                                        <p>Salary</p>
                                        <p><span className='bg-blue-800 text-white px-1 py-1'>$</span> 650k</p>
                                    </div>
                                    <div>
                                        <img src={ArsenalLogo} alt="" className='w-12 h-12' />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src="/assets/images/landingPage/image 10.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 px-4 my-5 py-4">
                        <div className="flex justify-between">
                            <div>
                                <p className='bg-blue-800 text-white font-semi-bold px-2 py-1 rounded-full w-16 text-center'>GK</p>
                                <div className='py-4'>
                                    <p className='font-semibold text-2xl'>Manuel </p>
                                    <p className='font-semibold text-2xl'>Neuer</p>
                                </div>
                                <div className="flex space-x-5">
                                    <div>
                                        <p>Value</p>
                                        <p><span className='bg-blue-800 text-white px-1 py-1'>$</span> 800k</p>
                                    </div>
                                    <div>
                                        <p>Salary</p>
                                        <p><span className='bg-blue-800 text-white px-1 py-1'>$</span> 650k</p>
                                    </div>
                                    <div>
                                        <img src={ArsenalLogo} alt="" className='w-12 h-12' />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src="/assets/images/landingPage/image 10.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full md:w-1/2'>
                    <div className="bg-blue-50 py-2 px-2">
                        <h1 className='font-bold text-2xl'>Manuel Neuer</h1>
                    </div>
                    <div className="bg-blue-50 px-4 my-5 py-4">
                        <div className="flex justify-between">
                            <div>
                                <p className='bg-blue-800 text-white font-semi-bold px-2 py-1 rounded-full w-16 text-center'>GK</p>
                                <div className='py-4'>
                                    <p className='font-semibold text-2xl'>Manuel </p>
                                    <p className='font-semibold text-2xl'>Neuer</p>
                                </div>
                                <div className="flex space-x-5">
                                    <div>
                                        <p>Value</p>
                                        <p><span className='bg-blue-800 text-white px-1 py-1'>$</span> 800k</p>
                                    </div>
                                    <div>
                                        <p>Salary</p>
                                        <p><span className='bg-blue-800 text-white px-1 py-1'>$</span> 650k</p>
                                    </div>
                                    <div>
                                        <img src={ArsenalLogo} alt="" className='w-12 h-12' />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src="/assets/images/landingPage/image 10.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 my-5">
                        <TinyLineChart />
                    </div>
                    <div className="bg blue-50 my-5 text-center items-center flex justify-center">
                        <PlayerFeaturesPieChart />
                    </div>
                </div>

            </div>
        </>
    )
}
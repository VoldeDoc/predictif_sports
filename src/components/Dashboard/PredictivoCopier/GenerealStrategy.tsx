import { AuthLayout } from "@/components/Layout/layout";
import Button from "@/components/Ui/Button";
import { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
export default function GeneralStrategy() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Select an option');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const [rangeValue, setRangeValue] = useState(35);

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRangeValue(Number(event.target.value));
    };
    return (
        <AuthLayout>
            <>
                <div className="px-2 sm:px-16">
                    <div className="bg-white">
                        <div className="px-6 py-3">
                            <div className=" px-8 py-4 relative border-l-4 border-blue-800">
                                <div className="flex justify-between">
                                    <h1 className="font-bold text-xl text-gray-700" >Strategy Name</h1>
                                    <div className="bg-blue-800 rounded-md px-2 py-2 text-white text-xs">3 days ago</div>
                                </div>
                                <div className="py-3">
                                    <p className="font-medium text-sm">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu
                                        stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcat cher synth. Cosby sweater eu banh mi</p>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-4 relative my-10">
                            <div className="hidden xl:block">
                                <div className="absolute top-10 transform -translate-y-1/2 left-20 w-40 border-t-2 border-gray-400"></div>
                                <div className="absolute top-10 transform -translate-y-1/2 left-[350px] w-[200px] border-t-2 border-gray-400"></div>
                                <div className="absolute top-10 transform -translate-y-1/2 right-[140px] w-[200px] border-t-2 border-gray-400"></div>
                            </div>

                            <div className="flex  justify-between space-x-2 sm:space-x-5">
                                <div>
                                    <div className="rounded-full bg-gray-300 w-10 h-10 px-2 py-2  text-center items-center text-gray-400">1</div>
                                    <p className="text-gray-400 font-semibold text-xs sm:text-base">Rules</p>
                                </div>
                                <div className="text-center items-center">
                                    <div className="rounded-full bg-red-800 w-10 h-10 px-2 py-2  text-center items-center text-white">2</div>
                                    <p className="text-red-800 font-semibold  text-xs sm:text-base">Outcome</p>
                                </div>
                                <div className="">
                                    <div className="rounded-full bg-gray-300 w-10 h-10 px-2 py-2  text-center items-center text-gray-400">3</div>
                                    <p className="text-gray-400 font-semibold text-xs sm:text-base">Settings</p>
                                </div>
                                <div className="">
                                    <div className="rounded-full bg-gray-300 w-10 h-10 px-2 py-2  text-center items-center text-gray-400">4</div>
                                    <p className="text-gray-400 font-semibold text-xs sm:text-base">Confirmation</p>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-3">
                            <div className=" px-8 py-4  border-l-4 border-blue-800">
                                <div className="">
                                    <h1 className="font-bold text-xl text-gray-700" >Selected Prematch Stat</h1>
                                    <p className="font-medium text-sm text-gray-700" >Select the prematch stat you want to create an alert for e.g Games Played, Over / Under Occurrences, Goals Scored, etc.</p>

                                </div>
                                <div className=" py-3">
                                    <button
                                        onClick={toggleDropdown}
                                        className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-left font-semibold"
                                    >
                                        {selectedOption}
                                    </button>
                                    {isOpen && (
                                        <div className=" mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                            <div
                                                className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                                onClick={() => handleSelect('General')}
                                            >
                                                <img
                                                    src="/assets/images/dashboard/dashboard/general 1.svg"
                                                    alt=""
                                                    className="w-5 h-5 inline-block mr-2"
                                                />
                                                <span className="font-semibold">General</span>
                                            </div>
                                            <div
                                                className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                                onClick={() => handleSelect('Option 2')}
                                            >
                                                <img src="/assets/images/dashboard/dashboard/goals 1.svg" alt="" className="w-5 h-5 inline-block mr-2" />
                                                <h1 className="font-semibold">Goals</h1>
                                            </div>
                                            <div
                                                className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                                onClick={() => handleSelect('Option 3')}
                                            >
                                                <img src="/assets/images/dashboard/dashboard/streak 1.svg" alt="" className="w-5 h-25 mr-2" />
                                                <h1 className="font-semibold">Treaks</h1>
                                            </div>
                                            <div
                                                className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                                onClick={() => handleSelect('Option 4')}
                                            >
                                                <img src="/assets/images/dashboard/dashboard/corners 1.svg" alt="" className="w-5 h-25 mr-2" />
                                                <h1 className="font-semibold">Corners</h1>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-3">
                            <div className="px-8 py-4 border-l-4 border-red-800">
                                <h1 className="text-gray-700 font-semibold text-xl">Between 0 to 70</h1>
                                <div className="mt-4">
                                    <div className=" text-gray-600 font-medium mt-2 sm:space-x-32 space-x-16">
                                        <span className="bg-black-500 rounded-md text-white shadow-md px-2 py-1">0</span>
                                        <span className="bg-black-500 rounded-md text-white shadow-md px-2 py-1">{rangeValue}</span>
                                        <span className="bg-black-500 rounded-md text-white shadow-md px-2 py-1">70</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="70"
                                        value={rangeValue}
                                        onChange={handleRangeChange}
                                        className="w-72 h-2 bg-blue-800 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <p className="text-gray-700 font-semibold">Number of matches played by team</p>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-3">
                            <div className="px-8 py-4 border-l-4 border-blue-800">
                                <h1 className="text-gray-700 font-bold text-xl pb-2">Team</h1>
                                <p className="font-semibold text-gray-500 text-sm">Select the prematch stat you want to create an alert for e.g Games Played, Over / Under Occurrences, Goals Scored, etc.</p>
                                <div className="flex space-x-3">
                                    <div className="space-x-2">
                                        <input type="radio" name="team" id="home-team" />
                                        <label htmlFor="home-team" className="text-gray-700 font-semibold">Home Team</label>
                                    </div>
                                    <div className="space-x-2">
                                        <input type="radio" name="team" id="away-team" />
                                        <label htmlFor="away-team" className="text-gray-700 font-semibold">Away Team</label>
                                    </div>
                                </div>

                                <h1 className="text-gray-700 font-bold text-xl pb-2 pt-4">Form</h1>
                                <div className="flex space-x-3">

                                    <div className="space-x-2">
                                        <input type="radio" name="team" id="home-team" />
                                        <label htmlFor="home-team" className="text-gray-700 font-semibold">Home Team</label>
                                    </div>
                                    <div className="space-x-2">
                                        <input type="radio" name="team" id="away-team" />
                                        <label htmlFor="away-team" className="text-gray-700 font-semibold">Away Stats</label>
                                    </div>
                                    <div className="space-x-2">
                                        <input type="radio" name="team" id="away-team" />
                                        <label htmlFor="away-team" className="text-gray-700 font-semibold">Overall Stats</label>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="bg-blue-800 sm:px-14 px-4 py-5 my-5">
                            <div className="flex justify-between space-x-3">
                                <div className="space-y-2">
                                    <p className="text-white font-semibold">Preview</p>
                                    <p className="text-white font-semibold">Matches Played by Home Team played</p>
                                    <p className="text-white font-semibold">at Home is between 0 and 60</p>
                                </div>
                                <div className="space-x-2 flex flex-col sm:flex-row sm:space-y-0 space-y-5">
                                    <div> <button className="bg-white text-black-500 px-2 py-2 hover:bg-gray-200 flex items-center space-x-2">
                                        <span>Add New Strategy</span>
                                        <BiPlusCircle className="w-4 h-4 hidden sm:block" />
                                    </button></div>
                                    <div> <button className="bg-white text-black-500 px-2 py-2 hover:bg-gray-200">Next step</button></div>
                                </div>
                            </div>
                        </div>

                        <div className="px-2 sm:px-8 py-10">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                <div className="rounded-lg shadow-md p-5 ">
                                    <h1 className="font-semibold text-2xl pb-3">Rules Preview . 1</h1>
                                    <p className="font-semibold pb-3">⚠️ Atleast 3 rules are required
                                    </p>
                                    <p className="font-semibold pb-3">Rule 1 [Corners]</p>
                                    <div className="flex">
                                        <p>
                                            1H Corners Per Game FOR (AVG) by Either Team played Overall is between 4 and 6
                                        </p>
                                        <p>
                                            <MdDeleteForever className="w-6 h-6 text-red-700" />
                                        </p>
                                    </div>
                                    <h3 className="font-semibold text-lg py-4">Edit</h3>
                                    <Button
                                        text="Import Preset Rule"
                                        className="!bg-bluw-800 !text-white font-semibold px-8 py-2 shadow-md flex items-center space-x-2"
                                    />
                                </div>
                                <div className="rounded-lg shadow-md p-5 ">
                                    <h1 className="font-semibold text-2xl pb-3">Rules Preview . 1</h1>
                                    <p className="font-semibold pb-3">⚠️ Atleast 3 rules are required
                                    </p>
                                    <p className="font-semibold pb-3">Rule 1 [Corners]</p>
                                    <div className="flex">
                                        <p>
                                            1H Corners Per Game FOR (AVG) by Either Team played Overall is between 4 and 6
                                        </p>
                                        <p>
                                            <MdDeleteForever className="w-6 h-6 text-red-700" />
                                        </p>
                                    </div>
                                    <h3 className="font-semibold text-lg py-4">Edit</h3>
                                    <Button
                                        text="Import Preset Rule"
                                        className="!bg-bluw-800 !text-white font-semibold px-8 py-2 shadow-md flex items-center space-x-2"
                                    />
                                </div>
                                <div className="rounded-lg shadow-md p-5 ">
                                    <h1 className="font-semibold text-2xl pb-3">Rules Preview . 1</h1>
                                    <p className="font-semibold pb-3">⚠️ Atleast 3 rules are required
                                    </p>
                                    <p className="font-semibold pb-3">Rule 1 [Corners]</p>
                                    <div className="flex">
                                        <p>
                                            1H Corners Per Game FOR (AVG) by Either Team played Overall is between 4 and 6
                                        </p>
                                        <p>
                                            <MdDeleteForever className="w-6 h-6 text-red-700" />
                                        </p>
                                    </div>
                                    <h3 className="font-semibold text-lg py-4">Edit</h3>
                                    <Button
                                        text="Import Preset Rule"
                                        className="!bg-bluw-800 !text-white font-semibold px-8 py-2 shadow-md flex items-center space-x-2"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        </AuthLayout>
    )
}
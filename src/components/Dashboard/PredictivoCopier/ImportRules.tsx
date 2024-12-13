import { AuthLayout } from "@/components/Layout/layout";
import Button from "@/components/Ui/Button";
import { ToggleSwitch } from "flowbite-react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function ImportRules() {
    const [checked, setChecked] = useState(true)
    const leagues = [
        "Africa - CAF Champions League",
        "Africa - CAF Confederations Cup",
        "Africa - COSAFA U20 Championship",
        "Africa - Africa Women Cup of Nations Qualification",
        "Africa - U17 Women’s World Cup Qualification Africa",
        "Africa - African Games Women",
        "Albania - League 2 Group B",
        "Albania - 1st Division Play-offs",
        "Albania - Kampionati i Femrave",
    ];

    const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);

    const handleToggleLeague = (league: string) => {
        if (selectedLeagues.includes(league)) {
            setSelectedLeagues(selectedLeagues.filter((item) => item !== league));
        } else {
            setSelectedLeagues([...selectedLeagues, league]);
        }
    };

    const handleSelectAll = () => {
        setSelectedLeagues(leagues);
    };

    const handleUnselectAll = () => {
        setSelectedLeagues([]);
    };
    return (
        <AuthLayout>
            <div className="px-2 sm:px-16">
                <div className="bg-white">
                    <div className="px-6 py-3">
                        <div className=" px-8 py-4 relative border-l-4 border-blue-800">
                            <div className="flex justify-between">
                                <h1 className="font-bold text-xl text-gray-700" >Silex Team</h1>
                                <div className="bg-blue-800 rounded-md px-2 py-2 text-white text-xs">3 days ago</div>
                            </div>
                            <div className="py-3">

                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-3">
                        <div className=" px-8 py-4 relative border-l-4 border-blue-800">
                            <div className="flex justify-between">
                                <h1 className="font-bold text-xl text-gray-700" >Make Public</h1>
                                <ToggleSwitch
                                    checked={checked}
                                    onChange={(checked) => setChecked(checked)}
                                />
                            </div>
                            <div className="py-3">
                                <p className="sm:text-base text-xs">Making your strategy public will allow it to be found by other Predictifsport Pro users and also allows you to be able to see profitable strategies from other users.</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-3">
                        <div className=" px-8 py-4 relative border-l-4 border-blue-800">
                            <div className="flex justify-between">
                                <h1 className="font-bold text-xl text-gray-700" >Odds Required</h1>
                                <ToggleSwitch
                                    checked={checked}
                                    onChange={(checked) => setChecked(checked)}
                                />
                            </div>
                            <div className="py-3">
                                <p className="sm:text-base text-xs">Choose your preferred bookmaker to ONLY receive alerts for matches that has the odds for your set outcome. e.g if your strategy's outcome is "Over 2.5 Goals" and your selected bookie is Bet365, you will only get alerts and see matches that has Over 2.5 Goal market on bet365.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-3">
                        <div className=" px-8 py-4 relative border-l-4 border-blue-800">
                            <div className="flex justify-between">
                                <div>
                                    <h1 className="font-bold text-xl text-gray-700" >When Should the Alert Be Sent?</h1>
                                    <p className="sm:text-base text-xs">F.e. 15 mins before match starts</p>
                                </div>
                                <ToggleSwitch
                                    checked={checked}
                                    onChange={(checked) => setChecked(checked)}
                                />
                            </div>
                            <div className="py-3 space-y-3 sm:space-y-0 sm:space-x-5 flex flex-col sm:flex-row">
                                <button className="border-2 border-blue-800 px-4 py-2 text-gray-700 hover:bg-gray-300 font-semibold">15 Mins before</button>

                                <button className="border-2 border-blue-800 px-4 py-2 text-gray-700 hover:bg-gray-300 font-semibold">30 Mins before</button>
                                <button className="border-2 border-blue-800 px-4 py-2 text-gray-700 hover:bg-gray-300 font-semibold">1 hour before</button>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-3">
                        <div className=" px-8 py-4 relative border-l-4 border-blue-800">
                            <div className="flex justify-between">
                                <h1 className="font-bold text-xl text-gray-700" >League Exclusion</h1>
                                <ToggleSwitch
                                    checked={checked}
                                    onChange={(checked) => setChecked(checked)}
                                />
                            </div>
                            <div className="py-3">
                                <p className="sm:text-base text-xs">Our powerful league exclusion allows you to exclude low performing leagues from your strategy. You can either use our automatic feature or turn it off to do it manually.
                                </p>
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
                                    className="!bg-blue-800 !text-white font-semibold px-8 py-2 shadow-md flex items-center space-x-2"
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

                    <div className="px-6 py-3">
                        <div className=" px-8 py-4 relative border-l-4 border-blue-800">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-xl font-bold">Select Leagues</h1>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleUnselectAll}
                                        className="text-gray-600 hover:underline"
                                    >
                                        Unselect All
                                    </button>
                                    <button
                                        onClick={handleSelectAll}
                                        className="text-gray-600 hover:underline"
                                    >
                                        Select All
                                    </button>
                                </div>
                            </div>

                            <div className="border-t pt-4 space-y-3">
                                {leagues.map((league, index) => (
                                    <div key={index} className="flex items-center border-t-2 border-b-2 py-2 ">
                                        <input
                                            type="checkbox"
                                            id={`league-${index}`}
                                            checked={selectedLeagues.includes(league)}
                                            onChange={() => handleToggleLeague(league)}
                                            className="mr-2"
                                        />
                                        <label
                                            htmlFor={`league-${index}`}
                                            className={`text-blue-700 font-semibold `}
                                        >
                                            {league}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 text-right">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Finished
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </AuthLayout>
    )
}
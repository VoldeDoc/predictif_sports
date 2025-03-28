import CreatePlayerForm from "@/components/Dashboard/PredictivoCopier/createPlayerForm";
import { AuthLayout } from "@/components/Layout/layout";
import Button from "@/components/Ui/Button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateClubForm from "./createClubForm";
import CreateCountryForm from "./CreateCountryForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useDashBoardManagement from "@/hooks/useDashboard";
import { createStrategyValues } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    max_number: yup.string(),
    min_number: yup.string(),
    team_player: yup.string().required("Team player is required"),
    team_player_id: yup.string().required("Team player is required"),
    endDate: yup.string(),
    strategy_id: yup.number().required("Strategy ID is required"),
});

export default function UpdateStrategyPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Select an option');
    const { strategy_id } = useParams<{ strategy_id: string }>();
    const { updateStrategies, getStrategyById } = useDashBoardManagement();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<createStrategyValues>({
        resolver: yupResolver(schema),
        mode: "all",
    });
console.log(errors);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: string, id: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        setValue("team_player_id", id);
        setValue("team_player", option);
    };

    useEffect(() => {
        const fetchStrategyDetails = async () => {
            if (strategy_id) {
                try {
                    const strategyResponse = await getStrategyById(strategy_id);

                    if (strategyResponse?.[0]?.[0]) {
                        const strategyData = strategyResponse[0][0];
                        
                        setValue("strategy_id", strategyData.id);
                        setValue("name", strategyData.name || "");
                        setValue("description", strategyData.description || "");
                        setValue("min_number", strategyData.min_number || "");
                        setValue("max_number", strategyData.max_number || "");
                        setValue("team_player", strategyData.team_player || "");
                        setValue("team_player_id", strategyData.team_player_id || "");
                        setValue("endDate", strategyData.endDate?.split(" ")[0] || "");
                        setSelectedOption(strategyData.team_player || "Select an option");
                    } else {
                        console.error("Invalid response format or no data found");
                    }
                } catch (error) {
                    console.error("Error fetching strategy details:", error);
                }
            }
        };

        fetchStrategyDetails();
    }, []);

    const onSubmit: SubmitHandler<createStrategyValues> = async (data) => {
        toast.promise(
            updateStrategies(data),
            {
                pending: "Updating strategy...",
                success: {
                    render({ data }) {
                        return <div>{data as string}</div>;
                    },
                },
                error: {
                    render({ data }) {
                        return <div>{data as string}</div>;
                    },
                },
            }
        );
    };

    return (
        <AuthLayout>
            <div className="px-2 sm:px-16">
                <div className="bg-white">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="px-6 py-3">
                            <div className="px-8 py-4 relative border-l-4 border-blue-800">
                                <div className="flex justify-between">
                                    <h1 className="font-bold text-xl text-gray-700">Strategy Name</h1>
                                </div>
                                <div className="py-3">
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                        {...register("name")}
                                    />
                                    {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-3">
                            <div className="px-8 py-4 border-l-4 border-blue-800">
                                <div className="">
                                    <h1 className="font-bold text-xl text-gray-700">Description</h1>
                                </div>
                                <div className="py-3">
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                        {...register("description")}
                                    />
                                    {errors.description && <p className="text-red-600">{errors.description.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-3">
                            <div className="px-8 py-4 border-l-4 border-blue-800">
                                <div className="">
                                    <h1 className="font-bold text-xl text-gray-700">Selected Strategy</h1>
                                    <p className="font-medium text-sm text-gray-700">Select the term you want to create a strategy for e.g Club, Country, Player</p>
                                </div>
                                <div className="py-3">
                                    <button
                                        type="button"
                                        onClick={toggleDropdown}
                                        className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-left font-semibold"
                                    >
                                        {selectedOption}
                                    </button>
                                    {isOpen && (
                                        <div className="mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                            <div
                                                className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                                onClick={() => handleSelect('Country', 'country_id')}
                                            >
                                                <img
                                                    src="/assets/images/dashboard/dashboard/general 1.svg"
                                                    alt=""
                                                    className="w-5 h-5 inline-block mr-2"
                                                />
                                                <span className="font-semibold">Country</span>
                                            </div>
                                            <div
                                                className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                                onClick={() => handleSelect('Club', 'club_id')}
                                            >
                                                <img src="/assets/images/dashboard/dashboard/goals 1.svg" alt="" className="w-5 h-5 inline-block mr-2" />
                                                <h1 className="font-semibold">Club</h1>
                                            </div>
                                            <div
                                                className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                                onClick={() => handleSelect('Player', 'player_id')}
                                            >
                                                <img src="/assets/images/dashboard/dashboard/streak 1.svg" alt="" className="w-5 h-25 mr-2" />
                                                <h1 className="font-semibold">Player</h1>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {selectedOption === 'Player' && (
                            <div>
                                <CreatePlayerForm onSubmit={(id: string) => handleSelect('Player', id)} />
                            </div>
                        )}
                        {selectedOption === 'Club' && (
                            <div>
                                <CreateClubForm onSubmit={(id: string) => handleSelect('Club', id)} />
                            </div>
                        )}
                        {selectedOption === 'Country' && (
                            <div>
                                <CreateCountryForm onSubmit={(id: string) => handleSelect('Country', id)} />
                            </div>
                        )}

                        <div className="px-6 py-3">
                            <div className="px-8 py-4 border-l-4 border-red-800">
                                <div className="mt-4">
                                    <label className="block text-gray-700 font-semibold">Min Number</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="70"
                                        className="w-full h-2 bg-blue-800 rounded-lg appearance-none cursor-pointer"
                                        {...register("min_number")}
                                    />
                                    <div className="text-gray-700 font-semibold mt-2">{errors.min_number ? errors.min_number.message : null}</div>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-gray-700 font-semibold">Max Number</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="70"
                                        className="w-full h-2 bg-blue-800 rounded-lg appearance-none cursor-pointer"
                                        {...register("max_number")}
                                    />
                                    <div className="text-gray-700 font-semibold mt-2">{errors.max_number ? errors.max_number.message : null}</div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-3">
                            <div className="px-8 py-4 border-l-4 border-blue-800">
                                <label className="block text-gray-700 font-semibold">End Date</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                    {...register("endDate")}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button
                                text="Submit"
                                className="bg-blue-800 text-white px-6 py-2 rounded-md"
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}
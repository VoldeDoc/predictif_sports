import { AuthLayout } from "@/components/Layout/layout";
import Button from "@/components/Ui/Button";
import { CubeIcon } from "@heroicons/react/24/solid";
import { BiPlusCircle } from "react-icons/bi";
import { HiRectangleGroup } from "react-icons/hi2";
import { FaStopCircle, FaClock } from "react-icons/fa";
import { useState, useEffect } from "react";
import useDashBoardManagement from "@/hooks/useDashboard";
import { toast } from "react-toastify";

const tabs = [
    { key: 'all', label: 'All Strategies', icon: CubeIcon },
    { key: 'active', label: 'Active', icon: HiRectangleGroup },
    { key: 'stop', label: 'Stopped', icon: FaStopCircle },
    { key: 'expired', label: 'Expired', icon: FaClock }
];

interface Strategy {
    id: string;
    name: string;
    description: string;
    max_number: number | null;
    min_number: number | null;
    team_player_name: string;
    team_player:string;
    endDate: string;
    status: string;
}

export default function Strategies() {
    const { getMyStrategies, deleteStrategies } = useDashBoardManagement();
    const [strategies, setStrategies] = useState<Strategy[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    const fetchStrategies = async (type:string) => {
        try {
            setLoading(true);
            const data = await getMyStrategies(type);
            setStrategies(data.flat());
        } catch (error) {
            console.error('Error fetching strategies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteStrategy = async (id: string) => {
        toast.promise(
            deleteStrategies(id).then(async () => {
                await fetchStrategies(activeTab);
            }),
            {
                pending: "Deleting strategy...",
                success: "Strategy deleted successfully",
                error: "Failed to delete strategy",
            }
        );
    };

    useEffect(() => {
        fetchStrategies(activeTab);
    }, [activeTab]);

    return (
        <AuthLayout>
            <div className="px-4 sm:px-8 md:px-16">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl text-gray-700">Strategies</h1>
                    <Button
                        text="Add a New Strategy"
                        iconPosition="left"
                        icon={BiPlusCircle}
                        className="bg-blue-800 text-white py-2 px-4 rounded shadow-md flex items-center"
                        link="/predictivo-copier"
                    />
                </div>

                <div className="w-full lg:w-2/3 mt-8">
                    <div className="flex space-x-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center space-x-2 py-2 px-4 rounded ${
                                    activeTab === tab.key
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-200 text-gray-600'
                                }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="py-6">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="space-y-4">
                                {strategies.length > 0 ? (
                                    strategies.map((strategy) => (
                                        <div key={strategy.id} className="p-4 border rounded shadow-sm flex justify-between items-center">
                                            <div>
                                                <h2 className="text-lg font-semibold">{strategy.name}</h2>
                                                <p className="text-gray-600">{strategy.description}</p>
                                                <p className="text-gray-500">Max Number: {strategy.max_number || 'N/A'}</p>
                                                <p className="text-gray-500">Min Number: {strategy.min_number || 'N/A'}</p>
                                                <p className="text-gray-500">{strategy.team_player}: {strategy.team_player_name}</p>
                                                <p className="text-sm text-gray-500">End Date: {new Date(strategy.endDate).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button
                                                    text="Update"
                                                    className="bg-blue-500 text-white py-1 px-4 rounded"
                                                    link={`/user/update-strategy/${strategy.id}`}
                                                />
                                                <Button
                                                    text="Delete"
                                                    className="bg-red-500 text-white py-1 px-4 rounded"
                                                    onClick={() => handleDeleteStrategy(strategy.id)}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No strategies available.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
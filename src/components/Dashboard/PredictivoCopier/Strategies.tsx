import { AuthLayout } from "@/components/Layout/layout";
import Button from "@/components/Ui/Button";
import { CubeIcon } from "@heroicons/react/24/solid";
import { BiPlusCircle } from "react-icons/bi";
import { HiRectangleGroup } from "react-icons/hi2";
import { FaStopCircle, FaClock } from "react-icons/fa";
import { MdPerson, MdGroup, MdPublic, MdCalendarToday } from "react-icons/md"; // Icons for Team Player and Date
import { BsHash } from "react-icons/bs"; // Icon for numbers
import { useState, useEffect } from "react";
import useDashBoardManagement from "@/hooks/useDashboard";
import { toast } from "react-toastify";
import Loader from "@/pages/Ui/loader";

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
    team_player: string;
    endDate: string;
    status: string;
}

export default function Strategies() {
    const { getMyStrategies, deleteStrategies } = useDashBoardManagement();
    const [strategies, setStrategies] = useState<Strategy[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('all');

    const fetchStrategies = async (type: string) => {
        try {
            setLoading(true);
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

            const data = await getMyStrategies(type);
            clearTimeout(timeoutId);

            setStrategies(data.flat());
            setError(null);
        } catch (error) {
            if ((error as Error).name === 'AbortError') {
                setError('Request timed out. Please check your network connection.');
            } else {
                setError('Error fetching strategies. Please try again later.');
            }
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

    const renderTeamPlayerIcon = (type: string) => {
        switch (type) {
            case 'Player':
                return <MdPerson className="w-5 h-5 text-blue-500 inline-block mr-1" />;
            case 'Club':
                return <MdGroup className="w-5 h-5 text-green-500 inline-block mr-1" />;
            case 'Country':
                return <MdPublic className="w-5 h-5 text-purple-500 inline-block mr-1" />;
            default:
                return null;
        }
    };

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
                            <div className="flex justify-center items-center h-64">
                                <Loader loading={loading} color="#123abc" size={40} />
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-500">{error}</div>
                        ) : strategies.length === 0 ? (
                            <div className="text-center text-gray-500">No strategies available.</div>
                        ) : (
                            <div className="space-y-4">
                                {strategies.map((strategy) => (
                                    <div
                                        key={strategy.id}
                                        className="p-4 border rounded shadow-sm flex justify-between items-center"
                                    >
                                        <div>
                                            <h2 className="text-lg font-semibold flex items-center">
                                                <CubeIcon className="w-5 h-5 text-blue-500 mr-2" />
                                                {strategy.name}
                                            </h2>
                                            <p className="text-gray-600">{strategy.description}</p>
                                            <p className="text-gray-500 flex items-center">
                                                <BsHash className="w-5 h-5 text-gray-400 mr-2" />
                                                Max Number: {strategy.max_number || 'N/A'}
                                            </p>
                                            <p className="text-gray-500 flex items-center">
                                                <BsHash className="w-5 h-5 text-gray-400 mr-2" />
                                                Min Number: {strategy.min_number || 'N/A'}
                                            </p>
                                            <p className="text-gray-500 flex items-center">
                                                {renderTeamPlayerIcon(strategy.team_player)} {strategy.team_player}:{' '}
                                                {strategy.team_player_name}
                                            </p>
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <MdCalendarToday className="w-5 h-5 text-gray-400 mr-2" />
                                                End Date: {new Date(strategy.endDate).toLocaleDateString()}
                                            </p>
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
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
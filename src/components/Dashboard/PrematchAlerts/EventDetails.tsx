import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDashBoardManagement from "@/hooks/useDashboard";
import Card from "@/components/Ui/Card";
import Loader from "@/pages/Ui/loader";
import { AuthLayout } from "@/components/Layout/layout";

interface Event {
    id: number;
    subject_id: number;
    heading: string;
    sub_heading: string;
    sub_description: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
}

const EventDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { getNewsEventById } = useDashBoardManagement();
    const [loading, setLoading] =  useState(true)
    const [error,setError] = useState<string | null>(null);
    const [event, setEvent] = useState<Event | null>(null);
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await getNewsEventById(Number(id));
                console.log(response[0]);
                setEvent(response[0]);
                setLoading(false)
            } catch (error) {
                console.error("Failed to fetch event details:", error);
                setError('Error fetching details please refresh or check connection!')
                setLoading(false)
            }
        };

        fetchEventDetails();
    }, []);

    return (
     <AuthLayout>
           <div className="container mx-auto p-4">
            <button
                onClick={() => window.history.back()}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Back
            </button>
            {loading ? (
                <div className="flex items-center justify-center min-h-[50vh]">
                <Loader loading={loading} color="#123abc" size={40} />
                <p className="text-gray-500 text-lg ml-4">Loading event details...</p>
            </div>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <Card title="Event Details">
                    <div className="bg-gradient-to-b from-blue-300 to-blue-500 relative pb-20">
                        <div className="px-5 py-5">
                            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white">{event?.heading}</h1>
                            <h2 className="text-xl sm:text-2xl mb-2 text-white">{event?.sub_heading}</h2>
                        </div>
                    </div>
                    <div className="p-4">
                        <p className="text-lg text-gray-800 mb-4">{event?.sub_description}</p>
                        <p className="text-md text-gray-600 mb-4">{event?.description}</p>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                           <img src="/assets/images/dashboard/dashboard/download.jpg" alt="" className="w-full h-48 object-cover rounded-lg shadow-md" />
                           <img src="/assets/images/dashboard/dashboard/download.jpg" alt="" className="w-full h-48 object-cover rounded-lg shadow-md" />
                           <img src="/assets/images/dashboard/dashboard/download.jpg" alt="" className="w-full h-48 object-cover rounded-lg shadow-md" />
                       </div>
                       
                        <p className="text-xs text-gray-400 mt-4"> {new Date(event!.created_at).toLocaleDateString()}</p>
                    </div>
                </Card>
            )}
        </div>
     </AuthLayout>
    )
};

export default EventDetails;

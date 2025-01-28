import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDashBoardManagement from "@/hooks/useDashboard";
import Card from "@/components/Ui/Card";

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
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await getNewsEventById(Number(id));
        console.log(response[0]);
        
        setEvent(response[0]);
      } catch (error) {
        console.error("Failed to fetch event details:", error);
      }
    };

    fetchEventDetails();
  }, [id, getNewsEventById]);

  if (!event) {
    return (
      <Card title="Event Details">
        <div className="p-4 text-gray-500 text-center">Loading event details...</div>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => window.history.back()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back
      </button>
      <Card title="Event Details">
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">{event.heading}</h1>
          <h2 className="text-2xl text-gray-600 mb-2">{event.sub_heading}</h2>
          <p className="text-lg text-gray-800 mb-4">{event.sub_description}</p>
          <p className="text-md text-gray-600 mb-4">{event.description}</p>
          <p className="text-xs text-gray-400 mt-4">Published on: {new Date(event.created_at).toLocaleDateString()}</p>
        </div>
      </Card>
    </div>
  );
};

export default EventDetails;
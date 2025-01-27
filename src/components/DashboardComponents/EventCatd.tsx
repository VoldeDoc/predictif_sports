import { useEffect, useState } from "react";
import Card from "../Ui/Card";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import useDashBoardManagement from "@/hooks/useDashboard";
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

const EventCard: React.FC = () => {

  const {getNewsEvent} = useDashBoardManagement()
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getNewsEvent()
        const data = await response
        setEvents(data.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!events.length || isPaused) return;

    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [events, isPaused]);

  const currentEvent = events[currentEventIndex];

  const handlePrevClick = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  const handleNextClick = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  if (!events.length) {
    return (
      <Card title="Events">
        <div className="p-4 text-gray-500 text-center">No events available.</div>
      </Card>
    );
  }

  return (
    <Card title="Events">
      <div className="relative">
        {/* Previous Button */}
        <button
          onClick={handlePrevClick}
          aria-label="Previous Event"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 sm:left-1"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {/* Event Display */}
        <div
          className="transition-opacity duration-1000 opacity-100"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {currentEvent && (
            <Link to={''}>
              <div className="block p-4 border-b border-gray-200">
                <div className="items-center space-x-4 px-7 flex justify-center">
                  <div>
                    <h3 className="text-lg text-gray-600 font-semibold">{currentEvent.heading}</h3>
                    <h4 className="text-md text-gray-500">{currentEvent.sub_heading}</h4>
                    <p className="text-sm text-gray-600">{currentEvent.sub_description}</p>
                    <p className="text-sm text-gray-500 mt-2">{currentEvent.description}</p>
                    <p className="text-xs text-gray-400 mt-2">Published on: {new Date(currentEvent.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextClick}
          aria-label="Next Event"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 sm:right-1"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </Card>
  );
};

export default EventCard;
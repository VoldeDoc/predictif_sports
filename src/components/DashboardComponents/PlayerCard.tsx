import { useEffect, useState } from "react";
import Card from "../Ui/Card";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Player {
  name: string;
  photo: string;
  id: number;
  current_club_name: string;
  position: string;
  position_short: string;
}

interface PlayerCardProps {
  playersFollowed: Player[];
}

const PlayerCard: React.FC<PlayerCardProps> = ({ playersFollowed }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!playersFollowed.length || isPaused) return;

    const interval = setInterval(() => {
      setFadeState("fade-out");

      setTimeout(() => {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playersFollowed.length);
        setFadeState("fade-in");
      }, 1000); // Duration of fade-out effect
    }, 6000); // 6 seconds interval

    return () => clearInterval(interval);
  }, [playersFollowed, isPaused]);

  const currentPlayer = playersFollowed[currentPlayerIndex];

  const handlePrevClick = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex - 1 + playersFollowed.length) % playersFollowed.length);
  };

  const handleNextClick = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playersFollowed.length);
  };

  return (
    <Card title="Player">
      <div className="relative">
        <button
          onClick={handlePrevClick}
          aria-label="Previous Player"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div
          className={`transition-opacity duration-1000 ${fadeState === "fade-in" ? "opacity-100" : "opacity-0"
            }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {currentPlayer && (
            <Link to={`/user/player/${currentPlayer.id}`} className="block p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={currentPlayer.photo}
                  alt={`${currentPlayer.name} photo`}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-700">{currentPlayer.name}</span>
                  <span className="text-sm text-gray-500">{currentPlayer.current_club_name}</span>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{currentPlayer.position_short}</span>
                    <span className="text-sm text-gray-500">{currentPlayer.position}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
        <button
          onClick={handleNextClick}
          aria-label="Next Player"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </Card>
  );
};

export default PlayerCard;
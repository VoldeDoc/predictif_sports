import { useEffect, useState } from "react";
import Card from "../Ui/Card";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Club {
  id: number;
  club_name: string;
  club_id: string;
}

interface TeamCardProps {
  clubFollowed: Club[];
}

const TeamCard: React.FC<TeamCardProps> = ({ clubFollowed }) => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!clubFollowed.length || isPaused) return;

    const interval = setInterval(() => {
      setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % clubFollowed.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [clubFollowed, isPaused]);

  const currentTeam = clubFollowed[currentTeamIndex];

  const handlePrevClick = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex - 1 + clubFollowed.length) % clubFollowed.length);
  };

  const handleNextClick = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % clubFollowed.length);
  };

  if (!clubFollowed.length) {
    return (
      <Card title="Team">
        <div className="p-4 text-gray-500 text-center">No teams followed yet.</div>
      </Card>
    );
  }

  return (
    <Card title="Team">
      <div className="relative">
        {/* Previous Button */}
        <button
          onClick={handlePrevClick}
          aria-label="Previous Team"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 sm:left-1"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {/* Team Display */}
        <div
          className="transition-opacity duration-1000 opacity-100"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {currentTeam && (
            <Link to={`/user/team/${currentTeam.club_id}`} className="block p-4 border-b border-gray-200">
              <div className=" items-center space-x-4 px-7 flex  justify-center">
                <div>
                  <img
                    src={`${currentTeam.club_id}`}
                    alt={`${currentTeam.club_name} logo`}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <span className="text-lg text-gray-600 font-semibold">{currentTeam.club_name}</span>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextClick}
          aria-label="Next Team"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 sm:right-1"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </Card>
  );
};

export default TeamCard;

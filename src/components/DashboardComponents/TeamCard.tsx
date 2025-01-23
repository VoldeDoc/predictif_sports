import { useEffect, useState } from "react";
import Card from "../Ui/Card";
import { Link } from "react-router-dom";

interface Club {
    id: number;
  club_name: string;
  club_id:string;
}

interface TeamCardProps {
  clubFollowed: Club[];
}

const TeamCard: React.FC<TeamCardProps> = ({ clubFollowed }) => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!clubFollowed.length || isPaused) return;

    const interval = setInterval(() => {
      setFadeState("fade-out");

      setTimeout(() => {
        setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % clubFollowed.length);
        setFadeState("fade-in");
      }, 1000); // Duration of fade-out effect
    }, 6000); // 6 seconds interval

    return () => clearInterval(interval);
  }, [clubFollowed, isPaused]);

  const currentTeam = clubFollowed[currentTeamIndex];

  return (
    <Card title="Team">
        <div
        className={`transition-opacity duration-1000 ${
          fadeState === "fade-in" ? "opacity-100" : "opacity-0"
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {currentTeam && (
          <Link to={`/user/team/${currentTeam.club_id}`} className="block p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <img
              src={`https://api.example.com/clubs/${currentTeam.club_name}/image`}
              alt={`${currentTeam.club_name} logo`}
              className="w-6 h-6"
            />
            <span className="text-lg text-gray-500">{currentTeam.club_name}</span>
          </div></Link>
        )}
      </div>
    </Card>
  );
};

export default TeamCard;

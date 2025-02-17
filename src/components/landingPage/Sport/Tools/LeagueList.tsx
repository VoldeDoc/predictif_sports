import React from 'react';
import premierLeagueLogo from '/assets/images/landingPage/premier.svg';
import ChanpionsLeagueLogo from '/assets/images/landingPage/champions.svg';
import Ligue1Logo from '/assets/images/landingPage/ligue1.svg';
import LaligaLogo from '/assets/images/landingPage/laliga.svg';
import WorldCupLogo from '/assets/images/landingPage/worldcup.svg';

interface LeaguesListProps {
    sport: "Football" | "Basketball" | "NFL" | "Rugby" | "MLB" | "Cricket" | "F1" | "Tennis";
}

const leagues = {
    Football: [
        { name: 'Premier League', logo: premierLeagueLogo },
        { name: 'Champions League', logo: ChanpionsLeagueLogo },
        { name: 'Laliga', logo: LaligaLogo },
        { name: 'World Cup', logo: WorldCupLogo },
        { name: 'Ligue 1', logo: Ligue1Logo },
    ],
    Basketball: [
        { name: 'NBA', logo: '/assets/images/landingPage/nba.svg' },
        { name: 'EuroLeague', logo: '/assets/images/landingPage/euroleague.svg' },
        { name: 'FIBA World Cup', logo: '/assets/images/landingPage/fiba.svg' },
    ],
    NFL: [
        { name: 'NFL', logo: '/assets/images/landingPage/nfl.svg' },
    ],
    Rugby: [
        { name: 'Six Nations', logo: '/assets/images/landingPage/sixnations.svg' },
    ],
    MLB: [
        { name: 'MLB', logo: '/assets/images/landingPage/mlb.svg' },
    ],
    Cricket: [
        { name: 'ICC World Cup', logo: '/assets/images/landingPage/icc.svg' },
    ],
    F1: [
        { name: 'Formula 1', logo: '/assets/images/landingPage/f1.svg' },
    ],
    Tennis: [
        { name: 'Wimbledon', logo: '/assets/images/landingPage/wimbledon.svg' },
    ],
};

const LeaguesList: React.FC<LeaguesListProps> = ({ sport }) => {
    return (
        <div className='space-y-3 pb-3'>
            {leagues[sport]?.map((league, index) => (
                <p key={index} className="flex items-center">
                    <img src={league.logo} alt={`${league.name} Logo`} className="mr-2" />
                    {league.name}
                </p>
            ))}
        </div>
    );
};

export default LeaguesList;
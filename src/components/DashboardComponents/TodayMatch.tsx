import MatchCard from "./MatchCard";

const TodayMatches = () => {
  const matches = [
    {
      homeTeam: {
        name: "Liverpool",
        logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
        score: 2,
      },
      awayTeam: {
        name: "Arsenal",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
        score: 1,
      },
      startTime: new Date(new Date().getTime() - 3600000), // 1 hour ago (Live)
      isLive: true,
    },
    {
      homeTeam: {
        name: "Juventus",
        logo: "https://upload.wikimedia.org/wikipedia/en/1/15/Juventus_FC_2017_logo.svg",
        score: 0,
      },
      awayTeam: {
        name: "Inter Milan",
        logo: "https://upload.wikimedia.org/wikipedia/en/0/05/Inter_Milan_2021.svg",
        score: 0,
      },
      startTime: new Date(new Date().getTime() + 7200000), // 2 hours from now
      isLive: false,
    },
  ];

  return (
    <div className="space-y-4">
      {matches.map((match, index) => (
        <MatchCard key={index} match={match} />
      ))}
    </div>
  );
};

export default TodayMatches;
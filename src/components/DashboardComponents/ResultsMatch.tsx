import MatchCard from "./MatchCard";

const ResultsMatches = () => {
  const matches = [
    {
      homeTeam: {
        name: "Bayern Munich",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_München_logo_%282017%29.svg",
      },
      awayTeam: {
        name: "Borussia Dortmund",
        logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
      },
      startTime: new Date(new Date().getTime() - 3600000), // 1 hour ago
    },
    {
      homeTeam: {
        name: "PSG",
        logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
      },
      awayTeam: {
        name: "Lyon",
        logo: "https://upload.wikimedia.org/wikipedia/en/c/c6/Olympique_Lyonnais.svg",
      },
      startTime: new Date(new Date().getTime() - 7200000), // 2 hours ago
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

export default ResultsMatches;
import { useEffect, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import useDashBoardManagement from "@/hooks/useDashboard";
import 'react-toastify/dist/ReactToastify.css';

interface DropdownProps {
  label: string;
  options: { id: string; name: string; logo?: string; photo?: string }[];
  selected: string;
  onSelect: (id: string, name: string) => void;
}

const Dropdown = ({ label, options, selected, onSelect }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="w-full px-4 py-3 border rounded-lg flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setOpen(!open)}
      >
        <span>{selected || label}</span>
        <FiChevronDown className={`ml-2 transform ${open ? "rotate-180" : "rotate-0"}`} />
      </button>

      {open && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {options.map((option, index) => (
            <li
              key={option.id || `option-${index}`}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => {
                onSelect(option.id, option.name);
                setOpen(false);
              }}
            >
              {option.logo && <img src={option.logo} alt={option.name} className="w-6 h-6 mr-2" />}
              {option.photo && <img src={option.photo} alt={option.name} className="w-6 h-6 mr-2" />}
              <span>{option.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface CreatePlayerFormProps {
  onSubmit: (id: string) => void;
}

export default function CreatePlayerForm({ onSubmit }: CreatePlayerFormProps) {
  const [playerSelection, setPlayerSelection] = useState({
    country: "",
    countryId: "", 
    league: "",
    leagueId: "",  
    team: "",
    teamId: "",  
    player: "",
    playerId: "",
  });
  const [playerSelections, setPlayerSelections] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);

  const { getTeamCountry, getTeam, getTeamLeague, getPlayer, } = useDashBoardManagement();

  useEffect(() => {
    (async () => {
      try {
        const response = await getTeamCountry();
        setCountries(response);
      } catch (error) {
        console.error("Failed to fetch team country", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (playerSelection.countryId) {
      (async () => {
        try {
          const response = await getTeamLeague(playerSelection.countryId);
          setLeagues(response.flat() || []);
        } catch (error) {
          console.error("Failed to fetch leagues", error);
          setLeagues([]);
        }
      })();
    }
  }, [playerSelection.countryId]);

  useEffect(() => {
    if (playerSelection.leagueId) {
      (async () => {
        try {
          const response = await getTeam(playerSelection.leagueId);
          setTeams(response.flat() || []);
        } catch (error) {
          console.error("Failed to fetch teams", error);
          setTeams([]);
        }
      })();
    }
  }, [playerSelection.leagueId]);

  useEffect(() => {
    if (playerSelection.teamId) {
      (async () => {
        try {
          const response = await getPlayer(playerSelection.teamId);
          setPlayers(response.flat() || []);
        } catch (error) {
          console.error("Failed to fetch players", error);
          setPlayers([]);
        }
      })();
    }
  }, [playerSelection.teamId]);

  const addPlayerSelection = () => {
    if (!playerSelection.country || !playerSelection.league || !playerSelection.team || !playerSelection.player) {
      alert("Please complete the selection before proceeding.");
      return;
    }

    if (playerSelections.length >= 1) {
      alert("You can select up to 1 players only.");
      return;
    }

    setPlayerSelections([...playerSelections, playerSelection]);
    setPlayerSelection({ country: "", countryId: "", league: "", leagueId: "", team: "", teamId: "", player: "", playerId: "" });
    onSubmit(playerSelection.playerId); // Call the onSubmit prop with the selected player ID
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white  rounded-lg flex flex-col md:flex-row mb-3">
      <div className="md:w-2/3 md:pr-8">
        <h1 className="text-lg font-bold mb-6 text-gray-700">
          Select player 
        </h1>
    
          <Dropdown
            label="Select Country"
            options={countries.flat().map((country) => ({
              id: country.id,
              name: country.name,
              logo: country.logo,
            }))}
            selected={playerSelection.country}
            onSelect={(id, name) => {
              setPlayerSelection({
                ...playerSelection,
                country: name,
                countryId: id,
                league: "",
                leagueId: "",
                team: "",
                teamId: "",
                player: "",
                playerId: "",
              });
            }}
          />

          <Dropdown
            label="Select League"
            options={leagues.map((league) => ({
              id: league.id,
              name: league.name,
              logo: league.logo,
            }))}
            selected={playerSelection.league}
            onSelect={(id, name) => {
              setPlayerSelection({
                ...playerSelection,
                league: name,
                leagueId: id,
                team: "",
                teamId: "",
                player: "",
                playerId: "",
              });
            }}
          />

          <Dropdown
            label="Select Team"
            options={teams.map((team) => ({
              id: team.id,
              name: team.name,
              logo: team.logo,
            }))}
            selected={playerSelection.team}
            onSelect={(id, name) => {
              setPlayerSelection({
                ...playerSelection,
                team: name,
                teamId: id,
                player: "",
                playerId: "",
              });
            }}
          />

          <Dropdown
            label="Select Player"
            options={players.map((player) => ({
              id: player.id,
              name: player.name,
              photo: player.photo,
            }))}
            selected={playerSelection.player}
            onSelect={(id, name) => {
              setPlayerSelection({
                ...playerSelection,
                player: name,
                playerId: id,
              });
            }}
          />

          <button
            type="button"
            onClick={addPlayerSelection}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 mt-6"
          >
            Next
          </button>
        
      </div>

      <div className="md:w-1/3 mt-8 md:mt-0">
        <h2 className="text-2xl font-semibold mb-4">Selected Player</h2>
        <div className="space-y-4">
          {playerSelections.map((selection, index) => {
            const playerInfo = players.find((player) => player.id === selection.playerId);
            return (
              <div key={index} className="relative p-4 bg-gray-100 rounded-lg shadow-md flex items-center space-x-4">
                {playerInfo?.photo && (
                  <img src={playerInfo.photo} alt={selection.player} className="w-12 h-12 rounded-full" />
                )}
                <div className="text-lg font-medium">{selection.player}</div>
                <button
                  type="button"
                  onClick={() => setPlayerSelections(playerSelections.filter((_, i) => i !== index))}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                >
                  <FiX size={20} />
                </button>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
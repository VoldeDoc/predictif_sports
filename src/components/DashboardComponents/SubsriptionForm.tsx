import { useEffect, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import { AuthLayout } from "../Layout/layout";
import useDashBoardManagement from "@/hooks/useDashboard";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useJoyride from "../Ui/JoyRide";

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

export default function SubscriptionFormTeam() {
  const [teamSelection, setTeamSelection] = useState({
    country: "",
    countryId: "",
    league: "",
    leagueId: "",
    team: "",
    teamId: "",
  });
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
  const [teamSelections, setTeamSelections] = useState<any[]>([]);
  const [playerSelections, setPlayerSelections] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);

  const { getTeamCountry, getTeam, getTeamLeague, submmitClub, getPlayer, submitPlayer } = useDashBoardManagement();

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
    if (teamSelection.countryId || playerSelection.countryId) {
      (async () => {
        try {
          const response = await getTeamLeague(teamSelection.countryId || playerSelection.countryId);
          setLeagues(response.flat() || []);
        } catch (error) {
          console.error("Failed to fetch leagues", error);
          setLeagues([]);
        }
      })();
    }
  }, [teamSelection.countryId, playerSelection.countryId]);

  useEffect(() => {
    if (teamSelection.leagueId || playerSelection.leagueId) {
      (async () => {
        try {
          const response = await getTeam(teamSelection.leagueId || playerSelection.leagueId);
          setTeams(response.flat() || []);
        } catch (error) {
          console.error("Failed to fetch teams", error);
          setTeams([]);
        }
      })();
    }
  }, [teamSelection.leagueId, playerSelection.leagueId]);

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

  const addTeamSelection = () => {
    if (!teamSelection.country || !teamSelection.league || !teamSelection.team) {
      alert("Please complete the selection before proceeding.");
      return;
    }

    if (teamSelections.length >= 5) {
      alert("You can select up to 5 teams only.");
      return;
    }

    setTeamSelections([...teamSelections, teamSelection]);
    setTeamSelection({ country: "", countryId: "", league: "", leagueId: "", team: "", teamId: "" });
  };

  const addPlayerSelection = () => {
    if (!playerSelection.country || !playerSelection.league || !playerSelection.team || !playerSelection.player) {
      alert("Please complete the selection before proceeding.");
      return;
    }

    if (playerSelections.length >= 5) {
      alert("You can select up to 5 players only.");
      return;
    }

    setPlayerSelections([...playerSelections, playerSelection]);
    setPlayerSelection({ country: "", countryId: "", league: "", leagueId: "", team: "", teamId: "", player: "", playerId: "" });
  };

  const handleSubmitTeams = async () => {
    if (teamSelections.length === 0) {
      alert("Please select at least one team.");
      return;
    }

    const teamIds = teamSelections.map(selection => selection.teamId);
    const payload = {
      club: JSON.stringify(teamIds)
    };

    toast.promise(
      submmitClub(payload),
      {
        pending: 'Submitting...',
        success: 'Teams submitted successfully!',
        error: 'Failed to submit teams'
      }
    );
  };

  const handleSubmitPlayers = async () => {
    if (playerSelections.length === 0) {
      alert("Please select at least one player.");
      return;
    }

    const playerIds = playerSelections.map(selection => selection.playerId);
    const formattedPlayerIds = `['${playerIds.join("','")}']`;
    const payload = {
      players: formattedPlayerIds
    };
    const clubId = playerSelections[0]?.teamId;
    if (!clubId) {
      alert("Club ID is missing.");
      return;
    }
    toast.promise(
      submitPlayer(clubId, payload),
      {
        pending: 'Submitting...',
        success: 'Players submitted successfully!',
        error: 'Failed to submit players'
      }
    );
  };

  const steps = [
    {
      target: '.team-dropdown',
      content: 'Select the football teams you wish to follow to update your dashboard',
    },
    {
      target: '.team-button',
      content: 'Click here to add the selected team to your list.',
    },
    {
      target: '.selected-teams',
      content: 'Here are the teams you have selected. You can remove any team if needed.',
    },
    {
      target: '.submit-teams',
      content: 'Click here to submit your selected teams.',
    },
    {
      target: '.player-dropdown',
      content: 'Select the football players you wish to follow to update your dashboard',
    },
    {
      target: '.selected-players',
      content: 'Here are the players you have selected. You can remove any player if needed.',
    },
    {
      target: '.player-button',
      content: 'Click here to add another player to your list'
    },
    {
      target: '.submit-players',
      content: 'Note only click here when done with all selection.',
    },
  ];
  const { JoyrideComponent } = useJoyride(steps);

  return (
    <AuthLayout>
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg flex flex-col md:flex-row mb-20">
        <div className="md:w-2/3 md:pr-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-700">
            Select Football Teams To Follow
          </h1>

          <form className="space-y-8">
            <div className="team-dropdown">
              <Dropdown
                label="Select Country"
                options={countries.flat().map((country) => ({
                  id: country.id,
                  name: country.name,
                  logo: country.logo,
                }))}
                selected={teamSelection.country}
                onSelect={(id, name) => {
                  setTeamSelection({
                    ...teamSelection,
                    country: name,
                    countryId: id,
                    league: "",
                    leagueId: "",
                    team: "",
                    teamId: "",
                  });
                }}
              />
            </div>

            <Dropdown
              label="Select League"
              options={leagues.map((league) => ({
                id: league.id,
                name: league.name,
                logo: league.logo,
              }))}
              selected={teamSelection.league}
              onSelect={(id, name) => {
                setTeamSelection({
                  ...teamSelection,
                  league: name,
                  leagueId: id,
                  team: "",
                  teamId: "",
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
              selected={teamSelection.team}
              onSelect={(id, name) => {
                setTeamSelection({
                  ...teamSelection,
                  team: name,
                  teamId: id,
                });
              }}
            />

            <button
              type="button"
              onClick={addTeamSelection}
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 mt-6 team-button"
            >
              Next
            </button>
          </form>
        </div>

        <div className="md:w-1/3 mt-8 md:mt-0 selected-teams">
          <h2 className="text-2xl font-semibold mb-4">Selected Teams</h2>
          <div className="space-y-4">
            {teamSelections.map((selection, index) => {
              const teamInfo = teams.find((team) => team.id === selection.teamId);
              return (
                <div key={index} className="relative p-4 bg-gray-100 rounded-lg shadow-md flex items-center space-x-4">
                  {teamInfo?.logo && (
                    <img src={teamInfo.logo} alt={selection.team} className="w-12 h-12 rounded-full" />
                  )}
                  <span className="text-lg font-medium">{selection.team}</span>
                  <button
                    type="button"
                    onClick={() => setTeamSelections(teamSelections.filter((_, i) => i !== index))}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            onClick={handleSubmitTeams}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 mt-6 submit-teams"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg flex flex-col md:flex-row mb-20">
        <div className="md:w-2/3 md:pr-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-700">
            Select Football Players To Follow
          </h1>
          <form className="space-y-8">
            <div className="player-dropdown">
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
            </div>

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
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 mt-6 player-button" 
            >
              Next
            </button>
          </form>
        </div>

        <div className="md:w-1/3 mt-8 md:mt-0 selected-players">
          <h2 className="text-2xl font-semibold mb-4">Selected Players</h2>
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
          <button
            type="button"
            onClick={handleSubmitPlayers}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 mt-6 submit-players"
          >
            Submit
          </button>
        </div>
        {/* Joyride Component */}
        {JoyrideComponent}
      </div>
    </AuthLayout>
  );
}
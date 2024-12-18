import { useEffect, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import { AuthLayout } from "../Layout/layout";
import useDashBoardManagement from "@/hooks/useDashboard";

interface DropdownProps {
  label: string;
  options: { id: string; name: string; logo?: string }[];
  selected: string;
  onSelect: (value: string) => void;
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
                onSelect(option.name);
                setOpen(false);
              }}
            >
              {option.logo && <img src={option.logo} alt={option.name} className="w-6 h-6 mr-2" />}
              <span>{option.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function SubscriptionFormTeam() {
  const [currentSelection, setCurrentSelection] = useState({
    country: "",
    league: "",
    team: "",
  });
  const [teamSelections, setTeamSelections] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);

  const { getTeamCountry, getTeam, getTeamLeague } = useDashBoardManagement();

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
    if (currentSelection.country) {
      (async () => {
        try {
          const response = await getTeamLeague(currentSelection.country);
          console.log("Leagues:", response);
          setLeagues(response || []);
        } catch (error) {
          console.error("Failed to fetch leagues", error);
          setLeagues([]);
        }
      })();
    }
  }, [currentSelection.country]);

  useEffect(() => {
    if (currentSelection.league) {
      (async () => {
        try {
          const response = await getTeam(currentSelection.league);
          console.log("Teams:", response);
          setTeams(response || []);
        } catch (error) {
          console.error("Failed to fetch teams", error);
          setTeams([]);
        }
      })();
    }
  }, [currentSelection.league]);

  const addTeamSelection = () => {
    if (!currentSelection.country || !currentSelection.league || !currentSelection.team) {
      alert("Please complete the selection before proceeding.");
      return;
    }

    if (teamSelections.length >= 5) {
      alert("You can select up to 5 teams only.");
      return;
    }

    setTeamSelections([...teamSelections, currentSelection]);
    setCurrentSelection({ country: "", league: "", team: "" });
  };

  return (
    <AuthLayout>
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        <div className="md:w-2/3 md:pr-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-700">
            Select Football Teams To Follow
          </h1>

          <form className="space-y-8">
            <Dropdown
              label="Select Country"
              options={countries.flat().map((country) => ({
                id: country.id,
                name: country.name,
                logo: country.logo,
              }))}
              selected={currentSelection.country}
              onSelect={(value) => setCurrentSelection({ ...currentSelection, country: value, league: "", team: "" })}
            />

            <Dropdown
              label="Select League"
              options={leagues.map((league) => ({ id: league.id, name: league.name }))}
              selected={currentSelection.league}
              onSelect={(value) => setCurrentSelection({ ...currentSelection, league: value, team: "" })}
            />

            <Dropdown
              label="Select Team"
              options={teams.map((team) => ({ id: team.id, name: team.name, logo: team.logo }))}
              selected={currentSelection.team}
              onSelect={(value) => setCurrentSelection({ ...currentSelection, team: value })}
            />

            <button
              type="button"
              onClick={addTeamSelection}
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 mt-6"
            >
              Next
            </button>
          </form>
        </div>

        <div className="md:w-1/3 mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Selected Teams</h2>
          <div className="space-y-4">
            {teamSelections.map((selection, index) => {
              const teamInfo = teams.find((team) => team.name === selection.team);
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
        </div>
      </div>
    </AuthLayout>
  );
}

export default SubscriptionFormTeam;
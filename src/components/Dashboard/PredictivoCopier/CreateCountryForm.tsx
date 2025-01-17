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

interface CreateCountryFormProps {
  onSubmit: (id: string, name: string) => void;
}

export default function CreateCountryForm({ onSubmit }: CreateCountryFormProps) {
  const [countrySelection, setCountrySelection] = useState({
    country: "",
    countryId: "",
  });
  const [countrySelections, setCountrySelections] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);

  const { getTeamCountry } = useDashBoardManagement();

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

  const addCountrySelection = () => {
    if (countrySelections.length >= 1) {
      alert("You can select only 1 country.");
      return;
    }

    setCountrySelections([...countrySelections, countrySelection]);
    setCountrySelection({ country: "", countryId: "" });
    onSubmit(countrySelection.countryId, countrySelection.country); // Call the onSubmit prop with the selected country ID and name
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg flex flex-col md:flex-row">
      <div className="md:w-2/3 md:pr-8">
        <h1 className="text-lg font-bold mb-6 text-gray-700">
          Select Country
        </h1>

        <Dropdown
          label="Select Country"
          options={countries.flat().map((country) => ({
            id: country.id,
            name: country.name,
            logo: country.logo,
          }))}
          selected={countrySelection.country}
          onSelect={(id, name) => {
            setCountrySelection({
              ...countrySelection,
              country: name,
              countryId: id,
            });
          }}
        />
        <button
          type="button"
          onClick={addCountrySelection}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 mt-6"
        >
          Next
        </button>
      </div>

      <div className="md:w-1/3 mt-8 md:mt-0">
        <h2 className="text-md font-semibold mb-4">Selected Country</h2>
        <div className="space-y-4">
          {countrySelections.map((selection, index) => {
            const countryInfo = countries.find((country) => country.id === selection.countryId);
            return (
              <div key={index} className="relative p-4 bg-gray-100 rounded-lg shadow-md flex items-center space-x-4">
                {countryInfo?.logo && (
                  <img src={countryInfo.logo} alt={selection.country} className="w-12 h-12 rounded-full" />
                )}
                <span className="text-lg font-medium">{selection.country}</span>
                <button
                  type="button"
                  onClick={() => setCountrySelections(countrySelections.filter((_, i) => i !== index))}
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
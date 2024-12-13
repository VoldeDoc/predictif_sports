import { AuthLayout } from "@/components/Layout/layout";
import { useState, ReactNode } from "react";
import { FaChevronDown, FaChevronRight, FaFlag, FaDice, FaChartLine, FaCogs } from "react-icons/fa";
import { IoFootballOutline } from "react-icons/io5";

const Dropdown = ({ label, icon, children }: { label: string; icon: ReactNode; children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between bg-blue-700 text-white px-4 py-2 rounded w-full ${isOpen ? 'bg-gray-400' : ''}`}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-2">{label}</span>
        </div>
        {isOpen ? <FaChevronDown /> : <FaChevronRight />}
      </button>
      {isOpen && (
        <div className="mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

export default function PresetRules() {
  return (
    <AuthLayout>
      <div className="sm:px-16 px-8">
        <h1 className="text-2xl font-bold mb-4">Select Preset Rules</h1>
        
        <Dropdown label="Goals" icon={<IoFootballOutline />}>
          <div className="flex flex-col p-4 bg-blue-50">
            <label className="inline-flex items-center mt-2">
              <input type="radio" className="form-radio" name="goals" value="high_2.5_away" />
              <span className="ml-2">High 2.5+ Goals Last 5 Matches (Away)</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input type="radio" className="form-radio" name="goals" value="high_2.5_home" />
              <span className="ml-2">High 2.5+ Goals Last 5 Matches (Home)</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input type="radio" className="form-radio" name="goals" value="high_2.5_both" />
              <span className="ml-2">High 2.5+ Goals Last 5 Matches (Both Teams)</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input type="radio" className="form-radio" name="goals" value="team_2_first_half" />
              <span className="ml-2">1 Team Has 2+ 1st Half Goal</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input type="radio" className="form-radio" name="goals" value="away_1_first_half" />
              <span className="ml-2">Away Team Has 1+ 1st Half Goals</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input type="radio" className="form-radio" name="goals" value="home_1_first_half" />
              <span className="ml-2">Home Team Has 1+ 1st Half Goals</span>
            </label>
          </div>
        </Dropdown>

        <Dropdown label="Corners" icon={<FaFlag />}>
          <div className="p-4">
            <span className="font-semibold">Corners Option 1</span>
          </div>
          <div className="p-4">
            <span className="font-semibold">Corners Option 2</span>
          </div>
        </Dropdown>

        <Dropdown label="Odds" icon={<FaDice />}>
          <div className="p-4">
            <span className="font-semibold">Odds Option 1</span>
          </div>
          <div className="p-4">
            <span className="font-semibold">Odds Option 2</span>
          </div>
        </Dropdown>

        <Dropdown label="Probability" icon={<FaChartLine />}>
          <div className="p-4">
            <span className="font-semibold">Probability Option 1</span>
          </div>
          <div className="p-4">
            <span className="font-semibold">Probability Option 2</span>
          </div>
        </Dropdown>

        <Dropdown label="Misc" icon={<FaCogs />}>
          <div className="p-4">
            <span className="font-semibold">Misc Option 1</span>
          </div>
          <div className="p-4">
            <span className="font-semibold">Misc Option 2</span>
          </div>
        </Dropdown>

        <div className="mt-6 flex justify-end space-x-5">
          <button className="bg-black-500 text-white px-4 py-2 rounded">Cancel</button>
          <button className="bg-blue-800 text-white px-4 py-2 rounded" onClick={() => window.location.href = '/user/import-rules'}>Import Rules</button>
        </div>
      </div>
    </AuthLayout>
  );
}
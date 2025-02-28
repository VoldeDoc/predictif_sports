import React from 'react';
import { useSquad } from '../context/squadContext';
import { formations } from '../data/formations';
const FormationSelector: React.FC = () => {
  const { changeFormation, squad } = useSquad();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold mb-3">Formation</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {formations.map((formation) => (
          <button
            key={formation.name}
            className={`py-2 px-3 rounded-lg text-center transition-colors ${
              squad.formation.name === formation.name
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
            onClick={() => changeFormation(formation)}
          >
            <span className="font-semibold">{formation.name}</span>
            <div className="text-xs mt-1">
              {formation.structure.DEF}-{formation.structure.MID}-{formation.structure.FWD}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormationSelector;
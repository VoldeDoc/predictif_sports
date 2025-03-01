import React from 'react';
import FormationSelector from './FormationSelector';
import FieldView from './FieldView';
import SubstitutesList from './SubstituteList';
// import { useSquad } from '../context/squadContext';

const Gameweek: React.FC = () => {
//   const { isMatchdayReady, simulateGameweek } = useSquad();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Gameweek Selection</h1>
            </div>
            {/* <div>
              {isMatchdayReady() && (
                <button 
                  onClick={simulateGameweek}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Simulate Gameweek
                </button>
              )}
            </div> */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <FormationSelector />
            <FieldView />
          </div>

          <div className="w-full lg:w-1/3 order-first lg:order-last">
            <SubstitutesList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gameweek;
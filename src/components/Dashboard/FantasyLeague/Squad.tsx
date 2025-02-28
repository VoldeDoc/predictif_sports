import { useState } from 'react';
import { Trophy, Users, ListFilter, Save } from 'lucide-react';
import { SquadProvider, useSquad } from './context/squadContext';
import SquadView from './squad/SquadView';
import PlayersList from './squad/PlayersList';
import SquadStats from './squad/SquadStats';
import FormationSelector from './squad/FormationSelector';
import { players } from './data/players';
import Gameweek from './squad/GameWeekSquad';

function Squad() {
  const [activeTab, setActiveTab] = useState<'squad' | 'players' | 'matchweek' | 'gameweek'>('squad');
  const { isSquadComplete } = useSquad();

  return (
    <SquadProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-indigo-700 text-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Trophy size={28} className="mr-2" />
                <h1 className="text-2xl font-bold">Fantasy League</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md mb-4">
                <div className="flex">
                  <button
                    className={`flex-1 py-3 px-4 text-center font-medium ${
                      activeTab === 'squad'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('squad')}
                  >
                    <div className="flex items-center justify-center">
                      <Users size={18} className="mr-2" />
                      My Squad
                    </div>
                  </button>
                  <button
                    className={`flex-1 py-3 px-4 text-center font-medium ${
                      activeTab === 'players'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('players')}
                  >
                    <div className="flex items-center justify-center">
                      <ListFilter size={18} className="mr-2" />
                      Player List
                    </div>
                  </button>
                  {isSquadComplete() && (
                    <button
                      className={`flex-1 py-3 px-4 text-center font-medium ${
                        activeTab === 'matchweek'
                          ? 'text-indigo-600 border-b-2 border-indigo-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab('matchweek')}
                    >
                      <div className="flex items-center justify-center">
                        <ListFilter size={18} className="mr-2" />
                        Matchweek Squad
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {activeTab === 'matchweek' ? (
                <>
                  <FormationSelector />
                  <SquadView viewMode="squad" />
                  <div className="flex justify-center py-4">
                    <button
                      onClick={() => setActiveTab('gameweek')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Save size={18} />
                      <span>Save Data & Proceed to Gameweek</span>
                    </button>
                  </div>
                </>
              ) : activeTab === 'players' ? (
                <PlayersList players={players} />
              ) : activeTab === 'gameweek' ? (
                <Gameweek />
              ) : (
                <div className="space-y-4">
                  <SquadView viewMode="squad" />
                  {isSquadComplete() && (
                    <div className="flex justify-center py-4">
                      <button
                        onClick={() => setActiveTab('matchweek')}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <Save size={18} />
                        <span>Save Selected Squad & Continue to Matchweek</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/3">
              <SquadStats />
              {activeTab === 'matchweek' && (
                <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                  <h2 className="text-lg font-semibold mb-3">Matchweek Selection</h2>
                  <ul className="list-disc pl-4 space-y-2 text-gray-600">
                    <li>Choose your formation</li>
                    <li>Select your starting XI</li>
                    <li>Arrange your substitutes</li>
                    <li>Pick a captain</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SquadProvider>
  );
}

export default Squad;
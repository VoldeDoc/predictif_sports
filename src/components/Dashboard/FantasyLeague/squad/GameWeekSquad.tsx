import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, RefreshCw, AlertTriangle, } from 'lucide-react';
import FormationSelector from './FormationSelector';
import FieldView from './FieldView';
import SubstitutesList from './SubstituteList';
import { useSquad } from '../context/squadContext';
import { useViewContext } from '../FantasyLeague';
import { toast } from 'react-toastify';
import useDashBoardManagement from '@/hooks/useDashboard';

const Gameweek: React.FC = () => {
  const { isMatchdayReady, syncSquadWithAPIPlayers, squad,getMatchdayPlayers } = useSquad();
  const { setActiveTab } = useViewContext();
  const { getFantasySquadPlayers, getMatchDay,setFormation,setSquad } = useDashBoardManagement();

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [squadPlayers, setSquadPlayers] = useState<any[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [matchdayData, setMatchdayData] = useState<any>(null)

  useEffect(() => {
    const fetchSquadPlayers = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);

        const rawData = await getFantasySquadPlayers();
        console.log("Raw API response:", rawData);

        // Check if the data is nested in arrays and flatten it if needed
        const playersData = Array.isArray(rawData[0]) ? rawData[0] : rawData;

        if (playersData && Array.isArray(playersData) && playersData.length > 0) {
          console.log("Processed players data:", playersData.length, "players");
          setSquadPlayers(playersData);


          // Make sure the function exists before calling it
          if (typeof syncSquadWithAPIPlayers === 'function') {
            // Pass the flattened/processed data to the sync function
            syncSquadWithAPIPlayers(playersData);
            console.log("Sync function called with processed players data");
          } else {
            console.error("syncSquadWithAPIPlayers is not a function:", syncSquadWithAPIPlayers);
          }
        } else {
          console.warn("No valid players data returned from API:", playersData);
          setFetchError("No players found in your fantasy squad. Please create your squad first.");
        }
      } catch (error) {
        console.error("Error fetching squad players:", error);
        setFetchError("Failed to load your fantasy squad. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSquadPlayers();
  }, []);

  useEffect(() => {
    const fetchMatchdayData = async () => {
      try {
        const matchdayData = await getMatchDay();
        console.log(matchdayData[0]);
        
        setMatchdayData(matchdayData[0])
      } catch (error) {
        
        console.error("Error fetching matchday data:", error);
      }
    };

    fetchMatchdayData();
  }
    , []);

 

  

  const saveFormation =  async () => {
    if(!matchdayData) {
      toast.error("Matchday Data not available")
      return
    }

   try {
      const formationString = `${squad.formation.structure.DEF}-${squad.formation.structure.MID}-${squad.formation.structure.FWD}`;
      await setFormation({
        id: matchdayData?.id,
        formation: formationString
      })
      
      toast.success("Formation saved successfully!");
    } catch(error) {
      console.error("Error saving formation:", error);
      toast.error("Failed to save formation. Please try again.");
    }
  }
  const saveSquad = async () => {
    if (!matchdayData) {
      toast.error("Matchday Data not available")
      return
    }
  
    try {
      // Get players who are on the field (starters) from getMatchdayPlayers
      const fieldPlayers = getMatchdayPlayers();
      
      if (fieldPlayers.length < 11) {
        toast.error("You must select 11 starting players");
        return;
      }
      
      // Show a loading toast
      const loadingToastId = toast.loading(`Saving squad (0/${fieldPlayers.length})...`);
      
      // Save each player individually
      let successCount = 0;
      
      for (let i = 0; i < fieldPlayers.length; i++) {
        const player = fieldPlayers[i];
        
        try {
          // Update loading toast
          toast.update(loadingToastId, { 
            render: `Saving squad (${i+1}/${fieldPlayers.length})...`
          });
          
          // Save individual player
          await setSquad({
            game_id: matchdayData?.game_id,
            player_squad_id: player.id.toString()
          });
          
          successCount++;
        } catch (playerError) {
          console.error(`Error saving player ${player.name}:`, playerError);
        }
      }
      
      // Close loading toast
      toast.dismiss(loadingToastId);
      
      // Show appropriate completion message
      if (successCount === fieldPlayers.length) {
        toast.success("All players saved successfully!");
      } else if (successCount > 0) {
        toast.warning(`Saved ${successCount} out of ${fieldPlayers.length} players.`);
      } else {
        toast.error("Failed to save any players. Please try again.");
      }
      
    } catch(error) {
      console.error("Error saving squad:", error);
      toast.error("Failed to save squad. Please try again.");
    }
  }

  const handleSaveSelection = async () => {
    if (!isMatchdayReady()) {
      toast.error("Please complete your team selection before saving");
      return;
    }
    setIsSaving(true);
  
    try {
      // First save the formation
      await saveFormation();
  
      // Then save the squad (individual players)
      await saveSquad();
      
      toast.success("Squad selection saved successfully!");
  
      // Then navigate directly to the Points tab
      setActiveTab("Points");
      localStorage.setItem('fantasyActiveTab', "Points");
    } catch (error) {
      console.error("Error saving selection:", error);
      toast.error("Failed to save your selection. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  const goToTransfers = () => {
  // Navigate to transfers tab
    setActiveTab("Transfers");
    localStorage.setItem('fantasyActiveTab', "Transfers");
  };

  // If still loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Your Squad</h2>
          <p className="text-gray-500 mt-2">Please wait while we fetch your fantasy team...</p>
        </div>
      </div>
    );
  }

  // If there was an error fetching the squad
  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <AlertTriangle size={48} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Squad Not Found</h2>
          <p className="text-gray-600 mb-4">{fetchError}</p>
          <button
            onClick={goToTransfers}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
          >
            Go to Transfers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Gameweek Selection</h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={goToTransfers}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                <span>Transfers</span>
              </button>
              <button
                onClick={handleSaveSelection}
                disabled={isSaving || !isMatchdayReady()}
                className={`flex items-center ${isMatchdayReady()
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400"
                  } text-white px-4 py-2 rounded-md transition-all`}
              >
                {isSaving ? (
                  <>
                    <span className="mr-2">Saving...</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    <span>Save & View Points</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Squad Summary Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded shadow">
          <div className="flex">
            <div className="flex-shrink-0">
              <RefreshCw className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                {squadPlayers.length > 0 ? (
                  <>
                    You have {squadPlayers.length} players in your fantasy squad. Select your starting lineup and
                    <button
                      onClick={goToTransfers}
                      className="mx-1 font-medium text-blue-800 underline"
                    >
                      make transfers
                    </button>
                    if needed.
                  </>
                ) : (
                  <>
                    You need to build your squad first. Visit the
                    <button
                      onClick={goToTransfers}
                      className="mx-1 font-medium text-blue-800 underline"
                    >
                      Transfers
                    </button>
                    page to add players to your team.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out ${isMatchdayReady() ? "w-full" : "w-1/2"
                }`}
            ></div>
          </div>
          <p className="text-right text-sm text-gray-600 mt-1">
            {isMatchdayReady()
              ? "Team selection complete! Create a matchday to save your squad."
              : "Complete your team selection to proceed"}
          </p>
        </div>

        {/* Pass the API fetched players to your components */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <FormationSelector />
            <FieldView />
          </div>

          <div className="w-full lg:w-1/3 order-first lg:order-last">
            <SubstitutesList />

            {/* Transfer Call-to-Action Card */}
            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
              <h3 className="font-semibold text-lg mb-2">Need Different Players?</h3>
              <p className="text-gray-600 mb-3">
                You can make changes to your squad in the transfers page before finalizing your gameweek selection.
              </p>
              <button
                onClick={goToTransfers}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex justify-center items-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                <span>Go to Transfers</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating action buttons for mobile */}
        {/* <div className="fixed bottom-6 right-6 flex flex-col space-y-3 lg:hidden">
          <button
            onClick={goToTransfers}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          >
            <RefreshCw className="h-6 w-6" />
          </button>
          <button
            onClick={handleSubmitMatchday}
            disabled={isCreatingMatchday || !isMatchdayReady() || !gameWeek || !gameDate}
            className={`${isMatchdayReady() && gameWeek && gameDate && !isCreatingMatchday
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400"
              } text-white p-4 rounded-full shadow-lg flex items-center justify-center`}
          >
            {isCreatingMatchday ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <Save className="h-6 w-6" />
            )}
          </button>
        </div> */}
      </main>
    </div>
  );
};

export default Gameweek;
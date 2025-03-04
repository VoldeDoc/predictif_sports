import React, { useState } from 'react';
import { CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import FormationSelector from './FormationSelector';
import FieldView from './FieldView';
import SubstitutesList from './SubstituteList';
import { useSquad } from '../context/squadContext';
import { useViewContext } from '../FantasyLeague';
import { toast } from 'react-toastify';

const Gameweek: React.FC = () => {
  const { isMatchdayReady } = useSquad();
  const { setActiveTab, setShowGameweek } = useViewContext();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSelection = () => {
    if (!isMatchdayReady()) {
      toast.error("Please complete your team selection before saving");
      return;
    }

    setIsSaving(true);
    
    // Simulate saving process (you can replace with actual API call)
    setTimeout(() => {
      toast.success("Squad selection saved successfully!");
      setIsSaving(false);
      
      // First set showGameweek to false so they can't go back and make changes
      setShowGameweek(false);
      
      // Then navigate directly to the Points tab
      setActiveTab("Points");
      localStorage.setItem('fantasyActiveTab', "Points");
    }, 1000);
  };

  const goToTransfers = () => {
    // Navigate to transfers tab
    setActiveTab("Transfers");
    localStorage.setItem('fantasyActiveTab', "Transfers");
  };

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
                className={`flex items-center ${
                  isMatchdayReady() 
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
        {/* Transfer Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded shadow">
          <div className="flex">
            <div className="flex-shrink-0">
              <RefreshCw className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Need to make changes to your squad? Visit the 
                <button 
                  onClick={goToTransfers} 
                  className="mx-1 font-medium text-blue-800 underline"
                >
                  Transfers
                </button> 
                page to buy or sell players before finalizing your selection.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out ${
                isMatchdayReady() ? "w-full" : "w-1/2"
              }`} 
            ></div>
          </div>
          <p className="text-right text-sm text-gray-600 mt-1">
            {isMatchdayReady() 
              ? "Team selection complete! Save to lock in your squad and view points." 
              : "Complete your team selection to proceed"}
          </p>
        </div>

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
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3 lg:hidden">
          <button 
            onClick={goToTransfers}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          >
            <RefreshCw className="h-6 w-6" />
          </button>
          <button 
            onClick={handleSaveSelection}
            disabled={isSaving || !isMatchdayReady()}
            className={`${
              isMatchdayReady() 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-gray-400"
            } text-white p-4 rounded-full shadow-lg flex items-center justify-center`}
          >
            {isSaving ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <CheckCircle className="h-6 w-6" />
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Gameweek;
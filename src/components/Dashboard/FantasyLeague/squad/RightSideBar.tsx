import { useSquad } from "../context/squadContext";
import SquadStats from "./SquadStats";

interface RightSidebarProps {
    activeTab: 'season' | 'gameweek';
  }
  
 export const RightSidebar: React.FC<RightSidebarProps> = ({ activeTab }) => {
    const { isSquadComplete } = useSquad();
  
    return (
      <div className="w-full lg:w-1/3 space-y-4">
        <SquadStats />
        
        {activeTab === 'season' ? (
          !isSquadComplete() && (
            <div className="bg-amber-50 text-amber-700 p-4 rounded-lg">
              <p className="font-medium">Complete your squad first!</p>
              <p className="text-sm mt-1">
                You need 2 goalkeepers, 5 defenders, 5 midfielders, and 3 forwards.
              </p>
            </div>
          )
        ) : (
          <div className="bg-blue-50 text-blue-700 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Gameweek Squad Rules:</h3>
            <ul className="list-disc ml-4 space-y-1 text-sm">
              <li>Select exactly 11 starting players</li>
              <li>Choose a formation</li>
              <li>Arrange 4 substitutes</li>
              <li>Pick a captain and vice-captain</li>
            </ul>
          </div>
        )}
      </div>
    );
  };
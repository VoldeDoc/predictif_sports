import { useState, useEffect, createContext, useContext } from "react";
import { AuthLayout } from "@/components/Layout/layout";
import Tabs from "@/pages/Ui/tab";
import FantasySquadMatch from "./Fantasy";
import Transfer from "./Transfer";
import FantasyStatistic from "./Statistic";
import Squad from "./Squad";
import Gameweek from "./squad/GameWeekSquad";
import { SquadProvider } from './context/squadContext';
import FantasyPoints from "./FantasyPoints";
import useDashBoardManagement from "@/hooks/useDashboard";

// Created a new context to handle the view state
const ViewContext = createContext<{
    showGameweek: boolean;
    setShowGameweek: (show: boolean) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    selectedPlayer: any;  // Add selected player to context
    setSelectedPlayer: (player: any) => void;  // Add setter for selected player
    hasSquad: boolean;  // Add squad existence tracker
}>({
    showGameweek: false,
    setShowGameweek: () => {},
    activeTab: 'Fantasy',
    setActiveTab: () => {},
    selectedPlayer: null,  // Default to null
    setSelectedPlayer: () => {},  // Empty function placeholder
    hasSquad: false  // Default to no squad
});

export const useViewContext = () => useContext(ViewContext);

export default function FantasyLeagueDash() {
    const { getFantasySquadPlayers } = useDashBoardManagement();
    
    // Initialize state from localStorage if available, otherwise use default values
    const [showGameweek, setShowGameweek] = useState(() => {
        const savedState = localStorage.getItem('fantasyShowGameweek');
        return savedState ? JSON.parse(savedState) === true : false;
    });

    const [activeTab, setActiveTab] = useState(() => {
        const savedTab = localStorage.getItem('fantasyActiveTab');
        return savedTab || "Fantasy"; // Default to Fantasy tab
    });
    
    // Track if user has a saved squad
    const [hasSquad, setHasSquad] = useState(() => {
        const savedState = localStorage.getItem('fantasyHasSquad');
        return savedState ? JSON.parse(savedState) === true : false;
    });

    // Initialize selected player from localStorage
    const [selectedPlayer, setSelectedPlayer] = useState<any>(() => {
        const savedPlayer = localStorage.getItem('fantasySelectedPlayer');
        if (savedPlayer) {
            try {
                return JSON.parse(savedPlayer);
            } catch (e) {
                console.error("Error parsing saved player:", e);
                return null;
            }
        }
        return null;
    });

    // Check if the user has a squad on component mount
    useEffect(() => {
        const checkForSquad = async () => {
            try {
                const squadData = await getFantasySquadPlayers();
                const hasExistingSquad = squadData && 
                    Array.isArray(squadData) && 
                    (squadData.length > 0 || (Array.isArray(squadData[0]) && squadData[0].length > 0));
                
                if (hasExistingSquad) {
                    setHasSquad(true);
                    localStorage.setItem('fantasyHasSquad', JSON.stringify(true));
                    
                    // If they have a squad and are on Squad tab, show the Gameweek view
                    if (activeTab === 'Squad') {
                        setShowGameweek(true);
                    }
                }
            } catch (error) {
                console.error("Error checking for saved squad:", error);
            }
        };
        
        checkForSquad();
    }, []);

    // Save showGameweek state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('fantasyShowGameweek', JSON.stringify(showGameweek));
    }, [showGameweek]);

    // Save hasSquad state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('fantasyHasSquad', JSON.stringify(hasSquad));
    }, [hasSquad]);

    // Save selectedPlayer to localStorage when it changes
    useEffect(() => {
        if (selectedPlayer) {
            localStorage.setItem('fantasySelectedPlayer', JSON.stringify(selectedPlayer));
        } else {
            localStorage.removeItem('fantasySelectedPlayer');
        }
    }, [selectedPlayer]);

    // Create a wrapped version of setShowGameweek that also updates localStorage
    const handleSetShowGameweek = (show: boolean) => {
        setShowGameweek(show);
        localStorage.setItem('fantasyShowGameweek', JSON.stringify(show));
        
        // If user is setting showGameweek to true, also set hasSquad to true
        if (show) {
            setHasSquad(true);
            localStorage.setItem('fantasyHasSquad', JSON.stringify(true));
        }
    };

    // Create a wrapped version of setSelectedPlayer that also updates localStorage
    const handleSetSelectedPlayer = (player: any) => {
        setSelectedPlayer(player);
        if (player) {
            localStorage.setItem('fantasySelectedPlayer', JSON.stringify(player));
        } else {
            localStorage.removeItem('fantasySelectedPlayer');
        }
    };

    const tabs = ["Fantasy", "Squad", "Statistic", "Transfer", "Points"];

    // Handle tab change and save to localStorage
    const handleTabChange = (tab: string) => {
        // Always show Gameweek view if user has saved their squad and they're clicking Squad tab
        if (tab === "Squad" && hasSquad) {
            setShowGameweek(true);
        }
        
        setActiveTab(tab);
        localStorage.setItem('fantasyActiveTab', tab);
    };

    const renderContent = (activeTab: string) => {
        switch (activeTab) {
            case "Fantasy":
                return <FantasySquadMatch />;
            case "Statistic":
                return <FantasyStatistic />;
            case "Squad":
                return hasSquad ? <Gameweek /> : <Squad />;
            case "Transfer":
                return <Transfer />;
            case "Points":
                return <FantasyPoints />;
            default:
                return null;
        }
    };

    return (
        <AuthLayout>
            <ViewContext.Provider value={{ 
                showGameweek, 
                setShowGameweek: handleSetShowGameweek,
                activeTab,
                setActiveTab: handleTabChange,
                selectedPlayer,
                setSelectedPlayer: handleSetSelectedPlayer,
                hasSquad
            }}>
                <SquadProvider>
                    <div className="px-8 sm:px-16">
                        <Tabs 
                            tabs={tabs} 
                            renderContent={renderContent} 
                            defaultTab={activeTab}
                            onTabChange={handleTabChange}
                        />
                    </div>
                </SquadProvider>
            </ViewContext.Provider>
        </AuthLayout>
    );
}
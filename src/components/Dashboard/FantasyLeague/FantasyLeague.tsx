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

// Created a context to handle the view state
const ViewContext = createContext({
    showGameweek: false,
    setShowGameweek: (_value: boolean) => {},
    activeTab: 'Fantasy',
    setActiveTab: (_tab: string) => {},
    selectedPlayer: null,
    setSelectedPlayer: (_player: any) => {},
    hasSquad: false
});

export const useViewContext = () => useContext(ViewContext);

export default function FantasyLeagueDash() {
    const { getFantasySquadPlayers } = useDashBoardManagement();
    
    const [activeTab, setActiveTab] = useState(() => {
        const savedTab = localStorage.getItem('fantasyActiveTab');
        return savedTab || "Fantasy"; 
    });
    
    // These states will be determined by API data
    const [showGameweek, setShowGameweek] = useState(false);
    const [hasSquad, setHasSquad] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    // Check for squad using API data instead of localStorage
    useEffect(() => {
        const checkForSquad = async () => {
            try {
                const squadData = await getFantasySquadPlayers();
                const hasExistingSquad = squadData && 
                    Array.isArray(squadData) && 
                    squadData.some((group) => Array.isArray(group) && group.length > 0);
    
                setHasSquad(hasExistingSquad);
                setShowGameweek(hasExistingSquad); // Show Gameweek view if squad exists
            } catch (error) {
                console.error("Error checking for saved squad:", error);
            }
        };
    
        checkForSquad();
    }, []);

    // Save only activeTab to localStorage
    useEffect(() => {
        localStorage.setItem('fantasyActiveTab', activeTab);
    }, [activeTab]);

    const tabs = ["Fantasy", "Squad", "Statistic", "Transfer", "Points"];

    // Handle tab change
    const handleTabChange = (tab: typeof tabs[number]) => {
        // Show Gameweek view if user has saved their squad and they're clicking Squad tab
        if (tab === "Squad" && hasSquad) {
            setShowGameweek(true);
        }
        
        setActiveTab(tab);
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
                setShowGameweek,
                activeTab,
                setActiveTab: handleTabChange,
                selectedPlayer,
                setSelectedPlayer,
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
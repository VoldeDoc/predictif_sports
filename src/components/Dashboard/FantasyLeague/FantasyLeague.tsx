import { useState, useEffect, createContext, useContext } from "react";
import { AuthLayout } from "@/components/Layout/layout";
import Tabs from "@/pages/Ui/tab";
import FantasySquadMatch from "./Fantasy";
import Transfer from "./Transfer";
import FantasyStatistic from "./Statistic";
import Squad from "./Squad";
import Gameweek from "./squad/GameWeekSquad";
import { SquadProvider } from './context/squadContext';
// import { toast } from "react-toastify";
import FantasyPoints from "./FantasyPoints";

// Created a new context to handle the view state
const ViewContext = createContext<{
    showGameweek: boolean;
    setShowGameweek: (show: boolean) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    selectedPlayer: any;  // Add selected player to context
    setSelectedPlayer: (player: any) => void;  // Add setter for selected player
}>({
    showGameweek: false,
    setShowGameweek: () => {},
    activeTab: 'Fantasy',
    setActiveTab: () => {},
    selectedPlayer: null,  // Default to null
    setSelectedPlayer: () => {}  // Empty function placeholder
});

export const useViewContext = () => useContext(ViewContext);

export default function FantasyLeagueDash() {
    // Initialize state from localStorage if available, otherwise use default values
    const [showGameweek, setShowGameweek] = useState(() => {
        const savedState = localStorage.getItem('fantasyShowGameweek');
        return savedState ? JSON.parse(savedState) === true : false;
    });

    const [activeTab, setActiveTab] = useState(() => {
        const savedTab = localStorage.getItem('fantasyActiveTab');
        return savedTab || "Fantasy"; // Default to Fantasy tab
    });

    // Add state for selected player
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
    console.log("Selected Player:", selectedPlayer);
    // Save showGameweek state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('fantasyShowGameweek', JSON.stringify(showGameweek));
    }, [showGameweek]);

    // Create a wrapped version of setShowGameweek that also updates localStorage
    const handleSetShowGameweek = (show: boolean) => {
        setShowGameweek(show);
        localStorage.setItem('fantasyShowGameweek', JSON.stringify(show));
    };

    const tabs = ["Fantasy", "Squad", "Statistic", "Transfer","Points"];

    // Handle tab change and save to localStorage
    const handleTabChange = (tab: string) => {
        // Allow navigation to Statistics tab now that we have context
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
                return showGameweek ? <Gameweek /> : <Squad />;
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
                setSelectedPlayer
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
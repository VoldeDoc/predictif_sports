import { AuthLayout } from "@/components/Layout/layout";
import Tabs from "@/pages/Ui/tab";
import FantasySquadMatch from "./Fantasy";
import Transfer from "./Transfer";
import FantasyStatistic from "./Statistic";
import Squad from "./Squad";
import { SquadProvider } from './context/squadContext';

export default function FantasyLeagueDash() {
    const tabs = ["Fantasy", "Squad", "Statistic", "Transfer"];

    const renderContent = (activeTab: string) => {
        switch (activeTab) {
            case "Fantasy":
                return <FantasySquadMatch />;
            case "Statistic":
                return <FantasyStatistic />;
            case "Squad":
                return (
                    <SquadProvider>
                        <Squad />
                    </SquadProvider>
                );
            case "Transfer":
                return <Transfer />; 
            default:
                return null;
        }
    };

    return (
        <AuthLayout>
            <div className="px-8 sm:px-16">
                <Tabs tabs={tabs} renderContent={renderContent} />
            </div>
        </AuthLayout>
    );
}
import { AuthLayout } from "@/components/Layout/layout";
import Tabs from "@/pages/Ui/tab";
import FantasySquadMatch from "./Fantasy";
import Calendar from "./Calendar";
import Transfer from "./Transfer";
import FantasyStatistic from "./Statistic";
import Squad from "./Squad";
// import Statistic from "@/components/Dashboard/FantasyLeague/Statistic";
// import Calendar from "@/components/Dashboard/FantasyLeague/Calendar";
// import Finance from "@/components/Dashboard/FantasyLeague/Finance";

export default function FantasyLeagueDash() {
    const tabs = ["Fantasy", "Squad", "Statistic", "Calendar", "Finance","Transfer"];

    const renderContent = (activeTab: string) => {
        switch (activeTab) {
            case "Fantasy":
                return <FantasySquadMatch />;
            case "Statistic":
                return <FantasyStatistic />;
            case "Calendar":
                return <Calendar />;
            case "Squad":
                return <Squad />;
            case "Transfer":
            return <Transfer/> 
            default:
                return null;
        }
    };

    return (
        <AuthLayout>
            <div className="px-8 sm:px-16 ">
                    <Tabs tabs={tabs} renderContent={renderContent} />
            </div>
        </AuthLayout>
    );
}
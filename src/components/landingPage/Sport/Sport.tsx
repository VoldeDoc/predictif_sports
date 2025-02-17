import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Tabs from '@/pages/Ui/tab';
import SearchSection from './Tools/searchSection';
import LeaguesList from './Tools/LeagueList';
import Football from './Football/Football';
import Basketball from './Basketball/Basketball';
import NFL from './NFL/NFL';
import Cricket from './Cricket/cricket';
import Rugby from './Rugby/Rugby';
import MLB from './MLB/MLB';
import F1 from './F1/F1';
import Tennis from './Tennis/Tennis';

const regions = ["Africa", "Europe", "Australia", "North America", "South America", "Asia"];

const regionLeagues: { [key in typeof regions[number]]: string[] } = {
    Africa: ["CAF Champions League", "South African Premier Division"],
    Europe: ["UEFA Champions League", "Premier League", "La Liga", "Serie A"],
    Australia: ["A-League"],
    "North America": ["MLS", "Liga MX"],
    "South America": ["Copa Libertadores", "Brasileirão"],
    Asia: ["AFC Champions League", "J-League"],
};

export default function Sports() {
    const [showSearch, setShowSearch] = useState(false);
    const [activeRegion, setActiveRegion] = useState<typeof regions[number]>("Africa");

    const tabs = ["Football", "Basketball", "NFL", "Rugby", "MLB", "Cricket", "F1", "Tennis"] as const;
    type Tab = typeof tabs[number];
    const [activeTab, setActiveTab] = useState<Tab>("Football");

    const renderContent = (activeTab: string) => {
        switch (activeTab) {
            case "Football":
                return <Football />;
            case "Basketball":
                return <Basketball />;
            case "NFL":
                return <NFL />;
            case "Rugby":
                return <Rugby />;
            case "MLB":
                return <MLB />;
            case "Cricket":
                return <Cricket />;
            case "F1":
                return <F1 />;
            case "Tennis":
                return <Tennis />;
            default:
                return null;
        }
    };

    return (
        <div className='py-28 sm:py-32 px-8 sm:px-16'>
            <div className="md:hidden mb-4 flex justify-between items-center">
                <h1 className='text-xl font-bold'>Sports</h1>
                <button
                    onClick={() => setShowSearch(!showSearch)}
                    className="p-2 bg-blue-500 text-white rounded-full shadow-lg"
                >
                    <FaSearch />
                </button>
            </div>
            {showSearch && (
                <div className="md:hidden mb-4">
                    <SearchSection onChange={(e) => console.log(e.target.value)} />
                    <LeaguesList sport={activeTab} />
                </div>
            )}

            <Tabs 
                tabs={tabs} 
                renderContent={() => null} 
                onTabChange={(tab) => setActiveTab(tab as Tab)} 
            />

            <div className="flex flex-col md:flex-row space-x-5">
                <div className="w-full md:w-1/4 hidden md:block"> 
                    <div className='bg-[#0C21C10D] px-4 py-4'>
                        <h1 className='pb-3'>Region</h1>
                        {regions.map((region) => (
                            <button 
                                key={region} 
                                onClick={() => setActiveRegion(region)}
                                className={`block py-1 ${activeRegion === region ? 'font-bold' : ''}`}
                            >
                                {region}
                            </button>
                        ))}

                        <div className='mt-4'>
                            <h2 className='pb-2 font-semibold'>Top Leagues</h2>
                            <ul className="list-disc pl-5">
                                {regionLeagues[activeRegion].map((league) => (
                                    <li key={league}>{league}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-3/4"> 
                    {renderContent(activeTab)}
                </div>
            </div>
        </div>
    );
}

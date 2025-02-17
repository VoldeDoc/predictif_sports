import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Tabs from '@/pages/Ui/tab';
import Football from '@/components/landingPage/Sport/Football/Football';
import Basketball from '@/components/landingPage/Sport/Basketball/Basketball';
import NFL from '@/components/landingPage/Sport/NFL/NFL';
import Rugby from '@/components/landingPage/Sport/Rugby/Rugby';
import MLB from '@/components/landingPage/Sport/MLB/MLB';
import Cricket from '@/components/landingPage/Sport/Cricket/cricket';
import F1 from '@/components/landingPage/Sport/F1/F1';
import Tennis from '@/components/landingPage/Sport/Tennis/Tennis';
import SearchSection from '@/components/landingPage/Sport/Tools/searchSection';
import LeaguesList from '@/components/landingPage/Sport/Tools/LeagueList';

const regions = ["Africa", "Europe", "Australia", "North America", "South America", "Asia"];

const regionLeagues: { [key in typeof regions[number]]: { name: string, logo: string }[] } = {
    Africa: [
        { name: "CAF Champions League", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/CAF_Champions_League_logo.svg/1200px-CAF_Champions_League_logo.svg.png" },
        { name: "South African Premier Division", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/PSL_Logo.svg/1200px-PSL_Logo.svg.png" }
    ],
    Europe: [
        { name: "UEFA Champions League", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/UEFA_Champions_League_logo_2.svg/1200px-UEFA_Champions_League_logo_2.svg.png" },
        { name: "Premier League", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png" },
        { name: "La Liga", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/LaLiga_Santander.svg/1200px-LaLiga_Santander.svg.png" },
        { name: "Serie A", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Serie_A_logo_%282019%29.svg/1200px-Serie_A_logo_%282019%29.svg.png" }
    ],
    Australia: [
        { name: "A-League", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/A-League_Men_logo.svg/1200px-A-League_Men_logo.svg.png" }
    ],
    "North America": [
        { name: "MLS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/MLS_crest_logo_RGB_gradient.svg/1200px-MLS_crest_logo_RGB_gradient.svg.png" },
        { name: "Liga MX", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Liga_MX.svg/1200px-Liga_MX.svg.png" }
    ],
    "South America": [
        { name: "Copa Libertadores", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Copa_Libertadores_logo.svg/1200px-Copa_Libertadores_logo.svg.png" },
        { name: "Brasileirão", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Campeonato_Brasileiro_Série_A_logo.svg/1200px-Campeonato_Brasileiro_Série_A_logo.svg.png" }
    ],
    Asia: [
        { name: "AFC Champions League", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/AFC_Champions_League_logo.svg/1200px-AFC_Champions_League_logo.svg.png" },
        { name: "J-League", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/J.League_logo.svg/1200px-J.League_logo.svg.png" }
    ],
};

export default function DashSports() {
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
        <div className=' px-8 sm:px-16'>
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
                                    <li key={league.name} className="flex items-center space-x-2">
                                        <img src={league.logo} alt={league.name} className="w-6 h-6 object-contain" />
                                        <span>{league.name}</span>
                                    </li>
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
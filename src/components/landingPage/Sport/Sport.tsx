import { useCallback, useMemo, useState } from 'react';
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

export default function Sports() {
    const [showSearch, setShowSearch] = useState(false);
    const [activeRegion, setActiveRegion] = useState<typeof regions[number]>("Africa");

    // Get initial tab from localStorage
    const initialTab = localStorage.getItem('sportsActiveTab') || "Football";
    const tabs = ["Football", "Basketball", "NFL", "Rugby", "MLB", "Cricket", "F1", "Tennis"] as const;
    type Tab = typeof tabs[number];
    const [activeTab, setActiveTab] = useState<Tab>(initialTab as Tab);
    const [mountedComponents, setMountedComponents] = useState<Set<Tab>>(new Set([initialTab as Tab]));

    // Initialize components object to store cached components
    const components: Record<Tab, React.ReactNode> = {
        Football: null,
        Basketball: null,
        NFL: null,
        Rugby: null,
        MLB: null,
        Cricket: null,
        F1: null,
        Tennis: null
    };

    // Cache the content of each tab
    const cachedContent = useMemo(() => {
        mountedComponents.forEach((tab) => {
            switch (tab) {
                case "Football":
                    components[tab] = <Football key="football" />;
                    break;
                case "Basketball":
                    components[tab] = <Basketball key="basketball" />;
                    break;
                case "NFL":
                    components[tab] = <NFL key="nfl" />;
                    break;
                case "Rugby":
                    components[tab] = <Rugby key="rugby" />;
                    break;
                case "MLB":
                    components[tab] = <MLB key="mlb" />;
                    break;
                case "Cricket":
                    components[tab] = <Cricket key="cricket" />;
                    break;
                case "F1":
                    components[tab] = <F1 key="f1" />;
                    break;
                case "Tennis":
                    components[tab] = <Tennis key="tennis" />;
                    break;
            }
        });
        return components;
    }, [mountedComponents]);

    const handleTabChange = useCallback((tab: string) => {
        const newTab = tab as Tab;
        setActiveTab(newTab);
        localStorage.setItem('sportsActiveTab', newTab);

        // Add new tab to mounted components
        setMountedComponents(prev => {
            const newSet = new Set(prev);
            newSet.add(newTab);
            return newSet;
        });
    }, []);

    const renderContent = useCallback((activeTab: string) => {
        const component = cachedContent[activeTab as Tab];
        return component;
    }, [cachedContent, handleTabChange]);

    return (
        <>
            <div className="container-sm">
                <div className="bg-[#00008B] sm:pt-16 pt-7 sm:px-16 px-8 pb-20">
                  
                </div>
            </div>
            <div className='py-14 sm:py-10 px-8 sm:px-16 '>
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
                    defaultTab={initialTab}
                    renderContent={() => null}
                    onTabChange={handleTabChange}
                />

                <div className="flex flex-col md:flex-row space-x-5">
                    {/* Sidebar */}
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

                    {/* Main Content */}
                    <div className="w-full md:w-3/4">
                        <div style={{ display: 'none' }}>
                            {/* Keep mounted components in DOM but hidden */}
                            {Array.from(mountedComponents).map(tab => (
                                tab !== activeTab && cachedContent[tab]
                            ))}
                        </div>
                        {renderContent(activeTab)}
                    </div>
                </div>
            </div>
        </>
    );
}
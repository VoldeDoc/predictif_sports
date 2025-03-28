import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaSearch, FaChevronLeft, FaTimes } from 'react-icons/fa';
import Tabs from '@/pages/Ui/tab';
import DashBoardFootball from '@/components/landingPage/Sport/Football/DashBoardFootball';
import Basketball from '@/components/landingPage/Sport/Basketball/Basketball';
import NFL from '@/components/landingPage/Sport/NFL/NFL';
import Rugby from '@/components/landingPage/Sport/Rugby/Rugby';
import MLB from '@/components/landingPage/Sport/MLB/MLB';
import Cricket from '@/components/landingPage/Sport/Cricket/cricket';
import F1 from '@/components/landingPage/Sport/F1/F1';
import Tennis from '@/components/landingPage/Sport/Tennis/Tennis';
// import SearchSection from '@/components/landingPage/Sport/Tools/searchSection';
// import LeaguesList from '@/components/landingPage/Sport/Tools/LeagueList';
import useDashBoardManagement from '@/hooks/useDashboard';

// Define interfaces for API responses
interface Region {
  id: string;
  label: string;
}

interface Country {
  id: string;
  name: string;
  logo: string;
  region_label: string;
}

interface League {
  id: string;
  name: string;
  logo: string;
  region_label: string;
}

export default function DashSports() {
    const { getRegion, getCountryRegion, getCountryRegionLeague } = useDashBoardManagement();
    
    // API data states
    const [regions, setRegions] = useState<Region[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [leagues, setLeagues] = useState<League[]>([]);
    const [loading, setLoading] = useState(true);
    
    // UI navigation state
    const [view, setView] = useState<'regions' | 'countries' | 'leagues'>('regions');
    
    // Mobile UI states
    const [showSidebar, setShowSidebar] = useState(false);
    
    // Selection states
    const [activeRegionId, setActiveRegionId] = useState<string>("");
    const [activeCountryId, setActiveCountryId] = useState<string>("");
    
    // Get initial tab from localStorage
    const initialTab = localStorage.getItem('sportsActiveTab') || "Football";
    const tabs = ["Football", "Basketball", "NFL", "Rugby", "MLB", "Cricket", "F1", "Tennis"] as const;
    type Tab = typeof tabs[number];
    const [activeTab, setActiveTab] = useState<Tab>(initialTab as Tab);
    const [mountedComponents, setMountedComponents] = useState<Set<Tab>>(new Set([initialTab as Tab]));

    // DEFINE NAVIGATION FUNCTIONS
    const navigateToRegions = () => {
        setView('regions');
        setActiveRegionId("");
        setActiveCountryId("");
    };
    
    const navigateToCountries = () => {
        setView('countries');
        setActiveCountryId("");
    };

    // DEFINE LABELS
    const activeRegionLabel = useMemo(() => {
        const region = regions.find(r => r.id === activeRegionId);
        return region ? region.label : "";
    }, [regions, activeRegionId]);
    
    const activeCountryName = useMemo(() => {
        const country = countries.find(c => c.id === activeCountryId);
        return country ? country.name : "";
    }, [countries, activeCountryId]);

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (showSidebar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showSidebar]);

    // Fetch regions on component mount
    useEffect(() => {
        const loadRegions = async () => {
            try {
                setLoading(true);
                const response = await getRegion();
                console.log("Region API Response:", response);
                
                if (response && Array.isArray(response) && response[0]) {
                    setRegions(response[0]);
                    console.log("Regions set:", response[0]);
                }
            } catch (error) {
                console.error('Error fetching regions:', error);
                setRegions([]);
            } finally {
                setLoading(false);
            }
        };
        
        loadRegions();
    }, []); 

   // Fetch countries when a region is selected
   useEffect(() => {
        if (!activeRegionId) return;
        
        const loadCountries = async () => {
            try {
                setLoading(true);
                const response = await getCountryRegion(activeRegionId);
                console.log("Country API Response:", response);
                
                if (response && Array.isArray(response) && response[0]) {
                    setCountries(response[0]);
                    setView('countries');
                    console.log("Countries set:", response[0]);
                } else {
                    setCountries([]);
                }
            } catch (error) {
                console.error('Error fetching countries:', error);
                setCountries([]);
            } finally {
                setLoading(false);
            }
        };
        
        loadCountries();
    }, [activeRegionId]);

    // Fetch leagues when a country is selected
    useEffect(() => {
        if (!activeCountryId) return;
        
        const loadLeagues = async () => {
            try {
                setLoading(true);
                console.log("Fetching leagues for country:", activeCountryId, "and sport:", activeTab.toLowerCase());
                const response = await getCountryRegionLeague({ id: activeCountryId, sport: activeTab.toLowerCase() });
                console.log("League API Response:", response);
                
                if (response && Array.isArray(response) && response[0]) {
                    setLeagues(response[0]);
                    setView('leagues');
                    console.log("Leagues set:", response[0]);
                } else {
                    setLeagues([]);
                    console.log("No leagues found");
                }
            } catch (error) {
                console.error('Error fetching leagues:', error);
                setLeagues([]);
            } finally {
                setLoading(false);
            }
        };
        
        loadLeagues();
    }, [activeCountryId, activeTab]);


    const handleRegionSelect = (regionId: string) => {
        console.log("Region selected:", regionId);
        setActiveRegionId(regionId);
        setActiveCountryId("");
        setLeagues([]);
    };
    
    const handleCountrySelect = (countryId: string) => {
        console.log("Country selected:", countryId);
        setActiveCountryId(countryId);
        // Auto-hide sidebar on mobile after selection
        if (window.innerWidth < 1024) {
            setShowSidebar(false);
        }
    };

    // Cache tab components
    const components: Record<Tab, React.ReactNode> = useMemo(() => {
        const result: Record<Tab, React.ReactNode> = {
            Football: null,
            Basketball: null,
            NFL: null,
            Rugby: null,
            MLB: null,
            Cricket: null,
            F1: null,
            Tennis: null
        };
        
        mountedComponents.forEach((tab) => {
            switch (tab) {
                case "Football":
                    result[tab] = <DashBoardFootball key="football" />;
                    break;
                case "Basketball":
                    result[tab] = <Basketball key="basketball" />;
                    break;
                case "NFL":
                    result[tab] = <NFL key="nfl" />;
                    break;
                case "Rugby":
                    result[tab] = <Rugby key="rugby" />;
                    break;
                case "MLB":
                    result[tab] = <MLB key="mlb" />;
                    break;
                case "Cricket":
                    result[tab] = <Cricket key="cricket" />;
                    break;
                case "F1":
                    result[tab] = <F1 key="f1" />;
                    break;
                case "Tennis":
                    result[tab] = <Tennis key="tennis" />;
                    break;
            }
        });
        return result;
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
        
        // Refresh leagues if we're already in leagues view
        if (view === 'leagues' && activeCountryId) {
            setLoading(true);
        }
    }, [view, activeCountryId]);

    const renderContent = useCallback((activeTab: string) => {
        return components[activeTab as Tab];
    }, [components]);

    return (
        <div className="px-3 sm:px-6 md:px-8 max-w-full mx-auto">
            {/* Header with responsive spacing */}
            <div className="mb-4 sm:mb-6 flex justify-between items-center">
                <h1 className="text-lg sm:text-xl font-bold">Sports</h1>
                
                {/* Toggle sidebar button ONLY on mobile/tablet */}
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="lg:hidden p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                    aria-label={showSidebar ? "Close menu" : "Open regions"}
                >
                    {showSidebar ? <FaTimes /> : <FaSearch size={16} />}
                </button>
            </div>

            {/* Tabs with responsive design */}
            <div className="mb-4 sm:mb-6">
                <Tabs 
                    tabs={tabs} 
                    defaultTab={initialTab}
                    renderContent={() => null} 
                    onTabChange={handleTabChange}
                />
            </div>

            {/* Main content layout - stacks on mobile, side-by-side on desktop */}
            <div className="flex flex-col lg:flex-row lg:space-x-5">
                {/* Desktop Sidebar - Always visible on large screens */}
                <div className="hidden lg:block w-1/4 sticky top-0 self-start">
                    <div className="bg-[#0C21C10D] px-4 py-4 rounded-lg shadow-sm">
                        {/* Navigation breadcrumbs */}
                        <div className="flex flex-wrap items-center mb-4 text-sm">
                            {view !== 'regions' && (
                                <button 
                                    onClick={view === 'countries' ? navigateToRegions : navigateToCountries}
                                    className="flex items-center text-blue-600 hover:text-blue-800 mr-2 p-1 rounded hover:bg-blue-50 transition-colors"
                                >
                                    <FaChevronLeft className="mr-1" size={14} />
                                    <span>Back</span>
                                </button>
                            )}
                            
                            <div className="flex flex-wrap items-center text-sm text-gray-600">
                                <button 
                                    onClick={navigateToRegions}
                                    className={`p-1 rounded ${view === 'regions' ? 'font-bold text-blue-600' : 'hover:text-blue-600 hover:bg-blue-50'} transition-colors`}
                                >
                                    Regions
                                </button>
                                
                                {view !== 'regions' && (
                                    <>
                                        <span className="mx-2">/</span>
                                        <button 
                                            onClick={navigateToCountries}
                                            className={`p-1 rounded ${view === 'countries' ? 'font-bold text-blue-600' : 'hover:text-blue-600 hover:bg-blue-50'} transition-colors`}
                                        >
                                            {activeRegionLabel}
                                        </button>
                                    </>
                                )}
                                
                                {view === 'leagues' && (
                                    <>
                                        <span className="mx-2">/</span>
                                        <span className="font-bold text-blue-600 p-1">{activeCountryName}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        {/* Desktop sidebar content */}
                        {loading ? (
                            <div className="flex justify-center items-center py-10">
                                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                                <span className="ml-3 text-blue-800 font-medium">Loading...</span>
                            </div>
                        ) : (
                            <>
                                {/* Show regions with improved buttons */}
                                {view === 'regions' && (
                                    <div>
                                        <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">Select Region</h2>
                                        {regions && regions.length > 0 ? (
                                            <div className="space-y-2">
                                                {regions.map((region) => (
                                                    <button 
                                                        key={region.id} 
                                                        onClick={() => handleRegionSelect(region.id)}
                                                        className="w-full py-3 lpx-4 text-left hover:bg-white hover:shadow-md rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                    >
                                                        {region.label}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 p-3 bg-gray-50 rounded-md">No regions available</p>
                                        )}
                                    </div>
                                )}
                                
                                {/* Show countries with improved buttons and alignment */}
                                {view === 'countries' && (
                                    <div>
                                        <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
                                            Select Country in {activeRegionLabel}
                                        </h2>
                                        {countries && countries.length > 0 ? (
                                            <div className="space-y-2">
                                                {countries.map((country) => (
                                                    <button 
                                                        key={country.id} 
                                                        onClick={() => handleCountrySelect(country.id)}
                                                        className="w-full py-3 px-4 text-left hover:bg-white hover:shadow-md rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center"
                                                    >
                                                        {country.logo && (
                                                            <div className="w-6 h-6 flex-shrink-0 mr-3">
                                                                <img 
                                                                    src={country.logo} 
                                                                    alt={country.name} 
                                                                    className="w-full h-full object-contain" 
                                                                />
                                                            </div>
                                                        )}
                                                        <span className="truncate">{country.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 p-3 bg-gray-50 rounded-md">No countries available for this region</p>
                                        )}
                                    </div>
                                )}
                                
                                {/* Show leagues with improved list items */}
                                {view === 'leagues' && (
                                    <div>
                                        <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
                                            {activeCountryName} {activeTab} Leagues
                                        </h2>
                                        {leagues && leagues.length > 0 ? (
                                            <ul className="space-y-2">
                                                {leagues.map((league) => (
                                                    <li 
                                                        key={league.id} 
                                                        className="flex items-center p-3 hover:bg-white hover:shadow-md rounded-md transition-all duration-200 cursor-pointer"
                                                    >
                                                        {league.logo && (
                                                            <div className="w-7 h-7 flex-shrink-0 mr-3">
                                                                <img 
                                                                    src={league.logo} 
                                                                    alt={league.name} 
                                                                    className="w-full h-full object-contain" 
                                                                />
                                                            </div>
                                                        )}
                                                        <span className="truncate">{league.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500 p-3 bg-gray-50 rounded-md">No {activeTab} leagues found for {activeCountryName}</p>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Sidebar - Only appears when toggled */}
                {showSidebar && (
                    <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-16">
                        <div className="w-[90%] max-w-md bg-white rounded-lg shadow-xl max-h-[80vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gray-50 p-4 border-b flex justify-between items-center">
                                <h3 className="font-bold text-lg">
                                    {view === 'regions' ? 'Select Region' : 
                                     view === 'countries' ? `Select Country in ${activeRegionLabel}` : 
                                    `${activeCountryName} Leagues`}
                                </h3>
                                <button 
                                    onClick={() => setShowSidebar(false)}
                                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                                >
                                    <FaTimes size={18} />
                                </button>
                            </div>
                            
                            <div className="p-4">
                                {/* Mobile Navigation breadcrumbs */}
                                <div className="flex flex-wrap items-center mb-4 text-sm">
                                    {view !== 'regions' && (
                                        <button 
                                            onClick={view === 'countries' ? navigateToRegions : navigateToCountries}
                                            className="flex items-center text-blue-600 hover:text-blue-800 mr-2 p-2 rounded hover:bg-blue-50 transition-colors"
                                        >
                                            <FaChevronLeft className="mr-1" size={14} />
                                            <span>Back</span>
                                        </button>
                                    )}
                                    
                                    <div className="flex flex-wrap items-center text-sm text-gray-600">
                                        <button 
                                            onClick={navigateToRegions}
                                            className={`p-2 rounded ${view === 'regions' ? 'font-bold text-blue-600' : 'hover:text-blue-600 hover:bg-blue-50'} transition-colors`}
                                        >
                                            Regions
                                        </button>
                                        
                                        {view !== 'regions' && (
                                            <>
                                                <span className="mx-2">/</span>
                                                <button 
                                                    onClick={navigateToCountries}
                                                    className={`p-2 rounded ${view === 'countries' ? 'font-bold text-blue-600' : 'hover:text-blue-600 hover:bg-blue-50'} transition-colors`}
                                                >
                                                    {activeRegionLabel}
                                                </button>
                                            </>
                                        )}
                                        
                                        {view === 'leagues' && (
                                            <>
                                                <span className="mx-2">/</span>
                                                <span className="font-bold text-blue-600 p-1">{activeCountryName}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Mobile sidebar content */}
                                {loading ? (
                                    <div className="flex justify-center items-center py-10">
                                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                                        <span className="ml-3 text-blue-800 font-medium">Loading...</span>
                                    </div>
                                ) : (
                                    <>
                                        {/* Show regions for mobile */}
                                        {view === 'regions' && (
                                            <div>
                                                {regions && regions.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {regions.map((region) => (
                                                            <button 
                                                                key={region.id} 
                                                                onClick={() => handleRegionSelect(region.id)}
                                                                className="w-full py-4 px-4 text-left hover:bg-blue-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100"
                                                            >
                                                                {region.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500 p-4 bg-gray-50 rounded-md">No regions available</p>
                                                )}
                                            </div>
                                        )}
                                        
                                        {/* Show countries for mobile */}
                                        {view === 'countries' && (
                                            <div>
                                                {countries && countries.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {countries.map((country) => (
                                                            <button 
                                                                key={country.id} 
                                                                onClick={() => handleCountrySelect(country.id)}
                                                                className="w-full py-4 px-4 text-left hover:bg-blue-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center border border-gray-100"
                                                            >
                                                                {country.logo && (
                                                                    <div className="w-8 h-8 flex-shrink-0 mr-3">
                                                                        <img 
                                                                            src={country.logo} 
                                                                            alt={country.name} 
                                                                            className="w-full h-full object-contain" 
                                                                        />
                                                                    </div>
                                                                )}
                                                                <span className="font-medium">{country.name}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500 p-4 bg-gray-50 rounded-md">No countries available for this region</p>
                                                )}
                                            </div>
                                        )}
                                        
                                        {/* Show leagues for mobile */}
                                        {view === 'leagues' && (
                                            <div>
                                                {leagues && leagues.length > 0 ? (
                                                    <ul className="space-y-2">
                                                        {leagues.map((league) => (
                                                            <li 
                                                                key={league.id} 
                                                                className="flex items-center p-4 hover:bg-blue-50 rounded-md transition-all duration-200 cursor-pointer border border-gray-100"
                                                            >
                                                                {league.logo && (
                                                                    <div className="w-8 h-8 flex-shrink-0 mr-3">
                                                                        <img 
                                                                            src={league.logo} 
                                                                            alt={league.name} 
                                                                            className="w-full h-full object-contain" 
                                                                        />
                                                                    </div>
                                                                )}
                                                                <span className="font-medium">{league.name}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-gray-500 p-4 bg-gray-50 rounded-md">No {activeTab} leagues found for {activeCountryName}</p>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content with improved padding and responsive behavior */}
                <div className="w-full lg:w-3/4"> 
                    <div className="bg-white rounded-lg p-1 sm:p-3">
                        {renderContent(activeTab)}
                    </div>
                </div>
            </div>
        </div>
    );
}
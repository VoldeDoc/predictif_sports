import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaSearch, FaChevronLeft, FaTimes } from 'react-icons/fa';
import Tabs from '@/pages/Ui/tab';
import Football from './Football/Football';
import Basketball from './Basketball/Basketball';
import NFL from './NFL/NFL';
import Cricket from './Cricket/cricket';
import Rugby from './Rugby/Rugby';
import MLB from './MLB/MLB';
import F1 from './F1/F1';
import Tennis from './Tennis/Tennis';
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

export default function Sports() {
    const { getRegion, getCountryRegion, getCountryRegionLeague } = useDashBoardManagement();
    
    // UI states
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const [view, setView] = useState<'regions' | 'countries' | 'leagues'>('regions');
    
    // API data states
    const [regions, setRegions] = useState<Region[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [leagues, setLeagues] = useState<League[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Selection states
    const [activeRegionId, setActiveRegionId] = useState<string>("");
    const [activeCountryId, setActiveCountryId] = useState<string>("");

    // Get initial tab from localStorage
    const initialTab = localStorage.getItem('sportsActiveTab') || "Football";
    const tabs = ["Football", "Basketball", "NFL", "Rugby", "MLB", "Cricket", "F1", "Tennis"] as const;
    type Tab = typeof tabs[number];
    const [activeTab, setActiveTab] = useState<Tab>(initialTab as Tab);
    const [mountedComponents, setMountedComponents] = useState<Set<Tab>>(new Set([initialTab as Tab]));

    // Get active region and country names
    const activeRegionLabel = useMemo(() => {
        const region = regions.find(r => r.id === activeRegionId);
        return region ? region.label : "";
    }, [regions, activeRegionId]);
    
    const activeCountryName = useMemo(() => {
        const country = countries.find(c => c.id === activeCountryId);
        return country ? country.name : "";
    }, [countries, activeCountryId]);

    // Navigation functions
    const navigateToRegions = () => {
        setView('regions');
        setActiveRegionId("");
        setActiveCountryId("");
    };
    
    const navigateToCountries = () => {
        setView('countries');
        setActiveCountryId("");
    };

    // Prevent body scroll when mobile sidebar is open
    useEffect(() => {
        if (showMobileSidebar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showMobileSidebar]);

    // Fetch regions on component mount
    useEffect(() => {
        const loadRegions = async () => {
            try {
                setLoading(true);
                const response = await getRegion();
                
                if (response && Array.isArray(response) && response[0]) {
                    setRegions(response[0]);
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
                
                if (response && Array.isArray(response) && response[0]) {
                    setCountries(response[0]);
                    setView('countries');
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
                const response = await getCountryRegionLeague({ 
                    id: activeCountryId, 
                    sport: activeTab.toLowerCase() 
                });
                
                if (response && Array.isArray(response) && response[0]) {
                    setLeagues(response[0]);
                    setView('leagues');
                } else {
                    setLeagues([]);
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

    // Handle region selection
    const handleRegionSelect = (regionId: string) => {
        setActiveRegionId(regionId);
        setActiveCountryId("");
        setLeagues([]);
    };
    
    // Handle country selection
    const handleCountrySelect = (countryId: string) => {
        setActiveCountryId(countryId);
        
        // Auto-hide mobile sidebar after selection
        if (window.innerWidth < 768) {
            setShowMobileSidebar(false);
        }
    };

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
        
        // Refresh leagues if we're already in leagues view
        if (view === 'leagues' && activeCountryId) {
            setLoading(true);
        }
    }, [view, activeCountryId]);

    const renderContent = useCallback((activeTab: string) => {
        const component = cachedContent[activeTab as Tab];
        return component;
    }, [cachedContent]);

    // Render sidebar content based on current view
    const renderSidebarContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                    <span className="ml-3 text-blue-800 font-medium">Loading...</span>
                </div>
            );
        }

        switch (view) {
            case 'regions':
                return (
                    <div>
                        <h1 className='pb-3 font-semibold'>Select Region</h1>
                        {regions && regions.length > 0 ? (
                            <div className="space-y-2">
                                {regions.map((region) => (
                                    <button
                                        key={region.id}
                                        onClick={() => handleRegionSelect(region.id)}
                                        className={`block w-full text-left py-2 px-2 rounded hover:bg-blue-50 ${activeRegionId === region.id ? 'font-bold text-blue-600' : ''}`}
                                    >
                                        {region.label}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 p-3 bg-gray-50 rounded-md">No regions available</p>
                        )}
                    </div>
                );
            
            case 'countries':
                return (
                    <div>
                        <h1 className='pb-3 font-semibold'>Select Country in {activeRegionLabel}</h1>
                        {countries && countries.length > 0 ? (
                            <div className="space-y-2">
                                {countries.map((country) => (
                                    <button
                                        key={country.id}
                                        onClick={() => handleCountrySelect(country.id)}
                                        className={`flex items-center w-full text-left py-2 px-2 rounded hover:bg-blue-50 ${activeCountryId === country.id ? 'font-bold text-blue-600' : ''}`}
                                    >
                                        {country.logo && (
                                            <img 
                                                src={country.logo} 
                                                alt={country.name} 
                                                className="w-6 h-6 object-contain mr-2"
                                            />
                                        )}
                                        <span>{country.name}</span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 p-3 bg-gray-50 rounded-md">No countries available for this region</p>
                        )}
                    </div>
                );
            
            case 'leagues':
                return (
                    <div>
                        <h1 className='pb-3 font-semibold'>{activeCountryName} {activeTab} Leagues</h1>
                        {leagues && leagues.length > 0 ? (
                            <ul className="space-y-2">
                                {leagues.map((league) => (
                                    <li
                                        key={league.id}
                                        className="flex items-center p-2 hover:bg-blue-50 rounded cursor-pointer"
                                    >
                                        {league.logo && (
                                            <img 
                                                src={league.logo} 
                                                alt={league.name}
                                                className="w-6 h-6 object-contain mr-2"
                                            />
                                        )}
                                        <span>{league.name}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 p-3 bg-gray-50 rounded-md">No {activeTab} leagues found for {activeCountryName}</p>
                        )}
                    </div>
                );
            
            default:
                return null;
        }
    };

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
                        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                        className="p-3 bg-blue-500 text-white rounded-full shadow-lg"
                    >
                        <FaSearch size={16} />
                    </button>
                </div>

                {/* Mobile sidebar */}
                {showMobileSidebar && (
                    <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20">
                        <div className="w-[90%] max-w-md bg-white rounded-lg shadow-xl max-h-[75vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gray-50 p-4 border-b flex justify-between items-center">
                                <h3 className="font-bold text-lg">
                                    {view === 'regions' ? 'Select Region' : 
                                     view === 'countries' ? `Select Country in ${activeRegionLabel}` : 
                                    `${activeCountryName} Leagues`}
                                </h3>
                                <button 
                                    onClick={() => setShowMobileSidebar(false)}
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
                                
                                {renderSidebarContent()}
                            </div>
                        </div>
                    </div>
                )}

                <Tabs
                    tabs={tabs}
                    defaultTab={initialTab}
                    renderContent={() => null}
                    onTabChange={handleTabChange}
                />

                <div className="flex flex-col md:flex-row md:space-x-5">
                    {/* Desktop Sidebar */}
                    <div className="w-full md:w-1/4 hidden md:block">
                        <div className='bg-[#0C21C10D] px-4 py-4 rounded-lg'>
                            {/* Desktop Navigation breadcrumbs */}
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
                            
                            {renderSidebarContent()}
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
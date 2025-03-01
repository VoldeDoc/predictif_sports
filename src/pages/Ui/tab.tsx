import { useState, useEffect } from 'react';

interface TabsProps {
    tabs: readonly string[];
    renderContent: (activeTab: string) => JSX.Element | null;
    onTabChange?: (activeTab: string) => void;
    defaultTab?: string; 
}

export default function Tabs({ tabs, renderContent, onTabChange, defaultTab }: TabsProps) {
    // Initialize with defaultTab or first tab, checking localStorage
    const [activeTab, setActiveTab] = useState(() => {
        if (defaultTab && tabs.includes(defaultTab)) {
            return defaultTab;
        }
        return tabs[0];
    });

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if (onTabChange) {
            onTabChange(tab);
        }
    };

    // Update active tab when defaultTab changes
    useEffect(() => {
        if (defaultTab && tabs.includes(defaultTab)) {
            setActiveTab(defaultTab);
        }
    }, [defaultTab, tabs]);

    return (
        <div className="w-full">
            <div className="relative w-full">
                <div className="flex flex-wrap border-b border-gray-200 mb-4 overflow-auto">
                    <style>
                        {`
                        /* Hide scrollbar for Chrome, Safari and Opera */
                        .overflow-x-auto::-webkit-scrollbar {
                            display: none;
                        }
                        `}
                    </style>
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`py-2 px-4 text-sm font-medium whitespace-nowrap ${
                                activeTab === tab
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-600"
                            }`}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                {renderContent(activeTab)}
            </div>
        </div>
    );
}
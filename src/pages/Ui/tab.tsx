import { useState } from 'react';

interface TabsProps {
    tabs: readonly string[];
    renderContent: (activeTab: string) => JSX.Element | null;
    onTabChange?: (activeTab: string) => void;
}

export default function Tabs({ tabs, renderContent, onTabChange }: TabsProps) {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if (onTabChange) {
            onTabChange(tab);
        }
    };


    return (
        <div className="w-full">
            <div className="relative w-full">
                <div
                    className="flex flex-wrap border-b border-gray-200 mb-4 overflow-auto"

                >
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
                            className={`py-2 px-4 text-sm font-medium whitespace-nowrap ${activeTab === tab
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
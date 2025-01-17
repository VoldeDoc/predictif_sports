import React from "react";

interface Tab {
    key: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabSelect: (key: string) => void;
    className?: string;
    activeClassName?: string;
    inactiveClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
    tabs,
    activeTab,
    onTabSelect,
    className = "",
    activeClassName = "bg-blue-600 text-white shadow-md",
    inactiveClassName = "text-black-500",
}) => {
    return (
        <div
            className={`flex space-x-4 overflow-x-auto text-center items-center justify-start ${className}`}
            style={{
                scrollbarWidth: "none", // For Firefox
                msOverflowStyle: "none", // For IE and Edge
            }}
        >
            {/* Hide scrollbar for WebKit browsers (Chrome, Safari) */}
            <style>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onTabSelect(tab.key)}
                    className={`flex items-center space-x-2 py-2 px-4 rounded ${
                        activeTab === tab.key ? activeClassName : inactiveClassName
                    }`}
                >
                    {tab.icon && <tab.icon className="w-5 h-5" />}
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
    );
};

export default Tabs;
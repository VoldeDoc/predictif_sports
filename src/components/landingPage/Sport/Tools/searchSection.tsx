import React from 'react';

interface SearchSectionProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onChange }) => {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-2 border rounded bg-[#0C21C10D]"
                onChange={onChange}
            />
            <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </div>
    );
};

export default SearchSection;
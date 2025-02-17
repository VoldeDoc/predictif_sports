import React from 'react';

interface TeamData {
    position: number;
    logo: string;
    team: string;
    mp: number;
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    gd: number;
    pts: number;
}

interface LeagueTableProps {
    tableData: TeamData[];
    className?: string;
}

const LeagueTable: React.FC<LeagueTableProps> = ({ tableData, className }) => {
    return (
        <div
            className="overflow-x-auto"
            style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* IE and Edge */
            }}
        >
            <style>
                {`
                    /* Hide scrollbar for Chrome, Safari and Opera */
                    .overflow-x-auto::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>
            <table className={`min-w-full bg-white border-collapse ${className}`}>
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-1 text-left w-1/12"></th>
                        <th className="py-2 px-4 text-left w-1/3">Club</th>
                        <th className="py-2 px-4 text-center w-1/12">MP</th>
                        <th className="py-2 px-4 text-center w-1/12">W</th>
                        <th className="py-2 px-4 text-center w-1/12">D</th>
                        <th className="py-2 px-4 text-center w-1/12">L</th>
                        <th className="py-2 px-4 text-center w-1/12">GF</th>
                        <th className="py-2 px-4 text-center w-1/12">GA</th>
                        <th className="py-2 px-4 text-center w-1/12">GD</th>
                        <th className="py-2 px-4 text-center text-black w-1/12">Pts</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((team, index) => (
                        <tr key={index} className="hover:bg-gray-100 cursor-pointer">
                            <td className="border px-1 py-2 text-center">{team.position}</td>
                            <td className="border px-4 py-2 flex items-center">
                                <img src={team.logo} alt={`${team.team} Logo`} className="h-6 w-6 mr-2" />
                                {team.team}
                            </td>
                            <td className="border px-4 py-2 text-center">{team.mp}</td>
                            <td className="border px-4 py-2 text-center">{team.w}</td>
                            <td className="border px-4 py-2 text-center">{team.d}</td>
                            <td className="border px-4 py-2 text-center">{team.l}</td>
                            <td className="border px-4 py-2 text-center">{team.gf}</td>
                            <td className="border px-4 py-2 text-center">{team.ga}</td>
                            <td className="border px-4 py-2 text-center">{team.gd}</td>
                            <td className="border px-4 py-2 text-center text-green-500">{team.pts}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeagueTable;
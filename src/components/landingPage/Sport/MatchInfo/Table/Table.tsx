import premierLeagueLogo from '/assets/images/landingPage/premier.svg';
import ChelseaLogo from '/assets/images/landingPage/chelsea.png';
import ArsenalLogo from '/assets/images/landingPage/arsenal.png';
import LeagueTable from "@/components/landingPage/Sport/MatchInfo/Table/Tool/TableComponent";

const tableData = [
    {
        position: 1,
        logo: "/path/to/logoA.png",
        team: "Manchester City",
        mp: 30,
        w: 20,
        d: 5,
        l: 5,
        gf: 60,
        ga: 30,
        gd: 30,
        pts: 65
    },
    {
        position: 2,
        logo: "/path/to/logoB.png",
        team: "Liverpool",
        mp: 30,
        w: 18,
        d: 6,
        l: 6,
        gf: 55,
        ga: 28,
        gd: 27,
        pts: 60
    },
    {
        position: 3,
        logo: "/path/to/logoC.png",
        team: "Arsenal",
        mp: 30,
        w: 15,
        d: 10,
        l: 5,
        gf: 50,
        ga: 25,
        gd: 25,
        pts: 55
    }
];

export default function FantasySquadMatch() {
    return (
        <div className="w-full">
            <div className="bg-blue-50">
                <div className="font-bold flex justify-between items-center p-4">
                    <h1>Next Match</h1>
                    <h1 className="text-blue-800">View Calendar</h1>
                </div>
                <div className="">
                    <div className="flex items-center justify-center p-4">
                        <img src={premierLeagueLogo} alt="" className="w-12 h-12 mr-2" />
                        <p className="text-xl">Premier League</p>
                    </div>
                    <div className="flex justify-between items-center p-4">
                        <div>
                            <img src={ChelseaLogo} alt="" className="w-20 h-20" />
                            <p className="text-lg font-bold">Chelsea FC</p>
                        </div>
                        <div>
                            <p className="text-2xl">VS</p>
                        </div>
                        <div>
                            <img src={ArsenalLogo} alt="" className="w-20 h-20" />
                            <p className="text-lg font-bold">Arsenal FC</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="text-center font-bold text-xl">18:45  15/02/2025</p>
                    </div>
                </div>
                <LeagueTable tableData={tableData} className="bg-blue-50" />
            </div>
            {/* Add more content here under the tabs */}
            <div>
                <h2 className="text-2xl font-bold">Fantasy League</h2>
                <p className="text-gray-600">Welcome to the Fantasy League</p>
            </div>
        </div>
    );
}
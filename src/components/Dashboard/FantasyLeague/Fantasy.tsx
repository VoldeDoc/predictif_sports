import ChelseaLogo from '/assets/images/landingPage/chelsea.png';
import ArsenalLogo from '/assets/images/landingPage/arsenal.png';
import { useViewContext } from './FantasyLeague';

export default function FantasySquadRules() {
    const { setActiveTab, setShowGameweek } = useViewContext(); // Access context functions

    const rules = [
        "Each player must select a squad of 15 players.",
        "A maximum of 3 players can be selected from a single team.",
        "The squad must include 2 goalkeepers, 5 defenders, 5 midfielders, and 3 forwards.",
        "Players earn points based on their real-life performance in matches."
    ];

    const handleGoToSquad = () => {
        setActiveTab("Squad"); // Set the active tab to "Squad"
        setShowGameweek(false); // Ensure Gameweek view is not shown initially
    };

    return (
        <div className="bg-blue-50 min-h-screen flex flex-col items-center justify-center p-8">
            {/* Club Logos */}
            <div className="flex items-center space-x-8 mb-6">
                <img src={ChelseaLogo} alt="Chelsea Logo" className="w-16 h-16" />
                <img src="/assets/images/landingPage/premier.svg" alt="Premier League Logo" className="w-20 h-20" />
                <img src={ArsenalLogo} alt="Arsenal Logo" className="w-16 h-16" />
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-blue-800 mb-6">Fantasy League Rules</h1>

            {/* Rules List */}
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
                    {rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                    ))}
                </ul>
            </div>

            {/* Call-to-Action Button */}
            <div className="mt-6">
                <button
                    className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                    onClick={handleGoToSquad} // Navigate to the Squad tab
                >
                    Go to Squad Menu
                </button>
            </div>
        </div>
    );
}
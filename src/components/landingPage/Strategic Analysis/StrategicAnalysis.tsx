import LandingPageLayout from "../../Layout/LandingPageLayout";

export default function StrategicAnalysis() {
    return (
        <LandingPageLayout>
            <div className="container-sm">
                <div className="bg-[#00008B] pt-32 sm:px-16 px-8 pb-4">
                    <div className="py-28">
                        <div className="pb-7 text-center items-center flex justify-center">
                            <button className="bg-white text-black-500 px-2 py-2 rounded-xl text-xs">
                                Fully Integrated Sport Prediction Apps
                            </button>
                        </div>
                        <h1 className="font-bold text-center text-4xl text-white">Strategic Analysis (Your AI copilot)</h1>
                    </div>
                </div>
                <div className="container-sm bg-[#0C21C10D] pb-20">
                    <div className="px-8 sm:px-16">
                        <div className="flex justify-center space-x-4 py-20">
                            <img src="assets/images/landingPage/heading-img 1.svg" alt="" className="h-10" />
                            <p className="text-2xl font-bold">
                                Feature: AI-Powered Betting Insights and Reporting
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <div className="pb-7">
                                    <h1 className="font-semibold text-3xl">Overview</h1>
                                    <p className="text-gray-700">
                                        This feature harnesses the power of artificial intelligence to analyse vast amounts of sports data, offering detailed reports and insights tailored for sports bettors. The goal is to empower users with actionable information enhance their decision-making processes.
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl px-6 pt-6 pb-14 shadow-lg mt-7">
                                    <h1 className="text-2xl font-semibold pb-5">Risk Assessment</h1>
                                    <p className="text-gray-700 pb-5">
                                        The feature assesses risk levels associated with different betting options, allowing users to make informed choices about where to place their bets.
                                    </p>
                                    <p className="text-gray-700">
                                        Users receive alerts on high-risk bets and can adjust their strategies accordingly.
                                    </p>
                                </div>

                                <div className="bg-blue-800 rounded-xl shadow-lg px-5 py-12 mt-7">
                                    <p className="text-white">
                                        The feature assesses risk levels associated with different betting options, allowing users to make informed choices about where to place their bets.
                                        Users receive alerts on high-risk bets and can adjust their strategies accordingly.
                                    </p>
                                </div>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute left-0 transform -translate-x-1/2 top-0 h-full border-l-2 border-gray-300"></div>
                                <div className="absolute left-0 transform -translate-x-1/2 top-0 w-full h-full flex flex-col items-center">
                                    <div className="w-4 h-4 bg-gray-200 border-2 border-gray-300 rounded-full mt-12"></div>
                                    <div className="w-4 h-4 bg-gray-200 border-2 border-gray-300 rounded-full mt-32"></div>
                                    <div className="w-4 h-4 bg-gray-200 border-2 border-gray-300 rounded-full mt-36"></div>
                                </div>
                                <div className="ml-1 space-y-12 overflow-auto" style={{ maxHeight: '600px' }}>
                                    <div className="">
                                        <h1 className="text-2xl font-semibold pb-3">Data Analysis</h1>
                                        <p className="text-gray-700">
                                            The AI scans historical performance, player statistics, team dynamics, injury reports, and weather conditions to identify trends and patterns.
                                            Real-time updates ensure that bettors have the most current information before placing their bets.
                                        </p>
                                    </div>
                                    <div className="">
                                        <h1 className="text-2xl font-semibold pb-3">Predictive Modelings</h1>
                                        <p className="text-gray-700">
                                            Using machine learning algorithms, the AI generates predictive models that forecast outcomes based on historical data and current variables.
                                            Users can access probabilities for various outcomes, helping them gauge potential risks and rewards.

                                        </p>
                                    </div>
                                    <div className="">
                                        <h1 className="text-2xl font-semibold pb-3">Customized Reports</h1>
                                        <p className="text-gray-700">
                                            Bettors receive personalized reports that highlight key metrics, recommended bets, and potential value opportunities based on their preferences and betting history.
                                            Reports include visual data representations like graphs and charts for easy comprehension.
                                        </p>
                                    </div>
                                    <div className="">
                                        <h1 className="text-2xl font-semibold pb-3">Risk Assessment</h1>
                                        <p className="text-gray-700">
                                            The feature assesses risk levels associated with different betting options, allowing users to make informed choices about where to place their bets.
                                            Users receive alerts on high-risk bets and can adjust their strategies accordingly.
                                        </p>
                                    </div>
                                    <div className="">
                                        <h1 className="text-2xl font-semibold pb-3">Expert Insights</h1>
                                        <p className="text-gray-700">
                                            The AI curates insights from expert analysts, combining statistical data with expert opinions to provide a well-rounded view of upcoming games and events.
                                            Users can access historical expert predictions and outcomes to refine their strategies.
                                        </p>
                                    </div>
                                    <div className="">
                                        <h1 className="text-2xl font-semibold pb-3">User-Friendly Interface</h1>
                                        <p className="text-gray-700">
                                            An intuitive dashboard displays all relevant information in a clear, concise format, making it easy for users to navigate through various insights and reports.
                                            Users can filter data based on specific leagues, teams, or player performances.
                                        </p>
                                    </div>
                                   
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
}
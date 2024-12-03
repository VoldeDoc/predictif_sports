import LandingPageLayout from "@/components/Layout/LandingPageLayout";
import SportTeams from "./Tools/SportTeams";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import TypingEffect from "./Tools/Typing";

export default function Home1() {
    return (
        <LandingPageLayout>
            <>
                <div className="container-sm ">
                    <div className="bg-[#B22234] pt-32 sm:px-16 px-8 pb-4">
                        <div className="text-center pb-7 sm:mr-32 mr-0">
                            <button className="rounded-2xl bg-white text-black-500 px-2 py-2 text-xs mb-5 " > <span className="text-[#B22234] font-bold">o</span> Fully Integrated Sport Prediction Apps</button>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-x-0 space-y-7">

                            <div className="text-center items-center flex justify-center">
                                <img src="/assets/images/landingPage/man.svg" alt="" className="sm:h-96 h-52 " />
                            </div>
                            <div>
                               <TypingEffect/>
                                <p className="text-white text-sm">Predictivo™ assists thousands of game-loving bettors and</p>
                                <p className="text-white text-sm">traders in making smarter, data-driven betting decisions every day.</p>
                            </div>

                            <div>
                                <img src="assets/images/landingPage/left image.svg" alt="" className="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-sm py-10 bg-[#FAFAFA]">
                    <div className="px-16 sm:px-16">
                        <div className="row items-center text-center">
                            <div className="flex justify-center flex-col">
                                <img src="assets/images/landingPage/heading-img 1.svg" alt="" className="h-10" />
                                <p className=" text-2xl font-bold text-center py-10">
                                    Premier League Club We Feature
                                </p>
                            </div>
                        </div>
                    <span className="col-sm-10">
                        <SportTeams />
                    </span>
                    </div>

                </div>

                <div className="container-sm pt-7">
                    <div className="text-center space-y-3 pb-14">
                        <div className="pb-5">
                            <button className="rounded-3xl text-white bg-red-800 px-2 py-2 text-xs"><span className="text-black-500">o</span> Fully Integrated Point-of-sale System</button>
                        </div>
                        <h1 className="text-4xl font-bold ">The boot Room </h1>
                        <h1 className="text-4xl font-bold ">(All things football)</h1>
                    </div>

                    <div className="sm:px-16 px-8 pb-20">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-20 gap-x-8">
                            <div className="flex space-x-5">
                                <div className="bg-[#B22234] rounded-full sm:w-32 sm:h-32 w-24 h-24 p-2 flex items-center justify-center hover:bg-black-500">
                                    <div className="outline outline-1 outline-white rounded-full sm:w-28 sm:h-28 w-20 h-20 flex items-center justify-center">
                                        <img src="assets/images/landingPage/carbon_ibm-aiops-insights.svg" alt="" className="sm:w-20 sm:h-20 w-12 h-12" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-2xl">Expert Insights</h2>
                                    <p className="text-gray-700">A panel of seasoned sports analysts delivers commentary on </p>
                                    <p className="text-gray-700 pb-3">upcoming games, focusing on team tactics, player form, and historical performance.</p>
                                  
                                  
                                    <hr />
                                </div>
                            </div>

                            <div className="flex space-x-5">
                                <div className="bg-[#B22234] rounded-full w-24 h-24 sm:w-32 sm:h-32 p-2 flex items-center justify-center hover:bg-black-500">
                                    <div className="outline outline-1 outline-white rounded-full w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
                                        <img src="assets/images/landingPage/strategy 1.svg" alt="" className="sm:w-20 sm:h-20 w-12 h-12" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-2xl">Tactical Breakdown</h2>
                                    <p className="text-gray-700">A custom logo design is a crucial part of your </p>
                                    <p className="text-gray-700 lg:pb-8">overall branding process. Your logo design is a significant.</p>
                                  
                                    <hr />
                                </div>
                            </div>
                            <div className="flex space-x-5">
                                <div className="bg-[#B22234] rounded-full sm:w-32 sm:h-32 w-24 h-24 p-2 flex items-center justify-center hover:bg-black-500">
                                    <div className="outline outline-1 outline-white rounded-full sm:w-28 sm:h-28 w-20 h-20 flex items-center justify-center">
                                        <img src="assets/images/landingPage/icon-park_market-analysis (1).svg" alt="" className="sm:w-20 sm:h-20 w-12 h-12" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-2xl">Metric Analysis</h2>
                                    <p className="text-gray-700">Users can generate personalized reports that  combine expert</p>
                                    <p className="text-gray-700 lg:pb-8"> analysis with their own betting history and preferences.</p>
                                
                                    <hr />
                                </div>
                            </div>
                            <div className="flex space-x-5">
                                <div className="bg-[#B22234] rounded-full sm:w-32 sm:h-32 w-24 h-24 p-2 flex items-center justify-center hover:bg-black-500">
                                    <div className="outline outline-1 outline-white rounded-full sm:w-28 sm:h-28 w-20 h-20 flex items-center justify-center">
                                        <img src="assets/images/landingPage/mage_preview-fill.svg" alt="" className="sm:w-20 sm:h-20 h-12 w-12" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-2xl">Game Previews</h2>
                                    <p className="text-gray-700">The feature emphasizes critical metrics such as possession statistics, </p>
                                    <p className="text-gray-700 pb-3">shooting accuracy, defensive efficiency, and advanced analytics.</p>
                                 
                                    <hr />
                                </div>
                            </div>
                            <div className="flex space-x-5">
                                <div className="bg-[#B22234] rounded-full sm:w-32 sm:h-32 w-24 h-24 p-2 flex items-center justify-center hover:bg-black-500">
                                    <div className="outline outline-1 outline-white rounded-full sm:w-28 sm:h-28 w-20 h-20 flex items-center justify-center">
                                        <img src="assets/images/landingPage/Vector1.svg" alt="" className="sm:w-16 sm:h-20 w-12 h-12" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-2xl">Customizable Reports</h2>
                                    <p className="text-gray">A custom logo design is a crucial part of your </p>
                                    <p className="text-gray lg:pb-8">overall branding process. Your logo design is a significant.</p>
                                   
                                    <hr />
                                </div>
                            </div>
                            <div className="flex space-x-5">
                                <div className="bg-[#B22234] rounded-full sm:w-32 sm:h-32 w-24 h-24 p-2 flex items-center justify-center hover:bg-black-500">
                                    <div className="outline outline-1 outline-white rounded-full sm:w-28 sm:h-28 w-20 h-20 flex items-center justify-center">
                                    <img src="assets/images/landingPage/qa 2.svg" alt="" className="sm:w-20 sm:h-20 w-12 h-12" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-2xl">Interactive Q&A Sessions</h2>
                                    <p className="text-gray-700">Users can participate in live Q&A sessions with experts, allowing </p>
                                    <p className="text-gray-700 pb-3">them  to ask questions and seek clarification on tactics and metrics. </p>
                                 
                                    <hr />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="container-sm">
                    <div className="bg-[#0C21C10D]">
                        <div className="sm:px-16 px-8 py-12">
                            <div className="pb-5">
                                <button className="rounded-3xl text-white bg-blue-800 px-2 py-2 text-xs"><span className="text-black-500">o </span>Explore Our</button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 space-y-5">
                                <div>
                                    <h1 className="font-bold text-5xl pb-3">Benefits</h1>
                                    <p className="text-gray-700 pb-3">By incorporating expert analysis and tactical insights, this feature transforms the betting experience into a more informed and strategic endeavor, ultimately supporting bettors in making smarter, more confident decisions.</p>
                                    <h2 className="font-bold text-xl">Strategic Analysis (Your AI copilot)</h2>

                                </div>
                                <div className="bg-white rounded-xl shadow-lg px-10 py-4 items-center ">
                                    <div className="rounded-full bg-blue-800 w-14 h-14 flex justify-center items-center">
                                        <h1 className="text-white font-semibold text-3xl ">1</h1>
                                    </div>
                                    <div className="text-center flex justify-center pb-5">
                                        <img src="assets/images/landingPage/puzzle 1.svg" alt="" className="w-20 h-20" />
                                    </div>
                                    <p>Provides bettors with a comprehensive understanding of the factors that could influence game outcomes, enhancing
                                        their betting strategies.</p>
                                </div>

                                <div className="bg-black-500 text-white rounded-xl shadow-lg px-10 py-4  space-y-4 flex flex-col justify-between h-full">
                                    <div className="rounded-full bg-blue-800 w-14 h-14 flex justify-center items-center">
                                        <h1 className="text-white font-semibold text-3xl ">2</h1>
                                    </div>
                                    <p className="">Encourages ongoing learning through expert engagement, helping bettors refine their understanding of sports tactics and metrics over time.</p>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold">Feature: AI-Powered Betting Insights and Reporting</h1>

                                    <div className="py-4">
                                        <button className="rounded-3xl text-white bg-red-800 px-3 py-2 "><span className="text-black-700 px-1">o </span>Overview</button>
                                    </div>

                                    <p>This feature harnesses the power of artificial intelligence to analyze vast amounts of sports data, offering detailed reports and insights tailored for sports bettors. The goal is to empower users with actionable information to enhance their decision-making processes.</p>
                                </div>

                                <div className="bg-white text-black rounded-xl shadow-lg px-10 py-4  space-y-4 flex flex-col justify-between h-full">
                                    <div className="rounded-full bg-blue-800 w-14 h-14 flex justify-center items-center">
                                        <h1 className="text-white font-semibold text-3xl ">3</h1>
                                    </div>
                                    <p className="">Bridges the gap between data and actionable insights, empowering users to make informed decisions.</p>
                                </div>

                                <div className="px-6 py-2">
                                    <img src="assets/images/landingPage/male-friends-home-playing 1.svg" alt="" className="rounded-lg " />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <h1 className="text-center font-bold text-5xl py-16">Key Components</h1>


                <div className="container-sm py-12 bg-[#F7F7F7]">
                    <div className="px-8 sm:px-16">
                        <div className=" px-4 py-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div>
                                    <h1 className="text-2xl font-semibold pb-6">Data Analysis</h1>
                                    <p className="text-gray-700">The AI scans historical performance, player statistics, </p>
                                    <p className="text-gray-700">team dynamics, injury reports, and weather conditions </p>
                                    <p className="text-gray-700 pb-12">to identify trends and patterns.</p>
                                    <p className="text-gray-700">Real-time updates ensure that bettors have the most current </p>
                                    <p className="text-gray-700">information before placing their bets.</p>
                                </div>
                                <div>
                                    <img src="assets/images/landingPage/Image.svg" alt="" className="w-96 h-72" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-sm">
                    <div className="px-8 sm:px-16 py-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                            <div className="bg-[#4FB7EF1A] rounded-xl px-7 py-10">
                                <div className="pb-7 text-center items-center flex justify-center">
                                    <button className="bg-black-500 text-white px-2 py-2 rounded-xl flex ">
                                        Predictive Modelling <ArrowRightIcon className="ml-2 w-6 h-6" />
                                    </button>
                                </div>
                                <p className="text-gray-700 pb-5">
                                    - Using machine learning algorithms, the AI generates predictive models that forecast outcomes based on historical data and current variables.
                                </p>
                                <p className="text-gray-700">
                                    - Users can access probabilities for various outcomes, helping them gauge potential risks and rewards.
                                </p>

                                <div className="flex space-x-10 justify-center">
                                    <img src="assets/images/landingPage/Switch.svg" alt="" />
                                    <img src="assets/images/landingPage/Card.svg" alt="" />
                                </div>
                            </div>


                            <div className="bg-[#4FB7EF1A] rounded-xl px-7 py-10">
                                <h1 className="font-bold text-2xl text-center pb-3">For a better tomorrow</h1>
                                <p className="text-gray-700 pb-5 text-center">
                                    We strive to make a positive impact in all markets in which we operate.
                                </p>
                                <div className="pb-7 text-center items-center flex justify-center">
                                    <button className="bg-black-500 text-white px-2 py-2 rounded-xl flex ">
                                        AI POWERED MARKET INSIGHTS <ArrowRightIcon className="ml-2 w-6 h-6" />
                                    </button>
                                </div>



                                <div className="flex space-x-10 justify-center">
                                    <img src="assets/images/landingPage/Card.svg" alt="" />
                                    <img src="assets/images/landingPage/Switch.svg" alt="" />
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </>

        </LandingPageLayout >
    )
}
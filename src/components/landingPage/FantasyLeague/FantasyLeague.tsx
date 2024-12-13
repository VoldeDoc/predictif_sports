import LandingPageLayout from "../../Layout/LandingPageLayout";

export default function FantasyLeague(){
    return(
        <LandingPageLayout>
            <>
            <div className="container-sm">
                    <div className="bg-[#00008B] pt-32 sm:px-16 px-8 pb-4">
                        <div className="py-28">
                            <div className="pb-7 text-center items-center flex justify-center">
                                <button className="bg-white text-black-500 px-2 py-2 rounded-xl text-xs">
                                    Forum
                                </button>
                            </div>
                            <h1 className="font-bold text-center text-4xl text-white pb-3">Fantasy League</h1>
                            <h1 className="font-semibold text-center text-white ">Feature: Head-to-Head Betting Challenge</h1>
                        </div>
                    </div>
                    <div className="container-sm bg-[#0C21C10D] pb-20">
                        <div className="px-8 sm:px-16">
                            <div className="flex justify-center space-x-4 py-20">
                                <img src="assets/images/landingPage/heading-img 1.svg" alt="" className="h-10" />
                                <p className="text-2xl font-bold">
                                    Key Components
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <div className="pb-7">
                                        <h1 className="font-semibold text-3xl">Overview</h1>
                                        <p className="text-gray-700">
                                            This feature allows subscribers to engage in competitive betting by challenging each other directly, reminiscent of peer-to-peer betting platforms. It fosters a dynamic betting environment where users can pit their sports knowledge and strategies against one another.
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-xl px-6 pt-6 pb-14 shadow-lg mt-7">
                                        <h1 className="text-2xl font-semibold pb-5">Risk Assessment</h1>
                                        <p className="text-gray-700 pb-3">
                                            Encourages a competitive and interactive betting environment, making the experience more engaging and fun.
                                        </p>
                                        <p className="text-gray-700 pb-3">
                                            Promotes social interaction among bettors, creating a sense of community and camaraderie.
                                        </p>
                                        <p className="text-gray-700">
                                            Allows users to leverage their knowledge and skills in direct competition, potentially increasing their betting success.
                                        </p>
                                    </div>

                                    <div className="bg-blue-800 rounded-xl shadow-lg px-5 py-12 mt-7">
                                        <p className="text-white">
                                            By introducing the Head-to-Head Betting Challenge feature, the application not only enhances user engagement but also transforms the betting experience into an exciting competition that encourages strategic thinking and community building.
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
                                            <h1 className="text-2xl font-semibold pb-3">Challenge Creation</h1>
                                            <p className="text-gray-700">
                                                Users can create personalized betting challenges, specifying the event, the type of bet (e.g., match winner, point spread), and the stake involved.
                                                Subscribers can invite friends or open challenges to the broader community, enhancing engagement.
                                            </p>
                                        </div>
                                        <div className="">
                                            <h1 className="text-2xl font-semibold pb-3">Matchmaking System</h1>
                                            <p className="text-gray-700">
                                                The app’s matchmaking system pairs users with similar betting interests and experience levels, ensuring fair competition.
                                                Users can browse existing challenges and join those that pique their interest, adding a layer of excitement to the betting experience.


                                            </p>
                                        </div>
                                        <div className="">
                                            <h1 className="text-2xl font-semibold pb-3">Real-Time Tracking</h1>
                                            <p className="text-gray-700">
                                              Participants can track the progress of their challenges in real time, with live updates on game outcomes, statistics, and betting metrics.
                                              A dedicated leaderboard showcases user rankings based on their challenge performance, fostering a competitive spirit.
                                            </p>
                                        </div>
                                        <div className="">
                                            <h1 className="text-2xl font-semibold pb-3">Betting Metrics and Analytics</h1>
                                            <p className="text-gray-700">
                                            The feature provides users with insights and analytics on their betting history and performance in challenges, helping them refine their strategies.
                                             Participants can review past challenges, learning from their successes and mistakes.
                                            </p>
                                        </div>
                                        <div className="">
                                            <h1 className="text-2xl font-semibold pb-3">Social Interaction</h1>
                                            <p className="text-gray-700">
                                              Users can chat and discuss strategies with their challengers within the app, creating a community of sports bettors.
                                               Options for sharing results on social media allow users to celebrate wins and engage with their networks.
                                            </p>
                                        </div>
                                        <div className="">
                                            <h1 className="text-2xl font-semibold pb-3">Rewards and Recognition</h1>
                                            <p className="text-gray-700">
                                             Subscribers can earn badges or rewards for achievements, such as consecutive wins, successful challenges, or participation in community events.
                                              Seasonal tournaments can be organized, providing opportunities for users to compete for larger prizes and recognition within the community.
                                            </p>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </>
        </LandingPageLayout>
    )
}
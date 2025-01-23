import useDashBoardManagement from "@/hooks/useDashboard";
import { useEffect } from "react";
export default function UpcomingMatches() {
    const {getUpcomingMatch} = useDashBoardManagement();
   
useEffect(() => {
    (async () => {
        try {
            const response = await getUpcomingMatch();
            console.log(response)
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    })();
}, []);

    return (
        <>
            <div>
                {/* <div className="flex flex-row space-x-2">
                    <div>
                        <img
                            src="assets/images/dashboard/dashboard/99.svg"
                            alt=""
                            className="w-7 h-7"
                        />
                    </div>
                    <div>
                        <h1 className="text-xs">Premier League</h1>
                        <h1 className="text-sm">England</h1>
                    </div>
                    <hr className="border-t-2 py-2 bg-gray-200" />
                </div> */}
                {/* <div className="flex flex-row space-x-3 mt-4 rounded-lg bg-slate-200 px-4 py-4 border-l-4 border-green-500"> */}
                    {/* Full-Time Indicator */}
                    {/* <div className="text-center flex items-center justify-center">
                        <h1>FT</h1>
                    </div> */}

                    {/* Teams */}
                    {/* <div className="space-y-5 ">
                        <div className="flex flex-row space-x-2">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg"
                                alt=""
                                className="w-6 h-6"
                            />
                            <h1>Dortmund</h1>
                        </div>
                        <div className="flex flex-row space-x-2">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"
                                alt=""
                                className="w-6 h-6"
                            />
                            <h1>Arsenal</h1>
                        </div>
                    </div> */}

                    {/* Scores */}
                    {/* <div className=" space-y-5">
                        <h1>2</h1>
                        <h1>2</h1>
                    </div> */}
                   
                {/* </div> */}

                <div className="flex flex-row space-x-3 mt-4 rounded-lg bg-slate-200 px-4 py-4 border-l-4 border-green-500">
                    {/* Full-Time Indicator */}
                    {/* <div className="text-center flex items-center justify-center">
                        <h1>FT</h1>
                    </div> */}

                    {/* Teams */}
                    {/* <div className="space-y-5 ">
                        <div className="flex flex-row space-x-2">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg"
                                alt=""
                                className="w-6 h-6"
                            />
                            <h1>Dortmund</h1>
                        </div>
                        <div className="flex flex-row space-x-2">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"
                                alt=""
                                className="w-6 h-6"
                            />
                            <h1>Arsenal</h1>
                        </div>
                    </div> */}

                    {/* Scores */}
                    {/* <div className=" space-y-5">
                        <h1>2</h1>
                        <h1>2</h1>
                    </div> */}

                    <p>No upcoming match currently</p>
                </div>
            </div>
        </>
    );
}

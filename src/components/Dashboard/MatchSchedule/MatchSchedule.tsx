import { AuthLayout } from "@/components/Layout/layout";
import MatchResults from "./MatchResults";
export default function MatchSchedule() {
    return (
        <AuthLayout>
            <div className="px-4 sm:px-8 md:px-16 py-8">
                <h1 className="font-bold text-xl sm:text-2xl text-gray-600">Match Schedule</h1>
                <div className="py-8">
                    <div className="bg-blue-700 py-8 px-4 sm:px-6">
                        <div className="flex  space-y-4 sm:space-y-0 space-x-4 text-center items-center">
                            <div className="bg-white shadow rounded-full w-16 h-16 flex items-center justify-center">
                                <img src="assets/images/dashboard/dashboard/99.svg" alt="" />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-semibold text-white">Premier League</h1>
                        </div>
                    </div>
                    {/* <div className="bg-gray-300 py-3 px-4 sm:px-8 flex justify-between items-center">
                        <div>
                            <p className="text-black-800">19 May, 24 Sunday</p>
                        </div>
                        <div className="space-x-3 flex">
                            <button className="bg-gray-500 px-4 py-1 rounded-full">
                                <FaCaretLeft />
                            </button>
                            <button className="bg-gray-500 px-4 py-1 rounded-full">
                                <FaCaretRight />
                            </button>
                        </div>
                    </div> */}
                    <div className="bg-white">
                        <MatchResults/>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
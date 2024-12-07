import { AuthLayout } from "@/components/Layout/layout";

export default function GeneralStrategy() {
    return (
        <AuthLayout>
            <>
                <div className="px-8 sm:px-16">
                    <div className="bg-white">
                        <div className=" px-8 py-4 relative">
                            <div className="absolute left-0 transform -translate-x-1/2 top-0 h-full border-l-4 border-blue-800"></div>
                            <div className="flex justify-between">

                                <h1 className="font-bold text-xl text-gray-700" >Strategy Name</h1>
                                <div className="bg-blue-800 rounded-md px-2 py-2 text-white">3 days ago</div>
                            </div>
                            <div className="py-3">
                                <p className="font-medium text-sm">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu
                                    stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcat cher synth. Cosby sweater eu banh mi</p>
                            </div>
                        </div>

                        <div className="px-8 py-4 relative my-10">
                            {/* <div className="absolute top-10 transform -translate-y-1/2 left-20 w-40 border-t-2 border-gray-400"></div>
                            <div className="absolute top-10 transform -translate-y-1/2 left-[290px] w-[200px] border-t-2 border-gray-400"></div>
                            <div className="absolute top-10 transform -translate-y-1/2 right-[235px] w-[200px] border-t-2 border-gray-400"></div> */}
                            <div className="flex  justify-between space-x-5">
                                <div>
                                    <div className="rounded-full bg-gray-300 w-10 h-10 px-2 py-2  text-center items-center text-gray-400">1</div>
                                    <p className="text-gray-400 font-semibold">Rules</p>
                                </div>
                                <div className="text-center items-center">
                                    <div className="rounded-full bg-red-800 w-10 h-10 px-2 py-2  text-center items-center text-white">2</div>
                                    <p className="text-red-800 font-semibold ">Outcome</p>
                                </div>
                                <div className="">
                                    <div className="rounded-full bg-gray-300 w-10 h-10 px-2 py-2  text-center items-center text-gray-400">3</div>
                                    <p className="text-gray-400 font-semibold">Settings</p>
                                </div>
                                <div className="">
                                    <div className="rounded-full bg-gray-300 w-10 h-10 px-2 py-2  text-center items-center text-gray-400">4</div>
                                    <p className="text-gray-400 font-semibold">Confirmation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AuthLayout>
    )
}
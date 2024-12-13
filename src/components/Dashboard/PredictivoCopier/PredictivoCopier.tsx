import { AuthLayout } from "@/components/Layout/layout";
import Button from "@/components/Ui/Button";
import { CubeIcon } from "@heroicons/react/24/solid";
import { Tabs } from "flowbite-react";
import { BiPlusCircle } from "react-icons/bi";
import { IoCompass } from "react-icons/io5";
import { LiaTrophySolid } from "react-icons/lia";
import { HiRectangleGroup } from "react-icons/hi2";
import { customTheme } from "./Tools/TabCustomTheme";
import { Link } from "react-router-dom";

function PredictivoCopier() {
  return (
    <AuthLayout>
      <>
        <div className="px-4 sm:px-8 md:px-16">
          <div className="flex flex-col sm:flex-row justify-between">
            <div>
              <h1 className="font-bold text-xl sm:text-2xl text-gray-700">New Prematch Strategy</h1>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button
                text="Add a New Strategy"
                iconPosition="left"
                icon={BiPlusCircle}
                className="bg-blue-800 text-white py-2 shadow-md flex items-center space-x-2"
                link="/user/add/new-strategy"
              />
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="py-10 sm:py-20">
              <Tabs aria-label="Pills" variant="pills" theme={customTheme}>
                <Tabs.Item active title="Strategies" icon={CubeIcon}>
                  <div className="bg-white rounded-lg shadow-md px-4 py-4 my-10">
                    <h3 className="font-semibold text-sm">Alert Name</h3>
                    <hr className="w-20 border-2 border-blue-700 mb-4 mt-2" />
                    <input
                      type="text"
                      placeholder="Enter strategy name"
                      className="bg-gray-100 px-2 py-2 sm:py-4 w-full sm:w-96 rounded-xl"
                    />
                  </div>

                  <div className="bg-white rounded-lg shadow-md px-4 py-4 my-10">
                    <h3 className="font-bold text-md text-center">What type of  PreMatch Alert do you  want to create ?</h3>
                  </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link to="/user/general/strategy">
                    <div className="bg-white py-4 px-4 rounded-md hover:bg-gray-400 flex flex-col justify-center items-center space-y-4 text-center hover:cursor-pointer "> 
                    <img src="assets/images/dashboard/dashboard/general 1.svg" alt="" className="w-20 h-20"/>
                    <h1 className="font-semibold">General</h1>
                  </div>
                    </Link>

                   <Link to="">
                   <div className="bg-white py-4 px-4 rounded-md hover:bg-gray-400 flex flex-col justify-center items-center space-y-4 text-center hover:cursor-pointer "> 
                    <img src="assets/images/dashboard/dashboard/goals 1.svg" alt="" className="w-20 h-20"/>
                    <h1 className="font-semibold">Goals</h1>
                    </div></Link>

                    <div className="bg-white py-4 px-4 rounded-md hover:bg-gray-400 flex flex-col justify-center items-center space-y-4 text-center hover:cursor-pointer "> 
                    <img src="assets/images/dashboard/dashboard/streak 1.svg" alt="" className="w-20 h-20"/>
                    <h1 className="font-semibold">Treaks</h1>

                    </div>
                    <div className="bg-white py-4 px-4 rounded-md hover:bg-gray-400 flex flex-col justify-center items-center space-y-4 text-center hover:cursor-pointer "> 
                    <img src="assets/images/dashboard/dashboard/corners 1.svg" alt="" className="w-20 h-20"/>
                    <h1 className="font-semibold">Corners</h1>

                    </div>
                  </div>
                 
                </Tabs.Item>
                <Tabs.Item title="Present" icon={HiRectangleGroup}>
                  This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
                  Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                  control the content visibility and styling.
                </Tabs.Item>
                <Tabs.Item title="Explore" icon={IoCompass}>
                  This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
                  Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                  control the content visibility and styling.
                </Tabs.Item>
                <Tabs.Item title="Leagues (All)" icon={LiaTrophySolid}>
                  This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
                  Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                  control the content visibility and styling.
                </Tabs.Item>
              </Tabs>
            </div>
          </div>
        </div>
      </>
    </AuthLayout>
  );
}

export default PredictivoCopier;
import { AuthLayout } from "@/components/Layout/layout";
// import Table from "./Tools/Table";

const PrematchAlerts = () => {
  return <AuthLayout>
    <div className="sm-px-16 px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex items-center mb-4 sm:mb-0 sm:order-2">
          <button className="bg-red-800 hover:bg-red-700 px-4 py-2 rounded text-white text-sm transition duration-300 ease-in-out">
        Add a new Strategy
          </button>
        </div>
        <div className="sm:order-1">
          <h1 className="text-gray-700 font-bold text-2xl">PreMatch Alerts</h1>
          <p>Create unlimited PreMatch strategies to automatically find valuable</p>
          <p>meets your rules and conditions within minutes! Or import Preset strategies created by other Predictivo.</p>
        </div>
      </div>

      {/* <Table/> */}
    </div>
  </AuthLayout>;
};

export default PrematchAlerts;

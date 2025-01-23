import { AuthLayout } from "@/components/Layout/layout";
import { Link } from "react-router-dom";
import useDashBoardManagement from "@/hooks/useDashboard";
import { useEffect, useState } from "react";
import Loader from "@/pages/Ui/loader";
import Modal from "@/components/Ui/Modal";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store/rootReducer";

function PredictivoCopier() {
  const { getStrategyItem, getUserDetails, getUserPlan } = useDashBoardManagement();
  const [strategyItem, setStrategyItem] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [onboarding, setOnboarding] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<any>(null);
  const userdata = useSelector((state: RootState) => state.auth?.user);
  const id = userdata?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStrategyItem();
        setStrategyItem(response);
        const userDetail = await getUserDetails();
        const subscriptionPlanResponse = await getUserPlan();
        setSubscriptionPlan(subscriptionPlanResponse);

        if (userDetail?.[0].onboarding_state) {
          setOnboarding(userDetail[0].onboarding_state);
        }

        setError(null);
      } catch (error) {
        setError('Failed to fetch strategies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const modalTimer = setTimeout(() => {
      setIsModalOpen(true);
    }, 6000);

    return () => clearTimeout(modalTimer);
  }, []);

  return (
    <AuthLayout>
      <div className="px-4 sm:px-8 md:px-16">
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <h1 className="font-bold text-xl sm:text-2xl text-gray-700">New Prematch Strategy</h1>
          </div>
          <div className="flex items-center mb-4 sm:mb-0 sm:order-2">
            {subscriptionPlan && subscriptionPlan[0][0].payment_status !== "active" && (
              <Link to={`/user/subscribe-plan/${id}`} className="mt-4">
                <button className="bg-red-800 hover:bg-red-700 px-4 py-2 rounded text-white text-sm transition duration-300 ease-in-out">
                  Subscribe
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md px-4 py-4 my-10">
            <h3 className="font-bold text-md text-center">What type of Strategy do you want to create?</h3>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader loading={loading} color="#123abc" size={40} />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : strategyItem.length === 0 ? (
            <div className="text-center text-gray-500">No data available.</div>
          ) : (
            strategyItem.map((item) => (
              <div key={item.id} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {onboarding === "completed" ? (
                  <Link to={`/user/create-strategy/${item[0].id}`}>
                    <div className="bg-white py-4 px-4 rounded-md hover:bg-gray-400 flex flex-col justify-center items-center space-y-4 text-center hover:cursor-pointer">
                      <img src="assets/images/dashboard/dashboard/general 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[0].name}</h1>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-gray-200 py-4 px-4 rounded-md flex flex-col justify-center items-center space-y-4 text-center">
                    <button className="bg-gray-400 text-white py-2 px-4 rounded-md cursor-not-allowed" disabled>
                      <img src="assets/images/dashboard/dashboard/general 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[0].name}</h1>
                    </button>
                  </div>
                )}

                {onboarding === "completed" ? (
                  <Link to={`/user/create-strategy/${item[1].id}`}>
                    <div className="bg-white py-4 px-4 rounded-md hover:bg-gray-400 flex flex-col justify-center items-center space-y-4 text-center hover:cursor-pointer">
                      <img src="assets/images/dashboard/dashboard/goals 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[1].name}</h1>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-gray-200 py-4 px-4 rounded-md flex flex-col justify-center items-center space-y-4 text-center">
                    <button className="bg-gray-400 text-white py-2 px-4 rounded-md cursor-not-allowed" disabled>
                      <img src="assets/images/dashboard/dashboard/goals 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[1].name}</h1>
                    </button>
                  </div>
                )}

                {onboarding === "completed" ? (
                  <Link to={`/user/create-strategy/${item[2].id}`}>
                    <div className="bg-white py-4 px-4 rounded-md hover:bg-gray-400 flex flex-col justify-center items-center space-y-4 text-center hover:cursor-pointer">
                      <img src="assets/images/dashboard/dashboard/streak 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[2].name}</h1>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-gray-200 py-4 px-4 rounded-md flex flex-col justify-center items-center space-y-4 text-center">
                    <button className="bg-gray-400 text-white py-2 px-4 rounded-md cursor-not-allowed" disabled>
                      <img src="assets/images/dashboard/dashboard/streak 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[2].name}</h1>
                    </button>
                  </div>
                )}

                {onboarding === "completed" ? (
                  <Link to={`/user/create-strategy/${item[3].id}`}>
                    <div className="bg-white py-4 px-4 rounded-md hover:bg-gray-400 flex flex-col justify-center items-center space-y-4 text-center hover:cursor-pointer">
                      <img src="assets/images/dashboard/dashboard/corners 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[3].name}</h1>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-gray-200 py-4 px-4 rounded-md flex flex-col justify-center items-center space-y-4 text-center">
                    <button className="bg-gray-400 text-white py-2 px-4 rounded-md cursor-not-allowed" disabled>
                      <img src="assets/images/dashboard/dashboard/corners 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[3].name}</h1>
                    </button>
                  </div>
                )}

                {onboarding === "completed" ? (
                  <Link to={`/user/create-strategy/${item[4].id}`}>
                    <div className="bg-white py-4 px-4 rounded-md hover:bg-gray-400 flex flex-col justify-center items-center space-y-4 text-center hover:cursor-pointer">
                      <img src="assets/images/dashboard/dashboard/general 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[4].name}</h1>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-gray-200 py-4 px-4 rounded-md flex flex-col justify-center items-center space-y-4 text-center">
                    <button className="bg-gray-400 text-white py-2 px-4 rounded-md cursor-not-allowed" disabled>
                      <img src="assets/images/dashboard/dashboard/general 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[4].name}</h1>
                    </button>
                  </div>
                )}

                {onboarding === "completed" ? (
                  <Link to={`/user/create-strategy/${item[5].id}`}>
                    <div className="bg-white py-4 px-4 rounded-md hover:bg-gray-400 flex flex-col justify-center items-center space-y-4 text-center hover:cursor-pointer">
                      <img src="assets/images/dashboard/dashboard/goals 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[5].name}</h1>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-gray-200 py-4 px-4 rounded-md flex flex-col justify-center items-center space-y-4 text-center">
                    <button className="bg-gray-400 text-white py-2 px-4 rounded-md cursor-not-allowed" disabled>
                      <img src="assets/images/dashboard/dashboard/goals 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[5].name}</h1>
                    </button>
                  </div>
                )}

                {onboarding === "completed" ? (
                  <Link to={`/user/create-strategy/${item[6].id}`}>
                    <div className="bg-white py-4 px-4 rounded-md hover:bg-gray-400 flex flex-col justify-center items-center space-y-4 text-center hover:cursor-pointer">
                      <img src="assets/images/dashboard/dashboard/streak 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[6].name}</h1>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-gray-200 py-4 px-4 rounded-md flex flex-col justify-center items-center space-y-4 text-center">
                    <button className="bg-gray-400 text-white py-2 px-4 rounded-md cursor-not-allowed" disabled>
                      <img src="assets/images/dashboard/dashboard/streak 1.svg" alt="" className="w-20 h-20" />
                      <h1 className="font-semibold">{item[6].name}</h1>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {subscriptionPlan && subscriptionPlan[0][0].payment_status !== "active" && (
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold">Subscribe Now</h2>
        <p className="mt-2">Click here to subscribe to add more strategies.</p>
        <Link to={`/user/subscribe-plan/${id}`} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded mx-9">
          Subscribe
        </Link>
      </Modal>
      )}
    </AuthLayout>
  );
}

export default PredictivoCopier;
import  { useEffect, useState } from 'react';
import { AuthLayout } from '@/components/Layout/layout';
import useDashBoardManagement from '@/hooks/useDashboard';

interface Plan {
  id: number;
  user: string;
  plan: string;
  amount: number;
  payment_type: string;
  status: string;
  payment_status: string;
  created_at: string;
}

function UserProfile() {
  const { getUserPlan, username} = useDashBoardManagement();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getUserPlan();
      setPlans(data[0]);
      console.log(data);
    })();
  }, []);

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
          <div className="flex items-center space-x-6 mb-8">
            {/* {profileImage ? (
              <img src={profileImage} alt="Profile Avatar" className="w-20 h-20 rounded-full border-4 border-blue-500" />
            ) : (
              <div className="w-20 h-20 rounded-full border-4 border-blue-500 flex items-center justify-center bg-gray-200">
                <span className="text-gray-500">No Image</span>
              </div>
            )} */}
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">{username}</h1>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">Subscription Plans</h2>
          <ul className="space-y-4">
            {plans.map((plan) => (
              <li key={plan.id} className="border-b pb-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Plan:</span>
                  <span className="text-gray-900 font-bold">{plan.plan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className={`font-bold ${plan.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}`}>{plan.status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Amount:</span>
                  <span className="text-gray-900 font-bold">${plan.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Created At:</span>
                  <span className="text-gray-900 font-bold">{new Date(plan.created_at).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AuthLayout>
  );
}

export default UserProfile;

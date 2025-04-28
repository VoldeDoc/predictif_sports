import { useEffect, useState } from 'react';
import { AuthLayout } from '@/components/Layout/layout';
import useDashBoardManagement from '@/hooks/useDashboard';
import { toast } from 'react-toastify';
import Loader from '@/pages/Ui/loader';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

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

interface Club {
  id: string;
  club_id: string;
  club_name: string;
}

interface Player {
  id: string;
  player_id: string;
  name: string;
  photo: string;
  position: string;
  current_club_name: string;
}

function UserProfile() {
  const { getUserPlan, username, getClubFollowed, unFollowClub, getPlayerFollowed, unFollowPlayer } = useDashBoardManagement();
  const { deleteUserAccount } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [subscriptionActive, setSubscriptionActive] = useState(false);

  // Account deactivation states
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [deactivateButtonEnabled, setDeactivateButtonEnabled] = useState(false);
  const navigage = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planData, clubsFollowed, playersFollowed] = await Promise.all([
          getUserPlan(),
          getClubFollowed(),
          getPlayerFollowed()
        ]);

        setPlans(planData[0][0] || []);
        setClubs(clubsFollowed[0] || []);
        setPlayers(playersFollowed[0] || []);

        // if (planData[0] && planData[0][0].payment_status === 'active') {
        //   setSubscriptionActive(true);
        // }

      } catch (error) {
        setError('Request timed out. Please check your network connection.');
        setLoading(false)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check if the confirmation text matches the required phrase
  useEffect(() => {
    const requiredText = 'deactivate account';
    setDeactivateButtonEnabled(confirmText.toLowerCase() === requiredText);
  }, [confirmText]);

  const handleRemoveClub = async (id: string) => {
    toast.promise(
      unFollowClub(id).then(async () => {
        const clubsFollowed = await getClubFollowed();
        setClubs(clubsFollowed[0] || []);
      }),
      {
        pending: "Removing club...",
        success: "Club removed successfully",
        error: "Failed to remove club",
      }
    );
  };

  const handleRemovePlayer = async (player_id: string) => {
    toast.promise(
      unFollowPlayer(player_id).then(async () => {
        const playerFollowed = await getPlayerFollowed();
        setPlayers(playerFollowed[0] || {});
      }),
      {
        pending: "Removing player...",
        success: "Player removed successfully",
        error: "Failed to remove player",
      }
    );
  };

  const handleOpenDeactivateModal = () => {
    setShowDeactivateModal(true);
  };

  const handleCloseDeactivateModal = () => {
    setShowDeactivateModal(false);
    setConfirmText('');
    setDeactivateButtonEnabled(false);
  };

  const handleDeactivateAccount = async () => {
    if (deactivateButtonEnabled) {
      try {
        // Call the API to deactivate the account
        await deleteUserAccount() // Replace with actual API call
        toast.success("Account deactivated successfully.");
        handleCloseDeactivateModal();
        navigage('/')
      } catch (error) {
        toast.error("Failed to deactivate account.");
      }
    } else {
      toast.error("Please type 'deactivate account' to confirm.");
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

        <div className="bg-white p-10 rounded-lg shadow-2xl max-w-3xl w-full">
          <div>
            <button></button>
            <button onClick={() => window.history.back()} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Back
            </button>
          </div>
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900">Welcome, {username}</h1>
            <p className="text-gray-600 mt-2">Here is your account overview</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader loading={loading} color="#123abc" size={40} />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <>
              {/* Subscription Plans Section */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Subscription Plans</h2>
                <div className="space-y-6">
                  {plans.length > 0 ? (
                    plans.map((plan) => (
                      <div key={plan.id} className="bg-gray-100 p-6 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{plan.plan}</h3>
                          <p className="text-sm text-gray-500">{new Date(plan.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-lg font-bold ${plan.status === 'active' ? 'text-yellow-500' : 'text-green-600'}`}>{plan.status}</span>
                          <p className="text-sm text-gray-700">Amount: ${plan.amount}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No active plans found.</p>
                  )}
                </div>
              </section>

              {/* Clubs Followed Section */}
              <section className="mb-10">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Clubs You Follow</h2>
                  <div>
                    <Link to={`/user/follow-team/1}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">Follow</Link>
                  </div>
                </div>
                <div className="space-y-6">
                  {clubs.length > 0 ? (
                    clubs.map((club) => (
                      <div key={club.club_id} className="bg-white p-5 rounded-lg shadow flex justify-between items-center border-l-4 border-blue-500">
                        <h3 className="text-lg font-bold text-gray-700">{club.club_name}</h3>
                        <div>
                          <button onClick={() => handleRemoveClub(club.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Unfollow</button>
                          {/* {subscriptionActive && (
                            <Link to={`/user/follow-team/${club.club_id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">Follow</Link>
                          )} */}

                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">You're not following any clubs yet.</p>
                  )}
                </div>
              </section>

              {/* Players Followed Section */}
              <section className="mb-10">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Players You Follow</h2>
                  <div>
                    <Link to={`/user/follow-player/1`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">Follow</Link>
                  </div>
                </div>
                <div className="space-y-6">
                  {players.length > 0 ? (
                    players.map((player) => (
                      <div key={player.player_id} className="bg-white p-5 rounded-lg shadow flex justify-between items-center border-l-4 border-green-500">
                        <div className="flex items-center">
                          {player.photo && <img src={player.photo} alt={player.name} className="w-12 h-12 rounded-full mr-4" />}
                          <div>
                            <h3 className="text-lg font-bold text-gray-700">{player.name}</h3>
                            <p className="text-sm text-gray-500">{player.position} - {player.current_club_name}</p>
                          </div>
                        </div>
                        <div>
                          <button onClick={() => handleRemovePlayer(player.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Unfollow</button>
                          {/* {subscriptionActive && (
                            <Link to={`/user/follow-player/${player.player_id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">Follow</Link>
                          )} */}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">You're not following any players yet.</p>
                  )}
                </div>
              </section>

              {/* Account Deactivation Section */}
              <section className="border-t pt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Account Management</h2>
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h3 className="text-xl font-bold text-red-600 mb-3">Deactivate Your Account</h3>
                  <p className="text-gray-700 mb-4">
                    Warning: Deactivating your account will remove all your data and cannot be undone.
                    All your subscriptions, followed clubs, and players will be permanently deleted.
                  </p>
                  <button
                    onClick={handleOpenDeactivateModal}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Deactivate Account
                  </button>
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      {/* Deactivation Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold text-red-600 mb-4">Are you sure?</h3>
            <p className="text-gray-700 mb-6">
              This action cannot be undone. To confirm, please type <strong>"deactivate account"</strong> in the field below.
            </p>

            <div className="mb-6">
              <label htmlFor="confirmDeactivate" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmation text:
              </label>
              <input
                type="text"
                id="confirmDeactivate"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 p-3 border"
                placeholder="Type 'deactivate account' to confirm"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleCloseDeactivateModal}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeactivateAccount}
                disabled={!deactivateButtonEnabled}
                className={`px-6 py-2 rounded-lg text-white ${deactivateButtonEnabled
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-red-300 cursor-not-allowed'
                  } transition-colors`}
              >
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}

export default UserProfile;
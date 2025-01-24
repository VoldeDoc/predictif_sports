import { useEffect, useState } from 'react';
import { AuthLayout } from '@/components/Layout/layout';
import useDashBoardManagement from '@/hooks/useDashboard';
import { toast } from 'react-toastify';
import Loader from '@/pages/Ui/loader';
import { Link } from 'react-router-dom';

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
  const [plans, setPlans] = useState<Plan[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [subscriptionActive, setSubscriptionActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

        const data = await getUserPlan();
        console.log(data[0][0]);

        setPlans(data[0][0] || []);
        const clubsFollowed = await getClubFollowed();
        setClubs(clubsFollowed[0] || []);
        const playersFollowed = await getPlayerFollowed();
        setPlayers(playersFollowed[0] || []);

        // if (data[0] && data[0][0].payment_status === 'active') {
        //   setSubscriptionActive(true);
        // }

        clearTimeout(timeoutId);
        setError(null);
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          setError('Request timed out. Please check your network connection.');
        } else {
          setError('Failed to fetch data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-10 rounded-lg shadow-2xl max-w-3xl w-full">
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
            </>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}

export default UserProfile;
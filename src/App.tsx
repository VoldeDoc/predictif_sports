import { PrimeReactProvider } from 'primereact/api';
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Signin from "@/pages/auth/signin";
import Loading from "@/utils/Loading";
import Signup from "@/pages/auth/signup";

import ButtonT from "@/pages/Ui/button";
import ExampleForm from "./pages/Ui/textinput";
import Otp_Verification from "@/pages/auth/otpVerification";
import Dashboard_T from "@/pages/dashboard";
import Predictivo_copier from "./pages/dashboard/predictivo_copier/Index";
import Prematch_alerts from "./pages/dashboard/prematch_alerts";
import Inplay_alerts from "./pages/dashboard/inplay_alerts";
import FixturesT from "./pages/dashboard/fixtures";
import Home from "./pages/home/home_page";
import NotFound from "./pages/home/notFound/notFound";
import ForumT from "./pages/dashboard/forum";
import Message_Box from "./pages/dashboard/message_box";
import Forum_groups from "./pages/dashboard/forum_group.tsx";
import Home1 from "./components/landingPage/HomePage/Home1.tsx";
import Strategies from "./pages/home/Strategic_analysis/index.tsx";
import Expert from "./pages/home/Expert_analysis/index.tsx";
import Heading from "./pages/home/Head_Head/index.tsx";
import Fantasy from "./pages/home/Fantasy_league/index.tsx";
import ProgressPage from "./components/Dashboard/Survey/Tool/progressModal.tsx";
import SurveyPage from "./pages/dashboard/survey/index.tsx";
import CreateGroup from "./pages/dashboard/create_grouo/index.tsx";
import User_group from "./pages/dashboard/user_group/index.tsx";
import ALl_Groups from "./pages/dashboard/all_groups/index.tsx";
import GroupSettingsPage from "./components/Dashboard/ForumGroup.tsx/Tool/Setting.tsx";
import Update_Group from "./pages/dashboard/update_group/index.tsx";
import AddRoles from "./pages/dashboard/add_roles/index.tsx";
import Add_Members from "./pages/dashboard/add_members/index.tsx";
import AllUsersPage from "./components/Dashboard/ForumGroup.tsx/group/AllUsers.tsx";
import RemoveMember from "./components/Dashboard/ForumGroup.tsx/group/RemoveMember.tsx";
import GeneralStrategyPage from "./pages/dashboard/general_strategy/index.tsx";
import ProtectedRoute from "./services/protected-auth.tsx";
import PresetRulesPage from "./pages/dashboard/preset_rules/index.tsx";
import ImportRulesPage from "./pages/dashboard/import_rules/index.tsx";
import OtpForgetPwdVerification from './components/Auth/OtpForgetPassowrd.tsx';
import Forget_PasswordEmail from '@/pages/auth/forgetPasswordemail.tsx';
import ForgetPassword from './components/Auth/ForgetPassword.tsx';
import Change_Password from './pages/auth/changpassword.tsx';
import Change_PasswordEmail from './pages/auth/changepasswordemail.tsx';
import OtpChangePwdVerification from './components/Auth/OtpChangePassword.tsx';
import User_Profile from './pages/dashboard/user_profile/index.tsx';

import CreateStrategyPage from './pages/dashboard/create_strategy/index.tsx';
import StrategyPage from './pages/Strategies/index.tsx';
import UpdateStrategyPage from './components/Dashboard/PredictivoCopier/updateStrategyPage.tsx';
import MatchSchedulePage from './pages/dashboard/match_schedule/index.tsx';
import MatchDetails from './components/Dashboard/MatchSchedule/MatchDetails.tsx';
import { DashboardProvider } from './components/Chart/chartContext.tsx';
import SubscriptionPlan from './components/Dashboard/SubscrptionPlans/Subscription.tsx';
import CheckoutPage from './components/Stripe/CheckoutPage.tsx';
import FollowPlayers from './components/Dashboard/Survey/Followings/PlayerFollowing.tsx';

import SuccessPage from './components/Stripe/success.tsx';
import FollowTeam from './components/Dashboard/Survey/Followings/TeamFollowing.tsx';
import PlayerDetails from './components/Dashboard/PrematchAlerts/PlayerDetails.tsx';
import TeamDetails from './components/Dashboard/PrematchAlerts/TeamDetails.tsx';
import PaystackSuccessPage from './components/Stripe/paySuccessCheckoutPage.tsx';
import EventDetails from './components/Dashboard/PrematchAlerts/EventDetails.tsx';
import Sports_page from './pages/home/sports_page/sports_page.tsx';
import MatchInfo from './components/landingPage/Sport/MatchInfo/MatchInfo.tsx';
import FantasyLeagueDashPage from './pages/dashboard/fantasy_league/fantasyleague_page.tsx';
import Dash_Sports from './pages/dashboard/dash_sports/dash_sports.tsx';
import Privacy from './components/landingPage/Privacy/privacy.tsx';
import Terms from './components/landingPage/TermsConditions.tsx/Terms.tsx';

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <PrimeReactProvider >
      <main>
        {loading ? (
          <Loading message="please wait..." />
        ) : (
          <>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home1 />} />
              <Route path="/strategies" element={<Strategies />} />
              <Route path="/experts" element={<Expert />} />
              <Route path="/head" element={<Heading />} />
              <Route path="/fantasy" element={<Fantasy />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms-of-conditions" element={<Terms />} />

              <Route path="/sports" element={<Sports_page />} />
              <Route path="/dash-sports" element={<Dash_Sports />} />
              {/* <Route path="/sports/match:/team1-:team2" element={<MatchInfo />} /> */}
              <Route path="/sports/match" element={<MatchInfo matchDetails={{ meta_data: { id: '', home_club: '', away_club: '', home_club_logo: '', away_club_logo: '', match_type: 'Coming Match' } }} />} />

              {/* Authentication */}
              <Route path="/auth/signin" element={<Signin />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/forget-passwordmail" element={<Forget_PasswordEmail />} />
              <Route path="/auth/otp-verification" element={<Otp_Verification />} />
              <Route path="/auth/otp-forgetpwd" element={<OtpForgetPwdVerification />} />
              <Route path="/auth/forget-password" element={<ForgetPassword />} />

              {/* Dashboard */}

              <Route path="/dashboard" element={<ProtectedRoute>
                <DashboardProvider>
                <Dashboard_T />
                </DashboardProvider>
                </ProtectedRoute>} />

              <Route path="/user/profile" element={<ProtectedRoute><User_Profile /></ProtectedRoute>} />
              <Route path="/fantasy-league" element={<ProtectedRoute><FantasyLeagueDashPage /></ProtectedRoute>} />
              <Route path="/auth/change-passwordmail" element={<ProtectedRoute><Change_PasswordEmail /></ProtectedRoute>} />
              <Route path="/auth/change-password" element={<ProtectedRoute><Change_Password /></ProtectedRoute>} />
              <Route path="/auth/otp-changepwd" element={<OtpChangePwdVerification />} />
              <Route path="/predictivo-copier" element={<ProtectedRoute><Predictivo_copier /></ProtectedRoute>} />
              <Route path="/prematch-alerts" element={<ProtectedRoute><Prematch_alerts /></ProtectedRoute>} />
              <Route path="/inplay-alerts" element={<ProtectedRoute><Inplay_alerts /></ProtectedRoute>} />
              <Route path="/user/strategies" element={<ProtectedRoute><StrategyPage/></ProtectedRoute>} />
              <Route path="/fixtures" element={<ProtectedRoute><FixturesT /></ProtectedRoute>} />
              <Route path="/forum" element={<ProtectedRoute><ForumT /></ProtectedRoute>} />
              <Route path="/forum/messages/:id" element={<ProtectedRoute><Message_Box /></ProtectedRoute>} />
              <Route path="/groups" element={<ProtectedRoute><Forum_groups /></ProtectedRoute>} />
              <Route path="/survey" element={<ProtectedRoute><SurveyPage /></ProtectedRoute>} />
              <Route path="/progress-survey" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
              <Route path="/create-group" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>} />

              {/* Protected Routes */}
              <Route path="/user/user-group/:id" element={<ProtectedRoute><User_group /></ProtectedRoute>} />

              <Route path="/user/settings/:id" element=
                {<ProtectedRoute><GroupSettingsPage /></ProtectedRoute>} />
              <Route path="/user/all-groups" element={<ProtectedRoute><ALl_Groups /></ProtectedRoute>} />
              <Route path="/user/update-group/:id" element={<ProtectedRoute><Update_Group /></ProtectedRoute>} />
              <Route path="/user/add-members/:id" element={<ProtectedRoute><Add_Members /></ProtectedRoute>} />
              <Route path="/user/role/:id" element={<ProtectedRoute><AddRoles /></ProtectedRoute>} />
              <Route path="/user/all-users/:id" element={<ProtectedRoute><AllUsersPage /></ProtectedRoute>} />
              <Route path="/user/remove-users/:id" element={<ProtectedRoute><RemoveMember /></ProtectedRoute>} />
              <Route path="/user/strategy/:strategy_id" element={<ProtectedRoute><GeneralStrategyPage /></ProtectedRoute>} />

              <Route path="/user/strategies" element={<ProtectedRoute><StrategyPage /></ProtectedRoute>} />

              <Route path="/user/create-strategy/:strategy_id" element={<ProtectedRoute><CreateStrategyPage /></ProtectedRoute>} />

              <Route path="/user/update-strategy/:strategy_id" element={<ProtectedRoute><UpdateStrategyPage /></ProtectedRoute>} />

              <Route path="/user/preset/" element={<ProtectedRoute><PresetRulesPage /></ProtectedRoute>} />

              <Route path="/match-schedule" element={<ProtectedRoute><MatchSchedulePage /></ProtectedRoute>} />

              <Route path="/match-schedule/:id" element={<ProtectedRoute><MatchDetails /></ProtectedRoute>} />

              <Route path="/user/import-rules" element={<ProtectedRoute><ImportRulesPage /></ProtectedRoute>}></Route>
              {/* Ui */}

                <Route path="/user/subscribe-plan/:id" element={<ProtectedRoute><SubscriptionPlan /></ProtectedRoute>}></Route>

                <Route path="/user/follow-team/:id" element={<ProtectedRoute><FollowTeam /></ProtectedRoute>}></Route>

                <Route path="/user/follow-player/:id" element={<ProtectedRoute><FollowPlayers /></ProtectedRoute>}></Route>

                <Route path="/user/checkout/:id" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>}></Route>

                <Route path="/user/payment-success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>}></Route>

                <Route path="/user/payment-success/paystack" element={<ProtectedRoute><PaystackSuccessPage /></ProtectedRoute>}></Route>


                <Route path="/user/player/:player_id" element={<ProtectedRoute><PlayerDetails /></ProtectedRoute>}></Route>

                <Route path="/user/team/:team_id" element={<ProtectedRoute><TeamDetails /></ProtectedRoute>}></Route>

            
                <Route path="/user/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>}></Route>

              {/*stripe payment*/}
              {/* <Route path="/user/checkout" element={
                <ProtectedRoute>
                 <CheckoutPage />
                </ProtectedRoute>
              } ></Route> */}

              <Route path="/ui/button" element={<ButtonT />} />
              <Route path="/ui/textinput" element={<ExampleForm />} />
            </Routes>
          </>
        )}
      </main>
    </PrimeReactProvider>
  );
}

export default App;
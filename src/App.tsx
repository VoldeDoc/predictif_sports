import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Signin from "@/pages/auth/signin";
import Loading from "@/utils/Loading";
import OtpVerification from "@/pages/auth/otpVerification";
import Signup from "@/pages/auth/signup";

import ButtonT from "@/pages/Ui/button";
import ExampleForm from "./pages/Ui/textinput";
import Forget_Password from "@/pages/auth/forgetPassword";
import Otp_Verification from "@/pages/auth/otpVerification";
import Dashboard_T from "@/pages/dashboard";
import Predictivo_copier from "./pages/dashboard/predictivo_copier/Index";
import Prematch_alerts from "./pages/dashboard/prematch_alerts";
import Inplay_alerts from "./pages/dashboard/inplay_alerts";
import Daily_predictivo from "./pages/dashboard/daily_predictivo";
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
    <>
      <main>
        {loading ? (
          <Loading message="please wait..." />
        ) : (
          <>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home1 />} />
              <Route path="/strategies" element={<Strategies/>} />
              <Route path="/experts" element={<Expert/>} />
              <Route path="/head" element={<Heading/>} />
              <Route path="/fantasy" element={<Fantasy/>} />

              {/* Authentication */}
              <Route path="/auth/signin" element={<Signin />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route
                path="/auth/forget-password"
                element={<Forget_Password />}
              />
              <Route
                path="/auth/otp-verification"
                element={<Otp_Verification />}
              />
              <Route path="/auth/signin" element={<OtpVerification />} />

              {/* Dashboard */}
              <Route path="/dashboard" element={<Dashboard_T />} />
              <Route path="/predictivo-copier" element={<Predictivo_copier />} />
              <Route path="/prematch-alerts" element={<Prematch_alerts />} />
              <Route path="/inplay-alerts" element={<Inplay_alerts/>} />
              <Route path="/daily-predictivo" element={<Daily_predictivo/>} />
              <Route path="/fixtures" element={<FixturesT/>} />
              <Route path="/forum" element={<ForumT/>} />
              <Route path="/messages" element={<Message_Box/>} />
              <Route path="/groups" element={<Forum_groups/>} />
            

              {/* Ui */}
              <Route path="/ui/button" element={<ButtonT />} />
              <Route path="/ui/textinput" element={<ExampleForm />} />
            </Routes>
          </>
        )}
      </main>
    </>
  );
}

export default App;

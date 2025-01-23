import { AuthLayout } from "../Layout/layout";
import Card from "../Ui/Card";
import GroupCard from "../Ui/GroupCard";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa";
import "flatpickr/dist/themes/airbnb.css";
import moment from "moment-timezone";
import { RootState } from "@/context/store/rootReducer";
import { useSelector } from "react-redux";
import useDashBoardManagement from "@/hooks/useDashboard";
import { useEffect, useState, useMemo } from "react";
import TeamCard from "../DashboardComponents/TeamCard";
import PlayerCard from "../DashboardComponents/PlayerCard";
import ResultsMatches from "../DashboardComponents/ResultsMatch";
import TodayMatches from "../DashboardComponents/TodayMatch";
import UpcomingMatches from "../DashboardComponents/upComingMatch";

interface Club {
  id: number;
  name: string;
  club_name: string;
  club_id: string;
}

interface Player {
  id: number;
  name: string;
  player_name: string;
  photo: string;
  current_club_name: string;
  position: string;
  position_short: string;
}

const timeZone = "Africa/Lagos";

const getGreeting = (timeZone: string) => {
  const now = moment().tz(timeZone);
  const hour = now.hour();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const Dashboard = () => {
  const { getClubFollowed, getPlayerFollowed, getMyStrategies } = useDashBoardManagement();
  const userdata = useSelector((state: RootState) => state.auth?.user);
  const username = userdata?.username;
  const [activeTab, setActiveTab] = useState("upcoming");
  const [clubFollowed, setClubFollowed] = useState<Club[]>([]);
  const [playerFollowed, setPlayerFollowed] = useState<Player[]>([]);
  const [playerFollowedCount, setPlayerFollowedCount] = useState(0);
  const dateRange: [Date, Date] = [
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 5)),
  ];
  const [strategies, setStrategies] = useState({
    all: 0,
    active: 0,
    stop: 0,
    expired: 0,
  });
  const [currentStrategyType, setCurrentStrategyType] = useState<keyof typeof strategies>("all");
  const strategyTypes = ["all", "active", "stop", "expired"];

  useEffect(() => {
    (async () => {
      try {
        const clubFollowedData = await getClubFollowed();
        const flattenedClubsFollowed = clubFollowedData.flat();
        console.log(flattenedClubsFollowed);
        
        setClubFollowed(flattenedClubsFollowed);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getClubFollowed]);

  useEffect(() => {
    (async () => {
      try {
        const PlayerFollowedData = await getPlayerFollowed();
        const flattenedPlayerFollowed = PlayerFollowedData.flat();
        console.log(flattenedPlayerFollowed);
        
        setPlayerFollowed(flattenedPlayerFollowed);
        setPlayerFollowedCount(flattenedPlayerFollowed.length);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [ getPlayerFollowed]);

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const allStrategies = await getMyStrategies("all");
        const activeStrategies = await getMyStrategies("active");
        const stopStrategies = await getMyStrategies("stop");
        const expiredStrategies = await getMyStrategies("expired");

        setStrategies({
          all: allStrategies.length,
          active: activeStrategies.length,
          stop: stopStrategies.length,
          expired: expiredStrategies.length,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchStrategies();
  }, [getMyStrategies]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStrategyType((prevType: keyof typeof strategies) => {
        const currentIndex = strategyTypes.indexOf(prevType);
        const nextIndex = (currentIndex + 1) % strategyTypes.length;
        return strategyTypes[nextIndex] as keyof typeof strategies;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleTabClick = (tab: string) => setActiveTab(tab);

  const renderContent = useMemo(() => {
    if (activeTab === "upcoming") {
      return <UpcomingMatches />;
    } else if (activeTab === "today") {
      return <TodayMatches />;
    } else if (activeTab === "results") {
      return <ResultsMatches />;
    }
  }, [activeTab]);

  const formatDateRange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    if (!start || !end) return "Select a date range";

    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString(
      "en-US",
      options
    )}`;
  };

  return (
    <AuthLayout>
      <div className="p-4">
        <div className="flex md:flex-row gap-5 md:gap-0 flex-col justify-between mb-5">
          <div className="space-y-2">
            <div className="font-bold text-xl md:text-3xl">{`${getGreeting(
              timeZone
            )}, ${username}`}</div>
            <p className="whitespace-normal break-words text-xs md:text-base">
              {dateRange[0] && dateRange[1]
                ? `Here is your Predictivo report from ${formatDateRange(dateRange)}.`
                : "Select a date range."}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-8 col-span-12 space-y-5">
            <Card>
              <div className="grid xl:grid-cols-3 lg:grid-cols-2 col-span-1 gap-3">
                <GroupCard />
              </div>
            </Card>
            <Card
              title="Advanced Features"
              subtitle="Showing statistics"
            >
              <div className="flex md:flex-row flex-col items-start gap-5 w-[100%]">
                <div className="relative md:w-[70%]">
                  <div className="flex border-b border-gray-200 mb-4">
            
                    <button
                      className={`py-2 px-4 text-sm font-medium ${
                        activeTab === "upcoming"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600"
                      }`}
                      onClick={() => handleTabClick("upcoming")}
                    >
                      Upcoming
                    </button>
                    <button
                      className={`py-2 px-4 text-sm font-medium ${
                        activeTab === "today"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600"
                      }`}
                      onClick={() => handleTabClick("today")}
                    >
                      Today
                    </button>
                    <button
                      className={`py-2 px-4 text-sm font-medium ${
                        activeTab === "results"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600"
                      }`}
                      onClick={() => handleTabClick("results")}
                    >
                      Results
                    </button>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    {renderContent}
                  </div>
                </div>
                <div className="space-y-3 md:w-[30%] w-full mt-10">
                  <Card title="Players Followed" headerslot={<IoEyeOutline />}>
                    <div className="flex flex-col justify-start items-start">
                      <div className="font-bold text-2xl">{playerFollowedCount}</div>
                        <hr className="border-2 border-gray-300"/>
                    </div>
                  </Card>
                  <Card title="Strategies" headerslot={<FaRegCalendarCheck />}>
                    <div className="flex flex-col justify-start items-start">
                      <div className="font-bold text-2xl">{strategies[currentStrategyType]}</div>
                      <div className="flex items-center gap-3">
                        <span className="text-base capitalize">{currentStrategyType}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
          <div className="lg:col-span-4 col-span-12 space-y-5">
            <TeamCard clubFollowed={clubFollowed} />
            <PlayerCard playersFollowed={playerFollowed} />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Dashboard;
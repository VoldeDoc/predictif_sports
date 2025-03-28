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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TeamCard from "../DashboardComponents/TeamCard";
import PlayerCard from "../DashboardComponents/PlayerCard";
import ResultsMatches from "../DashboardComponents/ResultsMatch";
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
  const { getClubFollowed, getPlayerFollowed, getMyStrategies, getNewsEvent, getUpcomingMatch,getResultMatch } = useDashBoardManagement();
  const userdata = useSelector((state: RootState) => state.auth?.user);
  const username = userdata?.username;
  const [activeTab, setActiveTab] = useState("upcoming");
  const [clubFollowed, setClubFollowed] = useState<Club[]>([]);
  const [playerFollowed, setPlayerFollowed] = useState<Player[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [resultsMatches, setResultsMatches] = useState<Match[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);

  const dateRange: [Date, Date] = [
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 5)),
  ];
  interface Event {
    id: number;
    subject_id: number;
    heading: string;
    sub_heading: string;
    sub_description: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
  }

  interface Match {
    homeTeam: {
      name: string;
      logo: string;
      score?: number;
    };
    awayTeam: {
      name: string;
      logo: string;
      score?: number;
    };
    startTime: Date;
    isLive?: boolean;
  }
  
  const [strategies, setStrategies] = useState({
    all: 0,
    active: 0,
    stop: 0,
    expired: 0,
  });
  const [currentStrategyType] = useState<keyof typeof strategies>("all");
  // const strategyTypes = ["all", "active", "stop", "expired"];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          clubFollowedData,
          playerFollowedData,
          allStrategies,
          activeStrategies,
          stopStrategies,
          expiredStrategies,
          eventsResponse,
          upcomingMatchesResponse,
          resultsMatchesResponse
        ] = await Promise.all([
          getClubFollowed(),
          getPlayerFollowed(),
          getMyStrategies("all"),
          getMyStrategies("active"),
          getMyStrategies("stop"),
          getMyStrategies("expired"),
          getNewsEvent(),
          getUpcomingMatch(),
          getResultMatch()
        ]);

        // Set club followed data
        const flattenedClubsFollowed = clubFollowedData.flat();
        setClubFollowed(flattenedClubsFollowed);

        // Set player followed data
        const flattenedPlayerFollowed = playerFollowedData.flat();
        setPlayerFollowed(flattenedPlayerFollowed);
        
        // Set strategies data
        setStrategies({
          all: allStrategies.length,
          active: activeStrategies.length,
          stop: stopStrategies.length,
          expired: expiredStrategies.length,
        });

        // Set news events
        const EventResponse = eventsResponse[0];
        setEvents(EventResponse);

        // Set upcoming matches
        setUpcomingMatches(upcomingMatchesResponse[0]);
        setLoadingUpcoming(false);

        // Set results matches
        const transformedMatches: Match[] = resultsMatchesResponse[0].map((match: any) => ({
          homeTeam: {
            name: match.home_club_name,
            logo: match.home_club_logo,
            score: match.home_score,
          },
          awayTeam: {
            name: match.away_club_name,
            logo: match.away_club_logo,
            score: match.away_score,
          },
          startTime: new Date(`${match.game_start_date}T${match.game_start_time}`),
        }));
        setResultsMatches(transformedMatches);
        setLoadingResults(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoadingUpcoming(false);
        setLoadingResults(false);
      }
    };

    fetchDashboardData();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentStrategyType((prevType: keyof typeof strategies) => {
  //       const currentIndex = strategyTypes.indexOf(prevType);
  //       const nextIndex = (currentIndex + 1) % strategyTypes.length;
  //       return strategyTypes[nextIndex] as keyof typeof strategies;
  //     });
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  const handleTabClick = (tab: string) => setActiveTab(tab);


  const renderContent = () => {
    switch (activeTab) {
      case "upcoming":
        return <UpcomingMatches matches={upcomingMatches} loading={loadingUpcoming} />;
     case "results":
      return <ResultsMatches matches={resultsMatches} loading={loadingResults} />;
      default:
        return null;
    }
  };

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
                      className={`py-2 px-4 text-sm font-medium ${activeTab === "upcoming"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600"
                        }`}
                      onClick={() => handleTabClick("upcoming")}
                    >
                      Upcoming
                    </button>
                   
                    <button
                      className={`py-2 px-4 text-sm font-medium ${activeTab === "results"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600"
                        }`}
                      onClick={() => handleTabClick("results")}
                    >
                      Results
                    </button>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    {renderContent()}
                  </div>
                </div>
                <div className="space-y-3 md:w-[30%] w-full mt-10">
                  <Card title="Predictive News" headerslot={<IoEyeOutline />} className="h-48 overflow-y-auto">
                    <div className="flex flex-col justify-start items-start ">
                      {events.map((event) => (
                        <Link to={`/user/events/${event.id}`}>
                          <div key={event.id} className="mb-4">
                            <div className="font-bold text-lg">{event.heading}</div>
                            <div className="text-xs text-gray-500">{moment(event.created_at).format('LLL')}</div>
                            <hr className="border-2 border-gray-300 my-2" />
                          </div></Link>
                      ))}
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
            {/* <EventCard/> */}
          </div>
          <div className="lg:col-span-4 col-span-12 space-y-5">
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Dashboard;
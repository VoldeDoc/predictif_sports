import { Link } from "react-router-dom";
import useDashBoardManagement from "@/hooks/useDashboard";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import useJoyride from "./JoyRide";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store/rootReducer";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const GroupCard = () => {
  const [allTimeStrategiesCount, setAllTimeStrategiesCount] = useState(0);
  const [matchAlerts, setMatchAlerts] = useState(0);
  const [clubFollowedCount, setClubFollowedCount] = useState(0);
  const [loadingStrategies, setLoadingStrategies] = useState(true);
  const [loadingMatchAlerts, setLoadingMatchAlerts] = useState(true);
  const [loadingClubsFollowed, setLoadingClubsFollowed] = useState(true);
  const { getMyStrategies, getMatchAlert, getClubFollowed } = useDashBoardManagement();
  const userdetail = useSelector((state: RootState) => state.auth?.user);
  const id = userdetail?.id;

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const data = await getMyStrategies('all');
        if (Array.isArray(data) && Array.isArray(data[0])) {
          setAllTimeStrategiesCount(data[0].length);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingStrategies(false);
      }
    };

    fetchStrategies();
  }, [getMyStrategies]);

  useEffect(() => {
    const fetchMatchAlerts = async () => {
      try {
        const matchAlertsData = await getMatchAlert();
        if (Array.isArray(matchAlertsData) && matchAlertsData.length > 0) {
          setMatchAlerts(matchAlertsData.length);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMatchAlerts(false);
      }
    };

    fetchMatchAlerts();
  }, [getMatchAlert]);

  useEffect(() => {
    const fetchClubsFollowed = async () => {
      try {
        const clubsFollowed = await getClubFollowed();
        const flattenedClubsFollowed = clubsFollowed.flat();
        if (Array.isArray(flattenedClubsFollowed) && flattenedClubsFollowed.length > 0) {
          setClubFollowedCount(flattenedClubsFollowed.length);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingClubsFollowed(false);
      }
    };

    fetchClubsFollowed();
  }, [getClubFollowed]);

  const steps = [
    {
      target: '.all-time-strategies-step',
      content: 'Click to view strategies',
    },
    {
      target: '.live-matches-step',
      content: 'Click to view stats based on team you follow',
    },
    {
      target: '.picks-today',
      content: 'Click to view picks today',
    },
  ];

  const { JoyrideComponent } = useJoyride(steps);

  const statistics = [
    {
      title: allTimeStrategiesCount > 1 ?  "All Time Strategies" : "All Time Strategy",
      count: allTimeStrategiesCount === 0 ? "0" : allTimeStrategiesCount,
      bg: "bg-[#0C21C1]",
      text: "text-white",
      className: "all-time-strategies-step",
      route: "/user/strategies",
      loading: loadingStrategies
    },
    {
      title: matchAlerts > 1 ? "Live Matches Today" : "Live Match today",
      count: matchAlerts === 0 ? "0" : matchAlerts,
      bg: "bg-[#97060B]",
      text: "text-white",
      className: "live-matches-step",
      route: `/match-schedule/${id}`,
      loading: loadingMatchAlerts
    },
    {
      title: clubFollowedCount > 1 ? "Teams followed " : "Team followed",
      count: clubFollowedCount === 0 ? "0" : clubFollowedCount,
      bg: "bg-[#1F1F21]",
      text: "text-white",
      className: "picks-today",
      route: "/user/profile",
      loading: loadingClubsFollowed
    },
  ];

  return (
    <>
      {statistics.map((item, i) => (
        <Link to={item.route} key={i} className="w-full">
          <div className={`${item.bg} ${item.className} flex w-full justify-between gap-5 items-center text-white p-4`}>
            {item.loading ? (
              <Skeleton height={70} width="100%" />
            ) : (
              <>
                <span className="block mb-6 text-4xl text-white font-medium">
                  {item.count}
                </span>
                <div className="flex justify-between gap-5">
                  <span className="block text-xs shrink-0 text-white font-medium mb-6">
                    {item.title}
                  </span>
                  <div className="text-xl text-white">
                    <MdKeyboardArrowRight />
                  </div>
                </div>
              </>
            )}
          </div>
        </Link>
      ))}
      {/* Joyride Component */}
      {JoyrideComponent}
    </>
  );
};

export default GroupCard;
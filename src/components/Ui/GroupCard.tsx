import { Link } from "react-router-dom";
import useDashBoardManagement from "@/hooks/useDashboard";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import useJoyride from "./JoyRide";

const GroupCard = () => {
  const [allTimeStrategiesCount, setAllTimeStrategiesCount] = useState(0);
  const [matchAlerts, setMatchAlerts] = useState(0);
  const { getMyStrategies, getMatchAlert } = useDashBoardManagement();

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyStrategies('all');
        if (Array.isArray(data) && Array.isArray(data[0])) {
          setAllTimeStrategiesCount(data[0].length);
        }
        const matchAlertsData = await getMatchAlert();
        if (Array.isArray(matchAlertsData) && matchAlertsData.length > 0) {
          setMatchAlerts(matchAlertsData.length);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getMyStrategies, getMatchAlert]);

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
      title: "All Time Strategies",
      count: allTimeStrategiesCount === 0 ? "0" : allTimeStrategiesCount,
      bg: "bg-[#0C21C1]",
      text: "text-white",
      className: "all-time-strategies-step",
      route: "/strategies"
    },
    {
      title: matchAlerts > 1 ? "Live Matches Today" : "Live Match today",
      count: matchAlerts === 0 ? "0" : matchAlerts,
      bg: "bg-[#97060B]",
      text: "text-white",
      className: "live-matches-step",
      route: "/live-matches"
    },
    {
      title: "Picks Today",
      count: "0",
      bg: "bg-[#1F1F21]",
      text: "text-white",
      className: "picks-today",
      route: "/picks-today"
    },
  ];

  return (
    <>
      {statistics.map((item, i) => (
        <Link to={item.route} key={i} className="w-full">
          <div
            className={`${item.bg} ${item.className} flex w-full justify-between gap-5 items-center text-white p-4`}
          >
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
          </div>
        </Link>
      ))}
      {/* Joyride Component */}
      {JoyrideComponent}
    </>
  );
};

export default GroupCard;
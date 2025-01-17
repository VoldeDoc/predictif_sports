import React from "react";
import { ApexOptions } from "apexcharts";
import { useEffect, useState, useCallback } from "react";
import useDashBoardManagement from "@/hooks/useDashboard";
import Chart from "react-apexcharts";
import useJoyride from "../Ui/JoyRide";

interface LiveBarChartProps {
  height?: number;
}
const steps = [
  {
    target: '.live-data',
    content: 'View live data of the match currently ongoing',
  },
 
];
const LiveBarChart: React.FC<LiveBarChartProps> = React.memo(({ height = 410 }) => {
  const { JoyrideComponent } = useJoyride(steps);
  const { getMatchAlert } = useDashBoardManagement();
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([
    { name: "Home", data: [] },
    { name: "Away", data: [] },
  ]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await getMatchAlert();
      console.log(response);
      const liveData = response?.[0]?.live_data;
      if (liveData) {
        const homeData = [
          liveData.home_score ?? 0,
          liveData.home_red_card ?? 0,
          liveData.home_yellow_card ?? 0,
          liveData.home_corner_kick ?? 0,
          liveData.home_penalty_kick ?? 0,
          liveData.home_free_kick ?? 0,
          liveData.home_throwing ?? 0,
        ];

        const awayData = [
          liveData.away_score ?? 0,
          liveData.away_red_card ?? 0,
          liveData.away_yellow_card ?? 0,
          liveData.away_corner_kick ?? 0,
          liveData.away_penalty_kick ?? 0,
          liveData.away_free_kick ?? 0,
          liveData.away_throwing ?? 0,
        ];

        setSeries([
          { name: "Home", data: homeData },
          { name: "Away", data: awayData },
        ]);
      } else {
        console.warn("No live data available");
      }
    } catch (error) {
      console.error("Error fetching live data:", error);
    } finally {
      setLoading(false);
    }
  }, [getMatchAlert]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const options: ApexOptions = {
    chart: {
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%",
      },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontFamily: "Inter",
      offsetY: 0,
      markers: {
        offsetY: 0,
        offsetX: -5,
      },
      itemMargin: { horizontal: 18, vertical: 0 },
      labels: { colors: "#475569" },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    yaxis: {
      show: true,
      min: 0,
      max: 10,
      labels: {
        style: {
          colors: "#475569",
          fontFamily: "Inter",
        },
      },
    },
    xaxis: {
      categories: [
        "Scores",
        "Red card",
        "Yellow card",
        "Corner kick",
        "Penalty kick",
        "Free kick",
        "Throwing",
      ],
      labels: {
        offsetY: -3,
        style: {
          colors: "#475569",
          fontFamily: "Inter",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val) => `${val} Events`,
      },
    },
    colors: ["#7B61FF", "#FFB836"],
    grid: {
      show: true,
      borderColor: "#E2E8F0",
      strokeDashArray: 3,
      position: "back",
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  
  {JoyrideComponent}
  return (
    <div className="live-data">
      <Chart
        options={options}
        series={series}
        type="bar"
        height={height}
        width="100%"
      />
    </div>
  );
});

export default LiveBarChart;
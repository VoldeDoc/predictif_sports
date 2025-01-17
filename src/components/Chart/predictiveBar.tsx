import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState, useCallback } from "react";
import useDashBoardManagement from "@/hooks/useDashboard";

interface PredicitiveChartProps {
  height?: number;
}

const PredictiveDataChart: React.FC<PredicitiveChartProps> = React.memo(({ height = 410 }) => {
  const { getMatchAlert } = useDashBoardManagement();
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([
    {
      name: "Home Prediction",
      data: [],
    },
    {
      name: "Away Prediction",
      data: [],
    },
  ]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await getMatchAlert();
      const predictedData = response?.[0]?.predict_data;

      if (predictedData) {
        const homeData = [
          predictedData.home_score ?? 0,
          predictedData.home_red_card ?? 0,
          predictedData.home_yellow_card ?? 0,
          predictedData.home_corner_kick ?? 0,
          predictedData.home_penalty_kick ?? 0,
          predictedData.home_free_kick ?? 0,
          predictedData.home_throwing ?? 0,
        ];

        const awayData = [
          predictedData.away_score ?? 0,
          predictedData.away_red_card ?? 0,
          predictedData.away_yellow_card ?? 0,
          predictedData.away_corner_kick ?? 0,
          predictedData.away_penalty_kick ?? 0,
          predictedData.away_free_kick ?? 0,
          predictedData.away_throwing ?? 0,
        ];

        setSeries([
          { name: "Home Prediction", data: homeData },
          { name: "Away Prediction", data: awayData },
        ]);
      } else {
        console.warn("No predictive data available");
      }
    } catch (error) {
      console.error("Error fetching predictive data:", error);
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
      toolbar: {
        show: false,
      },
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
      itemMargin: {
        horizontal: 18,
        vertical: 0,
      },
      labels: {
        colors: "#475569",
      },
    },
    dataLabels: {
      enabled: false,
    },
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
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

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
      width={"100%"}
    />
  );
});

export default PredictiveDataChart;
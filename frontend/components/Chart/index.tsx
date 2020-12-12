import { IDetectorData } from "@/types/detector";
import React from "react";
import { Wrapper, Title } from "./styles";
import { Line } from "react-chartjs-2";

type IParam = "temp" | "humidity" | "lightning" | "pH";

interface ChartProps {
  detectorData: IDetectorData[];
  param: IParam;
  label: string;
}

export const Chart: React.FC<ChartProps> = ({ detectorData, param, label }) => {
  const data = {
    labels: detectorData.map((item) => item.min_timestamp.slice(0, -9)),
    datasets: [
      {
        label,
        data: detectorData.map((item) => item?.[param]),
        borderColor: "#E86900",
        backgroundColor: "transparent",
        fill: false,
        lineTension: 0.1,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#E86900",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#E86900",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
      },
      {
        label: `Оптимальный показатель`,
        data: Array(detectorData.length).fill(7),
        borderColor: "#60CFBF",
        backgroundColor: "transparent",
        fill: false,
        lineTension: 0.1,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#60CFBF",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#60CFBF",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
      },
    ],
  };

  return (
    <Wrapper>
      <Title>График показателя - {label}</Title>
      <Line data={data} height={600} width={900} />
    </Wrapper>
  );
};

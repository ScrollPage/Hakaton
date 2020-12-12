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

const renderIdeal = (param: IParam) => {
  switch (param) {
    case "temp":
      return 22.86;
    case "humidity":
      return 45.97;
    case "lightning":
      return 43.9;
    case "pH":
      return 6.64;
  }
};

export const Chart: React.FC<ChartProps> = ({ detectorData, param, label }) => {
  const data = {
    labels: detectorData.map((item) => item.min_timestamp.slice(0, -9)),
    datasets: [
      {
        label,
        data: detectorData.map((item) => item?.[param]),
        // data: Array.from(
        //   { length: detectorData.length },
        //   () =>
        //     Math.random() *
        //       (renderIdeal(param) * 1.05 - renderIdeal(param) * 0.95) +
        //     renderIdeal(param) * 0.95
        // ),
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
        label: ` Оптимальный`,
        data: Array(detectorData.length).fill(renderIdeal(param)),
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
        borderWidth: 10,
      },
      {
        label: `  Допустимый разброс`,
        data: Array(detectorData.length).fill(
          param === "pH" ? renderIdeal(param) * 0.95 : renderIdeal(param) * 0.9
        ),
        borderColor: "#CF6060",
        backgroundColor: "transparent",
        fill: false,
        lineTension: 0.1,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#CF6060",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#CF6060",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        borderWidth: 10,
      },
      {
        label: ` Допустимый разброс`,
        data: Array(detectorData.length).fill(
          param === "pH" ? renderIdeal(param) * 1.05 : renderIdeal(param) * 1.1
        ),
        borderColor: "#CF6060",
        backgroundColor: "transparent",
        fill: false,
        lineTension: 0.1,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#CF6060",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#CF6060",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        borderWidth: 10,
      },
    ],
  };

  return (
    <Wrapper>
      <Line data={data} height={600} width={700} />
    </Wrapper>
  );
};

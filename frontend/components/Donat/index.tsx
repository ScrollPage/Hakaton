import { IDetectorData } from "@/types/detector";
import React from "react";
import { Wrapper, Title } from "./styles";
import { Doughnut } from "react-chartjs-2";

type IParam = "temp" | "humidity" | "lightning" | "pH";

interface DonatProps {
  detectorData: IDetectorData[];
  param: IParam;
}

export const Donat: React.FC<DonatProps> = ({ detectorData, param }) => {
  const percentCalc = () => {
    return detectorData.reduce((acc, cur) => {
      if (!cur?.[param] || (cur?.[param] < 0 && param !== "temp")) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  const data = {
    labels: ["Корректные данные", "Некорректные данные"],
    datasets: [
      {
        data: [detectorData.length - percentCalc(), percentCalc()],
        backgroundColor: [
          "rgba(96, 207, 191, 1)",
          "rgba(207, 96, 96, 1)",
          "red",
        ],
        hoverBackgroundColor: [
          "rgba(96, 207, 191, 0.8)",
          "rgba(207, 96, 96, 0.8)",
          "red",
        ],
      },
    ],
  };

  return (
    <Wrapper>
      <Title>Соотношение корректных/некорректных данных</Title>
      <Doughnut data={data} height={269} width={269} />
    </Wrapper>
  );
};

import React, { useState } from "react";
import {
  Wrapper,
  Text,
  Info,
  Num,
  Circle,
  Box,
  Index,
  MyImage,
} from "./styles";
import Link from "next/link";
import { IDetector } from "@/types/detector";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";

const checkGoods = (good: number, isBuy: boolean) => {
  if (isBuy) {
    return "#60CFBF";
  }
  if (good >= 0 && good <= 2) {
    return "#CF6060";
  }
  if (good >= 3 && good <= 5) {
    return "#CFBD60";
  }
  return "#60CFBF";
};

export const Detector: React.FC<{ detector: IDetector }> = ({ detector }) => {
  const [active, setActive] = useState(false);
  const { isBuy } = useUser();

  return (
    <Wrapper>
      {/* <Link href={`/control/${detector.id}`}>
        <a>Данные</a>
      </Link> */}
      <MyImage>
        <Image src="/main/detector.png" height={400} width={500} />
      </MyImage>
      <Info>
        <Box
          onMouseOver={() => setActive(true)}
          onMouseOut={() => setActive(false)}
        >
          <Num>{detector.id}</Num>
          <Circle index={1} good={checkGoods(detector.good_temp, isBuy)} />
          <Circle index={2} good={checkGoods(detector.good_humidity, isBuy)} />
          <Circle index={3} good={checkGoods(detector.good_lightning, isBuy)} />
          <Circle index={4} good={checkGoods(detector.good_pH, isBuy)} />
        </Box>
        {active && (
          <Index>
            <Text>Температура</Text>
            <Text>Влажность</Text>
            <Text>Освещенность</Text>
            <Text>Кислотность</Text>
          </Index>
        )}
      </Info>
    </Wrapper>
  );
};

import React, { useState } from "react";
import { Wrapper, Text, Info, Num, Circle, Box, Index } from "./styles";
import Link from "next/link";
import { IDetector } from "@/types/detector";

export const Detector: React.FC<{ detector: IDetector }> = ({ detector }) => {
  const [active, setActive] = useState(false);

  return (
    <Wrapper>
      <Link href={`/control/${detector.id}`}>
        <a>Данные</a>
      </Link>
      <Info>
        <Box
          onMouseOver={() => setActive(true)}
          onMouseOut={() => setActive(false)}
        >
          <Num>{detector.id}</Num>
          <Circle index={1} isGood={detector.good_temp} />
          <Circle index={2} isGood={detector.good_humidity} />
          <Circle index={3} isGood={detector.good_lightning} />
          <Circle index={4} isGood={detector.good_pH} />
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

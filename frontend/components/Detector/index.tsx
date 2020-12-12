import React from "react";
import { Wrapper, Text } from "./styles";
import Link from "next/link";

export const Detector: React.FC<{ id: number }> = ({ id }) => {
  return (
    <Wrapper>
      <Text>{id}</Text>
      <Link href={`/control/${id}`}>
        <a>Данные</a>
      </Link>
    </Wrapper>
  );
};

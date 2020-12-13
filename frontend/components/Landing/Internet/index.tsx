import Container from "@/components/UI/Container";
import { MyPartic } from "@/components/UI/MyPartic";
import Image from "next/image";
import React from "react";
import { Wrapper, Title, Inner, Box } from "./styles";

export const Internet = () => {
  return (
    <Wrapper>
      <MyPartic />
      <Container>
        <Inner>
          <Title>Нашим сервисом легко пользоваться</Title>
          <Image src="/main/intersect.png" height={594} width={841} />
        </Inner>
      </Container>
    </Wrapper>
  );
};

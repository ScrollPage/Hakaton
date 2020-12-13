import Container from "@/components/UI/Container";
import { MyPartic } from "@/components/UI/MyPartic";
import Image from "next/image";
import React from "react";
import { Wrapper, MyImage, Title, Text, Inner, Strawberry } from "./styles";

export const HowWeDo = () => {
  return (
    <Wrapper>
      <MyPartic />
      <Container>
        <Inner>
          <Title>Как мы это сделаем?</Title>
          <Text>- Установим датчики климата теплицы</Text>
          <Text>- Подключим их к системе MarsBerry Tracker</Text>
          <Text>
            - На основе алгоритмов машинного обучения проанализируем собранные
            данные
          </Text>
          <Text>
            - Дадим рекомендации о том, как сделать ваш урожай идеальным
          </Text>
        </Inner>
      </Container>
      <MyImage>
        <Image src="/main/club_bgc_2.png" height={780} width={644} />
      </MyImage>
      <Strawberry>
        <Image src="/main/club.png" height={192} width={192} />
      </Strawberry>
      <Strawberry>
        <Image src="/main/club.png" height={192} width={192} />
      </Strawberry>
    </Wrapper>
  );
};

import Container from "@/components/UI/Container";
import { MyPartic } from "@/components/UI/MyPartic";
import Image from "next/image";
import React from "react";
import {
  Wrapper,
  Inner,
  Title,
  Main,
  Circle,
  Block,
  Text,
  Subtitle,
} from "./styles";

export const OurTeam = () => {
  return (
    <Wrapper>
      <MyPartic />
      <Container>
        <Inner>
          <Title>Наша команда</Title>
          <Main>
            <Block>
              <Image src="/main/one1.png" height={224} width={186} />
              <Subtitle>Ярослав Парошин</Subtitle>
              <Text>Лидер и product manager </Text>
            </Block>
            <Block ismar>
              <Image src="/main/one2.png" height={224} width={186} />
              <Subtitle>Михаил Гурбанов</Subtitle>
              <Text>Back - end и машинное обучение</Text>
            </Block>
            <Block>
              <Image src="/main/one3.png" height={224} width={186} />
              <Subtitle>Владимир Шаплин</Subtitle>
              <Text>Front - end</Text>
            </Block>
            <Block ismar>
              <Image src="/main/one4.png" height={224} width={186} />
              <Subtitle>Осипов Андрей</Subtitle>
              <Text>Web - desing</Text>
            </Block>
            <Block>
              <Image src="/main/one5.png" height={224} width={186} />
              <Subtitle>Анна Пискарева</Subtitle>
              <Text>Дизайнер, аналитик</Text>
            </Block>
          </Main>
        </Inner>
      </Container>
    </Wrapper>
  );
};

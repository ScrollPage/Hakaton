import Container from "@/components/UI/Container";
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
      <Container>
        <Inner>
          <Title>Наша команда</Title>
          <Main>
            <Block>
              <Circle />
              <Subtitle>Ярослав Парошин</Subtitle>
              <Text>Лидер и product manager </Text>
            </Block>
            <Block>
              <Circle />
              <Subtitle>Михаил Гурбанов</Subtitle>
              <Text>Back - end и машинное обучение</Text>
            </Block>
            <Block>
              <Circle />
              <Subtitle>Владимир Шаплин</Subtitle>
              <Text>Front - end</Text>
            </Block>
            <Block>
              <Circle />
              <Subtitle>Осипов Андрей</Subtitle>
              <Text>Web - desing</Text>
            </Block>
            <Block>
              <Circle />
              <Subtitle>Анна Пискарева</Subtitle>
              <Text>Дизайнер, аналитик</Text>
            </Block>
          </Main>
        </Inner>
      </Container>
    </Wrapper>
  );
};

import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import Container from "@/components/UI/Container";
import Head from "next/head";
import ControlLayout from "@/components/Layout/ControlLayout";

interface InfoProps {}

const Info = ({}: InfoProps) => {
  return (
    <ControlLayout>
      <Container>
        <Wrapper>
          <Head>
            <title>Инструкция</title>
          </Head>
          <Title>Инструкция</Title>
          <Main>
            <Subtitle>
              Наладить процесс выращивания клубники - <span>ПРОСТО</span>
            </Subtitle>
            <Item>
              <Point>1</Point>
              <Text>
                Во вкладке <span>УПРАВЛЕНИЕ</span> вы сможете увидеть свои
                теплицы
              </Text>
            </Item>
            <Item>
              <Point>2</Point>
              <Text>
                По нажатию на <span>ТЕПЛИЦУ</span> покажется информация по ней
              </Text>
            </Item>
            <Item>
              <Point>3</Point>
              <Text>
                Далее, вы сможете выбрать диапозон, частоту и параметры, по
                которым будут построены <span>ГРАФИКИ</span>, наглядно
                показывающие <span>РЕКОМЕНДАЦИИ</span> по увеличению урожайности
              </Text>
            </Item>
          </Main>
        </Wrapper>
      </Container>
    </ControlLayout>
  );
};

export default Info;

export const getServerSideProps: GetServerSideProps<InfoProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  return {
    props: {},
  };
};

const Title = styled.h1`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  color: #000000;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 69px 80px 80px 80px;
  @media (max-width: 1199.98px) {
    padding: 0px 30px 80px 30px;
  }
  @media (max-width: 767.98px) {
    padding: 0px 0px 80px 0px;
  }
`;

export const Text = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 40px;
  color: #000000;
  > span {
    color: ${({ theme }) => theme.orange};
    font-weight: 700;
  }
  width: calc(100% - 120px);
`;
export const Subtitle = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  color: #000000;
  margin-bottom: 50px;
  > span {
    color: ${({ theme }) => theme.orange};
    font-weight: 700;
  }
`;
export const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

export const Point = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  color: #000000;
  overflow: hidden;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

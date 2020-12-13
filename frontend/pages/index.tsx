import Head from "next/head";
import MainLayout from "@/components/Layout/MainLayout";
import { Home } from "@/components/Landing/Home";
import { HowWeDo } from "@/components/Landing/HowWeDo";
import { Internet } from "@/components/Landing/Internet";
import { UseFul } from "@/components/Landing/Useful";
import { Step } from "@/components/Landing/Step";
import { OurTeam } from "@/components/Landing/OurTeam";
import { stepText } from "@/someData/stepData";
import styled from "styled-components";

import Image from "next/image";
import Container from "@/components/UI/Container";
import { MyPartic } from "@/components/UI/MyPartic";

export default function Index() {
  return (
    <MainLayout>
      <Head>
        <title>LoRaWAN Dam</title>
      </Head>
      <Home />
      <HowWeDo />
      <Internet />
      <UseFul />
      <Block>
        <MyPartic />
        <Container>
          <Title>Как это работает?</Title>
          <Items>
            <Item>
              <Image src="/main/star.png" height={100} width={100} />
              <Text>Зарегистрируйся в системе MarsBerry Tracker </Text>
            </Item>
            <Item>
              <Image src="/main/star.png" height={100} width={100} />
              <Text>Наши специалисты установят и подключат датчики</Text>
            </Item>
            <Item>
              <Image src="/main/star.png" height={100} width={100} />
              <Text>Мы проанализируем данные и дадим рекомендации</Text>
            </Item>
            <Item>
              <Image src="/main/star.png" height={100} width={100} />
              <Text>Следуя рекомендациям, вы получите максимальный урожай</Text>
            </Item>
          </Items>
        </Container>
      </Block>
      <Block>
        <MyPartic />
        <Title>Но это еще не все!</Title>
        <Text>
          Вы сможете полностью автоматизировать корректировку климата ваших
          теплиц, благодаря чему вы получите:
        </Text>
        <Text>- Максимальную урожайность</Text>
        <Text>- Экономию времени</Text>
        <Text>- Контроль климата теплицы из любой точки Вселенной</Text>
      </Block>
      <OurTeam />
    </MainLayout>
  );
}

const Text = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 40px;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Items = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-family: Rosalinda;
  font-style: normal;
  font-weight: normal;
  font-size: 70px;
  line-height: 140px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 75px;
`;

const Block = styled.div`
  padding: 200px 0;
  background-color: #000;
  position: relative;
  #tsparticles {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
`;

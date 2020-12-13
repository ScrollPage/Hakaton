import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import styled from "styled-components";
import Container from "@/components/UI/Container";
import Head from "next/head";
import ControlLayout from "@/components/Layout/ControlLayout";
import Image from "next/image";
import { SButton } from "@/components/UI/Button";
import { useDispatch } from "react-redux";
import { modalShow } from "@/store/actions/modal";
import { IChangeDataModalProps } from "@/components/Modal/ChangeDataModal";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";

interface SucureProps {}

const Sucure = ({}: SucureProps) => {
  const dispatch = useDispatch();
  const { firstName, lastName, email, isBuy } = useUser();
  const { push } = useRouter();

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  const showHandler = () => {
    dispatch(
      modalShow<IChangeDataModalProps>("CHANGE_DATA_MODAL", {
        firstName,
        lastName,
      })
    );
  };

  return (
    <ControlLayout>
      <Container>
        <Wrapper>
          <Head>
            <title>Профиль</title>
          </Head>
          <Header>
            <Title>Профиль</Title>
            <SButton myType="blue" onClick={showHandler}>
              Изменить информацию
            </SButton>
          </Header>
          <UnderHeader>
            <Contact>
              <FaceCircle>
                <Image src="/control/user.svg" height={138} width={138} />
              </FaceCircle>
              <Info>
                <Subtitle>
                  {firstName} {lastName}
                </Subtitle>
                <Text>{email}</Text>
              </Info>
            </Contact>
            <Detector>
              <DetectorText>Всего теплиц: 5</DetectorText>
              <Circles>
                <Circle color="#60CFBF">2</Circle>
                <Circle color="#CFBD60">1</Circle>
                <Circle color="#CF6060">2</Circle>
              </Circles>
            </Detector>
          </UnderHeader>
          <Main>
            <Users>
              <UserText>
                Кол-во сотрудников: <span>12</span>
              </UserText>
              <UserText>
                Прогнозируемая урожайность: <br /> <span>меньше идеальной</span>
              </UserText>
            </Users>
            <Buy>
              <BuyText>
                Покупка автоматической системы управления показателями почвы{" "}
              </BuyText>
              <SButton
                myType="orange"
                small
                onClick={() =>
                  push({ pathname: "/service" }, undefined, {
                    shallow: true,
                  })
                }
              >
                Купить
              </SButton>
            </Buy>
          </Main>
          <Checks>
            <Check act={check1}>
              <Box onClick={() => setCheck1((e) => !e)} />
              <CheckText>Уведомления в телеграмм</CheckText>
            </Check>
            <Check act={check2}>
              <Box onClick={() => setCheck2((e) => !e)} />
              <CheckText>Письма на электронную почту</CheckText>
            </Check>
            <Check act={isBuy}>
              <Box disabled />
              <CheckText2>
                Автоматическая корректировка микроклимата частиц
              </CheckText2>
            </Check>
          </Checks>
        </Wrapper>
      </Container>
    </ControlLayout>
  );
};

export default Sucure;

export const getServerSideProps: GetServerSideProps<SucureProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  return {
    props: {},
  };
};

const Box = styled.div<{ disabled?: boolean }>`
  border: 1px solid #000000;
  box-sizing: border-box;
  height: 31px;
  width: 31px;
  margin-right: 22px;
  cursor: pointer;
  ${({ disabled }) =>
    disabled && "background: #b3b3b3 !important; cursor: auto;"}
`;

const Check = styled.div<{ act?: boolean }>`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  ${Box} {
    background-color: ${({ act, theme }) => (act ? theme.green : "#FFF")};
  }
`;
const Checks = styled.div`
  display: flex;
  flex-direction: column;
`;
const CheckText = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`;
const CheckText2 = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #b3b3b3;
`;
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

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 0;
`;

export const Users = styled.div`
  width: 400px;
  height: 201px;
  padding: 45px 44px;
  background: #ffffff;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
`;

export const Buy = styled.div`
  width: 575px;
  height: 201px;
  padding: 37px 44px;
  background: #ffffff;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

export const DetectorText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
`;

export const UnderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const BuyText = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  margin-bottom: 26px;
`;

export const UserText = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  color: #000000;
  margin-bottom: 24px;
  > span {
    font-weight: 800;
  }
`;

export const Text = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
`;
export const Subtitle = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 56px;
  color: #000000;
  margin-bottom: 14px;
`;

export const Circle = styled.div<{ color: string }>`
  margin-right: 26px;
  height: 44px;
  width: 44px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
`;
export const Circles = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: flex-end;
`;
export const Detector = styled.div``;

export const Info = styled.div`
  margin-left: 87px;
`;

export const Contact = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const FaceCircle = styled.div`
  overflow: hidden;
  height: 186px;
  width: 186px;
  border-radius: 50%;
  background-color: #fff;
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-right: 52px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
`;

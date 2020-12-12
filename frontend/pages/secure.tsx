import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import Container from "@/components/UI/Container";
import Head from "next/head";
import ControlLayout from "@/components/Layout/ControlLayout";
import cookies from "next-cookies";
import Image from "next/image";
import { SButton } from "@/components/UI/Button";
import { useDispatch } from "react-redux";
import { modalShow } from "@/store/actions/modal";
import { IChangeDataModalProps } from "@/components/Modal/ChangeDataModal";
import { useUser } from "@/hooks/useUser";

interface SucureProps {}

const Sucure = ({}: SucureProps) => {
  const dispatch = useDispatch();
  const { firstName, lastName, email } = useUser();

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
          <Main>
            <Circle>
              <Image src="/control/user.svg" height={138} width={138} />
            </Circle>
            <Info>
              <Subtitle>
                {firstName} {lastName}
              </Subtitle>
              <Text>{email}</Text>
            </Info>
          </Main>
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

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
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
export const Info = styled.div`
  margin-left: 87px;
`;

export const Main = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Circle = styled.div`
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

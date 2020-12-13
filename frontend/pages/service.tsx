import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import Container from "@/components/UI/Container";
import Head from "next/head";
import ControlLayout from "@/components/Layout/ControlLayout";
import { SButton } from "@/components/UI/Button";
import { useDispatch } from "react-redux";
import { authBuy } from "@/store/actions/auth";

interface ServiceProps {}

const Service = ({}: ServiceProps) => {
  const dispatch = useDispatch();

  return (
    <ControlLayout>
      <Container>
        <Wrapper>
          <Head>
            <title>Дополнительные услуги</title>
          </Head>
          <Title>Дополнительные услуги</Title>
          <Main>
            <SButton myType="orange" onClick={() => dispatch(authBuy())}>
              Купить
            </SButton>
          </Main>
        </Wrapper>
      </Container>
    </ControlLayout>
  );
};

export default Service;

export const getServerSideProps: GetServerSideProps<ServiceProps> = async (
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

export const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

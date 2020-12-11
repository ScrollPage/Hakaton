import { instanceWithSSR } from "@/api";
import { IDetector } from "@/types/detector";
import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import ControlLayout from "@/components/Layout/ControlLayout";
import Container from "@/components/UI/Container";
import Head from "next/head";

interface ControlProps {
  detectors: IDetector[] | null;
}

const Control = ({ detectors, clusters }: ControlProps) => {
  return (
    <ControlLayout>
      <Container>
        <Wrapper>
          <Head>
            <title>Управление</title>
          </Head>
          <Title>Управление</Title>
          <Main></Main>
        </Wrapper>
      </Container>
    </ControlLayout>
  );
};

export default Control;

export const getServerSideProps: GetServerSideProps<ControlProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  let detectors: IDetector[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/detector/`)
    .then((response) => {
      detectors = response?.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      detectors: detectors || null,
    },
  };
};

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

const Detectors = styled.div`
  margin-right: 10px;
  @media (max-width: 1199.98px) {
    margin-right: 0px;
    margin-bottom: 10px;
  }
`;

const Clusters = styled.div``;

const Title = styled.h1`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  color: #000000;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  justify-content: space-between;
  @media (max-width: 1199.98px) {
    flex-direction: column;
  }
`;

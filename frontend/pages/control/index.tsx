import { instanceWithSSR } from "@/api";
import { IDetector } from "@/types/detector";
import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import styled from "styled-components";
import ControlLayout from "@/components/Layout/ControlLayout";
import Container from "@/components/UI/Container";
import Head from "next/head";
import ErrorMessage from "@/components/UI/ErrorMessage";
import { Detector } from "@/components/Detector";
import { SButton } from "@/components/UI/Button";
import { show } from "@/store/actions/alert";
import { getDate } from "@/store/selectors";
import { nextDate } from "@/store/actions/date";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import EmptyMessage from "@/components/UI/EmptyMessage";

interface ControlProps {}

function formatDate(date: Date) {
  let dd = date.getDate();
  // @ts-ignore
  if (dd < 10) dd = "0" + dd;

  let mm = date.getMonth() + 1;
  // @ts-ignore
  if (mm < 10) mm = "0" + mm;

  let yy = date.getFullYear();

  return yy + "-" + mm + "-" + dd;
}

const renderDetectors = (detectors: IDetector[]) => {
  return detectors.map((detector) => {
    return <Detector key={`detector__${detector.id}`} detector={detector} />;
  });
};

const Control = ({}: ControlProps) => {
  const date = useSelector(getDate);
  const dispatch = useDispatch();

  useEffect(() => {
    Cookie.set("date", String(date));
  }, [date]);

  const changeDate = () => {
    if (date === new Date("2054-12-31")) {
      dispatch(show("Конец демо версии", "warning"));
    } else {
      dispatch(nextDate());
      dispatch(show("Наступил новый день", "success"));
    }
  };

  const plusDate = () => {
    let plusDate = new Date(date);
    plusDate.setDate(plusDate.getDate() + 1);
    return plusDate;
  };

  // const recurs = () => {
  //   setTimeout(() => recurs(), 15 * 1000);
  //   dispatch(nextDate());
  // };

  // useEffect(() => {
  //   recurs();
  // }, []);

  const { data: detectors, error } = useSWR(
    `/api/detector?begin_date=${formatDate(date)}&end_date=${formatDate(
      plusDate()
    )}`
  );

  return (
    <ControlLayout>
      <Container>
        <Wrapper>
          <Head>
            <title>Управление</title>
          </Head>
          <Header>
            <Title>Управление</Title>
          </Header>
          <Text>Данные на {formatDate(date)}</Text>
          <Main>
            {error && (
              <ErrorMessage message="Ошибка вывода информации о теплицах" />
            )}
            {!detectors && !error && <LoadingSpinner />}
            {detectors?.length === 0 && (
              <EmptyMessage message="Нет информации по теплицам" />
            )}
            {detectors && renderDetectors(detectors)}
          </Main>
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

  return {
    props: {},
  };
};

export const Text = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${Text} {
    margin-right: 40px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 62px 80px 80px 80px;
  @media (max-width: 1199.98px) {
    padding: 0px 30px 80px 30px;
  }
  @media (max-width: 767.98px) {
    padding: 0px 0px 80px 0px;
  }
`;

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
  margin-top: 90px;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 1199.98px) {
    flex-direction: column;
  }
`;

const Num = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  color: #000000;
`;

import { IDetector } from "@/types/detector";
import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import ControlLayout from "@/components/Layout/ControlLayout";
import Container from "@/components/UI/Container";
import Head from "next/head";
import ErrorMessage from "@/components/UI/ErrorMessage";
import { Detector } from "@/components/Detector";
import { show } from "@/store/actions/alert";
import { getDate, getBeginDate, getSubsrc } from "@/store/selectors";
import { newNextDate } from "@/store/actions/date";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import EmptyMessage from "@/components/UI/EmptyMessage";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { SButton } from "@/components/UI/Button";

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

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const Control = ({}: ControlProps) => {
  const date = useSelector(getDate);
  const begin = useSelector(getBeginDate);
  const dispatch = useDispatch();
  const { isBuy } = useUser();

  useEffect(() => {
    Cookie.set("date", String(date));
    Cookie.set("begin", String(begin));
  }, [date, begin]);

  const changeDate = () => {
    if (date === new Date("2054-12-31")) {
      dispatch(show("Конец демо версии", "warning"));
    } else {
      dispatch(newNextDate());
    }
  };

  const minusDate = () => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
  };

  const recurs = () => {
    setTimeout(() => recurs(), 20 * 1000);
    changeDate();
  };

  useEffect(() => {
    recurs();
  }, []);

  const newPredict = useMemo(
    () => getRandom(16.33 * 0.85, 16.33 * 0.95).toFixed(2),
    [date]
  );

  const { data: detectors, error } = useSWR(
    `/api/detector?begin_date=${formatDate(minusDate())}&end_date=${formatDate(
      date
    )}`
  );

  const { data: predict, error: predictError } = useSWR(
    `/api/predict?begin_date=${formatDate(minusDate())}&end_date=${formatDate(
      date
    )}`
  );

  return (
    <ControlLayout>
      <Bgc>
        <Container>
          <Float>
            <Title>Данные на {formatDate(date)}</Title>
            <Text>
              Ожидаемый урожай на текущий квартал&nbsp;
              {isBuy ? newPredict : predict?.answer}
            </Text>
            <Text>При этом максимально возможный 16.33</Text>
            <Bottom>
              <Text>Мы можем вам помочь увеличить урожай!</Text>
              <SButton myType="blue" small>
                Перейти
              </SButton>
            </Bottom>
          </Float>
          <Wrapper>
            <Head>
              <title>Теплицы</title>
            </Head>
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
      </Bgc>
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

export const Bgc = styled.div`
  width: 100%;
  background: url("/control/bgc.png") no-repeat #000;
  background-size: cover;
  height: clac(100vh - 120px);
  overflow: hidden;
`;

export const Text = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  margin-top: 4px;
`;

export const Bottom = styled.div`
  display: flex;
  margin-top: 18px;
  align-items: center;
  justify-content: space-between;
  ${Text} {
    margin-right: 16px;
  }
`;

export const Float = styled.div`
  position: absolute;
  right: 40px;
  bottom: 50px;
  z-index: 2;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  padding: 14px 41px;
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
  position: relative;
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
  font-size: 18px;
  line-height: 21px;
  color: #000000;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-top: 90px;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: 100px;
  @media (max-width: 1199.98px) {
    flex-direction: column;
  }
`;

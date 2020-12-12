import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import styled from "styled-components";
import ControlLayout from "@/components/Layout/ControlLayout";
import Container from "@/components/UI/Container";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import EmptyMessage from "@/components/UI/EmptyMessage";
import { Chart } from "@/components/Chart";
import { Select, DatePicker } from "antd";
import moment from "moment";
import { SButton } from "@/components/UI/Button";
import { Donat } from "@/components/Donat";
const { Option } = Select;
const { RangePicker } = DatePicker;

interface ControlDataProps {}

const ControlData = ({}: ControlDataProps) => {
  const { query, push } = useRouter();
  const [data, setData] = useState(["2052-01-01", "2052-12-01"]);
  const [currency, setCurrency] = useState("30");
  type IParam = "temp" | "humidity" | "lightning" | "pH";
  const [index, setIndex] = useState<IParam>("temp");

  const { data: detectorData, error } = useSWR(
    `/api/detector/${query.ID}?begin_date=${data[0]}&end_date=${data[1]}&currency=${currency}`
  );

  const indexChange = (value: IParam) => {
    setIndex(value);
  };

  const currencyChange = (value: string) => {
    setCurrency(value);
  };

  function dataChange(date: any, dateString: [string, string]) {
    setData(dateString);
  }

  const dateFormat = "YYYY-MM-DD";

  const renderLabel = (param: IParam) => {
    switch (param) {
      case "temp":
        return "Температура";
      case "humidity":
        return "Влажность";
      case "lightning":
        return "Освещенность";
      case "pH":
        return "Кислотность";
    }
  };

  return (
    <ControlLayout>
      <Container>
        <Wrapper>
          <Head>
            <title>Данные о теплице</title>
          </Head>
          <Title>Теплица {query.ID}</Title>
          <SButton
            myType="orange"
            small
            onClick={() =>
              push({ pathname: "/control" }, undefined, { shallow: true })
            }
          >
            Назад
          </SButton>
          <Main>
            <MySelect>
              <Text>От-До</Text>
              <RangePicker
                defaultValue={[
                  moment("2052-01-01", dateFormat),
                  moment("2052-12-01", dateFormat),
                ]}
                format={dateFormat}
                onChange={dataChange}
              />
            </MySelect>
            <MySelect>
              <Text>Частота: </Text>
              <Select
                value={currency}
                style={{ width: 200, borderRadius: "50% !important" }}
                onChange={currencyChange}
              >
                <Option value="365">Год</Option>
                <Option value="30">Месяц</Option>
                <Option value="7">Неделя</Option>
                <Option value="1">День</Option>
              </Select>
            </MySelect>
            <MySelect>
              <Text>Показатель: </Text>
              <Select
                value={index}
                style={{ width: 200 }}
                onChange={indexChange}
              >
                <Option value="temp">Температура</Option>
                <Option value="humidity">Влажность</Option>
                <Option value="lightning">Освещенность</Option>
                <Option value="pH">Кислотность</Option>
              </Select>
            </MySelect>
            {error && (
              <ErrorMessage message="Ошибка вывода информации о датчике" />
            )}
            {!detectorData && !error && <LoadingSpinner />}
            {detectorData?.length === 0 && (
              <EmptyMessage message="Нет информации по датчику" />
            )}
            {detectorData && (
              <>
                <Chart
                  detectorData={detectorData}
                  param={index}
                  label={renderLabel(index)}
                />
                <Donat detectorData={detectorData} param={index} />
              </>
            )}
          </Main>
        </Wrapper>
      </Container>
    </ControlLayout>
  );
};

export default ControlData;

export const getServerSideProps: GetServerSideProps<ControlDataProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  return {
    props: {},
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
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 1199.98px) {
    flex-direction: column;
  }
`;

export const MySelect = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const Text = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  color: #000000;
  width: 150px;
`;

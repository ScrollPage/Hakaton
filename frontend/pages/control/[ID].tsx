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
import { useSelector } from "react-redux";
const { Option } = Select;
const { RangePicker } = DatePicker;
import { getDate } from "@/store/selectors";

interface ControlDataProps {}

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

const ControlData = ({}: ControlDataProps) => {
  const { query, push } = useRouter();
  const [currency, setCurrency] = useState("1");
  type IParam = "temp" | "humidity" | "lightning" | "pH";
  const [index, setIndex] = useState<IParam>("pH");
  const date = useSelector(getDate);
  const [data, setData] = useState(["2052-01-01", formatDate(date)]);

  const { data: detectorData, error } = useSWR(
    `/api/detector/${query.ID}?begin_date=${data[0]}&end_date=${data[1]}&currency=${currency}`
  );

  // const { data: detectorData, error } = useSWR(
  //   `/api/detector/${query.ID}?begin_date=${data[0]}&end_date=${data[1]}&currency=${currency}`
  // );

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

  function disabledDate(current: any) {
    return current && current > date;
  }

  return (
    <ControlLayout>
      <Container>
        <Wrapper>
          <Head>
            <title>Данные о теплице</title>
          </Head>
          <Header>
            <Title>Теплица {query.ID}:</Title>
            <SButton
              myType="blue"
              onClick={() =>
                push({ pathname: "/control" }, undefined, { shallow: true })
              }
            >
              Вернуться назад
            </SButton>
          </Header>
          <Main>
            {error && (
              <ErrorMessage message="Ошибка вывода информации о датчике" />
            )}
            {!detectorData && !error && <LoadingSpinner />}
            {detectorData?.length === 0 && (
              <EmptyMessage message="Нет информации по датчику" />
            )}
            {detectorData && (
              <Chart
                detectorData={detectorData}
                param={index}
                label={renderLabel(index)}
              />
            )}
            <Settings>
              <MySelect>
                <RangePicker
                  disabledDate={disabledDate}
                  defaultValue={[
                    moment("2052-01-01", dateFormat),
                    moment(formatDate(date), dateFormat),
                  ]}
                  format={dateFormat}
                  onChange={dataChange}
                />
              </MySelect>
              <MySelect>
                <Select
                  value={currency}
                  style={{ width: 278.33, borderRadius: "50% !important" }}
                  onChange={currencyChange}
                >
                  <Option value="365">Год</Option>
                  <Option value="30">Месяц</Option>
                  <Option value="7">Неделя</Option>
                  <Option value="1">День</Option>
                </Select>
              </MySelect>
              <MySelect>
                <Select
                  value={index}
                  style={{ width: 278.33 }}
                  onChange={indexChange}
                >
                  <Option value="temp">Температура</Option>
                  <Option value="humidity">Влажность</Option>
                  <Option value="lightning">Освещенность</Option>
                  <Option value="pH">Кислотность</Option>
                </Select>
              </MySelect>
              {detectorData && (
                <Donat detectorData={detectorData} param={index} />
              )}
            </Settings>
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
  padding: 62px 80px 80px 80px;
  @media (max-width: 1199.98px) {
    padding: 0px 30px 80px 30px;
  }
  @media (max-width: 767.98px) {
    padding: 0px 0px 80px 0px;
  }
`;

const Settings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-top: 30px;
  justify-content: center;
  @media (max-width: 1199.98px) {
    flex-direction: column;
  }
`;

export const MySelect = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 54px;
`;

export const Text = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  color: #000000;
  width: 150px;
`;

import { IDetector } from "@/types/detector";
import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import ControlLayout from "@/components/Layout/ControlLayout";
import Container from "@/components/UI/Container";
import Head from "next/head";
import { IUser } from "@/types/user";
import { UserItem } from "@/components/UI/UserItem";

interface UsersProps {}

const renderUsers = (users: IUser[]) => {
  return users.map((user, key) => {
    return <UserItem key={`user__item__${key}`} user={user} />;
  });
};

const Users = ({}: UsersProps) => {
  const users: IUser[] = [
    {
      firstName: "Вова",
      lastName: "Шаплин",
      about: {
        number: 89969494216,
        email: "0r20@mail.ru",
        history: "Отличный парень хороший волк",
      },
    },
    {
      firstName: "Вова",
      lastName: "Шаплин",
      about: {
        number: 89969494216,
        email: "0r20@mail.ru",
        history: "Отличный парень хороший волк",
      },
    },
    {
      firstName: "Вова",
      lastName: "Шаплин",
      about: {
        number: 89969494216,
        email: "0r20@mail.ru",
        history: "Отличный парень хороший волк",
      },
    },
    {
      firstName: "Вова",
      lastName: "Шаплин",
      about: {
        number: 89969494216,
        email: "0r20@mail.ru",
        history: "Отличный парень хороший волк",
      },
    },
    {
      firstName: "Вова",
      lastName: "Шаплин",
      about: {
        number: 89969494216,
        email: "0r20@mail.ru",
        history: "Отличный парень хороший волк",
      },
    },
  ];

  return (
    <ControlLayout>
      <Container>
        <Wrapper>
          <Head>
            <title>Сотрудники</title>
          </Head>
          <Title>Сотрудники</Title>
          <Main>{renderUsers(users)}</Main>
        </Wrapper>
      </Container>
    </ControlLayout>
  );
};

export default Users;

export const getServerSideProps: GetServerSideProps<UsersProps> = async (
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
  flex-wrap: wrap;
  @media (max-width: 1199.98px) {
    flex-direction: column;
  }
`;

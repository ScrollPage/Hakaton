import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import styled from "styled-components";
import Container from "@/components/UI/Container";
import Head from "next/head";
import ControlLayout from "@/components/Layout/ControlLayout";
import { SButton } from "@/components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@/hooks/useUser";
import { modalShow } from "@/store/actions/modal";
import { IBuyServiceModalProps } from "@/components/Modal/BuyServiceModal";
import { getSubsrc } from "@/store/selectors";
import Cookie from "js-cookie";

interface ServiceProps {}

const Service = ({}: ServiceProps) => {
  const dispatch = useDispatch();
  const { isBuy } = useUser();

  const showHandler = () => {
    dispatch(modalShow<IBuyServiceModalProps>("BUY_SERVICE_MODAL", {}));
  };

  const subsrc = useSelector(getSubsrc);
  useEffect(() => {
    // if (!subsrc) {
    //   Cookie.remove("subsrc");
    // } else {
    //   Cookie.set("subsrc", new Date(subsrc as any));
    // }
    console.log(subsrc);
  }, [subsrc]);

  return (
    <ControlLayout>
      <Container>
        <Wrapper>
          <Head>
            <title>Дополнительные услуги</title>
          </Head>
          <Title>Дополнительные услуги</Title>
          <Main>
            <Items>
              <Item>
                <ItemText>
                  Автоматизация управления климата и почвы теплиц
                </ItemText>
              </Item>
              <Title>...</Title>
              <SubSubtitle>Скоро тут появятся новые услуги</SubSubtitle>
            </Items>
            <Block>
              {isBuy ? (
                <Subtitle>Подписка уже оформлена</Subtitle>
              ) : (
                <>
                  <Subtitle>Вы получите</Subtitle>
                  <SubSubtitle>- Максимальную урожайность</SubSubtitle>
                  <Text>
                    Теперь Ваша клубника под круглосуточным <br />
                    надзором. При любом отклонении система <br />
                    скорректирует его так, чтобы условия были <br />
                    оптимальными.
                  </Text>
                  <SubSubtitle>- Экономию времени</SubSubtitle>
                  <Text>
                    Ведь теперь Вам не нужно ходить и <br /> проверять, все ли в
                    порядке, а также тратить <br /> время на полив и внесение
                    удобрений.
                  </Text>
                  <SubSubtitle>- Контроль из любой точки Вселенной</SubSubtitle>
                  <SButton onClick={showHandler} myType="orange">
                    Оформить подписку
                  </SButton>
                </>
              )}
            </Block>
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
  flex-direction: row;
  justify-content: space-between;
`;

export const Subtitle = styled.div`
  margin-bottom: 35px;
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 32px;
  color: #000000;
`;

export const SubSubtitle = styled.p`
  margin-bottom: 12px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
`;

export const Items = styled.div`
  margin-right: 42px;
  ${Title} {
    text-align: center;
  }
  ${SubSubtitle} {
    text-align: center;
  }
`;
export const Item = styled.div`
  padding: 26px 65px 25px 44px;
  background: #f5f9ff;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  position: relative;
  &:after,
  &:before {
    content: "";
    position: absolute;
    height: 18px;
    width: 1px;
    background-color: #000;
    top: 50%;
    right: 37px;
    border-radius: 1px;
  }
  &:after {
    transform: translateX(-50%) translateY(-16%) rotate(45deg);
  }
  &:before {
    transform: translateX(-50%) translateY(-84%) rotate(-45deg);
  }
`;
export const Block = styled.div`
  padding: 58px 40px 32px 40px;
  background: #f5f9ff;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  ${SButton} {
    width: 238px !important;
    margin-top: 41px;
    &:hover {
      color: #000 !important;
    }
  }
`;
export const Text = styled.div`
  margin-bottom: 32px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
`;

export const ItemText = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
`;

export const Subs = styled.div`
  background: #f5f9ff;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
`;

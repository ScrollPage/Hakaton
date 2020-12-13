import React from "react";
import {
  Main,
  Header,
  Info,
  Title,
  Subtitle,
  AuthButtons,
  Nav,
  NavLink,
  Name,
  Inner,
} from "./styles";
import { useDispatch } from "react-redux";
import { logout } from "@/store/actions/auth";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { SButton } from "@/components/UI/Button";
import { useRouter } from "next/router";
import { useScroll } from "@/hooks/useScroll";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Footer } from "@/components/Landing/Footer";
import { SctollToTopButton } from "@/components/UI/ScrollToTopButton";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuth } = useUser();
  const { push } = useRouter();
  const scroll = useScroll();
  const { height } = useWindowSize();
  // const useRef = howItWorks

  // const goToBlock = (top: number) => window.scroll({ top, behavior: "smooth" });

  return (
    <>
      <Header small={scroll > (height ?? 1000) - 120}>
        <Info>
          <Image height={120} width={160} src="/main/logo.svg" />
          <Name>
            <Title>LoRaWan Dam</Title>
            <Subtitle>
              Умный сервис по выращиванию
              <br /> клубники
            </Subtitle>
          </Name>
        </Info>
        <Inner>
          <AuthButtons>
            {isAuth ? (
              <>
                <SButton
                  myType="orange"
                  small
                  onClick={() =>
                    push({ pathname: "/secure" }, undefined, {
                      shallow: true,
                    })
                  }
                >
                  Кабинет
                </SButton>
                <SButton
                  myType="orange"
                  small
                  onClick={() => dispatch(logout(true))}
                >
                  Выход
                </SButton>
              </>
            ) : (
              <>
                <SButton
                  myType="white"
                  small
                  onClick={() =>
                    push({ pathname: "/login" }, undefined, { shallow: true })
                  }
                >
                  Вход
                </SButton>
                <SButton
                  myType="orange"
                  small
                  onClick={() =>
                    push({ pathname: "/register" }, undefined, {
                      shallow: true,
                    })
                  }
                >
                  Регистрация
                </SButton>
              </>
            )}
          </AuthButtons>
        </Inner>
      </Header>
      <Main>{children}</Main>
      <Footer />
      <SctollToTopButton />
    </>
  );
};

export default MainLayout;

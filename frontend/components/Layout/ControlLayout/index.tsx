import React from "react";
import {
  Main,
  Header,
  Rectangle,
  Nav,
  NavLink,
  Name,
  SideLink,
  Settings,
  Side,
  SideBar,
  Circle,
  NavContainer,
  Title,
} from "./styles";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "@/store/actions/auth";
import { SButton } from "@/components/UI/Button";

interface ControlLayoutProps {
  children: React.ReactNode;
}

const ControlLayout: React.FC<ControlLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { firstName, lastName } = useUser();
  const { pathname } = useRouter();
  return (
    <>
      <Header>
        <Nav>
          {pathname === "/control" && <Title>Теплицы</Title>}
          <NavContainer>
            <Link href="/">
              <a>
                <Image height={84} width={114} src="/main/logo.svg" />
              </a>
            </Link>
            <NavLink>
              <Link href="/">
                <a>LoRaWan Dam</a>
              </Link>
            </NavLink>
          </NavContainer>
          <Settings>
            <SButton
              myType="orange"
              small
              onClick={() => dispatch(logout(true))}
            >
              Выход
            </SButton>
          </Settings>
        </Nav>
      </Header>
      <SideBar>
        <Rectangle>
          <Circle>
            <Image src="/control/user.svg" height={56} width={56} />
          </Circle>
          <Name>
            {firstName} <br /> {lastName}
          </Name>
        </Rectangle>
        <Side>
          <SideLink active={pathname === "/secure"}>
            <Link href="/secure">
              <a>Профиль</a>
            </Link>
          </SideLink>
          <SideLink
            active={pathname === "/control" || pathname === "/control/[ID]"}
          >
            <Link href="/control">
              <a>Теплицы</a>
            </Link>
          </SideLink>
          <SideLink active={pathname === "/users"}>
            <Link href="/users">
              <a>Команда</a>
            </Link>
          </SideLink>
          <SideLink active={pathname === "/service"}>
            <Link href="/service">
              <a>Доп услуги</a>
            </Link>
          </SideLink>
          <SideLink active={pathname === "/info"}>
            <Link href="/info">
              <a>Инструкция</a>
            </Link>
          </SideLink>
        </Side>
      </SideBar>
      <Main>{children}</Main>
    </>
  );
};

export default ControlLayout;

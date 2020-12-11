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
          <NavContainer>
            <Image height={84} width={114} src="/main/logo.svg" />
            <NavLink>
              <Link href="/">
                <a>Главная</a>
              </Link>
            </NavLink>
            <NavLink>
              <Link href="/">
                <a>Инструкция</a>
              </Link>
            </NavLink>
            <NavLink>
              <Link href="/">
                <a>Поддержка</a>
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
            <Image src="/control/user.png" height={74} width={74} />
          </Circle>
          <Name>
            {firstName} <br /> {lastName}
          </Name>
        </Rectangle>
        <Side>
          <SideLink active={pathname === "/control"}>
            <Link href="/control">
              <a>Управление</a>
            </Link>
          </SideLink>
          <SideLink active={pathname === "/users"}>
            <Link href="/users">
              <a>Сотрудники</a>
            </Link>
          </SideLink>
          <SideLink active={pathname === "/secure"}>
            <Link href="/secure">
              <a>Настройки</a>
            </Link>
          </SideLink>
        </Side>
      </SideBar>
      <Main>{children}</Main>
    </>
  );
};

export default ControlLayout;

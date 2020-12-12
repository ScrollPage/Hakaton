import React from "react";
import {
  Wrapper,
  Title,
  Main,
  Text,
  Circle,
  Info,
  ImageWrapper,
} from "./styles";
import { IUser } from "@/types/user";
import Image from "next/image";
import { SButton } from "@/components/UI/Button";

export interface IUserDataModalProps {
  user: IUser;
}

interface IUserDataModal extends IUserDataModalProps {
  setClose: () => void;
}

const UserDataModal: React.FC<IUserDataModal> = ({ user, setClose }) => {
  return (
    <Wrapper>
      <Title>Информация о сотруднике</Title>
      <Main>
        <Info>
          <Circle>
            <Image src="/control/user.svg" height={105} width={105} />
          </Circle>
          <Title>
            {user.firstName} <br /> {user.lastName}
          </Title>
        </Info>
        <Text>
          Телефон: <span>{user.about.number}</span>
        </Text>
        <Text>
          E-mail: <span>{user.about.email}</span>
        </Text>
        <Text>
          Должность: <span>{user.about.position}</span>
        </Text>
        <Text>
          Контакты:
          <ImageWrapper>
            <Image src="/main/vk.svg" height={28} width={28} />
          </ImageWrapper>
          <ImageWrapper>
            <Image src="/main/twitter.svg" height={28} width={28} />
          </ImageWrapper>
          <ImageWrapper>
            <Image src="/main/inst.svg" height={28} width={28} />
          </ImageWrapper>
        </Text>
      </Main>
      <SButton myType="blue" middle>
        Написать письмо
      </SButton>
    </Wrapper>
  );
};

export default UserDataModal;

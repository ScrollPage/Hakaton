import React from "react";
import { Wrapper, Title, Main, Text } from "./styles";
import { IUser } from "@/types/user";

export interface IUserDataModalProps {
  user: IUser;
}

interface IUserDataModal extends IUserDataModalProps {
  setClose: () => void;
}

const UserDataModal: React.FC<IUserDataModal> = ({ user, setClose }) => {
  return (
    <Wrapper>
      <Title>
        Информация о {user.firstName} {user.lastName}
      </Title>
      <Main>
        <Text>
          E-mail: <span>{user.about.email}</span>
        </Text>
        <Text>
          Телефон: <span>{user.about.number}</span>
        </Text>
        <Text>
          О себе: <span>{user.about.history}</span>
        </Text>
      </Main>
    </Wrapper>
  );
};

export default UserDataModal;

import ChangeForm from "@/components/Auth/ChangeForm";
import React from "react";
import { Wrapper, Title, Main } from "./styles";

export interface IChangeDataModalProps {
  firstName: string;
  lastName: string;
}

interface IChangeDataModal extends IChangeDataModalProps {
  setClose: () => void;
}

const ChangeDataModal: React.FC<IChangeDataModal> = ({
  firstName,
  lastName,
  setClose,
}) => {
  return (
    <Wrapper>
      <Title>Изменить информацию</Title>
      <Main>
        <ChangeForm setClose={setClose} initialFirstName={firstName} initialLastName={lastName} />
      </Main>
    </Wrapper>
  );
};

export default ChangeDataModal;

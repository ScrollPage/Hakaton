import { IUserDataModalProps } from "@/components/Modal/UserDataModal";
import { SButton } from "@/components/UI/Button";
import { modalShow } from "@/store/actions/modal";
import { IUser } from "@/types/user";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Field, Face, Main } from "./styles";

export const UserItem: React.FC<{ user: IUser }> = ({ user }) => {
  const dispatch = useDispatch();

  const showHandler = () => {
    dispatch(
      modalShow<IUserDataModalProps>("USER_DATA_MODAL", { user })
    );
  };

  return (
    <Wrapper>
      <Face>
        <Image src="/control/user.png" height={70} width={70} />
      </Face>
      <Main>
        <Field>{user.firstName}</Field>
        <Field>{user.lastName}</Field>
        <SButton myType="blue" small onClick={showHandler}>
          Информация
        </SButton>
      </Main>
    </Wrapper>
  );
};

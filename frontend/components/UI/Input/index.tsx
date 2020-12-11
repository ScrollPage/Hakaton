import { useField } from "formik";
import Image from "next/image";
import React from "react";
import { InputHTMLAttributes } from "react";
import { Wrapper, Inner, Error, Icon } from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  width?: string;
  src: string;
};

const Input: React.FC<InputProps> = (props) => {
  const [field, meta] = useField(props);
  const isShowError = meta.touched && !!meta.error;
  return (
    <Wrapper>
      <Icon>
        <Image height={20} width={20} src={`/input/${props.src}.svg`} />
      </Icon>
      <Inner
        {...field}
        {...props}
        isShowError={isShowError}
        width={props?.width}
      />
      {isShowError && <Error>{meta.error}</Error>}
    </Wrapper>
  );
};

export default Input;

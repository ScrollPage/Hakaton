import React, { useState, useEffect } from "react";
import { Wrapper, Title, Main, Text, Block, Blocks } from "./styles";
import { SButton } from "@/components/UI/Button";
import { getSubsrc } from "@/store/selectors";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import { setSubsrc } from "@/store/actions/date";
import { authBuy } from "@/store/actions/auth";

export interface IBuyServiceModalProps {}

interface IBuyServiceModal extends IBuyServiceModalProps {
  setClose: () => void;
}

const BuyServiceModal: React.FC<IBuyServiceModal> = ({ setClose }) => {
  const [active, setActive] = useState(2);
  const dispatch = useDispatch();

  // const subsrc = useSelector(getSubsrc);
  // useEffect(() => {
  //   Cookie.set("subsrc", new Date(subsrc as any));
  // }, [subsrc]);

  const handleSubmit = () => {
    let days = 365;
    if (active === 0) {
      days = 30;
    }
    if (active === 1) {
      days = 183;
    }
    dispatch(setSubsrc(days));
    dispatch(authBuy(true));
    setClose();
  };

  return (
    <Wrapper>
      <Title>Оформление подписки</Title>
      <Main>
        <Text>Время подписки </Text>
        <Blocks>
          <Block isActive={active === 0} onClick={() => setActive(0)}>
            1мес
          </Block>
          <Block isActive={active === 1} onClick={() => setActive(1)}>
            6мес
          </Block>
          <Block isActive={active === 2} onClick={() => setActive(2)}>
            1год
          </Block>
        </Blocks>
      </Main>
      <SButton myType="orange" middle onClick={handleSubmit}>
        Оформить подписку
      </SButton>
    </Wrapper>
  );
};

export default BuyServiceModal;

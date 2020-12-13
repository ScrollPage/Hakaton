import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModalName, getModalProps } from "@/store/selectors";
import { modalHide } from "@/store/actions/modal";
import { BackDrop, Wrapper, Close } from "./styles";

import UserDataModal from "./UserDataModal";
import ChangeDataModal from "./ChangeDataModal";
import BuyServiceModal from "./BuyServiceModal";

const MODAL_COMPONENTS = {
  USER_DATA_MODAL: UserDataModal,
  CHANGE_DATA_MODAL: ChangeDataModal,
  BUY_SERVICE_MODAL: BuyServiceModal,
};

const RootModal: React.FC = () => {
  const dispatch = useDispatch();

  const modalProps = useSelector(getModalProps);
  const modalName = useSelector(getModalName);

  const setClose = () => {
    dispatch(modalHide());
  };

  if (!modalName) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalName];

  return (
    <>
      <Wrapper>
        <div>
          <Close onClick={setClose} />
          <SpecificModal {...modalProps} setClose={setClose} />
        </div>
      </Wrapper>
      <BackDrop onClick={() => setClose()} />
    </>
  );
};

export default RootModal;

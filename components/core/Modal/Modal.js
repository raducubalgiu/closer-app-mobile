import { Dialog } from "@rneui/themed";
import React from "react";

const Modal = (props) => {
  return (
    <Dialog isVisible={props.open} onBackdropPress={props.closeModal}>
      <Dialog.Title title={props.title} />
      {props.children}
    </Dialog>
  );
};

export default Modal;

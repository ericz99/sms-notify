import React from "react";
import { Modal, ModalHeader } from "reactstrap";

export default function ModalForm({ children, toggle, headerText, ...rest }) {
  return (
    <Modal {...rest} toggle={toggle}>
      <ModalHeader toggle={toggle}>{headerText}</ModalHeader>
      {children}
    </Modal>
  );
}

import React, { MouseEventHandler } from "react";
import { Button, Modal } from "react-bootstrap";

export default function ModalConfirm(props:{
  show:boolean,
  handleClose:()=>void,
  handleShow:()=>void,
  title:string,
  description:string,
  handleAction:MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <div>
      <Modal
        style={{ marginTop: "100px" }}
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Thoát
          </Button>
          <Button variant="primary" onClick={props.handleAction}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

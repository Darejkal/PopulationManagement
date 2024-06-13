import React, { MouseEventHandler } from "react";
import { Button, Modal } from "react-bootstrap";

export default function ModalConfirm(props:{
  show:boolean,
  handleClose:()=>void,
  title:string,
  description:string,
  handleAction:MouseEventHandler<HTMLButtonElement>,
  confirmLabel:string,
  dismissLabel:string,
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
            {props.dismissLabel}
          </Button>
          <Button variant="primary" onClick={props.handleAction}>
          {props.confirmLabel}
            
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ModalConfirm(props) {
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

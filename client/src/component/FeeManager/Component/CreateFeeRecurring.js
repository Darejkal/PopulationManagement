import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { feeService } from "../../../redux/service/feeService";

export default function CreateFeeRecurring(props) {
  const [dataCreate, setDataCreate] = useState({
    name: "",
    amount: 0,
    feeType: "",
    frequency: "",
  });

  const handleSubmit = async () => {
    await feeService.createFee({
      ...dataCreate,
    });
    props.handleLoading();
    props.handleClose();
  };
  console.log(dataCreate);

  return (
    <div>
      <Modal
        style={{ marginTop: "100px" }}
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo khoản phí</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên khoản phí</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={dataCreate.name}
                onChange={(e) => {
                  setDataCreate({ ...dataCreate, name: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Số tiền</Form.Label>
              <Form.Control
                type="number"
                value={dataCreate.amount}
                onChange={(e) => {
                  setDataCreate({
                    ...dataCreate,
                    amount: Number(e.target.value),
                  });
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex justify-content-around"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Select
                className="me-4"
                value={dataCreate.feeType}
                onChange={(e) => {
                  setDataCreate({
                    ...dataCreate,
                    feeType: e.target.value,
                  });
                }}
              >
                <option>Loại</option>
                <option value="Household">Hộ khẩu</option>
                <option value="Individual">Cá nhân</option>
              </Form.Select>

              <Form.Select
                value={dataCreate.frequency}
                onChange={(e) => {
                  setDataCreate({
                    ...dataCreate,
                    frequency: e.target.value,
                  });
                }}
              >
                <option>Tần suất</option>
                <option value="monthly">1 tháng</option>
                <option value="yearly">1 năm</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

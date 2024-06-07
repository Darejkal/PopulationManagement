import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { contributionService } from "../../../redux/services/contributionService";

export default function CreateFeeContribute(props:{
  data:IContribution[],
  handleShow:()=>void,
  handleLoading:()=>any,
  handleClose:()=>any,
  show:boolean,
  id:string
}) {
  const [dataCreate, setDataCreate] = useState({
    name: "",
    startTime: "",
    endTime: "",
    amount: 0,
  });

  const handleSubmit = async () => {
    await contributionService.createContribution({
      ...dataCreate,
    });
    props.handleLoading();
    props.handleClose();
  };

  return (
    <div>
      <Modal
        style={{ marginTop: "100px" }}
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo khoản đóng góp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên khoản đóng góp</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={dataCreate.name}
                onChange={(e) => {
                  setDataCreate({ ...dataCreate, name: e.target.value });
                }}
              />
            </Form.Group>
            {/*<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">*/}
            {/*  <Form.Label>Số tiền</Form.Label>*/}
            {/*  <Form.Control*/}
            {/*    type="number"*/}
            {/*    value={dataCreate.amount}*/}
            {/*    onChange={(e) => {*/}
            {/*      setDataCreate({*/}
            {/*        ...dataCreate,*/}
            {/*        amount: Number(e.target.value),*/}
            {/*      });*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</Form.Group>*/}
            <Form.Group
              className="mb-3 d-flex justify-content-between"
              controlId="exampleForm.ControlInput1"
            >
              <div className="me-3" style={{ width: "47%" }}>
                <Form.Label>Ngày bắt đầu</Form.Label>
                <Form.Control
                  type="date"
                  autoFocus
                  value={dataCreate.startTime}
                  onChange={(e) => {
                    setDataCreate({
                      ...dataCreate,
                      startTime: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ width: "47%" }}>
                <Form.Label>Ngày kết thúc</Form.Label>
                <Form.Control
                  type="date"
                  autoFocus
                  value={dataCreate.endTime}
                  onChange={(e) => {
                    setDataCreate({
                      ...dataCreate,
                      endTime: e.target.value,
                    });
                  }}
                />
              </div>
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

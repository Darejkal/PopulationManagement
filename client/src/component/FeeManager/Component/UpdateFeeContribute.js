import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { convertDate } from "../../../utils/function";
import { contributionService } from "../../../redux/service/contributionService";

export default function UpdateFeeContribute(props) {
  const detail = props.data.find((item) => item._id === props.id);
  const [dataUpdate, setDataUpdate] = useState({
    name: "",
    startTime: "",
    endTime: "",
    amount: 0,
  });

  useEffect(() => {
    if (detail) {
      setDataUpdate({
        name: detail.name,
        startTime: convertDate(detail.startTime),
        endTime: convertDate(detail.endTime),
        amount: detail.amount,
      });
    }
  }, []);

  const handleSubmit = async () => {
    await contributionService.updateContribution(props.id, {
      ...dataUpdate,
      startTime: new Date(dataUpdate.startTime).toISOString(),
      endTime: new Date(dataUpdate.endTime).toISOString(),
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
          <Modal.Title>Cập nhật khoản đóng góp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên khoản đóng góp</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={dataUpdate.name}
                onChange={(e) => {
                  setDataUpdate({ ...dataUpdate, name: e.target.value });
                }}
              />
            </Form.Group>
            {/*<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">*/}
            {/*  <Form.Label>Số tiền</Form.Label>*/}
            {/*  <Form.Control*/}
            {/*    type="text"*/}
            {/*    value={dataUpdate.amount}*/}
            {/*    onChange={(e) => {*/}
            {/*      setDataUpdate({*/}
            {/*        ...dataUpdate,*/}
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
                  value={dataUpdate.startTime}
                  onChange={(e) => {
                    setDataUpdate({ ...dataUpdate, startTime: e.target.value });
                  }}
                />
              </div>
              <div style={{ width: "47%" }}>
                <Form.Label>Ngày kết thúc</Form.Label>
                <Form.Control
                  type="date"
                  autoFocus
                  value={dataUpdate.endTime}
                  onChange={(e) => {
                    setDataUpdate({ ...dataUpdate, endTime: e.target.value });
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

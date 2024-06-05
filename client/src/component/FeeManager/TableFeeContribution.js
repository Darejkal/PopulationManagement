import React, { useState } from "react";
import Title from "../Title";
import { Button, Table } from "react-bootstrap";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ModalConfirm from "./Component/ModalConfirm";
import CreateFeeContribute from "./Component/CreateFeeContribute";
import UpdateFeeContribute from "./Component/UpdateFeeContribute";
import { convertDate } from "../../utils/function";
import { contributionService } from "../../redux/service/contributionService";

export default function TableFeeContribution(props) {
  const [id, setId] = useState(null);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const handleShowCreate = () => setModalCreate(true);

  const handleShowUpdate = (id) => {
    setModalUpdate(true);
    setId(id);
  };

  const handleShowDelete = () => setModalDelete(true);

  const handleClose = () => {
    if (modalCreate) {
      setModalCreate(!modalCreate);
    }
    if (modalUpdate) {
      setModalUpdate(!modalUpdate);
    }
    if (modalDelete) {
      setModalDelete(!modalDelete);
    }
  };

  const handleLoading = () => {
    props.handleLoading();
  };

  const handleActionDelete = async () => {
    await contributionService.deleteContribution(id);
    setModalDelete(false);
    props.handleLoading();
  };

  return (
    <div>
      <React.Fragment>
        <Title>Các khoản phí đóng góp:</Title>
        <div className="d-flex flex-row justify-content-end mb-3">
          <Button variant="primary text-white" onClick={handleShowCreate}>
            Tạo mới
          </Button>
        </div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Tên khoản đóng góp</TableCell>
              {/*<TableCell>Số tiền</TableCell>*/}
              <TableCell>Thời gian bắt đầu</TableCell>
              <TableCell>Thời gian kết thúc</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data
              ? props.data.map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    {/*<TableCell>{row.amount}</TableCell>*/}
                    <TableCell>{convertDate(row.startTime)}</TableCell>
                    <TableCell>{convertDate(row.endTime)}</TableCell>
                    <TableCell>
                      <Button
                        variant="success"
                        className="me-3"
                        onClick={() => {
                          handleShowUpdate(row._id);
                        }}
                      >
                        Cập nhật
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleShowDelete();
                          setId(row._id);
                        }}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </React.Fragment>

      {modalCreate && (
        <CreateFeeContribute
          show={modalCreate}
          handleClose={handleClose}
          handleShow={handleShowCreate}
          handleLoading={handleLoading}
        />
      )}

      {modalUpdate && (
        <UpdateFeeContribute
          show={modalUpdate}
          handleClose={handleClose}
          handleShow={handleShowUpdate}
          handleLoading={handleLoading}
          data={props.data}
          id={id}
        />
      )}

      {modalDelete && (
        <ModalConfirm
          show={modalDelete}
          handleClose={handleClose}
          handleShow={handleShowDelete}
          title="Xóa thông tin khoản đóng góp"
          description="Bạn có chắc chắn xóa khoản đóng góp này?"
          handleAction={handleActionDelete}
        />
      )}
    </div>
  );
}

import React, { useState } from "react";
import Title from "../../NotComponents/Title";
import { Button, Table } from "react-bootstrap";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CreateFeeRecurring from "./Component/CreateFeeRecurring";
import UpdateFeeRecurring from "./Component/UpdateFeeRecurring";
import ModalConfirm from "./Component/ModalConfirm";
import { feeService } from "../../redux/services/feeService";
import { useFetch } from "../../helpers/useFetch";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/config";
const houseMapper={
  "Penhouse":"Hộ cao cấp",
  "House":"Nhà dân",
  "Kiot":"Kiot",
  "Underground":"Tầng đế",
  "Individual":"Cá nhân",
}
export default function TableFeeRecurring(props) {
  const [id, setId] = useState(null);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalCreateRelation, setModalCreateRelation] = useState(false);
  const fetch=useFetch();
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
    if (modalCreateRelation) {
      setModalCreateRelation(!modalCreateRelation);
    }
  };
  const handleActionCreateRelation=()=>{
    fetch.post(BASE_URL+"/fees/createrelation",{
      id:id,
      date:Date.now()
    }).then((v)=>{
      toast.success("Đã tạo yêu cầu thu phí thành công!")
      handleClose()
    }).catch((e)=>{
      toast.warning("Tạo yêu cầu thu phí thất bại!")

    })
  }
  const handleLoading = () => {
    props.handleLoading();
  };

  const handleActionDelete = async () => {
    await feeService.deleteFee(id);
    setModalDelete(false);
    props.handleLoading();
  };

  return (
    <div>
      <React.Fragment>
        <Title>Các khoản phí:</Title>
        <div className="d-flex flex-row justify-content-end mb-3">
          <Button variant="primary text-white" onClick={handleShowCreate}>
            Tạo mới
          </Button>
        </div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Tên khoản phí</TableCell>
              <TableCell>Đối tượng</TableCell>
              <TableCell>Số tiền</TableCell>
              <TableCell>Tần suất</TableCell>
              <TableCell>Hành động</TableCell>
              <TableCell>Email đối tượng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data?.map((row, index) => (
              <TableRow key={row._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {houseMapper[row.houseType]}
                </TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  {row.frequency === "yearly" ? "Hàng năm" : "Hàng tháng"}
                </TableCell>
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
                     className="me-3"
                    onClick={() => {
                      handleShowDelete();
                      setId(row._id);
                    }}
                  >
                    Xóa
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setId(row._id);
                      setModalCreateRelation(true)
                    }}
                  >
                    Thu ngay
                  </Button>
                </TableCell>
                <TableCell>
                  {row.useremail??""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>

      {modalCreate && (
        <CreateFeeRecurring
          show={modalCreate}
          handleClose={handleClose}
          handleShow={handleShowCreate}
          handleLoading={handleLoading}
        />
      )}

      {modalUpdate && (
        <UpdateFeeRecurring
          show={modalUpdate}
          handleClose={handleClose}
          id={id}
          handleLoading={handleLoading}
          data={props.data}
        />
      )}

      {modalDelete && (
        <ModalConfirm
          show={modalDelete}
          handleClose={handleClose}
          title="Xóa thông tin khoản phí"
          description="Bạn có chắc chắn xóa khoản phí này?"
          handleAction={handleActionDelete}
          confirmLabel="Xóa"
          dismissLabel="Hủy"
        />
      )}
      {modalCreateRelation && (
        <ModalConfirm
          show={modalCreateRelation}
          handleClose={handleClose}
          title="Yêu cầu thu phí trong chu kỳ hiện tại"
          description="Bạn có chắc chắn tạo yêu cầu thu phí này trong chu kỳ hiện tại?"
          handleAction={handleActionCreateRelation}
          confirmLabel="Tạo"
          dismissLabel="Hủy"
        />
      )}
    </div>
  );
}

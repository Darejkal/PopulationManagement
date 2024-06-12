import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { feeService } from "../../../redux/services/feeService";

export default function UpdateFeeRecurring(props: {
	data: IFee[];
	handleLoading: () => any;
	handleShow: () => void;
	handleClose: () => any;
	show: boolean;
	id: string;
}) {
	const detail = props.data.find((item) => item._id === props.id);
	const [dataUpdate, setDataUpdate] = useState<IFee>({
		name: "",
		amount: 0,
		feeType: undefined,
		frequency: undefined,
		houseType: undefined,
	});

	useEffect(() => {
		if (detail) {
			setDataUpdate({
				name: detail.name,
				amount: detail.amount,
				feeType: detail.feeType,
				frequency: detail.frequency,
				houseType: detail.houseType,
			});
		}
	}, []);

	const handleSubmit = async () => {
		await feeService.updateFee(props.id, dataUpdate);
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
					<Modal.Title>Cập nhật khoản phí</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Tên khoản phí</Form.Label>
							<Form.Control
								type="text"
								autoFocus
								value={dataUpdate.name}
								onChange={(e) => {
									setDataUpdate({ ...dataUpdate, name: e.target.value });
								}}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3 d-flex justify-content-around"
							controlId="exampleForm.ControlInput1"
						>
							<Form.Select
								className="me-4"
								value={dataUpdate.houseType}
								onChange={(e) => {
									setDataUpdate({
										...dataUpdate,
										houseType: e.target.value as IFee["houseType"], 
									});
								}}
							>
								<option>Kiểu nhà</option>
								<option value="Penhouse">Hộ cao cấp</option>
								<option value="House">Nhà dân</option>
								<option value="Kiot">Kiot</option>
								<option value="Underground">Tầng đế</option>
								<option value="All">Tất cả</option>
							</Form.Select>
							<Form.Select
								className="me-4"
								value={dataUpdate.feeType}
								onChange={(e) => {
									setDataUpdate({
										...dataUpdate,
										feeType: e.target.value as "Household" | "Individual",
									});
								}}
							>
								<option>Loại</option>
								<option value="Household">Hộ khẩu</option>
								<option value="Individual">Cá nhân</option>
							</Form.Select>

							<Form.Select
								value={dataUpdate.frequency}
								onChange={(e) => {
									setDataUpdate({
										...dataUpdate,
										frequency: e.target.value as
											| "yearly"
											| "monthly"
											| undefined,
									});
								}}
							>
								<option>Tần suất</option>
								<option value="monthly">1 tháng</option>
								<option value="yearly">1 năm</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Số tiền</Form.Label>
							<Form.Control
								type="text"
								value={dataUpdate.amount}
								onChange={(e) => {
									setDataUpdate({
										...dataUpdate,
										amount: Number(e.target.value),
									});
								}}
							/>
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

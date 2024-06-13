import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { feeService } from "../../../redux/services/feeService";

export default function CreateFeeRecurring(props: {
	data: IFee[];
	handleLoading: () => any;
	handleShow: () => void;
	handleClose: () => any;
	show: boolean;
	id: string;
}) {
	const [dataCreate, setDataCreate] = useState<IFee>({
		name: "",
		amount: 0,
		feeType: undefined,
		frequency: undefined,
		houseType: undefined,
	});

	const handleSubmit = async () => {
		if (
			dataCreate.feeType &&
			!["Household", "Individual"].find((v) => v === dataCreate.feeType)
		) {
			throw "invalid argument";
		} else if (!dataCreate.feeType) {
			setDataCreate({ ...dataCreate, feeType: undefined });
		}
		// @ts-ignore
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
								type="integer"
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
								<option value="Household">Hộ khẩu</option>
								<option value="Individual">Cá nhân</option>
							</Form.Select>
							<Form.Select
								className="me-4"
								value={dataCreate.houseType}
								onChange={(e) => {
									setDataCreate({
										...dataCreate,
										houseType: e.target.value,
									});
								}}
							>
								<option value="All">Tất cả</option>
								<option value="House">Nhà dân</option>
								<option value="Kiot">Kiot</option>
								<option value="Underground">Tầng đế</option>
								<option value="Penhouse">Hộ cao cấp</option>
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

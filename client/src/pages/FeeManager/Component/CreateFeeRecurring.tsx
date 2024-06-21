import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { feeService } from "../../../redux/services/feeService";
import { toast } from "react-toastify";

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
		frequency: "monthly",
		houseType: "All",
		weight: "None",
		useremail: undefined,
		required:true
	});

	const handleSubmit = async () => {
		if( dataCreate.houseType !== "Individual"){
			dataCreate.useremail=undefined
		}
		// @ts-ignore
		feeService.createFee({
			...dataCreate,
		}).then(()=>{
			toast.success("Tạo phí thành công")
			props.handleLoading();
			props.handleClose();
		}).catch(()=>{
			toast.info("Tạo phí thất bại")

		})
	};
	console.log(dataCreate);

	return (
		<div>
			<Modal
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
								value={dataCreate.houseType}
								onChange={(e) => {
									setDataCreate({
										...dataCreate,
										houseType: e.target.value,
									});
								}}
							>
								<option value="All">Tất cả</option>
								<option value="Individual">Cá nhân</option>
								<option value="House">Nhà dân</option>
								<option value="Kiot">Kiot</option>
								<option value="Underground">Tầng đế</option>
								<option value="Penhouse">Hộ cao cấp</option>
							</Form.Select>
						</Form.Group>
						<Form.Group
							className="mb-3 d-flex justify-content-around"
							controlId="exampleForm.ControlInput1"
						>
							<Form.Select
								className="me-4"
								value={dataCreate.frequency}
								onChange={(e) => {
									setDataCreate({
										...dataCreate,
										frequency: e.target.value,
									});
								}}
							>
								<option value="monthly">1 tháng</option>
								<option value="yearly">1 năm</option>
							</Form.Select>
							<Form.Select
								className="me-4"
								value={dataCreate.weight}
								onChange={(e) => {
									setDataCreate({
										...dataCreate,
										weight: e.target.value,
									});
								}}
							>
								<option value="None">Không có trọng số</option>
								<option value="HouseSize">Theo kích cỡ nhà</option>
							</Form.Select>
						</Form.Group>
						<Form.Group>
						<Form.Select
								className="me-4"
								value={dataCreate.required?"true":"false"}
								onChange={(e) => {
									setDataCreate({
										...dataCreate,
										required: (e.target.value==="true"),
									});
								}}
							>
								<option value={"true"}>Bắt buộc</option>
								<option value={"false"}>Tình nguyện</option>
							</Form.Select>
						</Form.Group>
						<Form.Group>
							{dataCreate.houseType === "Individual" && (
								<div>
									<Form.Label>Email đối tượng</Form.Label>
									<Form.Control
										type="text"
										autoFocus
										value={dataCreate.useremail}
										onChange={(e) => {
											setDataCreate({
												...dataCreate,
												useremail: e.target.value,
											});
										}}
									/>
								</div>
							)}
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

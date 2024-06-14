import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { feeService } from "../../../redux/services/feeService";
import { toast } from "react-toastify";

export default function UpdateFeeRecurring(props: {
	data: IFee[];
	handleLoading: () => any;
	handleClose: () => any;
	show: boolean;
	id: string;
}) {
	const detail = props.data.find((item) => item._id === props.id);
	const [dataUpdate, setDataUpdate] = useState<IFee>({
		name: "",
		amount: 0,
		frequency: undefined,
		houseType: undefined,
		useremail:undefined,
		weight:"None"
	});

	useEffect(() => {
		if (detail) {
			setDataUpdate({
				name: detail.name,
				amount: detail.amount,
				frequency: detail.frequency,
				houseType: detail.houseType,
				weight:detail.weight
			});
		}
	}, []);

	const handleSubmit = async () => {
		if(dataUpdate.houseType!=="Individual"){
			dataUpdate.useremail=undefined
		}
		await feeService.updateFee(props.id, dataUpdate).then(()=>{
			toast.info("Cập nhật thành công")
			props.handleLoading();
			props.handleClose();
		}).catch(()=>{
			toast.info("Cập nhật thất bại")

		})
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
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Số tiền</Form.Label>
							<Form.Control
								type="integer"
								value={dataUpdate.amount}
								onChange={(e) => {
									setDataUpdate({
										...dataUpdate,
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
								value={dataUpdate.houseType}
								onChange={(e) => {
									setDataUpdate({
										...dataUpdate,
										houseType: e.target.value,
									});
								}}
							>
								<option value="Individual">Cá nhân</option>
								<option value="All">Tất cả</option>
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
								value={dataUpdate.frequency}
								onChange={(e) => {
									setDataUpdate({
										...dataUpdate,
										frequency: e.target.value,
									});
								}}
							>
								<option value="monthly">1 tháng</option>
								<option value="yearly">1 năm</option>
							</Form.Select>
							<Form.Select
								className="me-4"
								value={dataUpdate.weight}
								onChange={(e) => {
									setDataUpdate({
										...dataUpdate,
										weight: e.target.value,
									});
								}}
							>
								<option value="None">Không có trọng số</option>
								<option value="HouseSize">Theo kích cỡ nhà</option>
							</Form.Select>
						</Form.Group>

						<Form.Group>
							{dataUpdate.houseType === "Individual" && (
								<div>
									<Form.Label>Email đối tượng</Form.Label>
									<Form.Control
										type="text"
										autoFocus
										value={dataUpdate.useremail}
										onChange={(e) => {
											setDataUpdate({
												...dataUpdate,
												useremail: e.target.value,
											});
										}}
									/>
								</div>
							)}
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

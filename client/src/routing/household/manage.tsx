import { toast } from "react-toastify";
import { PaginatedTable } from "../../components/PaginatedTable";
import { useFetch } from "../../utils/useFetch";
import { BASE_URL, csvConfig } from "../../utils/config";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { Box, TextField,Button as MaterialButton, IconButton } from "@mui/material";
import { Delete, Edit, FileDownload, Visibility } from "@mui/icons-material";
import { MRT_Row } from "material-react-table";
import { download, generateCsv } from "export-to-csv";
export default function HouseholdManage() {
	const navigate = useNavigate();
	const fetch = useFetch();
 
	const [households, setHouseholds] = useState<
		(IHousehold & { _id: string })[]
	>([]);
	const [next, setNext] = useState<string>("");
	const [dynamicModal, setDynamicModal] = useState<ReactNode>(<></>);
	const handleExportHouseholdRows = (rows: MRT_Row<IHousehold & { _id: string }>[]) => {
        const rowData = rows.map((row) => {
            let data=row.original
            if("_id" in data){
                delete data._id
            }
            if("__v" in data){
                delete data.__v
            }
            return data
        });
		console.log(rowData)
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };   
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
			}}
		>
			<h3>Quản lý hộ khẩu</h3>
			<PaginatedTable
					
				tableProps={{
					columns: [
						{ accessorKey: "name", header: "Tên hộ khẩu" },
						{ accessorKey: "area", header: "Diện tích" },
						{ accessorKey: "address", header: "Địa chỉ" },
						{ accessorKey: "owner", header: "Chủ" },
					],
					muiTableBodyRowProps: ({ row }) => ({
					}),
					displayColumnDefOptions: {
						'mrt-row-actions': {
						  header: 'Chỉnh sửa', 
						},
					  },
					enableRowActions:true,
					renderRowActions:({row})=>(
						<div style={{display:"flex"}}>
						<HouseholdDeleteModal household={row.original}/>
						<HouseholdModifyModal household={row.original}/>
						<IconButton onClick={() => {
							navigate(`/household/expand/${row.original._id}`);
						}}>
							<Visibility/>
						</IconButton>
						</div>
					),
					renderTopToolbarCustomActions: ({ table }) => (
						<Box
						  sx={{
							display: 'flex',
							gap: '16px',
							padding: '8px',
							flexWrap: 'wrap',
						  }}
						>
						  <MaterialButton
							disabled={table.getRowModel().rows.length === 0}
							onClick={() => handleExportHouseholdRows(table.getFilteredRowModel().rows)}
							startIcon={<FileDownload />}
							>
							Trích xuất dữ liệu
						  </MaterialButton>
						  
						</Box>
					)
				}}

				pagination={{
					getPaginated: async ({ limit, next, query }) => {
						return await fetch
							.post(BASE_URL + "/households/getpaginated", {
								limit,
								query,
								next,
							})
							.then((v: any) => {
								if (v) {
									let newHouseholds = [
										...households,
										...v.results,
									] as (IHousehold & { _id: string })[];
									newHouseholds = newHouseholds
										.sort((a, b) => {
											return a._id > b._id ? 1 : 0;
										})
										.reduce((pre, cur) => {
											if (
												pre.length == 0 ||
												pre[pre.length - 1]._id !== cur._id
											) {
												pre.push(cur);
											}
											return pre;
										}, [] as (IHousehold & { _id: string })[]);
									setHouseholds(newHouseholds);
									setNext(v.next ?? undefined);
									return newHouseholds;
								}
								return [] as (IHousehold & { _id: string })[];
							})
							.catch((e) => {
								console.log("called");
								toast.dismiss();
								toast.warning("Cơ sở dữ liệu trống", { delay: 200 });
								return [];
							});
					},
					data: households,
					next: next,
				}}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
					justifyContent: "end",
					alignItems: "center",
					margin: "1rem 0",
				}}
			>
				{dynamicModal}
				<CreateHousehold />
			</div>
		</div>
	);
}
function HouseholdDeleteModal({household}:{household:IHousehold & { _id: string }}){
	const [showModal, setShowModal] = useState<boolean>(false);
	const fetch=useFetch();
	const navigate=useNavigate();
	return <>
		<IconButton style={{color:"red"}} onClick={()=>{
			setShowModal(true)
	}}><Delete/></IconButton>
	<Modal show={showModal}>
		<Modal.Header closeButton onHide={()=>setShowModal(false)}>
			Xác nhận xóa hộ khẩu
		</Modal.Header>
		<Modal.Body>
			<p>Bạn có muốn xóa hộ khẩu <bold>{household.name}</bold>?</p>
			<div style={{display:"flex", justifyContent:"end"}}>
			<Button
					variant="danger"
					onClick={()=>{
						fetch.post(BASE_URL+"/households/delete",{id:household._id}).then(()=>{
							toast.success("Xóa hộ khẩu thành công!")
							navigate(0)
						}).catch(()=>{
							toast.warning("Xóa hộ khẩu thất bại!")
				
						})
					}}
					style={{ margin: "1rem auto 0", display: "block" }}
				>
					Xác nhận
				</Button>
				<Button
					variant="primary"
					style={{ margin: "1rem auto 0", display: "block" }}
					onClick={()=>{
						setShowModal(false)
					}}
				>
					Hủy
				</Button>

			</div>
		</Modal.Body>
	</Modal>
	</>
}
function HouseholdModifyModal({household}:{household:IHousehold & { _id: string }}){
	const [showModal, setShowModal] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		setError,
	} = useForm({mode:"all"});
	const navigate = useNavigate();
	const fetch = useFetch();
	const fields = {
		name: register("name", {
			required: "Điền tên",
		}),
		area: register("area", {
			required: "Điền diện tích",
			pattern: {
				value: /^\d+$/,
				message:
					"Phải là số",
			},
		}),
		address: register("address", {
			required: "Điền địa chỉ",
			pattern: {
				value: /^(K|U|H|P)\d{4}$/,
				message:
					"Địa chỉ nhà sai cú pháp. Cú pháp ví dụ: K1001. Kiểu cú pháp: (K|U|H|P)0000",
			},
		}),
		owner: register("owner", {
			required: "Điền email chủ sở hữu",
		}),
	};
	useEffect(()=>{
		for(const field in fields){
			setValue(fields[field].name,household[field]??"")
		}
	},[household])
	const onSubmit=(params:any)=>{
		toast.dismiss();
		toast.info("Đang thay đổi thông tin hộ gia đình...");
		fetch
			.post(BASE_URL + "/households/update", {
				household:params,
				id:household._id
			})
			.then(() => {
				toast.dismiss();
				toast.success("Thay đổi thông tin hộ gia đình thành công! Đang điều hướng...", {
					delay: 200,
				});
				setShowModal(false);
				navigate(0);
			})
			.catch((e) => {
				toast.dismiss();
				toast.warning("Lỗi khi thay đổi thông tin hộ gia đình!", { delay: 200 });
			});
	}
	return (
		<>
		<IconButton onClick={()=>setShowModal(true)}>
			<Edit/>
		</IconButton>
		<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Sửa thông tin hộ gia đình</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Label>
							Sửa thông tin hộ gia đình bằng cách thay các thông tin sau.
						</Form.Label>
						<Form.Group style={{ marginTop: "0.5rem" }} controlId="name">
							<TextField
								fullWidth
								autoComplete="off"
								inputRef={fields.name.ref}
								{...fields.name}
								label={"Tên hộ khẩu"}
								error={!!errors[fields.name.name]}
								helperText={(errors[fields.name.name]?.message as string) ?? ""}
							/>
						</Form.Group>
						<Form.Group style={{ marginTop: "0.5rem" }} controlId="area">
							<TextField
								fullWidth
								autoComplete="off"
								inputRef={fields.area.ref}
								{...fields.area}
								label={"Diện tích"}
								error={!!errors[fields.area.name]}
								helperText={(errors[fields.area.name]?.message as string) ?? ""}
							/>
						</Form.Group>
						<Form.Group style={{ marginTop: "0.5rem" }} controlId="address">
							<TextField
								fullWidth
								autoComplete="off"
								inputRef={fields.address.ref}
								{...fields.address}
								label={"Địa chỉ"}
								error={!!errors[fields.address.name]}
								helperText={
									(errors[fields.address.name]?.message as string) ?? ""
								}
							/>
						</Form.Group>
						<Form.Group style={{ marginTop: "0.5rem" }} controlId="owner">
							<TextField
								fullWidth
								autoComplete="off"
								inputRef={fields.owner.ref}
								{...fields.owner}
								label={"Chủ sở hữu (Email)"}
								error={!!errors[fields.owner.name]}
								helperText={
									(errors[fields.owner.name]?.message as string) ?? ""
								}
							/>
						</Form.Group>
						<Button
							variant="primary"
							type="submit"
							style={{ margin: "1rem auto 0", display: "block" }}
						>
							Submit
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	)
}
function CreateHousehold({ show }: { show?: boolean }) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		setError,
	} = useForm({mode:"all"});
	const navigate = useNavigate();
	const fetch = useFetch();
	useEffect(() => {
		setShowModal(show ? show : false);
	}, [show]);
	const fields = {
		name: register("name", {
			required: "Điền tên",
		}),
		area: register("area", {
			required: "Điền diện tích",
			pattern: {
				value: /^\d+$/,
				message:
					"Phải là số",
			},
		}),
		address: register("address", {
			required: "Điền địa chỉ",
			pattern: {
				value: /^(K|U|H|P)\d{4}$/,
				message:
					"Địa chỉ nhà sai cú pháp. Cú pháp ví dụ: K1001. Kiểu cú pháp: (K|U|H|P)0000",
			},
		}),
		owner: register("owner", {
			required: "Điền email chủ sở hữu",
		}),
	};
	const onSubmit = (params: any) => {
		toast.dismiss();
		toast.info("Đang tạo hộ gia đình...");
		fetch
			.post(BASE_URL + "/households/create", params)
			.then(() => {
				toast.dismiss();
				toast.success("Tạo hộ gia đình thành công! Đang điều hướng...", {
					delay: 200,
				});
				setShowModal(false);
				navigate(0);
			})
			.catch((e) => {
				toast.dismiss();
				toast.warning("Lỗi khi tạo hộ gia đình!", { delay: 200 });
			});
	};
	return (
		<>
			<Button
				onClick={() => setShowModal(true)}
				variant="outline-danger"
				className="m-1"
			>
				Tạo hộ gia đình
			</Button>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Tạo hộ gia đình</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Label>
							Tạo hộ gia đình mới bằng cách điền các thông tin sau.
						</Form.Label>
						<Form.Group style={{ marginTop: "0.5rem" }} controlId="name">
							<TextField
								fullWidth
								autoComplete="off"
								inputRef={fields.name.ref}
								{...fields.name}
								label={"Tên hộ khẩu"}
								error={!!errors[fields.name.name]}
								helperText={(errors[fields.name.name]?.message as string) ?? ""}
							/>
						</Form.Group>
						<Form.Group style={{ marginTop: "0.5rem" }} controlId="area">
							<TextField
								fullWidth
								autoComplete="off"
								inputRef={fields.area.ref}
								{...fields.area}
								label={"Diện tích"}
								error={!!errors[fields.area.name]}
								helperText={(errors[fields.area.name]?.message as string) ?? ""}
							/>
						</Form.Group>
						<Form.Group style={{ marginTop: "0.5rem" }} controlId="address">
							<TextField
								fullWidth
								autoComplete="off"
								inputRef={fields.address.ref}
								{...fields.address}
								label={"Địa chỉ"}
								error={!!errors[fields.address.name]}
								helperText={
									(errors[fields.address.name]?.message as string) ?? ""
								}
							/>
						</Form.Group>
						<Form.Group style={{ marginTop: "0.5rem" }} controlId="owner">
							<TextField
								fullWidth
								autoComplete="off"
								inputRef={fields.owner.ref}
								{...fields.owner}
								label={"Chủ sở hữu (Email)"}
								error={!!errors[fields.owner.name]}
								helperText={
									(errors[fields.owner.name]?.message as string) ?? ""
								}
							/>
						</Form.Group>
						<Button
							variant="primary"
							type="submit"
							style={{ margin: "1rem auto 0", display: "block" }}
						>
							Submit
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}

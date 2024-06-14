import Layout from "../../components/Layout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	deleteUserByEmail,
	listUser,
	updateUserByEmail,
} from "../../redux/slices/canboSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../NotComponents/Title";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	IconButton,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { ButtonGroup, Modal } from "react-bootstrap";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CustomTextInput } from "../../components/CustomTextInput";
import { userInfos } from "../../utils/info";
import { MaterialReactTable } from "material-react-table";
import { Edit } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete";

const UserManagement = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [userToModify, setUserToModify] = React.useState(undefined);
	const content = (
		<Grid container spacing={3} overflow={"scroll"}>
			<Grid item xs={12}>
				<Modal
					show={userToModify ? true : false}
					onHide={() => {
						setUserToModify(undefined);
					}}
				>
					<Modal.Header closeButton></Modal.Header>
					<Modal.Body>
						<CanBoModify
							userToModify={userToModify}
							setUserToModify={setUserToModify}
						/>
					</Modal.Body>
				</Modal>
				<Paper
					sx={{
						p: 2,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<CanBoList setUserToModify={setUserToModify} />
				</Paper>
			</Grid>
		</Grid>
	);
	return content;
};
const CanBoList = ({ setUserToModify }) => {
	const currentUser = useSelector((state) => state?.user?.user);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [userList, setuserList] =
		React.useState<Omit<IUser, "password">[]>(undefined);
	const navigate = useNavigate();
	React.useEffect(() => {
		dispatch(listUser())
			.unwrap()
			.then((value) => {
				console.log(value.users);
				setuserList(value.users);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	const handleClick = (row) => {
		setUserToModify(row);
	};

	return (
		<React.Fragment>
			<Title>Người dùng:</Title>
			<MaterialReactTable
				enableRowActions
				renderRowActions={({ row }) => (
					<div style={{display:"flex"}}>
						<IconButton
							onClick={() => {
								handleClick(row.original);
							}}
						>
							<Edit/>
						</IconButton>
						<IconButton
							onClick={() => {
								dispatch(deleteUserByEmail(row.original.email))
									.unwrap()
									.then((data) => {
										alert("Đã xóa người dùng");
										navigate(0);
									})
									.catch((error) => {
										toast.warning("Lỗi khi xóa người dùng:", error);
									});
							}}
							hidden={currentUser.email == row.original.email}
							color={"error"}
						>
							<Delete/>	
						</IconButton>
					</div>
				)}
				columns={userInfos.reduce(
					(pre, v) => [
						...pre,
						...(v.name !== "password"
							? [
									{
										accessorKey: v.name,
										header: v.label,
									},
							  ]
							: []),
					],
					[]
				)}
				data={userList ?? []}
			></MaterialReactTable>
		</React.Fragment>
	);
};
const CanBoModify = ({ userToModify, setUserToModify }) => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [actionClicked, setActionClicked] = React.useState(false);
	React.useEffect(() => {
		if (userToModify) {
			Object.keys(userInfos).forEach((k) => {
				if(userInfos[k].name==="password"){
					return
				}
				document
					.getElementById(userInfos[k].name)
					?.setAttribute("value", userToModify[userInfos[k].name]??"");
			});
		}
	}, [userToModify]);
	React.useEffect(() => {
		console.log(userToModify);
	});
	const navigate=useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		let updatUser = userInfos.reduce((acc, info) => {
			acc[info.name] = data.get(info.name);
			return acc;
		}, {});
		dispatch(updateUserByEmail({
			oldemail:userToModify.email as string,
			userData:updatUser as any
		}))
			.then((value) => {
				alert("Cập nhật người dùng " + userToModify.email + " thành công!");
				setUserToModify(undefined);
				navigate(0)
			})
			.catch((e) => {
				toast.warning("Cập nhật người dùng " + userToModify.email + " thất bại!");
				console.log("error");
			});
	};
	return (
		<div
			style={{
				padding: "1rem",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<Typography component="h1" variant="h5">
				Nhập thông tin người dùng mới
			</Typography>
			<Box
				component="form"
				onSubmit={(e) => {
					handleSubmit(e);
				}}
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{userInfos.map((info) => {
					if(info.name==="password"){
						return
					}
					return info.vals.length ? (
						<div style={{ width: "80%" }} key={info.name}>
							<label id={info.label}>{info.label}</label>
							<Select
								defaultValue={info.default_val}
								labelId={info.label}
								required={info.required}
								id={info.name}
								name={info.name}
								autoFocus
								sx={{ width: "100%", height: "2.5rem" }}
							>
								{info.vals.map((val) => (
									<MenuItem value={val}>{val}</MenuItem>
								))}
							</Select>
						</div>
					) : (
						<CustomTextInput
							inputProps={{
								defaultValue: info.default_val,
								required: info.required,
								id: info.name,
								name: info.name,
								type: info.type,
								style: {},
							}}
							key={info.name}
							style={{
								width: "80%",
							}}
							label={info.label}
						/>
					);
				})}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						marginTop: "1rem",
					}}
				>
					<Button type="submit" variant="contained">
						Submit
					</Button>
				</div>
			</Box>
		</div>
	);
};
export default UserManagement;

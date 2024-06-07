import Layout from "../../Components/NavigationBar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserByEmail, listUser } from "../../redux/slices/canboSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../Components/Title";
import { canBoInfos } from "./UserAdd";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { ButtonGroup } from "react-bootstrap";

const CanBoManagement = () => {
	const [userToModify, setUserToModify] = React.useState(undefined);
	const content = (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				{userToModify ? (
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<CanBoModify
							userToModify={userToModify}
							setUserToModify={setUserToModify}
						/>
					</Paper>
				) : (
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
						}}
					>
						<CanBoList setUserToModify={setUserToModify} />
					</Paper>
				)}
			</Grid>
		</Grid>
	);
	return <Layout content={content}></Layout>;
};
const CanBoList = ({ setUserToModify }) => {
	const currentUser = useSelector((state) => state?.user?.user);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [canBos, setCanBos] = React.useState(undefined);
	React.useEffect(() => {
		dispatch(listUser())
			.unwrap()
			.then((value) => {
				console.log(value.users);
				setCanBos(value.users);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	const handleClick = (row) => {
		setUserToModify(row);
		// navigate('/HouseholdFeeList/create', {state: row});
	};

	// console.log("ttsss");
	// console.log(feeState);

	return (
		<React.Fragment>
			<Title>Các cán bộ:</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						{canBos?.[0] &&
							Object.keys(canBos?.[0]).map((value) => (
								<TableCell>
									{canBoInfos.find((e) => e.name == value)?.label}
								</TableCell>
							))}
						<TableCell>Hành động</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{canBos?.map((row, id) => (
						<TableRow key={id}>
							{Object.values(row).map((value:any) => (
								<TableCell>{value}</TableCell>
							))}
							<TableCell>
									<Button variant={"contained"} disabled={currentUser.email == row.email }>
										Xóa người dùng
									</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</React.Fragment>
	);
};
const CanBoModify = ({ userToModify, setUserToModify }) => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [actionClicked, setActionClicked] = React.useState(false);
	const handleDelete = () => {
		dispatch(deleteUserByEmail(userToModify.email))
			.then((value) => {
				alert("Xóa cán bộ " + userToModify.email + " thành công!");
				setUserToModify(false);
			})
			.catch((e) => {
				console.log("error");
			});
	};
	return (
		<React.Fragment>
			<Table size="small">
				<TableHead>
					<TableRow>
						{userToModify &&
							Object.keys(userToModify).map((value) => (
								<TableCell>
									{canBoInfos.find((e) => e.name == value)?.label}
								</TableCell>
							))}
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						{Object.values(userToModify).map((value) => (
							<TableCell>{value}</TableCell>
						))}
					</TableRow>
				</TableBody>
			</Table>
			{actionClicked ? (
				<Card sx={{ marginTop: 5 }}>
					<CardContent>
						Xóa cán bộ này?
						<ButtonGroup>
							<Button
								variant="contained"
								color="error"
								sx={{ margin: 2 }}
								onClick={() => handleDelete()}
							>
								Xác nhận xóa
							</Button>
							<Button
								variant="contained"
								sx={{ margin: 2 }}
								onClick={() => {
									setActionClicked(false);
								}}
							>
								Xác nhận không xóa
							</Button>
						</ButtonGroup>
					</CardContent>
				</Card>
			) : (
				<Button
					variant="outlined"
					sx={{ margin: 2 }}
					onClick={() => {
						setActionClicked(true);
					}}
				>
					Xóa cán bộ
				</Button>
			)}
		</React.Fragment>
	);
};
export default CanBoManagement;

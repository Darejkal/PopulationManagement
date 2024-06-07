import Layout from "../../Components/NavigationBar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import FeeList from "../../Components/FeeList";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { createUser } from "../../redux/slices/canboSlice";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { ThunkDispatch } from "@reduxjs/toolkit";
const createInfo = (
	name,
	label,
	default_val = undefined,
	type = "text",
	vals = []
) => {
	return {
		name: name,
		label: label,
		type: type,
		vals: vals,
		default_val: default_val,
	};
};
export const canBoInfos = [
	createInfo("email", "Email", "", "email"),
	createInfo("password", "Mật khẩu", "", "password"),
	createInfo("firstName", "Tên", ""),
	createInfo("lastname", "Họ", ""),
	createInfo("phoneNumber", "SĐT", ""),
	createInfo("sex", "Giới", ""),
	createInfo("position", "Chức danh", "", "text", [
		"Admin",
		"User",
	]),
];
const CanBoAdd = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const navigate=useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// console.log({
		//   email: data.get('email'),
		//   password: data.get('password'),
		// });
		let newUser = canBoInfos.reduce((acc, info) => {
			acc[info.name] = data.get(info.name);
			return acc;
		}, {});
		console.log(newUser);
		dispatch(createUser(newUser))
			.unwrap()
			.then((data) => {
				alert("User created");
				navigate("/GetCANBOMana");

			})
			.catch((error) => {
				console.log("Create user error:", error);
			});
	};
	const content = (
		<Grid container spacing={3}>
			{/* Chart */}
			{/* Recent Orders */}
			<Grid item xs={12}>
				<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
					<Box
						sx={{
							paddingTop: 5,
							paddingBottom: 5,
							paddingRight: 30,
							paddingLeft: 30,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Typography component="h1" variant="h5">
							Nhập cán bộ cần thêm
						</Typography>
						<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
							{canBoInfos.map((info) => {
								return info.vals.length ? (
									<FormControl fullWidth>
										<InputLabel id={info.label}>{info.label}</InputLabel>
										<Select
											defaultValue={info.default_val}
											labelId={info.label}
											required
											fullWidth
											id={info.name}
											label={info.label}
											name={info.name}
											autoFocus
										>
											{info.vals.map((val) => (
												<MenuItem value={val}>{val}</MenuItem>
											))}
										</Select>
									</FormControl>
								) : (
									<TextField
										defaultValue={info.default_val}
										margin="normal"
										required
										fullWidth
										id={info.name}
										label={info.label}
										name={info.name}
										type={info.type}
										// value={}
										autoFocus
									/>
								);
							})}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Thêm tài khoản cán bộ
							</Button>
						</Box>
					</Box>
				</Paper>
			</Grid>
			{/* <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <ContributionList/>
                    </Paper>
                </Grid> */}
		</Grid>
	);
	return <Layout content={content}></Layout>;
};
export default CanBoAdd;

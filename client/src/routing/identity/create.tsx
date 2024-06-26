import Layout from "../../components/Layout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import FeeList from "../../NotComponents/FeeList";
import Avatar from "@mui/material/Avatar";
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
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Button } from "react-bootstrap";
import { CustomTextInput } from "../../components/CustomTextInput";
import { userInfos } from "../../utils/info";
const CreateUserPage = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// console.log({
		//   email: data.get('email'),
		//   password: data.get('password'),
		// });
		console.log(data)
		let newUser = userInfos.reduce((acc, info) => {
			acc[info.name] = data.get(info.name);
			return acc;
		}, {});
		console.log(newUser);
		dispatch(createUser(newUser))
			.unwrap()
			.then((data) => {
				alert("User created");
				navigate(0);
			})
			.catch((error) => {
				console.log("Create user error:", error);
			});
	};
	const content = (
		<div
			style={{
				padding: "1rem 10rem 0 10rem",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Typography component="h1" variant="h5">
				Nhập thông tin người dùng mới
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					mt: 1,
					width: "80%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{userInfos.map((info) => {
					return info.vals.length ? (
						<div style={{ width: "80%",marginBottom:"1rem" }} key={info.name}>
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
								required:info.required,
								id: info.name,
								name:info.name,
								type: info.type,
								style: {
								},
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
					<Button type="submit" variant="outline-primary">
						Submit
					</Button>
				</div>
			</Box>
		</div>
	);
	return content;
};
export default CreateUserPage;

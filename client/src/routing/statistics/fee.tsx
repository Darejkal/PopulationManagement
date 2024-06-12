import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getAllFees } from "../../redux/slices/feeSlice";
import Title from "../../Components/Title";
import { Grid, Paper } from "@mui/material";
import { getAllContributions } from "../../redux/slices/contributionSlice";
import { Button } from "react-bootstrap";

// Generate Order Data

function preventDefault(event) {
	event.preventDefault();
}

function FeeList() {
	console.log(localStorage.getItem("token"));
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const feeState = useSelector((state) => state?.fee?.fees);
	const navigate = useNavigate();
	useEffect(() => {
		getFees();
	}, [dispatch]);
	const getFees = () => {
		dispatch(getAllFees());
	};
	const handleClick = (row) => {
		navigate("/HouseholdFeeList/create", { state: row });
	};

	// console.log("ttsss");
	// console.log(feeState);

	return (
		<React.Fragment>
			<Title>Các khoản phí:</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Tên</TableCell>
						<TableCell>Loại phí</TableCell>
						<TableCell>Định kỳ</TableCell>
						<TableCell>Định mức</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{feeState?.map((row) => (
						<TableRow key={row.id} onClick={() => handleClick(row)}>
							<TableCell>{row.name}</TableCell>
							<TableCell>
								{row.feeType === "Household" ? "Hộ khẩu" : "Nhân khẩu"}
							</TableCell>
							<TableCell>
								{row.frequency === "yearly" ? "Năm" : "Tháng"}
							</TableCell>
							<TableCell>{row.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</React.Fragment>
	);
}
function ContributionList() {
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const contributionState = useSelector(
		(state) => state?.contribution?.contributions
	);
	useEffect(() => {
		getContributions();
	}, []);
	const getContributions = () => {
		dispatch(getAllContributions());
	};
	const handleClick = (row) => {
		navigate("/HouseholdContributionList/create", { state: row });
	};

	return (
		<React.Fragment>
			<Title>Các khoản đóng góp:</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Tên</TableCell>
						<TableCell>Thời gian bắt đầu</TableCell>
						<TableCell>Thời gian kết thúc</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{contributionState?.map((row) => (
						<TableRow key={row.id} onClick={() => handleClick(row)}>
							<TableCell>{row.name}</TableCell>
							<TableCell>
								{row.startTime
									.toString()
									.substring(0, row.startTime.toString().indexOf("T"))}
							</TableCell>
							<TableCell>
								{row.endTime
									.toString()
									.substring(0, row.endTime.toString().indexOf("T"))}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</React.Fragment>
	);
}
const FeeAndContributionList = () => {
	const content = (
		<Grid container spacing={3}>
			{/* Chart */}
			{/* Recent Orders */}
			<Grid item xs={12}>
				<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
					<FeeList />
				</Paper>
                <div style={{width:"100%",marginTop:"1rem",justifyContent:"end",display:"flex",flexDirection:"row"}}>
                        <Button>Tạo biểu đồ thống kê</Button>
                </div>
			</Grid>
			<Grid item xs={12}>
				<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
					<ContributionList />
				</Paper>
                <div style={{width:"100%",marginTop:"1rem",justifyContent:"end",display:"flex",flexDirection:"row"}}>
                        <Button>Tạo biểu đồ thống kê</Button>
                </div>
			</Grid>
		</Grid>
	);
	return content;
};
export default FeeAndContributionList;

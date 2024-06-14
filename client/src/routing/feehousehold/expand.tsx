import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
	IHouseholdSlice,
	getHouseholdDetail,
} from "../../redux/slices/householdSlice";
import { Table } from "react-bootstrap";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { IStoreType } from "../../redux/store";
import { useFetch } from "../../helpers/useFetch";
import { toast } from "react-toastify";
import { MaterialReactTable } from "material-react-table";
import { userInfos } from "../../utils/info";
import { BASE_URL } from "../../utils/config";

export default function FeeHouseholdExpandPage() {
	const { id } = useParams();
	const household = useSelector<IStoreType>(
		(state) => state?.household?.householdDetail
	);
	const fetch = useFetch();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [householdMembers, setHouseholdMembers] = useState<IUser[]>([]);
	useEffect(() => {
		fetch
			.get(BASE_URL + "/households/members/" + id)
			.then((v) => {
				if (typeof v.users !== "undefined") {
					setHouseholdMembers(v.users);
					return;
				}
				throw "Exception";
			})
			.catch((e) => {
				toast.warning("Truy vấn thất bại. Kiểm tra kết nối!");
			});
	}, []);
	useEffect(() => {
		getFeeHouseholdList(id);
	}, [dispatch, id]);

	const getFeeHouseholdList = (id) => {
		dispatch(getHouseholdDetail(id));
	};

	console.log(household);

	const renderHouseholdDetails = (household) => {
		return (
			<Table striped bordered>
				<tbody>
					<tr>
						<td>Tên hộ khẩu</td>
						<td>{household?.name}</td>
					</tr>
					<tr>
						<td>Chủ hộ</td>
						<td>
							{household?.owner?.firstname ??
								"" + " " + household?.owner?.lastName ??
								""}
						</td>
					</tr>
					<tr>
						<td>Địa chỉ</td>
						<td>{household.address}</td>
					</tr>
				</tbody>
			</Table>
		);
	};

	return (
		<div
			style={{
				textAlign: "center",
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{household && (
				<>
					<h2>Thông tin hộ khẩu</h2>
					<div style={{ marginTop: "1rem", width: "30rem" }}>
						{renderHouseholdDetails(household)}
					</div>
					<div style={{ marginTop: "1rem" }}></div>
					<h2>Thông tin thành viên hộ khẩu</h2>
					<div style={{ padding: "1rem 10rem", width: "80vw" }}>
						<MaterialReactTable
							data={householdMembers}
							columns={[
								{
									accessorKey: "email",
									header: "Email",
								},
								{
									accessorKey: "status",
									header: "Tình trạng",
								},
								{
									accessorKey: "firstname",
									header: "Tên riêng",
								},
								{
									accessorKey: "lastname",
									header: "Tên họ",
								},
								{
									accessorKey: "CCCD",
									header: "CCCD",
								},
							]}
						/>
					</div>
				</>
			)}
		</div>
	);
}

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
import { useFetch } from "../../utils/useFetch";
import { toast } from "react-toastify";
import { MRT_Row, MaterialReactTable } from "material-react-table";
import { userInfos } from "../../utils/info";
import { BASE_URL, csvConfig } from "../../utils/config";
import { download, generateCsv } from "export-to-csv";
import { FileDownload } from "@mui/icons-material";
import Box from "@mui/material/Box";
import {Button} from "@mui/material"
export default function HouseholdExpandPage() {
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
	const handleExportHouseholdRows = (rows: MRT_Row<IUser[]>[]) => {
        const rowData = rows.map((row) => {
            let data=row.original
            if("_id" in data){
                delete data._id
            }
            if("_v" in data){
                delete data._v
            }
            data.householdname=household?.name
            data.householdowner=household?.owner?.firstname??"" + ' ' + household?.owner?.lastName??""
            data.householdaddress=household?.address
            return data
        });
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
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
						
							renderTopToolbarCustomActions={ ({ table }) => (
								<Box
								  sx={{
									display: 'flex',
									gap: '16px',
									padding: '8px',
									flexWrap: 'wrap',
								  }}
								>
								  <Button
									disabled={table.getRowModel().rows.length === 0}
									onClick={() => handleExportHouseholdRows(table.getFilteredRowModel().rows)}
									startIcon={<FileDownload />}
									>
									Trích xuất dữ liệu
								  </Button>
								  
								</Box>
							)}
						/>
					</div>
				</>
			)}
		</div>
	);
}

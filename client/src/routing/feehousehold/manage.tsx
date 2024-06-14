import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	IHouseholdSlice,
	getHouseholdDetail,
} from "../../redux/slices/householdSlice";
import { Table } from "react-bootstrap";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { IStoreType } from "../../redux/store";
import { useFetch } from "../../helpers/useFetch";
import { toast } from "react-toastify";
import { 
    MaterialReactTable, 
    useMaterialReactTable, 
    type MRT_Row,
    createMRTColumnHelper
} from "material-react-table";
import { userInfos } from "../../utils/info";
import { BASE_URL, base_url } from "../../utils/config";
import { useTimeField } from "@mui/x-date-pickers/TimeField/useTimeField";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from 'export-to-csv'; 
import { Box, Button } from '@mui/material';

export default function HouseholdFeeManagePage(){
    const {id}=useParams()
    const household = useSelector((state) => state?.household?.householdDetail);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [feeRels,setFeeRels]=useState([])
    const [contriRels,setContriRels]=useState([])
    const fetch = useFetch();
    const getFeeRelOfHousehold=(id)=>{
        fetch.get(BASE_URL+"/fees/getFeeRelOfHousehold/"+id).then((v)=>{
        console.log(v);
        setFeeRels(v.feeRels)
          toast.success("Lấy thông tin phí thành công")
        }).catch((e)=>{
          toast.warning("Lấy thông tin phí thất bại!")
    
        })
      }
    // get first time data
    useEffect(() => {
        getFeeHouseholdList(id);
        getFeeRelOfHousehold(id);
    }, [dispatch, id]);

    const getFeeHouseholdList = (id) => {
        dispatch(getHouseholdDetail(id));
    };
    
    const renderHouseholdDetails = (household) => {
        return (
            <Table striped bordered>
            <tbody>
            <tr>
                <td>Số hộ khẩu</td>
                <td>{household?.name}</td>
            </tr>
            <tr>
                <td>Chủ hộ</td>
                <td>{household?.owner?.firstname??"" + ' ' + household?.owner?.lastName??""}</td>
            </tr>
            <tr>
                <td>Địa chỉ</td>
                <td>{household?.address}</td>
            </tr>
            </tbody>
            </Table>
        );
    };

    const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
    });

    type feeHouseholdRel = {
        household: String,
        name: String,
        fee: String,
        startTime: Date,
        lateTime: Date,
        paymentTime: Date,
        amount: Number,
        status: Boolean,
        relList: String,
    }

    const handleExportRows = (rows: MRT_Row<feeHouseholdRel>[]) => {
        const rowData = rows.map((row) => row.original);
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };    

    return <>
        <h2>Thông tin hộ khẩu</h2>
        <div style={{ marginTop: "1rem", width: "30rem" }}>
          {renderHouseholdDetails(household)}
        </div>
        <div style={{marginTop:"1rem"}}></div>

        <h3>Thông tin các khoản phí bắt buộc</h3>
        <MaterialReactTable
            data = {feeRels}
            columns={[
                {
                    accessorKey: "name",
                    header: "Tên phí",
                },
                {
                    accessorKey: "paymentTime",
                    header: "Thời gian nộp phí",
                },
                {
                    accessorKey: "amount",
                    header: "Số tiền"
                },
                {
                    accessorKey: "status",
                    header: "Tình trạng",
                    Cell:({cell})=>(<>{cell.getValue()?"Đã đóng":"Chưa đóng"}</>)
                },
                {
                    accessorKey: "startTime",
                    header: "Bắt đầu thu từ",
                    
                    Cell:({cell})=>(<>{String(Date(cell.getValue())).replace('GMT+0700 (Indochina Time)'," ")}</>)
                },
                {
                    accessorKey: "lateTime",
                    header: "Nộp muộn nhất vào",
                    Cell:({cell})=>(<>{String(Date(cell.getValue())).replace('GMT+0700 (Indochina Time)'," ")}</>)
                }
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
                    onClick={() => handleExportRows(table.getRowModel().rows)}
                    startIcon={<FileDownloadIcon />}
                    >
                    Export Page Rows
                  </Button>
                  
                </Box>
            )}
        />

        <h3>Thông tin các khoản đóng góp</h3>
        <MaterialReactTable
            data = {feeRels}
            columns={[
                {
                    accessorKey: "name",
                    header: "Tên phí",
                },
                {
                    accessorKey: "paymentTime",
                    header: "Thời gian nộp phí",
                },
                {
                    accessorKey: "amount",
                    header: "Số tiền"
                },
                {
                    accessorKey: "status",
                    header: "Tình trạng",
                    Cell:({cell})=>(<>{cell.getValue()?"Đã đóng":"Chưa đóng"}</>)
                },
                {
                    accessorKey: "startTime",
                    header: "Bắt đầu thu từ"
                },
                {
                    accessorKey: "lateTime",
                    header: "Nộp muộn nhất vào"
                }
            ]}
        />
    </>
}
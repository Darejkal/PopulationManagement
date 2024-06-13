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
import { MaterialReactTable } from "material-react-table";
import { userInfos } from "../../utils/info";
import { BASE_URL } from "../../utils/config";


export default function HouseholdFeeManagePage(){
    const {id}=useParams()
    const household = useSelector((state) => state?.household?.householdDetail);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    // get first time data
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
    
    return <>
        <h2>Thông tin hộ khẩu</h2>
        <div style={{ marginTop: "1rem", width: "30rem" }}>
          {renderHouseholdDetails(household)}
        </div>
        <div style={{marginTop:"1rem"}}></div>
        <MaterialReactTable
            data = {[]}
            columns={[
                {
                    accessorKey:"household",
                    header: "Số hộ khẩu"
                },
                {
                    accessorKey: "name",
                    header: "Tên phí",
                },
                {
                    accessorKey: "paymentTime",
                    header: "Thời gian nộp phí"
                },
                {
                    accessorKey: "amount",
                    header: "Số tiền"
                },
                {
                    accessorKey: "status",
                    header: "Tình trạng"
                }
            ]}
        />
    </>
}
// <<<<<<< HEAD
// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Title from './Title';
// import {useDispatch, useSelector} from "react-redux";
// import {useEffect} from "react";
// import {getAllFees} from "../redux/slices/feeSlice";
// import {useNavigate} from "react-router-dom";
//
// // Generate Order Data
//
// function preventDefault(event) {
//     event.preventDefault();
// }
//
// export default function FeeList() {
//     const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
//     const feeState = useSelector((state) => state?.fee?.fees);
//     const navigate = useNavigate();
//     useEffect(() => {
//         getFees();
//     }, []);
//     const getFees = () => {
//         dispatch(getAllFees());
//     }
//     const handleClick = (row) => {
//         navigate('/HouseholdFeeList/create', {state: row});
//     }
//
//     // console.log("ttsss");
//     // console.log(feeState);
//
//
//     return (
//         <React.Fragment>
//             <Title>Các khoản phí:</Title>
//             <Table size="small">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>Tên</TableCell>
//                         <TableCell>Loại phí</TableCell>
//                         <TableCell>Định kỳ</TableCell>
//                         <TableCell>Định mức</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {feeState?.map((row) => (
//                         <TableRow key={row.id} onClick={() => handleClick(row)}>
//                             <TableCell>{row.name}</TableCell>
//                             <TableCell>{row.feeType === "Household" ? "Hộ khẩu" : "Nhân khẩu"}</TableCell>
//                             <TableCell>{row.frequency === "yearly" ? "Năm" : "Tháng"}</TableCell>
//                             <TableCell>{row.amount}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </React.Fragment>
//     );
// =======
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllFees} from "../redux/slices/feeSlice";
import {useNavigate} from "react-router-dom";
import { ThunkDispatch } from '@reduxjs/toolkit';

// Generate Order Data

function preventDefault(event) {
    event.preventDefault();
}

export default function FeeList() {
    console.log(localStorage.getItem('token'));
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const feeState = useSelector((state) => state?.fee?.fees);
    const navigate = useNavigate();
    useEffect(() => {
        getFees();
    }, [dispatch]);
    const getFees = () => {
        dispatch(getAllFees());
    }
    const handleClick = (row) => {
        navigate('/HouseholdFeeList/create', {state: row});
    }

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
                            <TableCell>{row.feeType === "Household" ? "Hộ khẩu" : "Nhân khẩu"}</TableCell>
                            <TableCell>{row.frequency === "yearly" ? "Năm" : "Tháng"}</TableCell>
                            <TableCell>{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
// >>>>>>> e8338ac64a73f6f0571432505f511b97403c48c9
}
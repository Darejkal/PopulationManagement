import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from "@mui/material/Checkbox";
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    getContributionHouseholdList,
    updateDate,
    updateContributionList,
    updateStatus,
    updateContributionAmount, updateContributionDate
} from "../../redux/slices/listSlice";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { ThunkDispatch } from '@reduxjs/toolkit';
export default function ContributionHouseholdList() {

    //declare
    const {id} = useParams();
    const navigate=useNavigate();
    const [firstTime, setFirstTime] = React.useState([]);
    const [checkFirstTime, setCheckFirstTime] = React.useState([]);
    const [selectedDates, setSelectedDates] = React.useState({});
    const [contributionAmount,setContributionAmount]=React.useState([]);
    const listState = useSelector((state) => state?.list?.contributionList);
    // console.log("qưeeee");
    // console.log(listState);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    //get first time data
    useEffect(() => {
        getContributionHouseList();
    }, [dispatch,id]);
    const getContributionHouseList = () => {
        dispatch(getContributionHouseholdList(id));

    }

    //handle function
    const handleInputChange = (changedList,event) => {
        // Dispatch an action to update the status in the Redux store
        setCheckFirstTime(prevState => ({
            ...prevState,
            [changedList._id]:2,
        }) );

        setContributionAmount((prevState)=>({
            ...prevState,
            [changedList._id]:event.target.value,

        }))
        dispatch(updateContributionAmount({id: changedList._id, amount: event.target.value}));

    };

    const handleDateChange = (changedList, date) => {
        setSelectedDates((prevSelectedDates) => ({
            ...prevSelectedDates,
            [changedList._id]: date, // Store the selected date for the specific row
        }));
        setFirstTime(prevState => ({
            ...prevState,
            [changedList._id]:2,
        }) );
        dispatch(updateContributionDate({id: changedList._id, date: dayjs(date).format('MM/DD/YYYY')}))

    };
    const handleOnClickSave = () => {
        const data = listState?.map((contributionHousehold) => ({
            _id: contributionHousehold._id,
            amount: contributionHousehold?.amount,
            paymentTime: contributionHousehold?.paymentTime
        }));
        const contributionListData={
            changedContributionList: data
        }

        dispatch(updateContributionList(contributionListData))
            .unwrap()
            .then((state)=>{
                    window.location.reload();
            })
            .catch((error)=>{
                console.log("error");
            });


    }


    const content = (
        <>
            <Navbar variant="dark" bg="primary" expand="lg">
                <Container fluid>
                    <Navbar.Brand>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Hộ khẩu</TableCell>
                            <TableCell style={{width: '400px'}}>Địa chỉ</TableCell>
                            <TableCell>Thời gian</TableCell>
                            <TableCell  style={{width: '200px'}}>Tiền đóng góp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listState && listState.length> 0 ?(
                            listState.map((onelist) => (
                                <TableRow
                                    key={onelist.household?.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="onelist">
                                        {onelist.household?.name}
                                    </TableCell>
                                    <TableCell>{onelist.household?.address}</TableCell>
                                    <TableCell>
                                        {!(onelist?.paymentTime && !firstTime[onelist._id]) ? (

                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker
                                                        label="Date"
                                                        value={selectedDates[onelist._id] || null}
                                                        onChange={(date) => handleDateChange(onelist, date)}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        ) : (onelist.paymentTime).toString().substring(0,onelist.paymentTime.toString().indexOf('T'))}
                                    </TableCell>
                                    <TableCell>
                                        {(onelist?.amount && !checkFirstTime[onelist._id])?(
                                            onelist?.amount
                                        ):(
                                            <InputGroup >
                                            <Form.Control
                                            placeholder="Khoản đóng góp"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            value={contributionAmount[onelist._id]}
                                            onChange={(event) => handleInputChange(onelist,event)}
                                            />
                                            </InputGroup>

                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ):null}

                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{textAlign: 'center', marginTop: '10px'}}>
                <Button variant="primary"
                        style={{fontSize: '1.5rem', margin: '0 auto', backgroundSize: 'cover', width: '300px'}}
                        onClick={handleOnClickSave}>
                    Lưu
                </Button>
            </div>
        </>

    );
    return (
        content
    )
}
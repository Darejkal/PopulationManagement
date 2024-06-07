
    import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getHouseholdsBasedOnParams} from "../../redux/slices/householdSlice";
import {useLocation, useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
    import {createFeeList} from "../../redux/slices/listSlice";

export default function CreateHouseholdFeeList() {
    // get fee
    const fee = useLocation();
    const navigate=useNavigate();
    // get value
    const [tableName, setTableName] = useState("");
    const [area, setArea] = useState("");
    const [memberNumber, setMemberNumber] = useState("");
    const handleTableNameChange = (event) => {
        setTableName(event.target.value);
    };

    const handleAreaChange = (event) => {
        setArea(event.target.value);
    };

    const handleMemberNumberChange = (event) => {
        setMemberNumber(event.target.value);
    };

    // get value from server
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const householdState = useSelector((state) => state?.household?.households);

    useEffect(() => {
        getHousehold();
    }, [dispatch]);
    const getHousehold =async () => {
         await dispatch(getHouseholdsBasedOnParams({}));
    }
    const handleOnclickCreate =async () => {
        const Params = {
            area: area,
            memberNumber: memberNumber,
        }
         await dispatch(getHouseholdsBasedOnParams(Params))
            .unwrap()
            .then((state)=>{
                console.log(state);
                    if(state.length===0){
                        alert("Không có hộ khẩu");
                    }else{
                        alert("Tạo thành công");
                    }
            });

    };

    const handleOnClickSave = () => {
        const Params = {
            tableName: tableName,
            households: householdState,
            fee_id: fee?.state?._id,
            type:"fee"
        }
        dispatch(createFeeList(Params))
            .unwrap()
            .then((state)=>
                {

                    navigate(`/HouseholdFeeList/${state.id}`);



                }

            );

    }

    // console.log("zzzz");
    // console.log(householdState);


    const content = (
        <>
            <Navbar variant="dark" bg="primary" expand="lg">
                <Container fluid>
                    <Navbar.Brand>
                        {tableName}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-dark-example"/>
                    <Navbar.Collapse id="navbar-dark-example">
                        <Nav style={{marginLeft: 'auto'}}>
                            <InputGroup size="small" style={{marginRight: "3px"}}>
                                <InputGroup.Text id="basic-addon1">Tên Bảng</InputGroup.Text>
                                <Form.Control
                                    aria-label="Tên bảng"
                                    aria-describedby="basic-addon1"
                                    value={tableName}
                                    onChange={handleTableNameChange}
                                />
                            </InputGroup>
                            <Form.Select size="small" style={{marginRight: "3px"}} value={area}
                                         onChange={handleAreaChange}>
                                <option>Khu vực</option>
                                <option>Quỳnh Lôi</option>
                                <option>Thanh Nhàn</option>
                                <option>Bách Khoa</option>
                            </Form.Select>
                            <Form.Select size="small" style={{marginRight: "3px"}} value={memberNumber}
                                         onChange={handleMemberNumberChange}>
                                <option>Số thành viên lớn hơn</option>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Form.Select>
                            <Button variant="light" onClick={()=>handleOnclickCreate()}>Tạo</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {householdState && householdState.length > 0 ? (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{width: '200px'}}>Tên hộ</TableCell>
                                    <TableCell>Địa Chỉ</TableCell>
                                    <TableCell style={{width: '200px'}}>Số thành viên</TableCell>
                                    <TableCell style={{width: '150px'}}>Tiền cần nộp</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {householdState.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row" style={{width: '200px'}}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{`so 12 hoang thanh thang long nguyen chu ba ${row.address}`}</TableCell>
                                        <TableCell style={{width: '200px'}}>{row?.memberNumber}</TableCell>
                                        <TableCell style={{width: '150px'}}>{row.memberNumber * fee?.state?.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{textAlign: 'center', marginTop: '10px'}}>
                        <Button variant="primary"
                                style={{fontSize: '1.5rem', margin: '0 auto', backgroundSize: 'cover'}}
                                onClick={handleOnClickSave}>
                            Lưu
                        </Button>
                    </div>
                </>
            ) : null}

        </>

    );
    return (
        content
    )
}
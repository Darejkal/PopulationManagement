import Layout from '../../components/Layout';
import { Grid, Card, CardContent, Typography, CardHeader } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DetailDialog from './DetailDialog';
import {useDispatch, useSelector} from "react-redux";
import {getHouseholdsBasedOnParams} from "../../redux/slices/householdSlice";
import {IStatisticState, getStatistics} from "../../redux/slices/statisticSlice";


const Statistic = () => {
    const [detailDialog, setDetailDialog] = useState(false);
    const dispatch=useDispatch<ThunkDispatch<any, any, any>>();
    const statistic=useSelector<IStatisticState>((state)=>state?.statistic?.statics);
    const [selectedRow, setSelectedRow] = useState({});

    useEffect(() => {
        getStaticss();
        // handleOnclickCreate();
    }, [dispatch]);
    const getStaticss = () => {
        dispatch(getStatistics())
    }
    console.log(statistic);
    const handleClickRow = (row) => {
        setDetailDialog(true);
        setSelectedRow(row);
    }



    const content = (
        <>
            <Grid container spacing={2} >
                <Grid item xs={6}>
                    <Card>
                        <CardHeader title="Tổng số tiền đã thu"></CardHeader>
                        <CardContent>
                            <Typography fontSize={32}> {statistic?.feeSum} <span fontSize={16}>VND</span> </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardHeader title="Tổng số hộ đã nộp"></CardHeader>
                        <CardContent>
                            <Typography fontSize={32}>{statistic?.householdListSize}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    {detailDialog ? <DetailDialog show={setDetailDialog}  row={selectedRow}/> : null}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{backgroundColor:"#C4C4C4"}}>
                                <TableRow >
                                    <TableCell>Tên hộ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {statistic?.householdList?.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        onClick={() => handleClickRow(row)}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                    
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );

    return (
        <>
            {content}
        </>
    );
}

export default Statistic;






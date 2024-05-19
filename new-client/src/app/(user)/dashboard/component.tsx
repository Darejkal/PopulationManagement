"use client"
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useMaterialReactTable,MaterialReactTable,MRT_ColumnDef } from 'material-react-table';
const data = [
    {
      stt: 1,
      household: 'Hộ A',
      member: 'Nguyễn Văn A',
      relation: 'Chủ hộ',
      dob: '01/01/1980',
      gender: 'Nam',
      id: '123456789',
      tempRegister: '01/01/2023',
      expiry: '01/01/2024',
      status: 'Đang cư trú',
    },
    {
      stt: 2,
      household: 'Hộ A',
      member: 'Trần Thị B',
      relation: 'Vợ',
      dob: '02/02/1985',
      gender: 'Nữ',
      id: '987654321',
      tempRegister: '01/01/2023',
      expiry: '01/01/2024',
      status: 'Đang cư trú',
    },
    // Add more data here...
  ];
interface LogItem{
  createdat:string,
  detail:string
}
const logMockData:LogItem[]=[
    {
        createdat:(new Date(Date.now())).toLocaleDateString(),
        detail:"Thêm thông tin hộ khẩu"
    }
]
export const RecentChangeTable =()=>{
  const columns = React.useMemo<MRT_ColumnDef<LogItem>[]>(
    () => [
        {
            accessorKey: 'createdat',
            header: 'Ngày thực hiện'
        },
        {
          accessorKey: 'detail',
          header: 'Thay đổi'
      },
    ],
    [],
);
    const handleRowClick = (householdId:string) => {

    };
  const table = useMaterialReactTable({
      columns:columns,
      data:logMockData, 
      getRowId: (originalRow,index) => `${index+1}`,
      muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
          onClick: (event) => handleRowClick(row.id),
          sx: { cursor: 'pointer' },
        })
  }); 

    return (
        <div style={{width:"100%"}} >
      <Typography variant="h4" gutterBottom>
        Thông tin nhật ký
      </Typography>
        <MaterialReactTable table={table}/>
        </div>
      );
}
export const HouseholdTable = () => {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'stt', // Accessor is the "key" in the data
        header: 'STT',
      },
      {
        accessorKey: 'household',
        header: 'Hộ Gia Đình',
      },
      {
        accessorKey: 'member',
        header: 'Nhân Khẩu',
      },
      {
        accessorKey: 'relation',
        header: 'Mối Quan Hệ',
      },
      {
        accessorKey: 'dob',
        header: 'Ngày Sinh',
      },
      {
        accessorKey: 'gender',
        header: 'Giới Tính',
      },
      {
        accessorKey: 'id',
        header: 'CMND/CCCD',
      },
      {
        accessorKey: 'tempRegister',
        header: 'Ngày Đăng Ký Tạm Trú/Tạm Vắng',
      },
      {
        accessorKey: 'expiry',
        header: 'Ngày Hết Hạn',
      },
      {
        accessorKey: 'status',
        header: 'Trạng Thái Cư Trú',
      },
    ],
    [],
  );

    const handleRowClick = (householdId:string) => {

    };
  const table = useMaterialReactTable({
      columns:columns,
      data:data, 
      getRowId: (originalRow,index) => `${index+1}`,
      muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
          onClick: (event) => handleRowClick(row.id),
          sx: { cursor: 'pointer' },
        })
  }); 
  return (
    <div style={{width:"100%"}}>
      <Typography variant="h4" gutterBottom>
        Thông tin hộ khẩu
      </Typography>
          <MaterialReactTable table={table}/>
    </div>
  );
};


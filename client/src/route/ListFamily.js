import { ListedView } from "../component/ListedView"
import { useState } from "react";
import { useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
    displayColumnDefOptions,
} from 'material-react-table';
import { TextField } from "@mui/material";
import { Box } from '@mui/material';
import { Button } from'@mui/material';
import { palette } from '@mui/material/colors';
import { Navigate, useNavigate } from "react-router-dom";

const data = [
    {
      id: 1,
      host_name: 'East Daphne',
      address: '261 Erdman Ford',
      num_members: 3,
    },
    {
        id: 2,
        host_name: 'East Daphne',
        address: '261 Erdman Ford',
        num_members: 3,
    },        
    {
      id: 3,
      host_name: 'East Daphne',
      address: '261 Erdman Ford',
      num_members: 3,
    },
];


export const HouseholdList = ()=>{
    const [displayList, setDisplayList] = useState(true);
    const [displayDetails, setSelectedHouseholdId] = useState(null);

    const handleRowClick = (householdId) => {
        setDisplayList(null);
        setSelectedHouseholdId(householdId);
    };

    const navigate = useNavigate();
    const handleAddHousehold = () => {
        navigate('/addFamily');
    };
    
    const goBack = ()=>{
        setSelectedHouseholdId(null);
        setDisplayList(true);
    };
    
    const HouseholdDetails = ({householdId})=>{
        const selectedHousehold = data.find((hh)=>hh.id==householdId);
        
        const membersTable = useMaterialReactTable(
            {
                columns,
                data,
                displayColumnDefOptions: {
                    'mrt-row-select': {
                      size: 50, //adjust the size of the row select column
                      grow: false, //new in v2.8 (default is false for this column)
                    },
                    'mrt-row-numbers': {
                      size: 40,
                      grow: true, //new in v2.8 (allow this column to grow to fill in remaining space)
                    },
                  },
            });

        if(!selectedHousehold) return null;

        return(
            <div>
                <div>
                    <h2>Chi tiết về hộ gia đình</h2>
                </div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, maxWidth:'60%'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField required disabled fullWidth id="read-only-outlined-basic" label="Mã hộ khẩu" variant="outlined" defaultValue={selectedHousehold.id} />
                    <TextField disabled fullWidth id="outlined-basic" label="Họ và tên Chủ hộ" variant="outlined" defaultValue={selectedHousehold.host_name}/>
                    <TextField required disabled fullWidth id="outlined-basic" label="Mã khu vực" variant="outlined" />
                    <TextField required disabled fullWidth id="outlined-basic" label="Địa chỉ" variant="outlined" defaultValue={selectedHousehold.address}/>
                    <TextField required disabled fullWidth id="outlined-basic"
                                label="Số CCCD Chủ hộ"
                                InputProps={{
                                    readOnly: true,
                                }}/>
                    <TextField required disabled fullWidth id="outlined-basic"
                                label="Ngày sinh Chủ hộ"
                                InputProps={{
                                    readOnly: true,
                                }}/>
                </Box>
                <div>
                    Thành viên trong hộ (nháp)
                    <MaterialReactTable table={membersTable}></MaterialReactTable>
                </div>

                <div>
                    <Button variant="contained" sx={{mr:4, mt:4, mb:4  }} onClick={()=>goBack()}>Sửa hộ khẩu</Button>
                    <Button variant="contained" onClick={()=>goBack()} color='error'>Xóa hộ khẩu</Button>
                </div>

                <div>
                </div>

                <div>
                    <Button variant="outlined" sx={{mr:4, mb:4  }} onClick={()=>goBack()}>Trở về</Button>
                </div>
            </div>
        )
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID'
            },
            {
                accessorKey: 'host_name',
                header: 'Host Name'
            },
            {
                accessorKey: 'num_members',
                header: 'Number of members'
            },
            {
                accessorKey: 'address',
                header: 'Address'
            },
        ],
        [],
    );
      
    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        getRowId: (originalRow) => originalRow.id,
        muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
            onClick: (event) => handleRowClick(row.id),
            sx: { cursor: 'pointer' },
          })
    }); 


    return (
        <div>
            <ListedView>
                {displayList && 
                    <div>
                        <div>
                            <h2>Danh sách Hộ khẩu</h2>
                        </div>

                        <div>
                            <Button variant="contained" sx={{mr:4, mb:4}} color='success' onClick={()=>handleAddHousehold()}>Thêm hộ khẩu</Button>
                        </div>

                        <MaterialReactTable table={table}/>
                    </div>
                }
                {displayDetails && <HouseholdDetails householdId={displayDetails}></HouseholdDetails>}
            </ListedView>
        </div>
    );
}

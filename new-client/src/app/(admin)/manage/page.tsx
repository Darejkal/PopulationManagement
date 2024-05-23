"use client"

import FeeManagement, { ContributionManagement, UserManagement } from "./component"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from "react";
export default function Dashboard(){
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%', typography: 'body1', padding:"0 10%"  }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Quản lý người dân" value="1" />
              <Tab label="Quản lý phí thu" value="2" />
              <Tab label="Quản lý đóng góp" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1"><UserManagement/></TabPanel>
          <TabPanel value="2"><FeeManagement/></TabPanel>
          <TabPanel value="3"><ContributionManagement/></TabPanel>
        </TabContext>
      </Box>
    )
}
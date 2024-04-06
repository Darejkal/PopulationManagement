import React from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { ListedView } from '../component/ListedView';
const users = [
    {
      email: 'john@example.com',
      password: 'password123',
      firstName: 'John',
      lastname: 'Doe',
      phoneNumber: '1234567890',
      sex: 'Male',
      address: '123 Main St, New York',
      position: 'Resident'
    },
    // Add more user objects as needed
  ];
const UserInfoTable = ({ users }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Họ</TableCell>
            <TableCell>SĐT</TableCell>
            <TableCell>Giới tính</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Vai trò</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.sex}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const UserInfo=()=>{
    return <ListedView><UserInfoTable users={users}/></ListedView>
}
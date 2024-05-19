import React from 'react';
import { Table } from 'react-bootstrap';

export const FeeTable = () => {
  const fees = [
    {
      stt: 1,
      household: 'Hộ A',
      serviceFee: '10,000 đồng/m²',
      managementFee: '7,000 đồng/m²',
      voluntaryContributions: '500,000 đồng',
    },
    {
      stt: 2,
      household: 'Hộ B',
      serviceFee: '12,000 đồng/m²',
      managementFee: '7,000 đồng/m²',
      voluntaryContributions: '300,000 đồng',
    },
    // Add more data here...
  ];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>STT</th>
          <th>Hộ Gia Đình</th>
          <th>Phí Dịch Vụ Chung Cư</th>
          <th>Phí Quản Lý Chung Cư</th>
          <th>Các Khoản Đóng Góp Tự Nguyện</th>
        </tr>
      </thead>
      <tbody>
        {fees.map((fee, index) => (
          <tr key={index}>
            <td>{fee.stt}</td>
            <td>{fee.household}</td>
            <td>{fee.serviceFee}</td>
            <td>{fee.managementFee}</td>
            <td>{fee.voluntaryContributions}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
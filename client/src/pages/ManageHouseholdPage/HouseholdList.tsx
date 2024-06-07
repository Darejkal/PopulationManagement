import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import Layout from "../../Components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHouseholds } from "../../redux/slices/householdSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

function HouseholdList() {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const households = useSelector((state) => state?.household?.households);

  useEffect(() => {
    getHouseholdListss();
  }, [dispatch]);

  const getHouseholdListss = () => {
    dispatch(getHouseholds());
  };

  console.log(households);

  const handleRowClick = (household) => {
    navigate(`/PopulationList/${household?._id}`);
  };

  const content = (
      <div>
        <h2>Danh sách Hộ khẩu</h2>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>hộ khẩu</th>
            <th>Số thành viên</th>
            <th>Địa chỉ</th>
          </tr>
          </thead>
          <tbody>
          {households?.map((household, index) => (
              <tr key={index} onClick={() => handleRowClick(household)}>
                <td>{household?.name}</td>
                <td>{household?.memberNumber}</td>
                <td>{household?.address}</td>
              </tr>
          ))}
          </tbody>
        </Table>
      </div>
  );

  return <Layout content={content}></Layout>;
}

export default HouseholdList;
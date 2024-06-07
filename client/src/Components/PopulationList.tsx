import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFeeHouseholdList } from "../redux/slices/listSlice";
import { getHouseholdDetail } from "../redux/slices/householdSlice";
import { ThunkDispatch } from '@reduxjs/toolkit';

function PopulationList() {
  const { id } = useParams();
  const household = useSelector((state) => state?.household?.householdDetail);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // get first time data
  useEffect(() => {
    getFeeHouseholdList(id);
  }, [dispatch, id]);

  const getFeeHouseholdList = (id) => {
    dispatch(getHouseholdDetail(id));
  };

  console.log(household);

  const renderHouseholdDetails = (household) => {
    return (
        <Table striped bordered>
          <tbody>
          <tr>
            <td>Số hộ khẩu</td>
            <td>{household?.name}</td>
          </tr>
          <tr>
            <td>Chủ hộ</td>
            <td>{household?.owner?.firstName + ' ' + household?.owner?.lastName}</td>
          </tr>
          <tr>
            <td>Địa chỉ</td>
            <td>{household.address}</td>
          </tr>
          </tbody>
        </Table>
    );
  };

  const content = (
      <div style={{ textAlign: 'center' }}>
        <h2>Thông tin hộ khẩu</h2>
        {household && (
            <div key={household._id}>
              {/* <h3>Hộ khẩu số {household.householdNumber}</h3> */}
              {renderHouseholdDetails(household)}
            </div>
        )}
      </div>
  );

  return content;
}

export default PopulationList;

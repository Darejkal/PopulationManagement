import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IHouseholdSlice, getHouseholdDetail } from "../../redux/slices/householdSlice";
import { Table } from "react-bootstrap";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { IStoreType } from "../../redux/store";

export default function HouseholdExpandPage(){
    const { id } = useParams();
    const household = useSelector<IStoreType>((state) => state?.household?.householdDetail);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  
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
  
    return (
        <div style={{ textAlign: 'center',height:"100%",justifyContent:"center",alignItems:"center",width:"100%",display:"flex",flexDirection:"column" }}>
          <h2>Thông tin hộ khẩu</h2>
          {household && (
              <div style={{marginTop:"1rem",width:"30rem"}}>
                {renderHouseholdDetails(household)}
              </div>
          )}
        </div>
    );
  
}
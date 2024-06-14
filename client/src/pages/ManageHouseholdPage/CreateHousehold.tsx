import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMember } from "../../redux/slices/populationSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

function CreateHousehold() {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  // const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    address: "",
    memberNumber: 0,
    members: [], 
    householdNumber: 0, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index] = value;
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleMemberInputBlur = (index) => {
    const updatedErrorFields = { ...errorFields };
    updatedErrorFields.memberInputs[index] = !formData.members[index];
    setErrorFields(updatedErrorFields);
  };

  const [errorFields, setErrorFields] = useState({
    address: false,
    memberNumber: false,
    memberInputs: Array.from({ length: formData.memberNumber }, () => false),
    // Thêm các trường khác cần kiểm tra ở đây
  });
  // Các state và hàm xử lý dữ liệu giữ nguyên

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["address", "memberNumber", "householdNumber"];
    let hasError = false;

    const updatedErrorFields = { ...errorFields };
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        updatedErrorFields[field] = true;
        hasError = true;
      } else {
        updatedErrorFields[field] = false;
      }
    });

    errorFields.memberInputs.forEach((field, index) => {
      if (!formData.members[index]) {
        updatedErrorFields.memberInputs[index] = true;
        hasError = true;
      } else {
        updatedErrorFields.memberInputs[index] = false;
      }
    });

    if (hasError) {
      setErrorFields(updatedErrorFields);
      return;
    }

    setErrorFields({
      address: false,
      memberNumber: false,
      memberInputs: Array.from({ length: formData.memberNumber }, () => false),
      // Reset other error fields here if needed
    });
    formData.members.forEach((member) => {
      dispatch(addMember(member));
    });
    navigate("/CreateHH/AddHHer", { state: { members: formData.members } });
  };


  const renderMemberInputs = () => {
    const inputs = [];
    for (let i = 0; i < formData.memberNumber; i++) {
      inputs.push(
        <Form.Group key={i} className="mb-3" controlId={`formMember${i}`}>
          <Form.Label>{`Thành viên ${i + 1}`}</Form.Label>
          <Form.Control
            type="text"
            value={formData.members[i] || ""}
            onChange={(e) => handleMemberChange(i, e.target.value)}
            onBlur={() => handleMemberInputBlur(i)}
            isInvalid={errorFields.memberInputs[i]}
          />
          <Form.Control.Feedback type="invalid">
            Vui lòng nhập thông tin thành viên
          </Form.Control.Feedback>
        </Form.Group>
      );
    }
    return inputs;
  };

  const content = (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formHouseholdNumber">
          <Form.Label>Tên hộ khẩu</Form.Label>
          <Form.Control
            type="number"
            name="householdNumber"
            value={formData.householdNumber}
            onChange={handleChange}
            isInvalid={errorFields.householdNumber}
          />
          <Form.Control.Feedback type="invalid">
            Vui lòng nhập số hộ khẩu
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Địa chỉ:</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            isInvalid={errorFields.address} // Đánh dấu trường lỗi
          />
          <Form.Control.Feedback type="invalid">
            Vui lòng điền địa chỉ
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMemberNumber">
          <Form.Label>Số thành viên</Form.Label>
          <Form.Control
            type="number"
            name="memberNumber"
            value={formData.memberNumber}
            onChange={handleChange}
            isInvalid={errorFields.memberNumber} // Đánh dấu trường lỗi
          />
          <Form.Control.Feedback type="invalid">
            Vui lòng nhập số thành viên
          </Form.Control.Feedback>
        </Form.Group>

        {renderMemberInputs()}
        <Button variant="primary" type="submit">
          Chọn chủ hộ
        </Button>
      </Form>
    </>
  );
  return content;
}

export default CreateHousehold;

import axios from "axios";
import { base_url, config } from "../../utils/config";

const getAllFees = async () => {
  try {
    const response = await axios.get(`${base_url}fee`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    });
    return response.data.fees;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateFee = async (id, data) => {
  try {
    const response = await axios.put(`${base_url}fee/${id}`, data, config());
    return response.data.fees;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createFee = async (data) => {
  try {
    const response = await axios.post(`${base_url}fee`, data, config());
    return response.data.fees;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteFee = async (id) => {
  try {
    const response = await axios.delete(`${base_url}fee/${id}`, config());
    return response.data.fees;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const feeService = {
  getAllFees,
  createFee,
  updateFee,
  deleteFee,
};

import axios from "axios";
import { base_url, config } from "../../utils/config";

const getAllFee = async () => {
  try {
    const response = await axios.get(`${base_url}fees`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    });
    return response.data.fees as IFee[];
  } catch (error:any) {
    throw new Error(error.message);
  }
};

const updateFee = async (id:string, data:IFee) => {
  try {
    const response = await axios.put(`${base_url}fees/${id}`, data, config());
    return response.data as {message:string};
  } catch (error:any) {
    throw new Error(error.message);
  }
};

const createFee = async (data:{name:string,amount:number,description?:string,feeType?:"Household"|"Individual",frequency?:["yearly","monthly"]}) => {
  try {
    const response = await axios.post(`${base_url}fees`, data, config());
    return response.data as {message:string};
  } catch (error:any) {
    throw new Error(error.message);
  }
};

const deleteFee = async (id:string) => {
  try {
    const response = await axios.delete(`${base_url}fees/${id}`, config());
    return response.data as {message:string};
  } catch (error:any) {
    throw new Error(error.message);
  }
};

export const feeService = {
  getAllFee,
  createFee,
  updateFee,
  deleteFee,
};

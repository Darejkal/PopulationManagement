import axios from "axios";
import { base_url, config } from "../../utils/config";

const getALlContributions = async () => {
  try {
    const response = await axios.get(`${base_url}contributions`, config());
    return response.data.contributions;
  } catch (error:any) {
    throw new Error(error.message);
  }
};

const updateContribution = async (id:string, data:IContribution) => {
  try {
    const response = await axios.put(
      `${base_url}contributions/${id}`,
      data,
      config()
    );
    return response.data as {message:string};
  } catch (error:any) {
    throw new Error(error.message);
  }
};

const createContribution = async (data:IContribution) => {
  try {
    const response = await axios.post(
      `${base_url}contributions`,
      data,
      config()
    );
    return response.data as {message:string};
  } catch (error:any) {
    throw new Error(error.message);
  }
};

const deleteContribution = async (id:string) => {
  try {
    const response = await axios.delete(
      `${base_url}contributions/${id}`,
      config()
    );
    return response.data as {message:string};
  } catch (error:any) {
    throw new Error(error.message);
  }
};

export const contributionService = {
  getALlContributions,
  updateContribution,
  createContribution,
  deleteContribution,
};

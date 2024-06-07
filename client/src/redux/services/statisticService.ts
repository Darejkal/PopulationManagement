import axios from "axios";
import {base_url, config} from "../../utils/config";

const getFee = async () => {
    try {
        const response = await axios.get(`${base_url}getFee`, config());
        return response.data;
    } catch (error:any) {
        throw new Error(error.message);
    }
}

const getStatistics=async()=>{
    try{
        const response=await  axios.get(`${base_url}statistics/getStatics`, config());
        return response.data;
    } catch (error:any) {
        throw new Error(error.message);
    }
}
export const statisticService = {
    getFee,getStatics: getStatistics
}
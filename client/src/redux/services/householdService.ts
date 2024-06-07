
import axios from "axios";
import {base_url, config} from "../../utils/config";

const getHouseholdsBasedOnParams = async (params:{area:string,memberNumber:number|string}) => {
    params.memberNumber=params.memberNumber.toString()
    try {
        const queryString = new URLSearchParams(params as {area:string,memberNumber:string}).toString();
        const response = await axios.get(`${base_url}households?${queryString}`, config());
        // console.log("householdssss");
        // console.log(response);
        return response.data.households as IHousehold[];
    } catch (error:any) {
        throw new Error(error.message);
    }
}

const getHouseholds=async()=>{
    try{
        const response=await  axios.get(`${base_url}households/all`,config());
        // console.log("re");
        // console.log(response.data);
        return response.data.households as IHousehold[];
    }catch (error:any){
        throw new Error(error.message);
    }
}
const getHouseholdDetail=async (id:string)=>{
    try{
        const response=await  axios.get(`${base_url}households/${id}`,config());
        // console.log("re");
        // console.log(response.data);
        return response.data.household as Omit<IHousehold,"owner">&{owner:IIndividual};
    }catch (error:any){
        throw new Error(error.message);
    }

}


export const householdService = {
    getHouseholdsBasedOnParams,
    getHouseholds,getHouseholdDetail
}
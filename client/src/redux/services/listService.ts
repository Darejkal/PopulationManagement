
import axios from "axios";
import {base_url, config} from "../../utils/config";

const createFeeList = async (params:{
    households?: {_id:string}[]
    fee_id:string
    tableName: string
}) => {
    const payload = {
        householdIds: params?.households?.map((household) => household?._id),
        feeId: params?.fee_id,
        tableName: params?.tableName,
    }
    try {
        const response = await axios.post(`${base_url}list/createFAC`,payload, config());
        console.log(response.data);
        return response.data;
    } catch (error:any) {
        throw new Error(error.message);
    }

}

const getFeeList = async (id:string) => {
    try {
        const response = await axios.get(`${base_url}list/${id}`, config());
        // console.log(response);
        return response.data.feeList as IFeeHouseholdRelPopulated;
    } catch (error:any) {
        throw new Error(error.message);
    }

}
const updateFeeList=async(feeListData:IFee[])=>{
    try{
        const response=await  axios.post(`${base_url}list/update`,feeListData, config());

        return response.data;
    }catch (error:any){
        throw new Error(error.message);
    }

}

const createContributionList = async (params:{
    households:{
        _id:string
    }[],
    contribution_id:string,
    tableName?:string
}) => {
    const payload = {
        householdIds: params?.households?.map((household) => household?._id),
        contributionId: params?.contribution_id,
        tableName: params?.tableName,
    }
    try {
        const response = await axios.post(`${base_url}list/createCAC`,payload, config());

        return response.data;
    } catch (error:any) {
        throw new Error(error.message);
    }

}

const getContributionList = async (id:string) => {
    try {
        const response = await axios.get(`${base_url}list/contribution/${id}`, config());
        // console.log(response);
        return response.data.contributionList;
    } catch (error:any) {
        throw new Error(error.message);
    }

}
const updateContributionList=async(contributionListData:{
    changedContributionList:{amount?:number,paymentTime?:Date,_id:string}[]
})=>{
    try{
        const response=await  axios.post(`${base_url}list/contribution/update`,contributionListData, config());

        return response.data;
    }catch (error:any){
        throw new Error(error.message);
    }

}

const getCreatedList=async()=>{
    try{
        const response=await  axios.get(`${base_url}list/CreatedList`, config());

        return response.data;
    }catch (error:any){
        throw new Error(error.message);
    }

}
const deleteList=async(id:string)=>{
    try{
        const response=await  axios.get(`${base_url}list/delete/${id}`, config());
        console.log(response);
        return response.data;
    }catch (error:any){
        throw new Error(error.message);
    }

}


export const listService = {
    createFeeList,
    getFeeList,
    updateFeeList,
    updateContributionList,
    getContributionList,
    createContributionList,
    getCreatedList,
    deleteList
}
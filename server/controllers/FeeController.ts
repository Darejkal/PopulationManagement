import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import FeeModel from "../models/feeModel";
import FeeHouseholdRel, { IFeeHouseholdRel } from "../models/feeHouseholdRelationModel";
import Household from "../models/householdModel";
import mongoose from "mongoose";
import userModel from "../models/userModel";

const getAllFee = asyncHandler(async (req: Request, res: Response) => {
  try {
    const fees = await FeeModel.find();
    res.status(200).send({
      fees,
      message: "Get all fees Successfully",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Error fetching all fees",
      error: error.message,
    });
  }
});

const updateFee = asyncHandler(async (req: Request, res: Response) => {
  try {
    await FeeModel.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).send({
      message: "Update fee success",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Error updating fee",
      error: error.message,
    });
  }
});

const createFee = asyncHandler(async (req: Request, res: Response) => {
  try {
    if(req.body.useremail){
      let user =await userModel.findOne({email:req.body.useremail})
      if(!user){
        throw "no user found"
      }
    }
    await FeeModel.create(req.body);
    res.status(201).send({
      message: "Create fee success",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Error creating fee",
      error: error.message,
    });
  }
});

const deleteFee = asyncHandler(async (req: Request, res: Response) => {
  try {
    await FeeModel.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: "Delete fee success",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Error deleting fee",
      error: error.message,
    });
  }
});

const createFeeRel=asyncHandler(async (req: Request, res: Response) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const {id,date}:{id:string,date:number}=req.body;
    const fee=await FeeModel.findById(id);
    if(!fee){
      throw "Fee not found";
    }
    const startTime=new Date(date)
    let lateTime:Date|undefined;
    let suffix=""
    if(fee.frequency=="monthly"){
      lateTime=new Date(startTime.getFullYear(),startTime.getMonth()+1,1)
      suffix=`tháng ${startTime.getMonth()}/${startTime.getFullYear()}`
    } else if (fee?.frequency=="yearly") {
      lateTime=new Date(startTime.getFullYear()+1,1,1)
      suffix=`năm ${startTime.getFullYear()}`
    } else{
      throw "date exception"
    }
    const households=await Household.find();
    if(fee.houseType!=="Individual"){
      let fees=await FeeHouseholdRel.insertMany(households.reduce((pre,v)=>{
        if(fee.houseType==="All"||v.getHouseholdType(v.address)===fee.houseType){
          pre.push( {
            household: v.id,
            fee: fee.id,
            name: fee.name+" "+suffix,
              // @ts-ignore
            amount: (fee.weight?fee.amount*v.area:fee.amount),
            status: false,
            startTime,
            lateTime,
            required: (fee.required===true?true:false)
          })
        }
        return pre
      },[] as IFeeHouseholdRel[]))
    } else{
      let user=await userModel.findOne({email:fee.useremail}).populate("household")
      if(!user){
        throw "no user found"
      }
      if(!user?.household){
        throw "user not in a house"
      }
      await FeeHouseholdRel.create({
        // @ts-ignore
        household: user.household.id,
        fee: fee.id,
        name: fee.name+" "+suffix,
        // @ts-ignore
        amount: (fee.weight?fee.amount*user.household.area:fee.amount),
        status: false,
        startTime,
        lateTime,
        required: (fee.required===true?true:false)
      })
    }
    await session.commitTransaction();
    session.endSession();
    res.status(200).send({
      message: "Giao phí chu kỳ thành công!",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Giao phí chu kỳ thất bại!",
      error: error.message??error,
    });
  }
});
const getFeeRelOfHousehold=asyncHandler(async (req:Request,res:Response)=>{
  try {
    const feeRels=await FeeHouseholdRel.find({household:req.params.id});
    res.status(200).send({
      message: "Lấy khoản phí thu thành công",
      feeRels:feeRels
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Error deleting fee",
      error: error.message,
    });
  }
})
const updateFeeRel=asyncHandler(async (req:Request,res:Response)=>{
  try {
    const {id,updates}:{id:string,updates:any}=req.body;
    let feeRel=await FeeHouseholdRel.findById(id);
    if(!feeRel){
      throw "Cập nhật phí thu thất bại"
    }
    Object.assign(feeRel,updates)
    console.log(feeRel)
    await feeRel.save()
    res.status(200).send({
      message: "Cập nhật khoản phí thu thành công",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Error updating feerel",
      error: error.message??error,
    });
  }
})
export const deleteFeeRel=asyncHandler(async (req:Request,res:Response)=>{
  try {
    const {id}:{id:string}=req.body;
    let feeRel=await FeeHouseholdRel.findByIdAndDelete(id);
    if(!feeRel){
      throw "Xóa phí thu thất bại"
    }
    res.status(200).send({
      message: "Xóa khoản phí thu thành công",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Error updating feerel",
      error: error.message??error,
    });
  }
})
export { getAllFee, updateFee, deleteFee, createFee,createFeeRel,updateFeeRel,getFeeRelOfHousehold };

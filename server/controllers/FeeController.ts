import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import FeeModel from "../models/feeModel";
import FeeHouseholdRel, { IFeeHouseholdRel } from "../models/feeHouseholdRelationModel";
import Household from "../models/householdModel";
import mongoose from "mongoose";

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
    let fees=await FeeHouseholdRel.insertMany(households.reduce((pre,v)=>{
      if(v.getHouseholdType(v.address)===fee.houseType){
        pre.push( {
          household: v.id,
          fee: fee.id,
          name: fee.name+" "+suffix,
          amount: fee.amount,
          status: false,
          startTime,
          lateTime
        })
      }
      return pre
    },[] as IFeeHouseholdRel[]))
    await session.commitTransaction();
    session.endSession();
    console.log(fees)
    res.status(200).send({
      message: "Giao phí chu kỳ thành công!",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Giao phí chu kỳ thất bại!",
      error: error.message,
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
    const feeRel=await FeeHouseholdRel.findByIdAndUpdate(id,updates);
    if(!feeRel){
      throw "Cập nhật phí thu thất bại"
    }
    res.status(200).send({
      message: "Cập nhật khoản phí thu thành công",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Error updating feerel",
      error: error.message,
    });
  }
})
export { getAllFee, updateFee, deleteFee, createFee,createFeeRel,updateFeeRel,getFeeRelOfHousehold };

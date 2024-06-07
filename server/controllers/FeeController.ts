import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import FeeModel from "../models/feeModel";

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

export { getAllFee, updateFee, deleteFee, createFee };

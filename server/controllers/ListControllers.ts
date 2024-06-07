import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import FeeModel from "../models/feeModel";
import ContributionModel from "../models/contributionModel";
import FeeHouseholdRelModel from "../models/feeHouseholdRelModel";
import ContriHouseholdRelModel, { IContributionHouseholdRel } from "../models/contriHouseholdRelModel";
import RelListModel from "../models/relListModel";
import HouseholdModel from "../models/householdModel";
import mongoose from "mongoose";
import crypto from "crypto";

const FCBList = asyncHandler(async (req: Request, res: Response) => {
    try {
        const feeList = await RelListModel.find({ type: "fee" });
        const contributionList = await RelListModel.find({ type: "contribution" });
        res.status(200).send({
            feeList,
            contributionList,
            message: "Get Successfully",
        });
    } catch(error:any) {
        throw new Error(error);
    }
});

const test = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).send({
        ok: "ok",
        message: "Get Successfully",
    });
});

const createFACList = asyncHandler(async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const fee = await FeeModel.findById(req.body.feeId).session(session);
        const newRelList = await RelListModel.create([{
            name: req.body?.tableName ? req.body.tableName : crypto.randomBytes(20).toString('hex'),
            // @ts-ignore
            creator: req.user._id as string,
            type: "fee",
        }], { session });

        const households:any = [];
        for (const id of req.body?.householdIds) {
            const household = await HouseholdModel.findById(id).session(session);
            if (!household) {
                await session.abortTransaction();
                session.endSession();
                res.status(404).json({ error: `Household with id ${id} not found` });
                return
            }
            const newFeeHouseholdRel = await FeeHouseholdRelModel.create([{
                fee: fee?._id,
                household: household._id,
                relList: newRelList[0]._id,
                amount: ((fee&&household&&household.memberNumber)?fee.amount * household.memberNumber:0),
            }], { session });
            households.push(newFeeHouseholdRel);
        }
        await session.commitTransaction();
        session.endSession();
         res.status(200).json({
            households,
            id: newRelList[0]._id
        });
        return
    } catch(error:any) {
        console.error(error);
        await session.abortTransaction();
        session.endSession();
         res.status(500).json({
            error: 'Internal Server Error',
        });
        return
    }
});

const getFeeList = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const feeList = await FeeHouseholdRelModel.find({ relList: id }).populate(['household', 'fee', 'relList']);
         res.status(200).json({
            feeList,
        });
        return
    } catch(error:any) {
        console.error(error);
         res.status(500).json({
            error: 'Internal Server Error',
        });
        return
    }
});

const updateFeeList = asyncHandler(async (req: Request, res: Response) => {
    try {
        const changedFeeList = req.body.changedFeeList;
        const updatedDocuments:any = [];
        for (const feeHouseholdRel of changedFeeList) {
            const updatedDocument = await FeeHouseholdRelModel.findOneAndUpdate({ _id: feeHouseholdRel._id }, { status: feeHouseholdRel?.status, paymentTime: feeHouseholdRel?.paymentTime });
            if (!updatedDocument) {
                 res.status(404).json({ error: `Household with id ${feeHouseholdRel._id} not found` });
                 return
            }
            updatedDocuments.push(updatedDocument);
        }
         res.status(200).json(updatedDocuments);
         return
    } catch(error:any) {
         res.status(500).json({ error: 'Internal Server Error' });
         return
    }
});

const getContributionList = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const contributionList = await ContriHouseholdRelModel.find({ relList: id })
            .populate('household')
            .populate('contribution')
            .populate('relList');
         res.status(200).json({
            contributionList,
        });
        return
    } catch(error:any) {
        console.error(error);
         res.status(500).json({
            error: 'Internal Server Error',
        });
        return
    }
});

const createCACList = asyncHandler(async (req: Request&{body:{
    contributionId:string,
    tableName:string,
    householdIds:string[]
}}, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const contribution = await ContributionModel.findById(req.body.contributionId).session(session);
        if(!contribution){
            res.status(500).send()
            return
        }
        const newRelList = await RelListModel.create([{
            name: req.body?.tableName ? req.body.tableName : crypto.randomBytes(20).toString('hex'),
            // @ts-ignore
            creator: req.user._id,
            type: "contribution",
        }], { session });
        const households:any = [];
        for (const id of req.body?.householdIds) {
            const household = await HouseholdModel.findById(id).session(session);
            if (!household) {
                await session.abortTransaction();
                session.endSession();
                 res.status(404).json({ error: `Household with id ${id} not found` });
                 return
            }
            const newContriHouseholdRel = await ContriHouseholdRelModel.create([{
                contribution: contribution._id,
                household: household._id,
                relList: newRelList[0]._id,
            }], { session });
            households.push(newContriHouseholdRel);
        }
        await session.commitTransaction();
        session.endSession();
         res.status(200).json({
            households,
            id: newRelList[0]._id,
            name: newRelList[0].name,
        });
        return
    } catch(error:any) {
        console.error(error);
        await session.abortTransaction();
        session.endSession();
         res.status(500).json({ error: 'Internal Server Error' });
         return
    }
});

const updateContributionList = asyncHandler(async (req: Request, res: Response) => {
    try {
        const changedContributionList:{amount?:number,paymentTime?:Date,_id:string}[] = req.body.changedContributionList;
        const updatedDocuments:IContributionHouseholdRel[] = [];
        for (const contriHouseholdRel of changedContributionList) {
            const updatedDocument = await ContriHouseholdRelModel.findOneAndUpdate({ _id: contriHouseholdRel._id }, { amount: contriHouseholdRel?.amount, paymentTime: contriHouseholdRel?.paymentTime });
            if (!updatedDocument) {
                 res.status(404).json({ error: `Household with id ${contriHouseholdRel._id} not found` });
                 return
            }
            updatedDocuments.push(updatedDocument);
        }
         res.status(200).json(updatedDocuments);
         return
    } catch(error:any) {
         res.status(500).json({ error: 'Internal Server Error' });
         return
    }
});

const deleteList = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const FeeResult = await FeeHouseholdRelModel.deleteMany({ relList: id });
        const ContributionResult = await ContriHouseholdRelModel.deleteMany({ relList: id });
        const relListDeleteResult = await RelListModel.deleteOne({ _id: id });
         res.status(200).json({
            success: true,
            message: 'Records deleted successfully.',
        });
        return
    } catch(error:any) {
        console.error(error);
         res.status(500).json({ error: 'Internal Server Error' });
         return
    }
});

export {
    FCBList,
    createFACList,
    getFeeList,
    updateFeeList,
    createCACList,
    getContributionList,
    updateContributionList,
    deleteList
};


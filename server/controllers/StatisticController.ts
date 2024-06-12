import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import FeeHouseholdRelationModel from "../models/feeHouseholdRelationModel";
import FeeModel, { IFee } from "../models/feeModel";
import ContributionModel, { IContribution } from "../models/contributionModel";
import ContributionHouseholdRelationModel from "../models/contriHouseholdRelationModel";
import HouseholdModel, { IHousehold } from "../models/householdModel";
import mongoose, { ObjectId } from "mongoose";

const getFee = asyncHandler(async (req: Request, res: Response) => {
    try {
        const feeHouseholdRelSchema = await FeeHouseholdRelationModel.find();
        if (feeHouseholdRelSchema) {
            res.status(200).send(feeHouseholdRelSchema);
        } else {
            throw new Error('Cannot get all fee');
        }
    } catch(e:any) {
        res.status(500).send(e.message);
    }
});

const getInformation = asyncHandler(async (req: Request, res: Response) => {
    try {
        const feeHouseholdRelSchema = await FeeHouseholdRelationModel.find();
        const contributionHouseholdRelSchema = await ContributionHouseholdRelationModel.find();
        let feeSum = 0;
        let contributionSum = 0;
        const householdSet = new Set<string>();
        const householdList:({_id:mongoose.Types.ObjectId}&IHousehold&{feeList: ((IFee & {
            _id: ObjectId;
        }) )[]} & {contributionList:((IContribution & {_id: ObjectId}))[]})[] = [];

        if (feeHouseholdRelSchema) {
            for (const i of feeHouseholdRelSchema) {
                if(i.status){
                    feeSum = feeSum + i.amount;
                    householdSet.add(i.household.toString());
                }
            }
        }

        if (contributionHouseholdRelSchema) {
            for (const i of contributionHouseholdRelSchema) {
                if(i.amount&&i.amount > 0){
                    feeSum = feeSum + i.amount;
                    householdSet.add(i.household.toString());
                }
            }
        }

        for (const householdId of householdSet) {
            const household = await HouseholdModel.findById(householdId);
            if (household) {
                const feeList = await FeeHouseholdRelationModel.find({ household: householdId });
                const newFeeList = await Promise.all(feeList.map(async (feeRel) => {
                    const fee = await FeeModel.findById(feeRel.fee);
                    return fee ? fee.toObject() : null;
                }));
                const contributionList = await ContributionHouseholdRelationModel.find({ household: householdId });
                const newContributionList = await Promise.all(contributionList.map(async (contributionRel) => {
                    const contribution = await ContributionModel.findById(contributionRel.contribution);
                    return contribution ? contribution.toObject() : null;
                }));
                householdList.push({
                    _id: household._id,
                    owner: household.owner,
                    address: household.address,
                    area: household.area,
                    name: household.name,
                    feeList: (newFeeList.filter((fee) => fee !== null) as unknown as (IFee & { _id: ObjectId; })[] ),
                    contributionList: (newContributionList.filter((contribution) => contribution !== null) as unknown as  ((IContribution & {_id: ObjectId}))[])
                });
            }
        }
        res.status(200).send({
            householdList,
            feeSum,
            householdListSize: householdList.length
        });
    } catch(e:any) {
        res.status(500).send(e.message);
    }
});

export { getFee, getInformation };

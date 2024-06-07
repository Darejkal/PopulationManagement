import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import HouseholdModel from "../models/householdModel";
import IndividualModel from "../models/individualModel";

const getHouseholdBasedOnParams = asyncHandler(async (req: Request, res: Response) => {
    try {
        const area = req.query.area as string;
        const memberNumber = req.query.memberNumber as string;
        const query: any = {};
        
        if (area) {
            query.area = area;
        }
        
        if (memberNumber) {
            query.memberNumber = { $gte: parseInt(memberNumber) };
        }

        const households = await HouseholdModel.find(query);

        res.status(200).send({
            households,
            message: 'Get households successfully'
        });
    } catch(error:any) {
        res.status(500).send({
            message: 'Error fetching households',
            error: error.message
        });
    }
});

const createHousehold = asyncHandler(async (req: Request, res: Response) => {
    try {
        const newHousehold = await HouseholdModel.create(req.body);
        res.status(200).send({
            newHousehold,
            message: 'Create household successfully'
        });
    } catch(error:any) {
        res.status(500).send({
            message: 'Error creating household',
            error: error.message
        });
    }
});

const getHouseholds = asyncHandler(async (req: Request, res: Response) => {
    try {
        const households = await HouseholdModel.find();
        res.status(200).send({
            households,
            message: 'Get households successfully'
        });
    } catch(error:any) {
        res.status(500).send({
            message: 'Error fetching households',
            error: error.message
        });
    }
});

const getHouseholdDetail = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const household = await HouseholdModel.findById(id).populate('owner');

        res.status(200).send({
            household,
            message: 'Get household successfully'
        });
    } catch(error:any) {
        res.status(500).send({
            message: 'Error fetching household details',
            error: error.message
        });
    }
});

export { getHouseholdBasedOnParams, createHousehold, getHouseholds, getHouseholdDetail };

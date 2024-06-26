import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import HouseholdModel from "../models/householdModel";
import User, { IUser } from "../models/userModel";
import userModel from "../models/userModel";

const getHouseholdBasedOnParams = asyncHandler(
	async (req: Request, res: Response) => {
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
				message: "Get households successfully",
			});
		} catch (error: any) {
			res.status(500).send({
				message: "Error fetching households",
				error: error.message,
			});
		}
	}
);

const createHousehold = asyncHandler(async (req: Request, res: Response) => {
	try {
		const owneremail = req.body.owner;
		if (!owneremail) {
			throw "owner email incorrect";
		}
		delete req.body.owner;
		const owner = await User.findOne({ email: owneremail });
		if (!owner) {
			throw "owner not found";
		}
		// if(owner.household){
		// 	throw "owner already in a household"
		// }
		const newHousehold = await HouseholdModel.create({
			...req.body,
			owner: owner._id,
		});
		owner.household=newHousehold.id
		await owner.save()
		res.status(200).send({
			newHousehold,
			message: "Create household successfully",
		});
	} catch (error: any) {
		res.status(500).send({
			message: "Error creating household",
			error: error.message,
		});
	}
});
export const updateHousehold = asyncHandler(async (req: Request, res: Response) => {
	try {
		const id=req.body.id;
		const updateParams=req.body.household;
		const household=await HouseholdModel.findById(id);
		if(!household){
			throw "household not found"
		}
		if("owner" in updateParams){
			const owner = await User.findOne({ email: updateParams.owner });
			if (!owner) {
				throw "owner not found";
			}
			updateParams.owner=owner.id
		}

		Object.assign(household,updateParams)
		await household.save()
		res.status(200).send({
			message: "Update household successfully",
		});
	} catch (error: any) {
		res.status(500).send({
			message: "Error update household",
			error: error.message??error,
		});
	}
});
const deleteHousehold=asyncHandler(async (req: Request, res: Response) => {
	try {
		const {id}=req.body;
		await HouseholdModel.findByIdAndDelete(id);
		res.status(200).send({
			message: "Delete household successfully",
		});
	} catch (error: any) {
		res.status(500).send({
			message: "Error delete household",
			error: error.message,
		});
	}
});
const getHouseholds = asyncHandler(async (req: Request, res: Response) => {
	try {
		const households = await HouseholdModel.find().populate("owner");
		res.status(200).send({
			households: households.map((props) => {
				let { owner, ...other } = props.toObject();
				return {
					// @ts-ignore
					owner: owner.email,
					...other,
				};
			}),
			message: "Get households successfully",
		});
	} catch (error: any) {
		res.status(500).send({
			message: "Error fetching households",
			error: error.message,
		});
	}
});
export const getPaginated = asyncHandler(
	async (req: Request, res: Response) => {
		let { limit, next, query } = req.body;
		if (!limit || limit > 20) {
			limit = 20;
		} else {
			limit = Math.floor(limit);
		}
		let searchprops = {};
		if (next) {
			searchprops = { ...searchprops, _id: { $lt: next } };
		}
		if (query) {
			searchprops = {
				...searchprops,
				$text: {
					$search: query,
					$diacriticSensitive: false,
				},
			};
		}
		console.log(searchprops);
		let results;
		if (query) {
			let nextVal = Number(next);
			if (!nextVal) {
				nextVal = 0;
			}
			results = await HouseholdModel.find(searchprops)
				.populate("owner")
				.skip(nextVal)
				.limit(limit);
			res.status(200).send({
				results: results.map((prop) => {
					let { owner, ...other } = prop.toObject();
					return {
						// @ts-ignore
						owner: owner.email,
						...other,
					};
				}),
				next: results.length == 0 ? undefined : results[results.length - 1]._id,
			});
		} else {
			results = await HouseholdModel.find(searchprops)
				.populate("owner")
				.sort({
					_id: -1,
				})
				.limit(limit);
			res.status(200).send({
				results: results.map((prop) => {
					let { owner, ...other } = prop.toObject();
					console.log(owner)
					console.log(other)
					return {
						// @ts-ignore
						owner: owner?.email??"",
						...other,
					};
				}),
				next: results.length == 0 ? undefined : results[results.length - 1]._id,
			});
		}
	}
);
const getHouseholdDetail = asyncHandler(async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const household = await HouseholdModel.findById(id).populate("owner");

		res.status(200).send({
			household,
			message: "Get household successfully",
		});
	} catch (error: any) {
		res.status(500).send({
			message: "Error fetching household details",
			error: error.message,
		});
	}
});
const getMembers=asyncHandler(async (req: Request, res: Response) => {
	try {
		let users= await userModel.find({household:req.params.id})
		res.status(200).send({
			users,
			message: "Get household members successfully",
		});
	} catch (error: any) {
		res.status(500).send({
			message: "Error fetching household details",
			error: error.message,
		});
	}
});
export {
	getHouseholdBasedOnParams,
	createHousehold,
	getHouseholds,
	getHouseholdDetail,
	getMembers,
	deleteHousehold
};

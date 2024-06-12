import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/userModel";
import Household from "../models/householdModel";

const listUser = asyncHandler(async (req: Request, res: Response) => {
	try {
		const users: IUser[] = await User.find({}).populate("household").lean();
		if (!users) {
			res.status(500).send({
				message: "Error getting users",
			});
			return;
		}
		const userMap = users.map(
			({
				email,
				firstname,
				lastname,
				phoneNumber,
				CCCD,
				sex,
				position,
				household,
				status
			}) => ({
				email,
				firstname,
				lastname,
				phoneNumber,
				CCCD,
				sex,
				// @ts-ignore
				household:household?.address,
				position,
				status
			})
		);
		res.status(200).send({ users: userMap });
	} catch (error: any) {
		console.error("Error:", error);
		res.status(500).send({
			message: "Error getting users",
			error:error.message
		});
	}
});

const getUser = asyncHandler(async (req: Request, res: Response) => {
	try {
		const email = req.body.email;
		if (!email) {
			res.status(500).send({
				message: "No email provided",
			});
			return;
		}
		const user = await User.findOne({ email }).lean().exec();
		if (!user) {
			res.status(500).send({
				message: "Get user error",
			});
			return;
		}
		let { password, ...return_user } = user;
		res.status(200).send({
			return_user,
			message: "Get user successfully",
		});
	} catch (error: any) {
		console.error("Error:", error);
		res.status(500).send({
			message: "Error getting user",
		});
	}
});

const createUser = asyncHandler(async (req: Request, res: Response) => {
	try {
		if("household" in req.body){
			const household=await Household.findOne({address: req.body.household})
			if(!household){
				throw "Số phòng không đúng!"
			}
			req.body.household=household
		}
		const newUser = await User.create(req.body);
		let { password, ...return_user } = newUser;
		res.status(200).send({ newUser: return_user });
	} catch (error: any) {
		console.error("Error:", error);
		res.status(500).send({
			message: "Error creating user",
			error:error
		});
	}
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
	try {
		const email = req.body.email;
		if (!email) {
			res.status(500).send({
				message: "No email provided",
			});
			return;
		}
		const result = await User.deleteOne({ email });
		if (!result || result.deletedCount === 0 || !result.acknowledged) {
			res.status(500).send({
				message: "Delete user error",
			});
			return;
		}
		res.status(200).send({
			message: "Delete user successfully",
		});
	} catch (error: any) {
		console.error("Error:", error);
		res.status(500).send({
			message: "Error deleting user",
		});
	}
});
const updateUserByEmail=asyncHandler(async(req:Request,res:Response)=>{
	try {
		if("_id" in req.body.user){
			delete req.body.user._id
		}
		const email=req.body.email
		if (!email) {
			res.status(500).send({
				message: "No email provided",
			});
			return;
		}
		const result = await User.findOneAndUpdate({ email },req.body.user);
		if(result){
			res.status(200).send({
				message: "Update user successfully",
			});
		}

	} catch (error: any) {
		console.error("Error:", error);
		res.status(500).send({
			message: "Error deleting user",
		});
	}
} )
export { getUser, listUser, createUser, deleteUser ,updateUserByEmail};

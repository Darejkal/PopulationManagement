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
				hokhau,
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
				hokhau,
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
		if("household" in req.body&&req.body.household){
			const household=await Household.findOne({address: req.body.household})
			if(!household){
				throw "Số phòng không đúng!"
			}
			req.body.household=household.id
		} else{
			req.body.household=undefined
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
		const email=req.body.oldemail
		if (!email) {
			res.status(500).send({
				message: "No email provided",
			});
			return;
		}
		if("_id" in req.body.userData){
			delete req.body.userData._id
		}
		if(! req.body.userData.password){
			delete req.body.userData.password
		}
		console.log(req.body.userData)
		if(typeof req.body.userData.household==="undefined"||req.body.userData.household===""||req.body.userData.household==="undefined"){
			delete req.body.userData.household;
		} 
		const result = await User.findOne({ email });
		if(!result){
			throw "user not found"
		}
		Object.assign(result,req.body.userData);
		result.save()
		res.status(200).send({
			message: "Update user successfully",
		});

	} catch (error: any) {
		console.error("Error:", error);
		res.status(500).send({
			message: "Error updating user",
			error:error.message??error
		});
	}
} )
export { getUser, listUser, createUser, deleteUser ,updateUserByEmail};

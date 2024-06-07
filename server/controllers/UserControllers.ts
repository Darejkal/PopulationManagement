import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/userModel";

const listUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find({}).lean();
    if (!users) {
      res.status(500).send({
        message: 'Error getting users'
      });
      return;
    }
    const userMap = users.map(user => ({
      email: user.email,
      firstName: user.firstName || "",
      lastName: user.lastname || ""
    }));
    res.status(200).send({ users: userMap });
  } catch(error:any) {
    console.error("Error:", error);
    res.status(500).send({
      message: 'Error getting users'
    });
  }
});

const getUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    if (!email) {
      res.status(500).send({
        message: 'No email provided'
      });
      return;
    }
    const user = await User.findOne({ email }).lean().exec();
    if (!user) {
      res.status(500).send({
        message: 'Get user error'
      });
      return;
    }
    let {password,...return_user}=user;
    res.status(200).send({
      return_user,
      message: 'Get user successfully'
    });
  } catch(error:any) {
    console.error("Error:", error);
    res.status(500).send({
      message: 'Error getting user'
    });
  }
});

const createUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    let {password,...return_user}=newUser;
    res.status(200).send({ newUser:return_user });
  } catch(error:any) {
    console.error("Error:", error);
    res.status(500).send({
      message: 'Error creating user'
    });
  }
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    if (!email) {
      res.status(500).send({
        message: 'No email provided'
      });
      return;
    }
    const result = await User.deleteOne({ email });
    if (!result || result.deletedCount === 0 || !result.acknowledged) {
      res.status(500).send({
        message: 'Delete user error'
      });
      return;
    }
    res.status(200).send({
      message: 'Delete user successfully'
    });
  } catch(error:any) {
    console.error("Error:", error);
    res.status(500).send({
      message: 'Error deleting user'
    });
  }
});

export { getUser, listUser, createUser, deleteUser };

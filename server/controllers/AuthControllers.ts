import { Request, Response } from "express";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import generateToken from "../config/jwtToken";
import UserModel from "../models/userModel";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  // Your implementation here
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const currentUser = await UserModel.findOne({ email });
    if (currentUser && (await currentUser.isPasswordMatched(password))) {
      res.status(200).send({
        message: "Login Successfully",
        currentUser: {
          role: currentUser.role,
          position: currentUser.position,
          _id: currentUser._id,
          email: currentUser.email,
        },
        token: generateToken(currentUser._id),
      });
    } else {
      res.status(401).send({
        message: "Login failure",
      });
    }
  } catch(error:any) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const currentUser = await UserModel.findOne({ email });

    if (currentUser && (await currentUser.isPasswordMatched(oldPassword))) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await UserModel.findOneAndUpdate(
        // @ts-ignore
        { _id: req.user._id },
        { password: hashedNewPassword }
      );
      if(!updatedUser){
        res.status(500).send()
        return
      }
      res.status(200).send({
        message: "Password changed successfully",
        updatedUser,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(401).send({
        message: "Invalid credentials or old password does not match",
      });
    }
  } catch(error:any) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export { login, changePassword };

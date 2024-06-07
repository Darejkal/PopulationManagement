import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import User from "../models/userModel";
import { IUser } from "../models/userModel"; // Assuming the IUser interface is defined in the userModel file

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const authMiddleware = asyncHandler(async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
  let token;
  if (request?.headers?.authorization?.startsWith('Bearer')) {
    token = request.headers.authorization.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      request.user = await User.findById(decodedToken?.id) as IUser|undefined;
      next();
    } catch(e:any) {
       response.status(401).json("User is not found");
       return
    }
  } else {
     response.status(404).json('You should authenticate');
     return
  }
});

const isAdmin = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.user?.position !== 'Admin') {
    res.status(403).json("You do not have the authority");
    return;
  } else {
    next();
    return;
  }
});

export { authMiddleware, isAdmin };

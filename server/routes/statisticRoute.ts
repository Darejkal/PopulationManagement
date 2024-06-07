import express, { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getFee, getInformation } from "../controllers/StatisticController";

const router: Router = express.Router();

router.get("/getFee", authMiddleware, getFee);
router.get("/getStatics", authMiddleware, getInformation);

export default router;

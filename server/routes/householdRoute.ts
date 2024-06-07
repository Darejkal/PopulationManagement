import express, { Router } from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";
import { getHouseholdBasedOnParams, createHousehold, getHouseholds, getHouseholdDetail } from "../controllers/HouseholdController";

const router: Router = express.Router();

router.get("/", authMiddleware, getHouseholdBasedOnParams);
router.get("/all", authMiddleware, getHouseholds);
router.post("/create", authMiddleware, createHousehold);
router.get("/:id", authMiddleware, getHouseholdDetail);

export default router;

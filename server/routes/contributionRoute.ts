import express, { Router } from "express";
import {
  authMiddleware,
  isAdmin,
} from "../middlewares/authMiddleware";
import {
  getAllContributions,
  updateContributions,
  createContributions,
  deleteContributions,
  getContribution,
  updateContribRel,
  getContribRelOfHousehold
} from "../controllers/ContributionController";

const router: Router = express.Router();

router.get("/", authMiddleware, getAllContributions);
router.get("/:id", authMiddleware, getContribution);
router.put("/:id", authMiddleware, updateContributions);
router.post("/updaterelation", updateContribRel);
router.get("/getFeeRelOfHousehold/:id", getContribRelOfHousehold);
router.post("/", authMiddleware, createContributions);
router.delete("/:id", authMiddleware, deleteContributions);

export default router;

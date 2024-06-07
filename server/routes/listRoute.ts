import express, { Router } from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";
import {
  FCBList,
  createFACList,
  getFeeList,
  updateFeeList,
  createCACList,
  getContributionList,
  updateContributionList,
  deleteList,
} from "../controllers/ListControllers";

const router: Router = express.Router();

router.get("/CreatedList", authMiddleware, FCBList);
router.post("/createFAC", authMiddleware, createFACList);
router.get("/delete/:id", authMiddleware, deleteList);
router.get("/:id", authMiddleware, getFeeList);
router.post("/update", authMiddleware, updateFeeList);
router.post("/createCAC", authMiddleware, createCACList);
router.get("/contribution/:id", authMiddleware, getContributionList);
router.post("/contribution/update", authMiddleware, updateContributionList);

export default router;

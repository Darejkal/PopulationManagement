import express, { Router } from "express";
import {
  authMiddleware,
  isAdmin,
} from "../middlewares/authMiddleware";
import {
  getAllFee,
  updateFee,
  createFee,
  deleteFee,
  createFeeRel,
  updateFeeRel,
  getFeeRelOfHousehold,
  deleteFeeRel
} from "../controllers/FeeController";

const router: Router = express.Router();

router.get("/", authMiddleware, getAllFee);
router.post("/", authMiddleware, createFee);
router.post("/createrelation", createFeeRel);
router.post("/updaterelation", updateFeeRel);
router.post("/deleterelation", deleteFeeRel);
router.get("/getFeeRelOfHousehold/:id", getFeeRelOfHousehold);
router.put("/:id", authMiddleware, updateFee);
router.delete("/:id", authMiddleware, deleteFee);

export default router;

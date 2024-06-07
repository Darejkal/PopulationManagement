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
} from "../controllers/FeeController";

const router: Router = express.Router();

router.get("/", authMiddleware, getAllFee);
router.put("/:id", authMiddleware, updateFee);
router.post("/", authMiddleware, createFee);
router.delete("/:id", authMiddleware, deleteFee);

export default router;

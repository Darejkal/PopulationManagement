import express from "express";
import { Router } from "express";
import { login, changePassword } from "../controllers/AuthControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/login", login);
router.post("/changePassword", authMiddleware, changePassword);

export default router;

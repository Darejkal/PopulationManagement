import express, { Router } from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";
import { getUser, listUser, createUser, deleteUser } from "../controllers/UserControllers";

const router: Router = express.Router();

router.get("/test", (req, res) => {
    res.send("OK");
});

router.get("/list", authMiddleware, listUser);
router.post("/get", authMiddleware, isAdmin, getUser);
router.post("/create", authMiddleware, isAdmin, createUser);
router.post("/delete", authMiddleware, isAdmin, deleteUser);

router.get("/check", authMiddleware, isAdmin, (req, res, next) => {
    res.status(200).send("");
});

export default router;

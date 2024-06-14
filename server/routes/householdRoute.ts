import express, { Router } from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";
import { getHouseholdBasedOnParams, createHousehold,getPaginated, getHouseholds, getHouseholdDetail,getMembers ,deleteHousehold} from "../controllers/HouseholdController";

const router: Router = express.Router();
router.use((req,res,next)=>{
    console.log("ok")
    next()
})
router.get("/", authMiddleware, getHouseholdBasedOnParams);
router.get("/members/:id", authMiddleware, getMembers);
router.post("/delete", authMiddleware, deleteHousehold);
router.get("/all", authMiddleware, getHouseholds);
router.post("/create", authMiddleware, createHousehold);
router.get("/:id", authMiddleware, getHouseholdDetail);
router.post("/getpaginated", authMiddleware, getPaginated);

export default router;

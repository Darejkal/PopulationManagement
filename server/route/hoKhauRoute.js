const express=require("express")
const {authMiddleware,isLeaderOrDeputyLeader} = require("../middleware/AuthMiddleware");
const {getHouseholdBasedOnParams, createHousehold, getHouseholds, getHouseholdDetail} = require("../controller/hoKhauController");
const router=express.Router();



router.get("/household",authMiddleware,getHouseholdBasedOnParams);
router.get("/all",authMiddleware,getHouseholds);
router.post("/create",authMiddleware,createHousehold);
router.get("/:id",authMiddleware,getHouseholdDetail);
module.exports=router;
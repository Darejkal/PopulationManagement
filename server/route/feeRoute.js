const express=require("express")
const router=express.Router();
const {
    getAllFee, updateFee, deleteFee, createFee
}=require("../controller/FeeController")
const {authMiddleware,isAdmin} = require("../middleware/AuthMiddleware");

router.post("/getAllFee",authMiddleware,isAdmin,getAllFee);
router.post("/updateFee",authMiddleware,isAdmin,updateFee);
router.post("/deleteFee",authMiddleware,isAdmin,deleteFee);
router.post("/createFee",authMiddleware,isAdmin,createFee);
module.exports=router;
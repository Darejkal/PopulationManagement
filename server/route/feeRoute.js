const express=require("express")
const router=express.Router();
const {
    getAllFee, 
    updateFee, 
    deleteFee, 
    createFee
} = require("../controller/feeController"); 
const {authMiddleware,isAdmin} = require("../middleware/AuthMiddleware");

router.get("/", authMiddleware, getAllFee);
router.put("/:id", authMiddleware, updateFee);
router.post("/", authMiddleware, createFee);
router.delete("/:id", authMiddleware, deleteFee);
module.exports=router;
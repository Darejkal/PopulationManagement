const express=require("express")
const router=express.Router();
const {
    login, changePassword,
}=require("../controller/AuthController")
const {authMiddleware} = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/changePassword",authMiddleware,changePassword)

module.exports=router;
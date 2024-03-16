const express=require("express")
const router=express.Router();
const {
    login, changePassword,signup
}=require("../controller/AuthController")
const {authMiddleware} = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/signup", signup,login);
router.post("/changePassword",authMiddleware,changePassword)

module.exports=router;
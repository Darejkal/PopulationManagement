const express = require("express");
const router = express.Router();
const {
  login,
  changePassword,
  signup,
  getProfiles,
  updateProfile,
} = require("../controller/AuthController");
const { authMiddleware, isAdmin } = require("../middleware/AuthMiddleware");

router.post("/login", login);
router.post("/signup", signup, login);
router.post("/changePassword", authMiddleware, changePassword);
router.post("/updateProfile", authMiddleware, updateProfile);
router.get("/profiles", authMiddleware, getProfiles);
router.post("/checkAdmin", authMiddleware, isAdmin, (req, res, next) => {
  return res.status(200).send("");
});
module.exports = router;

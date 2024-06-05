const express = require("express");
const {
  authMiddleware,
  isAdmin,
} = require("../middleware/AuthMiddleware");
const {
  getAllContributions,
  updateContributions,
  createContributions,
  deleteContributions,
} = require("../controller/ContributionController");

const router = express.Router();

router.get("/", authMiddleware, getAllContributions);
router.put("/:id", authMiddleware, updateContributions);
router.post("/", authMiddleware, createContributions);
router.delete("/:id", authMiddleware, deleteContributions);

module.exports = router;

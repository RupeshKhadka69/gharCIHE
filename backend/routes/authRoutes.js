// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  hello,
  getAllUsers,
  updateUserRole,
  updateUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/hello", hello);
router.get("/me", protect, getMe);
router.get("/get-all-user", protect, getAllUsers);
router.patch("/update-user/:id", protect, updateUserRole);
router.patch("/update-profile/:id", protect, updateUser);
module.exports = router;

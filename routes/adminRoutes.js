const express = require("express");
const router = express.Router();
const {
  adminLogin,
  getUsers,
  deleteUser,
} = require("../controllers/adminController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/login", adminLogin);
router.get("/users", authenticateToken, getUsers);
router.delete("/user/:id", authenticateToken, deleteUser);

module.exports = router;

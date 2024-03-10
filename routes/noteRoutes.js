const express = require("express");
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  createManyNotes,
} = require("../controllers/notesController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authenticateToken, getNotes);
router.post("/", authenticateToken, createNote);
router.put("/:id", authenticateToken, updateNote);
router.delete("/:id", authenticateToken, deleteNote);
router.post("/create-many", authenticateToken, createManyNotes);

module.exports = router;

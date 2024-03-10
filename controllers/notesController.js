const Note = require("../models/Note");

const getNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const userName = req.user.name;
    const notes = await Note.find({ userId });
    res.json({ notes: notes, userName: userName });
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).send("Error retrieving notes");
  }
};

const createNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, content } = req.body;
    const newNote = await Note.create({ userId, title, content });
    res.send(newNote);
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).send("Error saving note");
  }
};

const createManyNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const manyNotes = req.body;
    const newNotes = await Note.insertMany(
      manyNotes.map((note) => ({ ...note, userId })) // include userId in each note
    );
    res.send(newNotes);
  } catch (error) {
    console.error("Error adding notes:", error);
    res.status(500).send("Error adding notes");
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user._id;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId },
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).send("Error updating note");
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const deletedNote = await Note.findOneAndDelete({ _id: id, userId });
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note" });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  createManyNotes,
};

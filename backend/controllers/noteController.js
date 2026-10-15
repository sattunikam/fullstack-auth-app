const Note = require("../models/Note");

// @desc    Get all notes for logged-in user
// @route   GET /api/notes
// @access  Private
async function getNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    return res.status(500).json({ message: "Server error fetching notes" });
  }
}

// @desc    Get a single note by ID
// @route   GET /api/notes/:id
// @access  Private
async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ note });
  } catch (error) {
    console.error("Error fetching note:", error.message);
    return res.status(500).json({ message: "Server error fetching note" });
  }
}

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
async function createNote(req, res) {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const note = await Note.create({
      user: req.user._id,
      title: title.trim(),
      description: description ? description.trim() : "",
    });

    return res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    console.error("Error creating note:", error.message);
    return res.status(500).json({ message: "Server error creating note" });
  }
}

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
async function updateNote(req, res) {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = title.trim();
    if (description !== undefined) {
      note.description = description.trim();
    }

    const updatedNote = await note.save();

    return res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error.message);
    return res.status(500).json({ message: "Server error updating note" });
  }
}

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
async function deleteNote(req, res) {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Note deleted successfully",
      id: req.params.id,
    });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    return res.status(500).json({ message: "Server error deleting note" });
  }
}

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};

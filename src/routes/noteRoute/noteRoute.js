const express = require("express");
const noteController = require("../../controllers/noteController/noteController")
const router = express.Router();
// Create a note
router.post("/createNote", noteController.createNote);

// Get all notes
router.get('/getAllNotes', noteController.getAllNotes);

// Get note by ID
router.get('/getNoteById/:id', noteController.getNoteById);

// Update note
router.put('/updateNote/:id', noteController.updateNote);

// Delete note
router.delete('/deleteNote/:id', noteController.deleteNote);

module.exports = router;
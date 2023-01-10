const noteService = require("../services/noteServiceAPI.js");
const express = require("express");
const router = express.Router();

router.get("/", noteService.findAllNotes);
router.get("/active", noteService.findActiveNotes);
router.get("/archived", noteService.findArchivedNotes);
router.get("/:id", noteService.findNoteById);

router.post("/", noteService.addNote);
router.delete("/:id", noteService.deleteNoteById);
router.put("/:id", noteService.updateNote);

module.exports = router;

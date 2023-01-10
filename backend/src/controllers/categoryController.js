const categoryService = require("../services/categoryServiceAPI");
const express = require("express");
const router = express.Router();

router.get("/", categoryService.findAllCategories);
router.get("/:id", categoryService.findCategoryById);
router.get("/getNotes/:id", categoryService.findCategoryNotes);
router.post("/createCategory", categoryService.addCategory);
router.post("/addNote", categoryService.addNoteToCategory);

router.post("/", categoryService.addCategory);
router.delete("/:id", categoryService.deleteCategoryById);

module.exports = router;
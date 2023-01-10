const router  = require('express').Router();
const noteController = require("../controllers/noteController.js");
const categoryController = require("../controllers/categoryController");
const note = require("../models/noteModel");
const category = require("../models/categoryModel");

note.belongsToMany(category, { through: "note_category" });
category.belongsToMany(note, { through: "note_category" });

router.use("/category", categoryController);
router.use("/note", noteController);

module.exports = router;
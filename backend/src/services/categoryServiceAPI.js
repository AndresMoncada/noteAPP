const categoryDAO = require("../repository/categoryRepository");

function addCategory(req, res) {
    let category = { title: req.body.title };

    categoryDAO
        .create(category)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
        });

    categoryDAO
        .findByName((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}

function addNoteToCategory(req, res) {
    console.log(req.body.categoryId);
    categoryDAO
        .addNoteToCategory(req.body.categoryId, req.body.noteId)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.error(error);
        });
}

function findCategoryById(req, res) {
    categoryDAO
        .findById(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
        });
}

function deleteCategoryById(req, res) {
    categoryDAO
        .deleteById(req.params.id)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error(err);
        });
}

function findCategoryNotes(req, res) {
    console.log("PARAMS : ", req.params.id);

    categoryDAO
        .findCategoryNotes(req.params.id)
        .then((data) => {
            console.log("CATEGORY DATA: ", data);
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
        });
}

function findAllCategories(req, res) {
    categoryDAO
        .findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error("err: ", err);
        });
}

let categoryService = {
    addCategory: addCategory,
    addNoteToCategory: addNoteToCategory,
    findCategoryById: findCategoryById,
    deleteCategoryById: deleteCategoryById,
    findAllCategories: findAllCategories,
    findCategoryNotes: findCategoryNotes,
};

module.exports = categoryService;

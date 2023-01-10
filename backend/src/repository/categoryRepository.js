const category = require("../models/categoryModel");

function create(paramCategory) {
    let newCategory = new category(paramCategory);
    return newCategory.findOrCreate({ where: { title: paramCategory } });
}

async function createAndCheckMultipleCategories(categories) {
    return category
        .findAll({
            where: {
                title: [...categories],
            },
        })
        .then((repeated) => {
            console.log();
            console.log("REPEATED: ", repeated);
            if (repeated) {
                categories = categories.filter(
                    (category) =>
                        !repeated.find(
                            (repeatedCategory) =>
                                category == repeatedCategory.dataValues.title
                        )
                );
            }
            console.log("FILTERED: ", categories);
            let newsCategories = [];
            categories.map((cat) => {
                newsCategories.push({ title: cat });
            });
            return category.bulkCreate([...newsCategories]).then((data) => {
                return data;
            });
        })
        .catch((err) => err);
}

function findAll() {
    return category.findAll();
}

function findById(id) {
    return category.findByPk(id);
}

function findByName(name) {
    return category.findOne({ where: { title: name } });
}

async function findAllByName(arrayOfNames) {
    return category
        .findAll({ where: { title: [...arrayOfNames] } })
        .catch((err) => err);
}

function deleteById(id) {
    return category.destroy({ where: { id: id } });
}

async function addNoteToCategory(categoryId, noteId) {
    return category.findByPk(categoryId).then((category) => {
        return category.addNote(noteId);
    });
}

async function findCategoryNotes(categoryId) {
    console.log(categoryId);
    return category
        .findByPk(categoryId)
        .then((category) => category.getNotes())
        .catch((err) => {
            console.log("ERROR: ", err);
            return err;
        });
}

function removeNoteFromCategory() {
    return category.addNote(id);
}

let categoryDAO = {
    create: create,
    findAll: findAll,
    findById: findById,
    findByName: findByName,
    deleteById: deleteById,
    addNoteToCategory: addNoteToCategory,
    removeNoteFromCategory: removeNoteFromCategory,
    findCategoryNotes: findCategoryNotes,
    createAndCheckMultipleCategories: createAndCheckMultipleCategories,
    findAllByName: findAllByName,
};


module.exports = categoryDAO;

const note = require("../models/noteModel");
const categoryDAO = require("../repository/categoryRepository");
const category = require("../models/categoryModel");

async function create(paramNote) {
    let allCategories = [];
    let newNote = new note({
        title: paramNote.title,
        content: paramNote.content,
        archived: false,
    });
    let categories = paramNote.categories;
    if (categories.length > 0) {
        const results = await categoryDAO.createAndCheckMultipleCategories(
            categories
        );
        allCategories = await categoryDAO.findAllByName(categories);
    }

    return newNote.save().then((note) => {
        if (categories) {
            return note.addCategories([...allCategories]);
        }
    });
}

async function findAll() {
    return note.findAll({ include: category }).catch((err) => err);
}

function findById(id) {
    return note.findByPk(id);
}

function findByArchived(archived) {
    return note.findAll({
        where: { archived: archived },
        order: [["id", "ASC"]],
        include: category,
    });
}

function deleteById(id) {
    return note.destroy({ where: { id: id } });
}

async function update(id, paramNote) {
    console.log(id);
    let updateNote = {
        title: paramNote.title,
        content: paramNote.content,
        archived: paramNote.archived,
    };
    let categoriesNames = [];
    if (paramNote.categories !== undefined) {
        categoriesNames = paramNote.categories.map((cate) => cate.title);
    }
    return note
        .findByPk(id)
        .then(async (findedNote) => {
            return note
                .update(updateNote, { where: { id: id }, returning: true })
                .then(async (updated) => {
                    if (categoriesNames.length !== 0) {
                        return categoryDAO
                            .findAllByName(categoriesNames)
                            .then(async (leCategories) => {
                                findedNote.setCategories(leCategories);
                            });
                    }
                });
        })
        .catch((err) => {
            console.log("ERROR: ", err);
        });
}

let noteDAO = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    findByArchived: findByArchived,
    update: update,
};

module.exports = noteDAO;

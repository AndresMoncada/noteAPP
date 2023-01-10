const noteDAO = require("../repository/noteRepository.js");

let noteService = {
    addNote: addNote,
    findAllNotes: findAllNotes,
    findNoteById: findNoteById,
    updateNote: updateNote,
    deleteNoteById: deleteNoteById,
    findActiveNotes: findActiveNotes,
    findArchivedNotes: findArchivedNotes,
};

function addNote(req, res) {
    let note = {
        title: req.body.title,
        archived: false,
        content: req.body.content,
        categories: req.body.categories,
    };

    noteDAO
        .create(note)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
        });
}

function findNoteById(req, res) {
    noteDAO
        .findById(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
        });
}

function deleteNoteById(req, res) {
    noteDAO
        .deleteById(req.params.id)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error(err);
        });
}

function findAllNotes(req, res) {
    noteDAO
        .findAll()
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch((err) => {
            console.error("err: ", err);
        });
}

function findArchivedNotes(req, res) {
    noteDAO.findByArchived(true).then((data) => {
        res.send(data);
    });
}

function findActiveNotes(req, res) {
    noteDAO.findByArchived(false).then((data) => {
        res.send(data);
    });
}

function updateNote(req, res) {
    let note = {
        title: req.body.title,
        content: req.body.content,
        archived: req.body.archived,
        categories: req.body.categories,
    };
    noteDAO
        .update(req.params.id, note)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
        });
}

module.exports = noteService;

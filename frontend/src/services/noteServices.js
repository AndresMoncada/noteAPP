import  {REACT_APP_BASE_URL}from "../App";


const getNotes = async () => {
  const response = await fetch(`${REACT_APP_BASE_URL}note/`);
  const notes = await response.json();
  return notes;
};

const getActiveNotes = async () => {
  const response = await fetch(`${REACT_APP_BASE_URL}note/active`);
  const notes = await response.json();

  return notes;
};

const getArchivedNotes = async () => {
  const response = await fetch(`${REACT_APP_BASE_URL}note/archived`);
  const notes = await response.json();
  return notes;
};

const createNewNote = async (note) => {
  console.log(REACT_APP_BASE_URL);
  await fetch(`${REACT_APP_BASE_URL}note/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: note.title,
      content: note.content,
      categories: note.categories,
    }),
  });
};

const archiveNote = async (id, archived) => {
  await fetch(`${REACT_APP_BASE_URL}note/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ archived: archived }),
  });
};

const editNote = async (id, note) => {
  await fetch(`${REACT_APP_BASE_URL}note/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: note.title,
      content: note.content,
      categories: note.categories,
    }),
  });
};

const deleteNote = async (noteId) => {
  await fetch(`${REACT_APP_BASE_URL}note/${noteId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

const noteServices = {
  createNewNote: createNewNote,
  deleteNote: deleteNote,
  archiveNote: archiveNote,
  getNotes: getNotes,
  editNote: editNote,
  getActiveNotes: getActiveNotes,
  getArchivedNotes: getArchivedNotes,
};

export default noteServices;

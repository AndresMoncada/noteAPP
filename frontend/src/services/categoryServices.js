import  {REACT_APP_BASE_URL}from "../App";

const getCategories = async () => {
  const response = await fetch(`${REACT_APP_BASE_URL}category/`);
  const categories = await response.json();
  return categories;
};

const createNewCategory = async (note) => {
  await fetch(`${REACT_APP_BASE_URL}category/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: note.title, content: note.content }),
  });
};

const deleteCategory = async (noteId) => {
  await fetch(`${REACT_APP_BASE_URL}category/${noteId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

const findCategoryNotes = async (categoryId) => {
  const response = await fetch(`${REACT_APP_BASE_URL}category/getNotes/${categoryId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const categoryNotes = response.json();
  return categoryNotes;
};

const noteServices = {
  createNewCategory: createNewCategory,
  getCategories: getCategories,
  deleteCategory: deleteCategory,
  findCategoryNotes: findCategoryNotes,
};

export default noteServices;

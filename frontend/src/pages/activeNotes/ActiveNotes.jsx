import React, { useEffect, useRef, useState } from "react";
import Note from "../../components/note/Note";
import { Link } from "react-router-dom";
import noteServices from "./../../services/noteServices";
import categoryServices from "./../../services/categoryServices";
import styles from "./ActiveNotes.module.css";
import CreateNote from "../modals/createModal/CreateModal"

/*============================================*/
/*Active notes page*/
/*============================================*/

const ActiveNotes = () => {

  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [counter, setCounter] = useState(0); //variable to render the page after something happeds, example creating,deleting etc
  const [openCreateNewNote, setOpenCreateNewNote] = useState(false);

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      setCounter(0);
      noteServices.getActiveNotes().then((notes) => {
        setNotes(notes);
        categoryServices.getCategories().then((categories) => {
          setCategories(categories);
        });
      });
      mounted.current = true;
    } else {
      noteServices.getActiveNotes().then((notes) => {
        setNotes(notes);
        categoryServices.getCategories().then((categories) => {
          setCategories(categories);
        });
      });
    }
  }, [counter]);

  const onCategoryChange = (id) => {
    if (id !== 0) {
      categoryServices.findCategoryNotes(id).then((notes) => {
        !notes ? setNotes([]) : setNotes(notes);
      });
    } else {
      setCounter(counter + 1);
    }
  };

  return (
    <div>
      <header>
        <nav className={styles.navbar}>
          {openCreateNewNote && (
            <CreateNote
              counter={counter}
              setCounter={setCounter}
              setCreateNewNote={setOpenCreateNewNote}
            />
          )}
          <h3 className={styles.navbar__title}>My notes</h3>
          <input
            className={styles.navbar__createButton}
            type="button"
            value="Create note"
            onClick={() => {
              setOpenCreateNewNote(true);
            }}
          />
          <Link className={styles.navbar__archivedLink} to={"/archived"}>
            Archived notes
          </Link>
        </nav>
      </header>

      <main>
        <div className={styles.filter__container}>
          <span className={styles.filter__span}>Categories filter: </span>
          <select
            className={styles.filter__select}
            onChange={(e) => {
              onCategoryChange(e.target.value);
            }}
          >
            <option value={0}>none</option>
            {categories.map((category, idx) => (
              <option key={idx} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.notes__container}>
          {notes.map((note, idx) => {
            return (
              !note.archived && (
                <Note
                  key={idx}
                  counter={counter}
                  setCounter={setCounter}
                  note={note}
                />
              )
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ActiveNotes;

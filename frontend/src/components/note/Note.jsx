import noteServices from "./../../services/noteServices";

import { FaTrash, FaRedoAlt, FaArchive, FaEdit } from "react-icons/fa";
import { BsFillStickiesFill } from "react-icons/bs";
import { useState } from "react";
import styles from "./Note.module.css";
import DeleteNote from "../../pages/modals/deleteModal/DeleteModal"
import EditNote from "../../pages/modals/editModal/EditModal"

/*============================================*/
/*Note*/
/*============================================*/

const Note = ({ note, counter, setCounter }) => {
  let { id, title, updatedAt, archived } = note;

  let date = "";
  const [openDelete, setOpenDelete] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const formateDate = () => {
    let sliced = updatedAt.slice(0, 10).split("-");
    for (let i = sliced.length - 1; i >= 0; i--) {
      if (i === 0) {
        date += sliced[i];
      } else {
        date += sliced[i] + "/";
      }
    }
  };
  formateDate();

  return (
    <div className={styles.note__container}>
      {openDelete && (
        <DeleteNote
          counter={counter}
          setCounter={setCounter}
          setOpen={setOpenDelete}
          note={note}
        />
      )}
      {openEdit && (
        <EditNote
          counter={counter}
          setCounter={setCounter}
          setOpenEdit={setOpenEdit}
          note={note}
        />
      )}
      <BsFillStickiesFill className={styles.note__iconNote} />

      <div className={styles.note__infoContainer}>
        <h4>{title}</h4>
        <span>Last edited: {date}</span>
      </div>
      <div className={styles.note__icons__container}>
        {archived ? (
          <FaRedoAlt
            onClick={() => {
              noteServices.archiveNote(id, false).then(() => {
                setCounter(counter + 1);
              });
            }}
          />
        ) : (
          <FaArchive
            onClick={() => {
              noteServices.archiveNote(id, true).then(() => {
                setCounter(counter + 1);
              });
            }}
          />
        )}
        <FaEdit
          onClick={() => {
            setOpenEdit(true);
          }}
        />
        <FaTrash
          onClick={() => {
            setOpenDelete(true);
          }}
        />
      </div>
    </div>
  );
};


export default Note;

/*============================================*/
/*Delete note modal*/
/*============================================*/
import styles from "./DeleteModal.module.css"
import noteServices from "../../../services/noteServices";


const DeleteNote = ({ setCounter, counter, setOpen, note }) => {
    let { id } = note;
    return (
        <div
            onClick={(e) => {
                /* if (e.target.className.includes("father")) {
                  //if uncomment this line  the onclick function will close the delete window when is clicked outside the form setOpen(false);
                }*/
            }}
            className={styles.delete__container__dark + " father"}
        >
            <div className={styles.delete__container}>
                <h3>Are you sure you want to delete this note?</h3>
                <div className={styles.delete__buttons__container}>
                    <input
                        className={styles.deleteNote_no}
                        value={"No"}
                        onClick={() => {
                            setOpen(false);
                        }}
                        type="button"
                    />
                    <input
                        className={styles.deleteNote_yes}
                        value={"Yes"}
                        onClick={() => {
                            noteServices.deleteNote(id).then(() => {
                                setCounter(counter + 1);
                            });

                            setOpen(false);
                        }}
                        type="button"
                    />

                </div>
            </div>
        </div>
    );
};

export default DeleteNote;
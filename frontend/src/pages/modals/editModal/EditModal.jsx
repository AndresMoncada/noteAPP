/*============================================*/
/*Edit note modal*/
/*============================================*/
import styles from "./EditModal.module.css";
import { useState } from "react";
import Category from "../../../components/category/Category";
import noteServices from "../../../services/noteServices";

const EditNote = ({ note, setCounter, counter, setOpenEdit }) => {
    let { title, id, content, categories } = note;
    const [inputs, setInputs] = useState({
        title: title,
        content: content,
        newCategory: "",
        categories: [...categories],
    });

    const removeCategory = (id) => {
        setInputs((inputs) => ({
            ...inputs,
            categories: inputs.categories.filter((category, idx) => idx !== id),
        }));
    };

    const createLocalCategory = () => {
        setInputs((inputs) => ({
            ...inputs,
            categories: [...inputs.categories, { title: inputs.newCategory }],
        }));
    };

    const onChangeInput = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const submit = () => {
        if (inputs.title.length > 0) {
            noteServices.editNote(id, inputs).then(() => {
                setCounter(counter + 1);
                setOpenEdit(false);
            });
        }
    };
    return (
        <div
            onClick={(e) => {
                /*if (e.target.className.includes("father")) {
                  //if uncomment this line  the onclick function will close the delete window when is clicked outside the form setOpenEdit(false);;
                }*/
            }}
            className={styles.editNote__container__dark + " father"}
        >
            <div className={styles.editNote__container}>
                <h4 className={styles.editNote__title}>Edit note</h4>
                <div className={styles.editNote__inputs__container}>
                    <label>Title:</label>
                    <input value={inputs.title} name="title" onChange={onChangeInput} />

                    <label>Content:</label>
                    <textarea
                        value={inputs.content}
                        name="content"
                        onChange={onChangeInput}
                    />
                </div>
                <label>Categories:</label>
                <div className={styles.categories__container}>
                    {inputs.categories.map((title, idx) => {
                        return (
                            <Category
                                key={idx}
                                id={idx}
                                title={title.title}
                                removeCategory={removeCategory}
                            />
                        );
                    })}
                </div>
                <div className={styles.createNewCategory__container}>
                    <input
                        value={inputs.newCategory}
                        name="newCategory"
                        onChange={onChangeInput}
                        className={styles.createNewCategory__input}
                        placeholder="new category"
                        type={"text"}
                    />
                    <input
                        className={styles.createNewCategory__button}
                        type="button"
                        onClick={(e) => {
                            createLocalCategory();
                        }}
                        value={"add"}
                    />
                </div>

                <div className={styles.editNote__buttons__container}>
                    <input
                        className={styles.editNote_cancel}
                        value={"Cancel"}
                        onClick={() => {
                            setOpenEdit(false);
                        }}
                        type="button"
                    />
                    <input
                        className={styles.editNote_save}
                        value={"Save"}
                        onClick={() => {
                            submit();
                        }}
                        type="button"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditNote; 
/*============================================*/
/*Create new note modal*/
/*============================================*/
import styles from "./CreateModal.module.css"
import React, {useState } from "react";
import Category from "../../../components/category/Category";
import noteServices from "../../../services/noteServices";

const CreateNote = ({ counter, setCounter, setCreateNewNote }) => {
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        newCategory: "",
        categories: [],
    });

    const onChangeInput = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        if (inputs.title.length > 0) {
            noteServices.createNewNote(inputs).then(() => {
                setCounter(counter + 1);
            });
        }
        setCreateNewNote(false);
    };

    const removeCategory = (id) => {
        setInputs((inputs) => ({
            ...inputs,
            categories: inputs.categories.filter((category, idx) => idx !== id),
        }));
    };

    const createLocalCategory = () => {
        setInputs((inputs) => ({
            ...inputs,
            categories: [...inputs.categories, inputs.newCategory],
        }));
    };

    return (
        <div
            onClick={(e) => {
                if (e.target.className.includes("father")) {
                    //if uncomment this line  the onclick function will close the delete window when is clicked outside the form setCreateNewNote(false);
                }
            }}
            className={styles.createNewNote__container__dark + " father"}
        >
            <div className={styles.createNewNote__container}>
                <h4 className={styles.createNewNote__title}>Create new note</h4>
                <form onSubmit={submit}>
                    <div className={styles.createNewNote__inputs__container}>
                        <label>Title:</label>
                        <input required value={inputs.title} onChange={onChangeInput} name="title" />

                        <label>Content:</label>
                        <textarea
                            value={inputs.content}
                            onChange={onChangeInput}
                            required
                            name="content"
                        />

                        <label>Categories:</label>
                        <div className={styles.categories__container}>
                            {inputs.categories.map((category, idx) => {
                                return (
                                    <Category
                                        key={idx}
                                        id={idx}
                                        removeCategory={removeCategory}
                                        title={category}
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
                                placeholder="Add new category"
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
                        <div className={styles.createNewNote__categories__container}></div>
                    </div>
                    <div className={styles.createNewNote__buttons__container}>
                        <input
                            className ={styles.createNewNote_cancel}
                            value={"Cancel"}
                            onClick={() => {
                                setCreateNewNote(false);
                            }}
                            type="button"
                        />
                        <input className ={styles.createNewNote_save} value={"Save"} type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;
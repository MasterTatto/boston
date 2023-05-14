import React from 'react';
import s from "./styles.module.css"

const AddedTextPlus = ({onClick, title,showPlus = true}) => {
    return (
        <p className={s.added_title} onClick={onClick}>{showPlus && <span>+</span>} {title}</p>
    );
};

export default AddedTextPlus;

import React from 'react';
import s from "./styles.module.css"

const AddedTextPlus = ({onClick, title}) => {
    return (
        <p className={s.added_title} onClick={onClick}><span>+</span> {title}</p>
    );
};

export default AddedTextPlus;

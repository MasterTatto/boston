import React from 'react';
import s from './styles.module.css'

const Chip = ({title, onClick}) => {
    return (
        <div className={s.chip}>
            {title}
            <span onClick={() => onClick(title)}>x</span>
        </div>
    );
};

export default Chip;

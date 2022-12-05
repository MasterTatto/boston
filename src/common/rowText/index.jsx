import React from 'react';
import s from './styles.module.css'

const RowText = ({value, weight = 400}) => {

    return (
        <p className={s.title} style={{
            fontWeight: weight
        }}>
            {(value || value.length !== 0) ? value : 'None'}
        </p>
    );
};

export default RowText;

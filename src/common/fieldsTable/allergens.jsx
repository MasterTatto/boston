import React from 'react';
import s from './styles.module.css'

const Allergens = ({value}) => {

    return (
        <p className={s.allergens}>
            {value}
        </p>
    );
};

export default Allergens;

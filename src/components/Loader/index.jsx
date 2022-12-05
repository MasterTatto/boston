import React from 'react';
import {Spin} from "antd";
import s from './styles.module.css'

const Loader = () => {
    return (
        <div className={s.loader}>
            <Spin size="large" wrapperClassName={s.wrapper} className={s.wrapper}/>
        </div>
    );
};

export default Loader;

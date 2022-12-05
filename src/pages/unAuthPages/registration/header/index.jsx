import React from 'react';
import s from './styles.module.css'
import logo from "../../../../assets/logo.png";

const HeaderReg = () => {
    return (
        <div className={s.header_reg}>
            <img className={s.logo} src={logo} alt="logo"/>
            <p className={s.title}>AcuBoston.com Pharmacy sells only to practitioners and <br/> students of Traditional
                Chinese Medicine (TCM)</p>
        </div>
    );
};

export default HeaderReg;

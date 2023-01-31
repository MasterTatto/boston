import React from 'react';
import s from './styles.module.css'
import logo from '../../../../assets/logo.png'
import {ReactComponent as Arrow} from "../../../../assets/arrow_back.svg";
import {useNavigate} from "react-router-dom";

const HeaderAuth = () => {
    const navigate = useNavigate()

    return (
        <div className={s.header}>
            <img className={s.logo} src={logo} alt="logo"/>

            <div className={s.action}>
                <p className={s.join} onClick={() => navigate('/registration')}>join now</p>
                <a href="https://acuboston.com/" target={'_blank'}><p className={s.back_main}>to main site <Arrow/>
                </p></a>
            </div>
        </div>
    );
};

export default HeaderAuth;

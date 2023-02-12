import React from 'react';
import s from './styles.module.css'
import logo from '../../../../assets/logo.png'
import {ReactComponent as Arrow} from "../../../../assets/arrow_back.svg";
import {useNavigate} from "react-router-dom";
import AnchorLink from 'react-anchor-link-smooth-scroll'

const HeaderAuth = () => {
    const navigate = useNavigate()

    const isRememberMe = localStorage.getItem('rememberMe')
    return (
        <div className={s.header}>
            <img className={s.logo} src={logo} alt="logo"/>

            <div className={s.action}>
                <div className={s.mobile_v}>
                    {isRememberMe === 'true' ?
                        <AnchorLink href='#auth'>
                            <p className={s.join}>Sign in</p>
                        </AnchorLink>
                        :
                        <p className={s.join} onClick={() => navigate('/registration')}>join now</p>}

                    <a href="https://acuboston.com/" target={'_blank'}><p className={s.back_main}>to main site <Arrow/>
                    </p></a>
                </div>

                <div className={s.desc_v}>
                    <p className={s.join} onClick={() => navigate('/registration')}>join now</p>

                    <a href="https://acuboston.com/" target={'_blank'}><p className={s.back_main}>to main site <Arrow/>
                    </p></a>
                </div>
            </div>
        </div>
    );
};

export default HeaderAuth;

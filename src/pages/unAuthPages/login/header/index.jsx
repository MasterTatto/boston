import React from 'react';
import s from './styles.module.css'
import logo from '../../../../assets/logo.png'
import {ReactComponent as Arrow} from "../../../../assets/arrow_back.svg";
import {useNavigate} from "react-router-dom";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import {QuestionCircleOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import classNames from "classnames";

const HeaderAuth = () => {
    const navigate = useNavigate()

    const isRememberMe = localStorage.getItem('rememberMe')
    return (
        <div className={s.header}>
            <img className={s.logo} src={logo} alt="logo"/>

            <div className={s.action}>
                <div className={s.mobile_v}>
                    <a href="https://acuboston.com/" target={'_blank'}><p className={s.back_main}>to main site <Arrow/>
                    </p></a>

                    {isRememberMe === 'true' ?
                        <div className={s.helper_box}>
                            <AnchorLink href='#auth'>
                                <p className={classNames(s.join, s.join_2)}>Sign in </p>
                            </AnchorLink>

                            <div className={s.helper_text} onClick={(e) => e.stopPropagation()}>
                                <Tooltip title={<>
                                    1. Create custom FDA GMP-compliant formulas from highest quality individual herbs
                                    <br/>
                                    2. Use your own clinic logo on every prescription
                                    <br/>
                                    3. Allow AcuBoston pharmacists to review your formula for quality control
                                    <br/>
                                    4. Let AcuBoston Herbal Pharmacy mail your custom formulas to your patients
                                </>}>
                                    <QuestionCircleOutlined/>
                                </Tooltip>
                            </div>
                        </div>

                        :
                        <p className={s.join} onClick={() => navigate('/registration')}>join now</p>}


                </div>

                <div className={s.desc_v}>
                    <a href="https://acuboston.com/" target={'_blank'}><p className={s.back_main}>to main site <Arrow/>
                    </p></a>

                    <p className={s.join} onClick={() => navigate('/registration')}>join now</p>

                    <div className={s.helper_text}>
                        <Tooltip title={<>
                            1. Create custom FDA GMP-compliant formulas from highest quality individual herbs
                            <br/>
                            2. Use your own clinic logo on every prescription
                            <br/>
                            3. Allow AcuBoston pharmacists to review your formula for quality control
                            <br/>
                            4. Let AcuBoston Herbal Pharmacy mail your custom formulas to your patients
                        </>}>
                            <QuestionCircleOutlined/>
                        </Tooltip>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeaderAuth;

import React from 'react';
import s from './styles.module.css'
import insta from '../../assets/instagram.png'
import face from '../../assets/facebook.png'

const Footer = () => {
    return (
        <div className={s.footer}>
            <div className={s.content_footer}>
                <div className={s.order_box}>
                    <p className={s.order}>Order:</p>
                    <div className={s.order_answer}>
                        <p className={s.number}>(617) 860-2039</p>
                        <p className={s.email}>polina@acuboston.com</p>
                    </div>
                </div>
                <div className={s.footer_right}>
                    <div className={s.footer_right_left}>
                        <p>AcuBoston Herb </p>
                        <p> Pharmacy serving USA</p>
                    </div>
                    <div className={s.footer_right_right}>
                        <div className={s.icons}>
                            <a target={'_blank'} href="https://www.instagram.com/acuboston/"> <img className={s.insta}
                                                                                                   src={insta}
                                                                                                   alt="instargram"/></a>
                            <a target={'_blank'} href="https://www.facebook.com/AcuBoston/"><img className={s.face}
                                                                                                 src={face}
                                                                                                 alt="facebook"/></a>
                        </div>
                        <p>© 2023 AcuBoston.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;

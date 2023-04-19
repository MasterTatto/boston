import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {items} from "./data";
import {Button, Checkbox, Input} from "antd";
import {useStore} from "../../../../useStore";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import bg from '../../../../assets/backgroundHeader.png'
import bg_mobile from '../../../../assets/bg_mobile.png'
import Items from "./items";
import {useCookies} from "react-cookie";

const ActionAuth = observer(() => {
    const store = useStore()
    const navigate = useNavigate()

    const [cookiesLogin, setCookieLogin, removeCookieLogin] = useCookies(['login']);
    const [cookiesPassword, setCookiePassword, removeCookiePassword] = useCookies(['password']);

    const [values, setValues] = useState({
        // email: 'bogatyrev@mail.ru',
        email: '',
        // password: '1234456667'
        password: ''
    })

    const [rememberMe, setRememberMe] = useState(true)

    useEffect(() => {
        if (!rememberMe) {
            removeCookieLogin('login')
            removeCookiePassword('password')
        }
    }, [rememberMe])

    useEffect(() => {
        setValues({
            email: (cookiesLogin.login && cookiesLogin.login !== 'undefined') ? cookiesLogin.login : '',
            password: (cookiesPassword.password && cookiesPassword.password !== 'undefined') ? cookiesPassword.password : ''
        })
    }, [])


    return (
        <div className={s.action_auth}>
            <img src={bg} className={s.bg} alt="background"/>
            <img src={bg_mobile} className={s.bg_mobile} alt="background"/>
            <div className={s.action_left}>
                <div className={s.action_left_top}>
                    <h2>AcuBoston Herbal Pharmacy</h2>
                    {/*<p className={s.mobile_p}>is a Compounding Custom Herbal Prescriptions Pharmacy conforming to FDA*/}
                    {/*    GMP requirements.</p>*/}
                    <p className={s.web_p}>Custom Herbal Prescription Pharmacy for TCM Practitioners and Students.</p>
                </div>
                <div className={s.action_left_bottom}>
                    {items.map((el, i) => {
                        return <Items el={el} i={i} key={i}/>
                    })}
                </div>
            </div>
            <div className={s.action_right} id={'auth'}>
                <div className={s.action_box}>
                    <p className={s.sign}>For TCM Practitioners & Students</p>

                    <div className={s.input_box}>
                        <label className={s.label}>Login</label>
                        <Input autoComplete="new-password" required
                               onChange={(e) => setValues({...values, email: e.target.value})}
                               value={values.email || null}/>
                    </div>

                    <div className={s.input_box}>
                        <label className={s.label}>Password</label>
                        <Input.Password autoComplete="new-password" required value={values.password}
                                        onChange={(e) => setValues({...values, password: e.target.value})}/>
                    </div>

                    <div className={s.remember_me}>
                        <Checkbox checked={rememberMe} onChange={(e) => {
                            setRememberMe(e.target.checked)
                        }}/>
                        <label className={s.label}>Remember me</label>

                    </div>

                    <Button className={s.btn} onClick={async () => {
                        await store.auth.login(values.email, values.password, navigate)
                        if (rememberMe) {
                            setCookieLogin('login', values.email)
                            setCookiePassword('password', values.password)
                        }
                    }}
                            loading={store.auth.buttonLoading}>Sign In</Button>

                    <div className={s.sign_up}>
                        <p>Don't have an account yet? <span onClick={() => navigate('/registration')}> Sign Up</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ActionAuth;

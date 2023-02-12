import React, {useState} from 'react';
import s from './styles.module.css'
import {items} from "./data";
import {Button, Input} from "antd";
import {useStore} from "../../../../useStore";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import bg from '../../../../assets/backgroundHeader.png'
import bg_mobile from '../../../../assets/bg_mobile.png'

const ActionAuth = observer(() => {
    const store = useStore()
    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: 'bpssoft@yahoo.com',
        // email: '',
        password: 'beeguy'
        // password: ''
    })

    return (
        <div className={s.action_auth}>
            <img src={bg} className={s.bg} alt="background"/>
            <img src={bg_mobile} className={s.bg_mobile} alt="background"/>
            <div className={s.action_left}>
                <div className={s.action_left_top}>
                    <h2>AcuBoston Herbal Pharmacy</h2>
                    <p>is a Compounding Custom Herbal Prescriptions Pharmacy conforming to FDA GMP requirements.</p>
                </div>
                <div className={s.action_left_bottom}>
                    {items.map((el, i) => {
                        return <div className={s.item} style={{
                            padding: i === 2 && '5px'
                        }}>
                            <div>{el.svg}</div>
                            <div className={s.text}>
                                <p className={s.title}>{el.title}</p>
                                <p className={s.subtitle}>{el.subtitle}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className={s.action_right} id={'auth'}>
                <div className={s.action_box}>
                    <p className={s.sign}>TCM Practitioners & Students,
                        join us</p>

                    <div className={s.input_box}>
                        <label className={s.label}>Login</label>
                        <Input onChange={(e) => setValues({...values, email: e.target.value})} value={values.email}/>
                    </div>

                    <div className={s.input_box}>
                        <label className={s.label}>Password</label>
                        <Input.Password value={values.password}
                                        onChange={(e) => setValues({...values, password: e.target.value})}/>
                    </div>

                    <Button className={s.btn} onClick={async () => {
                        await store.auth.login(values.email, values.password, navigate)
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

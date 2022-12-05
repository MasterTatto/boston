import React, {useState} from 'react';
import s from './styles.module.css'
import {useStore} from "../../../useStore";
import {observer} from "mobx-react-lite";
import logo from '../../../assets/logo.png'
import {Button, Input} from "antd";
import {useNavigate} from "react-router-dom";

const Login = observer(() => {
    const store = useStore()
    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: 'bpssoft@yahoo.com',
        password: 'beeguy'
    })

    return (
        <div className={s.auth_box}>
            <div className={s.content_box}>
                <img className={s.logo} src={logo} alt="logo"/>
                <p className={s.title}>Pharmaceutical-quality Herbs <br/>
                    Traditional Chinese <br/>
                    Herbal Medicine <br/>
                    FDA cGMP Compliance</p>
                <div className={s.action_box}>
                    <p className={s.sign}>Sign In</p>

                    <div className={s.input_box}>
                        <label className={s.label}>Login</label>
                        <Input onChange={(e) => setValues({...values, email: e.target.value})} value={values.email}/>
                    </div>

                    <div className={s.input_box}>
                        <label className={s.label}>Password</label>
                        <Input.Password value={values.password}/>
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
})

export default Login;

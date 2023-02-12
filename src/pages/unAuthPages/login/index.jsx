import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {useStore} from "../../../useStore";
import {observer} from "mobx-react-lite";
import logo from '../../../assets/logo.png'
import {Button, Input} from "antd";
import {useNavigate} from "react-router-dom";
import Footer from "../../../components/footer";
import HeaderAuth from "./header";
import ActionAuth from "./action";
import MediaAuth from "./media";

const Login = observer(() => {
    const store = useStore()
    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: 'bpssoft@yahoo.com',
        password: 'beeguy'
    })

    return (
        <div className={s.auth_box}>
            <HeaderAuth/>
            <ActionAuth/>
            <MediaAuth/>
            <Footer/>
        </div>
    );
})

export default Login;

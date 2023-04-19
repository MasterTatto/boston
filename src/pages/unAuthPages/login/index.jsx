import React from 'react';
import s from './styles.module.css'
import {observer} from "mobx-react-lite";
import Footer from "../../../components/footer";
import HeaderAuth from "./header";
import ActionAuth from "./action";
import MediaAuth from "./media";

const Login = observer(() => {
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

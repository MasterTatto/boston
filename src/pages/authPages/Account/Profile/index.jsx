import React from 'react';
import s from './styles.module.css'
import Avatar from "./avatar";
import Balance from "./balance";
import Logo from "./logo";

const Profile = () => {
    return (
        <div className={s.profile}>
            {/*<Avatar/>*/}
            <Balance/>
            <Logo/>
        </div>
    );
};

export default Profile;

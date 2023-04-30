import React, {useRef, useState} from 'react';
import PaymentHistory from "./paymentHistory";
import s from './styles.module.css'
import Profile from "./Profile";

const navigate_data = [
    {title: 'Profile', link: 'profile'},
    {title: 'Account Statement', link: 'statement'},
]

const Account = () => {
    const ref = useRef()
    //can be statement or profile
    const [navigateAccount, setNavigateAccount] = useState('profile')
    console.log(ref)
    return (
        <div className={s.account}>
            <div className={s.navigate}>
                {navigate_data.map((el) => <p ref={ref} onClick={(e) => {
                    console.log(e)
                    setNavigateAccount(el.link)
                }}
                                              className={navigateAccount === el.link && s.active}
                                              key={el.link}>{el.title}</p>)}
                <div className={s.line} style={{
                    width:
                        (navigateAccount === 'profile' && '46px') ||
                        (navigateAccount === 'statement' && '139px'),
                    left:
                        (navigateAccount === 'profile' && '0') ||
                        (navigateAccount === 'statement' && '86px'),
                }}/>
            </div>

            {navigateAccount === 'statement' && <PaymentHistory/>}
            {navigateAccount === 'profile' && <Profile/>}
        </div>
    );
};

export default Account;

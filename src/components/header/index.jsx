import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import classNames from "classnames";
import {useStore} from "../../useStore";
import logo from "../../assets/logo_mobile.png";
import {Dropdown, Select} from "antd";
import {ReactComponent as Arrow} from '../../assets/arrow_select.svg'
import {ReactComponent as Edit} from "../../assets/edit.svg";
import {ReactComponent as Remove} from "../../assets/remove.svg";

const Header = () => {
    const store = useStore()
    const {pathname} = useLocation()
    const navigate = useNavigate()

    const userName = localStorage.getItem('name_user')

    const [currentLocation, setCurrentLocation] = useState('')
    const [openMenu, setOpenMenu] = useState(false)


    const links = [
        {title: 'Patients', link: 'patients'},
        {title: 'Formulas library', link: 'formulas-library'},
        {title: 'Herbs list', link: 'herbs-list'},
        {title: 'Account Statement', link: 'payment-history'},
    ]

    const items = (id) => [...links.map((el) => ({
        label: <NavLink className={classNames(currentLocation === `/${el.link}` && s.selected)}
                        to={el.link}
                        key={el.title}>
            <p>{el.title}</p>
        </NavLink>,
        key: el.link,
    })),
        {
            label: <p style={{
                color: '#8C8C8C'
            }
            } onClick={() => store.auth.logout(navigate)}>Logout</p>,
            key: '1',
        }
    ]

    useEffect(() => {
        setCurrentLocation(pathname)
    }, [pathname])

    return (
        <>
            <div className={s.header}>
                <div className={classNames(s.navigate)}>
                    {links.map((el) => <NavLink className={classNames(currentLocation === `/${el.link}` && s.selected)}
                                                to={el.link}
                                                key={el.title}><p>
                        {el.title}
                    </p></NavLink>)}
                </div>

                <div className={s.right_header}>
                    <p>{userName || 'undefined'}</p>

                    <div className={s.logout} onClick={() => store.auth.logout(navigate)}>
                        Logout
                    </div>
                </div>
            </div>

            <div className={s.mobile_header}>
                <img className={s.logo} src={logo} alt="logo"/>
                <div className={s.pages}>

                    <Dropdown
                        menu={{
                            items: items()
                        }}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <div className={s.selected_box}>
                            <p>{links?.find(f => `/${f.link}` === currentLocation)?.title}</p>
                            <Arrow/>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </>
    );
};

export default Header;

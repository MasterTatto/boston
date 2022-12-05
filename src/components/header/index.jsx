import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import classNames from "classnames";
import {useStore} from "../../useStore";

const Header = () => {
    const store = useStore()
    const {pathname} = useLocation()
    const navigate = useNavigate()

    const [currentLocation, setCurrentLocation] = useState('')

    const links = [
        {title: 'Patients', link: 'patients'},
        {title: 'Formulas library', link: 'formulas-library'},
        {title: 'Herbs list', link: 'herbs-list'},
    ]

    useEffect(() => {
        setCurrentLocation(pathname)
    }, [pathname])

    return (
        <div className={s.header}>
            <div className={classNames(s.navigate)}>
                {links.map((el) => <NavLink className={classNames(currentLocation === `/${el.link}` && s.selected)}
                                            to={el.link}
                                            key={el.title}><p>
                    {el.title}
                </p></NavLink>)}
            </div>

            <div className={s.logout} onClick={() => store.auth.logout(navigate)}>
                Logout
            </div>
        </div>
    );
};

export default Header;

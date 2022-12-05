import React, {useEffect} from 'react';
import {useLocation, useNavigate, useRoutes} from "react-router-dom";

import {useStore} from "../useStore";
import {authRoutes} from "./links";

const Routers = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const store = useStore()

    useEffect(() => {
        if (!['/patients', '/formulas-library', '/herbs-list', '/patients/create-prescription', '/formulas-library/create-prescription'].includes(pathname)) {
            navigate('/patients')
        }
    }, [pathname])

    const authPage = useRoutes(authRoutes)

    return (
        <>
            {store.auth.isAuth && authPage}
        </>
    );
};

export default Routers;

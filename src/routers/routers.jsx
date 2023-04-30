import React, {useEffect} from 'react';
import {useLocation, useNavigate, useRoutes} from "react-router-dom";

import {useStore} from "../useStore";
import {authRoutes} from "./links";
import {useWindowSize} from "../utils/useWindowSize";

const Routers = () => {
    const {width} = useWindowSize()

    const {pathname} = useLocation()
    const navigate = useNavigate()
    const store = useStore()

    useEffect(() => {
        if (!['/patients', '/account', '/formulas-library', '/herbs-list', '/help', '/patients/create-prescription', '/formulas-library/create-prescription', '/payment-history'].includes(pathname)) {
            navigate('/patients')
        }
    }, [pathname])

    const authPage = useRoutes(authRoutes(width))

    return (
        <>
            {store.auth.isAuth && authPage}
        </>
    );
};

export default Routers;

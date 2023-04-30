import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import RightSide from "../../paymentHistory/right_side";
import {useStore} from "../../../../../useStore";

const Balance = () => {
    const store = useStore()

    const [history, setHistory] = useState()
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)

    const chooseDay = async (from, to, classic) => {
        await store.history.getAllHistory(from, to, classic)
        setHistory(store.history.allReport)
    }

    useEffect(() => {
        chooseDay()
    }, [])

    return (
        <div className={s.balance}>
            <RightSide balance={history?.current_balance || 0}/>
        </div>
    );
};

export default Balance;

import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import LeftSide from "./left_side";
import RightSide from "./right_side";
import {useStore} from "../../../useStore";

const PaymentHistory = () => {
    const store = useStore()
    const [history, setHistory] = useState()

    const chooseDay = async (from, to) => {
        await store.history.getAllHistory(from, to)
        setHistory(store.history.allReport)
    }

    useEffect(() => {
        const getAllHistory = async () => {
            const date = new Date()
            console.log(date.getDate())
            await store.history.getAllHistory('2001-01-01', `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
            setHistory(store.history.allReport)
        }

        getAllHistory()
    }, [])
    console.log(history)
    return (
        <div className={s.main}>
            <LeftSide history={history} chooseDay={chooseDay} setHistory={setHistory}/>
            <RightSide/>
        </div>
    );
};

export default PaymentHistory;

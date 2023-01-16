import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import LeftSide from "./left_side";
import RightSide from "./right_side";
import {useStore} from "../../../useStore";
import MobilePaymentHistory from "./mobile_payment_history";
import moment from "moment";

const PaymentHistory = () => {
    const store = useStore()

    const [history, setHistory] = useState()
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)

    const chooseDay = async (from, to) => {
        await store.history.getAllHistory(from, to)
        setHistory(store.history.allReport)
    }


    useEffect(() => {
        const getAllHistory = async () => {
            const date = new Date()
            const start = moment(date).add(-6, 'month');

            const date1 = new Date()
            const date2 = new Date(start.format())

            const toDate = `${date1.getFullYear()}-${date1.getMonth() + 1 < 10 ? `0${date1.getMonth() + 1}` : date1.getMonth() + 1}-${date1.getDate() < 10 ? `0${date1.getDate()}` : date1.getDate()}`
            const fromDate = `${date2.getFullYear()}-${date2.getMonth() + 1 < 10 ? `0${date2.getMonth() + 1}` : date2.getMonth() + 1}-${date2.getDate() < 10 ? `0${date2.getDate()}` : date2.getDate()}`

            setTo(toDate)
            setFrom(fromDate)

            await store.history.getAllHistory(fromDate, toDate)

            setHistory(store.history.allReport)
        }

        getAllHistory()
    }, [])
    console.log(history)
    return (
        <>
            <MobilePaymentHistory/>
            <div className={s.main}>
                <LeftSide from={from} setFrom={setFrom} to={to} setTo={setTo} history={history} chooseDay={chooseDay}
                          setHistory={setHistory}/>
                <RightSide balance={history?.current_balance || 0}/>
            </div>
        </>

    );
};

export default PaymentHistory;

import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {Button, DatePicker, Switch} from "antd";
import {observer} from "mobx-react-lite";
import Item from "./item/item";
import moment from "moment/moment";
import {useStore} from "../../../../../useStore";

const MobilePaymentHistory = observer(() => {
    const store = useStore()

    const [patients, setPatients] = useState([])
    const [selectedID, setSelectedID] = useState()
    const [history, setHistory] = useState()
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [classic, setClassic] = useState(false)
    const [values, setValues] = useState({
        payout_person: '',
        payout_address: '',
    })

    const chooseDay = async (from, to) => {
        await store.history.getAllHistory(from, to, classic)
        setHistory(store.history.allReport)

    }

    const getCurrentPrescription = async (id) => {
        await store.history.getCurrentPrescription(id)
    }

    useEffect(() => {
        const getPayoutInfo = async () => {
            await store.history.getPayoutInfo()
            await store.patients.getAllPatients()
            setPatients(store.patients.allPatients)
            setValues({
                payout_address: store.history.payoutInfo?.payout_address || 'Empty',
                payout_person: store.history.payoutInfo?.payout_person || 'Empty'
            })
        }
        getPayoutInfo()
    }, [])

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

            await store.history.getAllHistory(fromDate, toDate, classic)

            setHistory(store.history.allReport)
        }

        getAllHistory()
    }, [])


    return (
        <div className={s.mobile}>

            <div className={s.header}>

                <div className={s.date}>
                    <DatePicker
                        placeholder={from}
                        onChange={async (e) => {
                            const date = new Date(e)
                            await chooseDay(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`, to)
                            setFrom(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`)
                        }}
                    />
                    <p className={s.arrow}/>
                    <DatePicker
                        placeholder={to}
                        onChange={async (e) => {
                            const date = new Date(e)
                            await chooseDay(from, `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`)
                            setTo(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`)
                        }}/>
                </div>

                <div className={s.switch_box}>
                    <div className={s.switch}>
                        <Switch
                            checked={classic}
                            onChange={async (e) => {
                                setClassic(e)
                                await store.history.getAllHistory(from, to, e)
                                setHistory(store.history.allReport)
                            }}
                        />
                        <span className={s.switch_box_title}>Payouts only</span>
                    </div>
                </div>
            </div>

            <div className={s.items_box}>
                {history?.rows?.map((el, i) => <Item patients={patients} getCurrentPrescription={getCurrentPrescription}
                                                     selectedID={selectedID} setSelectedID={setSelectedID} key={i}
                                                     index={i} {...el}/>)}
            </div>
        </div>
    );
});

export default MobilePaymentHistory;

import React, {useEffect, useRef, useState} from 'react';
import s from './styles.module.css'
import {DatePicker, Input, Switch} from "antd";
import {useStore} from "../../../../useStore";
import {ReactComponent as Arrow} from '../../../../assets/arrow_select.svg'
import {ReactComponent as Edit} from "../../../../assets/edit_text.svg";
import classNames from "classnames";
import {observer} from "mobx-react-lite";
import Item from "./item/item";
import moment from "moment/moment";
import Loader from "../../../../components/Loader";

const MobilePaymentHistory = observer(() => {
    const store = useStore()
    const inputRef = useRef(null)

    const [patients, setPatients] = useState([])
    const [selectedID, setSelectedID] = useState()
    const [openBalanceInfo, setOpenBalanceInfo] = useState(false)
    const [history, setHistory] = useState()
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)
    const [classic, setClassic] = useState(false)
    const [values, setValues] = useState({
        payout_person: '',
        payout_address: '',
    })

    const updatePayoutInfo = async () => {
        await store.history.updatePayoutInfo(values)
        await store.history.getPayoutInfo()
        setValues({
            payout_address: store.history.payoutInfo?.payout_address || 'Empty',
            payout_person: store.history.payoutInfo?.payout_person || 'Empty'
        })
        setIsDisabled(true)
    }

    const chooseDay = async (from, to) => {
        console.log('start')
        await store.history.getAllHistory(from, to, classic)
        setHistory(store.history.allReport)
        console.log(history)
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
            console.log(toDate)
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
                <div className={s.top_header}>
                    <p className={s.title}>Account Statement</p>
                    <p className={classNames(s.balance, openBalanceInfo && s.rotate)}
                       onClick={() => setOpenBalanceInfo(!openBalanceInfo)}>Balance <Arrow/></p>
                </div>

                <div className={s.info} style={{
                    height: openBalanceInfo && '350px'
                }}>
                    <div className={s.balance_box}>
                        <p className={s.balance_title}>Your balance:</p>
                        <p className={s.balance_count}>
                            {`$${history?.current_balance || 0}`}</p>
                        <p className={s.balance_description}>
                            Account Balances in excess of $30 are paid monthly by check
                        </p>
                    </div>

                    <div className={s.detalis}>
                        <h3 className={s.detalis_title}>Payment details</h3>
                        <div className={s.input_box}>
                            <div className={s.input_box}>
                                <label className={s.label}>Name</label>
                                <Input disabled={isDisabled}
                                       ref={inputRef}
                                       onChange={(e) => setValues({...values, payout_person: e.target.value})}
                                       value={values.payout_person}
                                />
                            </div>
                            <div className={s.input_box}>
                                <label className={s.label}>Address</label>
                                <Input disabled={isDisabled}
                                       onChange={(e) => setValues({...values, payout_address: e.target.value})}
                                       value={values.payout_address}
                                />
                            </div>
                            {isDisabled && <p className={s.edit} onClick={() => {
                                setIsDisabled(false)
                                setTimeout(() => inputRef.current.focus(), 100)

                            }}>
                                <Edit/>
                                Edit information
                            </p>}
                            {!isDisabled && <p className={classNames(s.edit, s.edit_dave)} onClick={updatePayoutInfo}>
                                Save
                            </p>}
                        </div>
                    </div>
                </div>

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
                            value={classic}
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

            {store.history.isLoading ? <Loader/> : <div className={s.items_box}>
                {history?.rows?.map((el, i) => <Item patients={patients} getCurrentPrescription={getCurrentPrescription}
                                                     selectedID={selectedID} setSelectedID={setSelectedID} key={i}
                                                     index={i} {...el}/>)}
            </div>}
        </div>
    );
});

export default MobilePaymentHistory;

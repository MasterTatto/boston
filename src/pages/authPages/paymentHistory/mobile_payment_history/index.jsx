import React, {useEffect, useRef, useState} from 'react';
import s from './styles.module.css'
import {DatePicker, Input} from "antd";
import {useStore} from "../../../../useStore";
import {ReactComponent as Arrow} from '../../../../assets/arrow_select.svg'
import {ReactComponent as Edit} from "../../../../assets/edit_text.svg";
import classNames from "classnames";
import {observer} from "mobx-react-lite";
import Item from "./item/item";

const MobilePaymentHistory = observer(() => {
    const store = useStore()
    const inputRef = useRef(null)

    const [patients, setPatients] = useState([])
    const [selectedID,setSelectedID] = useState()
    const [openBalanceInfo, setOpenBalanceInfo] = useState(false)
    const [history, setHistory] = useState()
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)
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
        await store.history.getAllHistory(from, to)
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
        // if (from && to) {
        chooseDay(from, to)
        // }
    }, [from, to])
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
                            $2458.47</p>
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
                        placeholder={'From'}
                        onChange={(e) => {
                            const date = new Date(e)
                            setFrom(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`)
                        }}
                    />
                    <p className={s.arrow}/>
                    <DatePicker
                        placeholder={'To'}
                        onChange={(e) => {
                            const date = new Date(e)
                            setTo(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`)
                        }}/>
                </div>
            </div>

            <div className={s.items_box}>
                {history?.rows?.map((el, i) => <Item patients={patients} getCurrentPrescription={getCurrentPrescription} selectedID={selectedID} setSelectedID={setSelectedID} key={i} index={i} {...el}/>)}
            </div>
        </div>
    );
});

export default MobilePaymentHistory;

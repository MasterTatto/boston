import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {DatePicker} from "antd";
import classNames from "classnames";
import {makeRandomID} from "../../../../utils/randomID";
import Item from "./item";
import {useStore} from "../../../../useStore";

const LeftSide = ({history, chooseDay, setHistory, from, setFrom, to, setTo}) => {
    const store = useStore()

    const [patients, setPatients] = useState([])

    const getCurrentPrescription = async (id) => {
        await store.history.getCurrentPrescription(id)
    }

    useEffect(() => {
        const getAllPatients = async () => {
            await store.patients.getAllPatients()
            setPatients(store.patients.allPatients)
        }

        getAllPatients()
    }, [])

    useEffect(() => {
        if (from && to) {
            chooseDay(from, to)
        }
    }, [from, to])

    makeRandomID()
    return (
        <div className={s.left_side}>
            <div className={s.header}>
                <p className={s.title}>Account Statement</p>
                <div className={s.date}>
                    <DatePicker
                        placeholder={from}
                        onChange={(e) => {
                            const date = new Date(e)
                            setFrom(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`)
                        }}
                    />
                    <div className={s.arrow}/>
                    <DatePicker
                        placeholder={to}
                        onChange={(e) => {
                            const date = new Date(e)
                            setTo(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`)
                        }}/>
                </div>
            </div>

            <div className={s.table}>
                <div className={s.header_table}>
                    <p className={s.number_table}>#</p>
                    <p className={s.type_table}>Transaction Type</p>
                    <p className={s.date_table}>Date</p>
                    <p className={s.amount_table}>Amount</p>
                    <p className={s.amount_table}>Current balance</p>
                </div>

                <div className={s.table_items}>
                    {history?.rows.map((el, i) => {
                        const currentItem = store.history.prescription?.find(f => f.prescription_id === el.prescription_id)

                        return (
                            <div className={classNames(s.item, el.isOpen && s.active)} onClick={async () => {
                                if (!el?.prescription_id) return
                                await getCurrentPrescription(el.prescription_id)
                                setHistory({
                                    ...history,
                                    rows: history.rows.map((histor) => histor.prescription_id === el.prescription_id ? ({
                                        ...histor,
                                        isOpen: !histor.isOpen
                                    }) : histor)
                                })
                            }}>
                                <div className={s.item_first}>
                                    <p className={s.number_table}>{i + 1}</p>
                                    <p className={s.type_table} style={{
                                        color: el.isOpen && '#67AC46'
                                    }}>{el.type}</p>
                                    <p className={s.date_table}>{el.date}</p>
                                    <p className={s.amount_table}>{`$${el.amount}`}</p>
                                    <p className={s.amount_table}>{`$${el.balance}`}</p>
                                </div>

                                {el?.prescription_id && <Item patients={patients} onHidden={() => setHistory({
                                    ...history,
                                    rows: history.rows.map((histor) => histor.prescription_id === el.prescription_id ? ({
                                        ...histor,
                                        isOpen: !histor.isOpen
                                    }) : histor)
                                })} content={currentItem}/>}
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
};

export default LeftSide;

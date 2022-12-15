import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {DatePicker} from "antd";
import classNames from "classnames";
import {makeRandomID} from "../../../../utils/randomID";

const LeftSide = ({history, chooseDay, setHistory}) => {

    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)

    useEffect(() => {
        if (from && to) {
            chooseDay(from, to)
        }
    }, [from, to])

    makeRandomID()
    return (
        <div className={s.left_side}>
            <div className={s.header}>
                <p className={s.title}>Payment history</p>
                <div className={s.date}>
                    <DatePicker
                        placeholder={'From'}
                        onChange={(e) => {
                            const date = new Date(e)
                            setFrom(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`)
                        }}
                    />
                    <div className={s.arrow}/>
                    <DatePicker
                        placeholder={'To'}
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
                </div>

                <div className={s.table_items}>
                    {history?.rows.map((el, i) => {
                        return (
                            <div className={s.item} style={{
                                height: el.isOpen && '180px'
                            }} onClick={() => setHistory({
                                ...history,
                                rows: history.rows.map((histor) => histor.date === el.date ? ({
                                    ...histor,
                                    isOpen: !histor.isOpen
                                }) : histor)
                            })}>
                                <div className={s.item_first}>
                                    <p className={s.number_table}>{i + 1}</p>
                                    <p className={s.type_table} style={{
                                        color: el.isOpen && '#67AC46'
                                    }}>{el.type}</p>
                                    <p className={s.date_table}>{el.date}</p>
                                    <p className={s.amount_table}>{`$${el.balance}`}</p>
                                </div>

                                <div className={s.hidden_item} onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}>
                                    <div className={s.row}>
                                        <p className={s.number_table}/>
                                        <p className={classNames(s.type_table, s.name)}>Date:</p>
                                        <p className={classNames(s.date_table, s.answer)}>{el.date}</p>
                                        <p className={s.amount_table}/>
                                    </div>
                                    <div className={s.row}>
                                        <p className={s.number_table}/>
                                        <p className={classNames(s.type_table, s.name)}>Pacient:</p>
                                        <p className={classNames(s.date_table, s.answer)}>{el.prescription_id}</p>
                                        <p className={s.amount_table}/>
                                    </div>
                                    <div className={s.row}>
                                        <p className={s.number_table}/>
                                        <p className={classNames(s.type_table, s.name)}>Herbs cost:</p>
                                        <p className={classNames(s.date_table, s.answer)}>{el.amount}</p>
                                        <p className={s.amount_table}/>
                                    </div>
                                    <div className={s.row}>
                                        <p className={s.number_table}/>
                                        <p className={classNames(s.type_table, s.name)}>Fulfillment fee:</p>
                                        <p className={classNames(s.date_table, s.answer)}>{6}</p>
                                        <p className={s.amount_table}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
};

export default LeftSide;

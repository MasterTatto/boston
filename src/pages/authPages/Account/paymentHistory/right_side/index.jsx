import React, {useEffect, useRef, useState} from 'react';
import s from './styles.module.css'
import {Input} from "antd";
import {ReactComponent as Edit} from "../../../../../assets/edit_text.svg";
import classNames from "classnames";
import {useStore} from "../../../../../useStore";


const RightSide = ({balance}) => {
    const store = useStore()
    const inputRef = useRef(null)

    const [isDisabled, setIsDisabled] = useState(true)
    const [values, setValues] = useState({
        payout_person: '',
        payout_address: '',
    })

    const updatePayoutInfo = async () => {
        await store.history.updatePayoutInfo(values)
        await store.history.getPayoutInfo()
        setValues({
            payout_address: store.history.payoutInfo?.payout_address,
            payout_person: store.history.payoutInfo?.payout_person
        })
        setIsDisabled(true)
    }

    useEffect(() => {
        const getPayoutInfo = async () => {
            await store.history.getPayoutInfo()
            setValues({
                payout_address: store.history.payoutInfo?.payout_address,
                payout_person: store.history.payoutInfo?.payout_person
            })
        }
        getPayoutInfo()

    }, [])

    return (
        <div className={s.right_side}>
            <div className={s.balance_box}>
                <p className={s.text_balance}>Your balance</p>
                <p className={s.balance}>{`$${balance}`}</p>
                <p className={s.description_balance}>Account Balances in excess of $30 are paid monthly by check</p>
            </div>
            <div className={s.detalis}>
                <h3 className={s.detalis_title}>Payment details</h3>
                <div className={s.input_box}>
                    <div className={s.input_box}>
                        <label className={s.label}>Name</label>
                        <Input disabled={isDisabled}
                               placeholder={'Whom the check is payable to'}
                               ref={inputRef}
                               onChange={(e) => setValues({...values, payout_person: e.target.value})}
                               value={values.payout_person}
                        />
                    </div>
                    <div className={s.input_box}>
                        <label className={s.label}>Address</label>
                        <Input disabled={isDisabled}
                               placeholder={'Fill in address'}
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
    );
};

export default RightSide;

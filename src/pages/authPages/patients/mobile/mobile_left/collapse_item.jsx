import React, {useEffect, useState} from 'react';
import s from "../../patient_left/styles.module.css";
import classNames from "classnames";
import {ReactComponent as Arrow} from "../../../../../assets/arrow.svg";
import {useStore} from "../../../../../useStore";
import {getFormatedDate} from "../../../../../utils/getFormatDate";

const CollapseItem = ({el, selectedPatient, checkerCloseShowMore}) => {
    const store = useStore()

    const [openMenu, setOpenMenu] = useState(false)
    const [prescription, setPrescriptionItems] = useState()

    const getCurrentPrescription = async () => {
        await store.history.getCurrentPrescription(el.prescription_id)
        setPrescriptionItems(store.history.prescription)
    }

    useEffect(() => {
        setOpenMenu(false)
    }, [checkerCloseShowMore])

    return (
        <div>
            {openMenu && <>
                <br/>
                <div style={{
                    height: '1px',
                    backgroundColor: 'rgba(39,41,51,0.2)',
                    width: '100%'
                }}/>
                <br/>
            </>}
            <div>

                <div style={{
                    height: openMenu ? 'fit-content' : 0,
                    overflow: 'hidden'
                }}>
                    <div className={s.collapse_item} style={{
                        marginTop: 0
                    }}>
                        <p className={s.collapse_title}>Cost per dose:</p>
                        <p className={s.collapse_answer}>{`$${el.formula_cost}`}</p>
                    </div>
                    <div className={s.collapse_item}>
                        <p className={s.collapse_title}>Delivery cost:</p>
                        <p className={s.collapse_answer}>{`$${el.delivery_cost}`}</p>
                    </div>
                    <div className={s.collapse_item}>
                        <p className={s.collapse_title}>Herbs cost:</p>
                        <p className={s.collapse_answer}>{`$${el.herbs_cost}`}</p>
                    </div>
                    <div className={s.collapse_item}>
                        <p className={s.collapse_title}>Fulfillment fee:</p>
                        <p className={s.collapse_answer}>{`$${el.fulfillment_fee}`}</p>
                    </div>
                    <div className={s.collapse_item}>
                        <p className={s.collapse_title}>Markup:</p>
                        <p className={s.collapse_answer}>{`x${el.markup}`}</p>
                    </div>
                    <br/>
                    <div style={{
                        height: '1px',
                        backgroundColor: 'rgba(39,41,51,0.2)',
                        width: '100%'
                    }}/>
                    <br/>

                    <div className={s.collapse_item} style={{
                        marginTop: '0'
                    }}>
                        <p className={s.collapse_title}>Date of creation:</p>
                        <p className={s.collapse_answer}>{`${el.date}`}</p>
                    </div>

                    <div className={s.collapse_item}>
                        <p className={s.collapse_title}>Payment date:</p>
                        <p className={s.collapse_answer}>{getFormatedDate(prescription?.paid_at)}</p>
                    </div>
                    <div className={s.collapse_item}>
                        <p className={s.collapse_title}>Packing date:</p>
                        <p className={s.collapse_answer}>{getFormatedDate(prescription?.packed_at)}</p>
                    </div>
                    <div className={s.collapse_item}>
                        <p className={s.collapse_title}>Delivery date:</p>
                        <p className={s.collapse_answer}>{getFormatedDate(prescription?.shipped_at)}</p>
                    </div>
                    <div className={s.collapse_item}>
                        <p className={s.collapse_title}>Tracking code:</p>
                        <p className={s.collapse_answer}>{prescription?.tracking_code || 'None'}</p>
                    </div>
                    <div className={s.collapse_item}>
                        <p className={s.collapse_title}>Completion date:</p>
                        <p className={s.collapse_answer}>{getFormatedDate(prescription?.completed_at)}</p>
                    </div>
                    <br/>
                    <div style={{
                        height: '1px',
                        backgroundColor: 'rgba(39,41,51,0.2)',
                        width: '100%'
                    }}/>
                    <br/>

                    <div className={s.collapse_item} style={{
                        marginTop: '0'
                    }}>
                        <p className={s.collapse_title}>Prescription ID:</p>
                        <p className={s.collapse_answer}>{`${el.prescription_id}`}</p>
                    </div>
                    <div className={s.collapse_item}>
                        <p className={s.collapse_title}>Patient ID:</p>
                        <p className={s.collapse_answer}>{`${selectedPatient}`}</p>
                    </div>
                    {/*<ul>*/}
                    {/*    <li>1</li>*/}
                    {/*    <li>1</li>*/}
                    {/*    <li>1</li>*/}
                    {/*    <li>1</li>*/}
                    {/*    <li>1</li>*/}
                    {/*    <li>1</li>*/}
                    {/*    <li>1</li>*/}
                    {/*    <li>1</li>*/}
                    {/*    <li>1</li>*/}
                    {/*    <li>1</li>*/}
                    {/*</ul>*/}
                </div>
            </div>
            <p className={classNames(s.click, openMenu && s.rotate)}
               onClick={async () => {
                   await getCurrentPrescription()
                   setOpenMenu(!openMenu)
               }}>
                <Arrow/>
                {openMenu ? "Hide details" : "More details"}

            </p>
        </div>
    );
};

export default CollapseItem;

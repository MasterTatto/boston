import React, {useState} from 'react';
import s from './styles.module.css'
import classNames from "classnames";
import {observer} from "mobx-react-lite";
import {ReactComponent as Arrow} from "../../../../../../assets/hidden_arrow.svg";
import {useStore} from "../../../../../../useStore";
import {getFormatedDate} from "../../../../../../utils/getFormatDate";

const Item = observer(({
                           getCurrentPrescription,
                           balance,
                           amount,
                           date,
                           type,
                           prescription_id,
                           selectedID,
                           setSelectedID,
                           index,
                           patients
                       }) => {
    const store = useStore()
    const [openInfo, setOpenInfo] = useState(false)
    const [openInfo2, setOpenInfo2] = useState(false)

    const currentItem = store.history.prescription?.find(f => f.prescription_id === prescription_id)
    const patient = patients.find(f => f.patient_id === currentItem?.patient_id)

    return (
        <div className={s.item}>
            <div className={s.top}>
                <div className={s.top_f}>
                    <p className={s.qest}>#</p>
                    <p className={s.answer}>{index + 1}</p>
                </div>
                <div className={s.top_s}>
                    <p className={classNames(s.qest)}>Transaction Type</p>
                    <p className={classNames(s.answer, s.answer_type_2, (openInfo) && s.selected)}
                       onClick={async () => {
                           if (!prescription_id) return
                           await getCurrentPrescription(prescription_id)
                           setSelectedID(prescription_id)
                           setOpenInfo(!openInfo)
                       }}
                    >{type}</p>
                </div>
            </div>
            <div className={s.bottom}>
                <div className={s.bottom_f}>
                    <p className={s.qest}>Date</p>
                    <p className={s.answer}>{date}</p>
                </div>
                <div className={s.bottom_s}>
                    <p className={s.qest}>Amount</p>
                    <p className={classNames(s.answer, s.answer_type_2)}>{`$${amount}`}</p>
                </div>
                <div className={s.bottom_t}>
                    <p className={s.qest}>Balance</p>
                    <p className={classNames(s.answer, s.answer_type_2)}>{`$${balance}`}</p>
                </div>
            </div>

            <div className={s.hidden_first} style={{
                maxHeight: openInfo && '2000px'
            }}>
                <div className={s.hidden_left_item}>
                    <div className={s.hidden_left_item_left}>
                        <p className={s.status}>Status:</p>
                        <p className={s.quest}>Prescription ID:</p>
                        {/*<p className={s.quest}>Patient ID:</p>*/}
                        <p className={s.quest}>Patient name:</p>
                    </div>
                    <div className={s.hidden_left_item_right}>
                        <p className={s.status_answer}>{currentItem?.status}</p>
                        <p className={s.answer2}>{currentItem?.prescription_id || 'None'}</p>
                        {/*<p className={s.answer2}>{currentItem?.patient_id || 'None'}</p>*/}
                        <p className={s.answer2}>{patient?.patient_name ? patient.patient_name : 'None'}</p>
                    </div>
                </div>
                <div className={s.hidden_content} style={{
                    maxHeight: openInfo2 && '2000px'
                }}>
                    <div className={s.hidden_left_item}>
                        <div className={s.hidden_left_item_left}>
                            <p className={s.quest}>Take days:</p>
                            <p className={s.quest}>Take times per day:</p>
                            <p className={s.quest}>Take grams:</p>
                            <p className={s.quest}>Total grams:</p>
                        </div>
                        <div className={s.hidden_left_item_right}>
                            <p className={s.answer}>{currentItem?.take_days}</p>
                            <p className={s.answer}>{currentItem?.take_times_per_day}</p>
                            <p className={s.answer}>{`${currentItem?.take_grams} g`}</p>
                            <p className={s.answer}>{`${currentItem?.total_grams} g`}</p>
                        </div>
                    </div>
                    <div className={s.hidden_left_item}>
                        <div className={s.hidden_left_item_left}>
                            <p className={s.quest}>Date of creation:</p>
                            <p className={s.quest}>Note:</p>
                        </div>
                        <div className={s.hidden_left_item_right}>
                            <p className={s.answer}>{getFormatedDate(currentItem?.ctime)}</p>
                            <p className={s.answer}>{currentItem?.notes}</p>
                        </div>
                    </div>
                    <div className={s.hidden_left_item}>
                        <div className={s.hidden_left_item_left}>
                            <p className={s.quest}>Cost per dose:</p>
                            <p className={s.quest}>Delivery cost:</p>
                            <p className={s.quest}>Herbs cost:</p>
                            <p className={s.quest}>Fulfillment fee:</p>
                            <p className={s.quest}>Markup:</p>
                            <p className={s.quest}>Total price:</p>
                        </div>
                        <div className={s.hidden_left_item_right}>
                            <p className={s.answer}>{`$${currentItem?.formula_cost}`}</p>
                            <p className={s.answer}>{`$${currentItem?.delivery_cost}`}</p>
                            <p className={s.answer}>{`$${currentItem?.herbs_cost}`}</p>
                            <p className={s.answer}>{`$${currentItem?.fulfillment_fee}`}</p>
                            <p className={s.answer}>{`x${currentItem?.markup}`}</p>
                            <p className={s.answer}>{`$${currentItem?.prescription_price}`}</p>
                        </div>
                    </div>
                    <div className={classNames(s.hidden_left_item, s.hidden_left_item_last)}>
                        <div className={s.hidden_left_item_left}>
                            <p className={s.quest}>Payment date:</p>
                            <p className={s.quest}>Packing date:</p>
                            <p className={s.quest}>Delivery date:</p>
                            <p className={s.quest}>Tracking code:</p>
                            <p className={s.quest}>Completion date:</p>
                        </div>
                        <div className={s.hidden_left_item_right}>
                            <p className={s.answer}>{getFormatedDate(currentItem?.paid_at)}</p>
                            <p className={s.answer}>{getFormatedDate(currentItem?.packed_at)}</p>
                            <p className={s.answer}>{getFormatedDate(currentItem?.shipped_at)}</p>
                            <p className={s.answer}>{currentItem?.tracking_code || 'None'}</p>
                            <p className={s.answer}>{getFormatedDate(currentItem?.completed_at)}</p>
                        </div>
                    </div>
                </div>


                <div className={classNames(s.more, openInfo2 && s.rotate)}>
                    <Arrow/>
                    <p onClick={() => setOpenInfo2(!openInfo2)}>{openInfo2 ? 'Hidden details' : 'More details'}</p>
                </div>


                <div className={s.hidden_right}>
                    {currentItem?.formula?.components?.length !== 0 && <div className={s.component_box}>
                        <h3>Composition of the formula</h3>

                        <div className={s.component_items}>
                            {currentItem?.formula?.components?.map((el, i) => <div className={s.component_item} key={i}>
                                <p className={s.herb_part}>{`x${el.parts}`}</p>
                                <p className={s.herb_name}>{el.herb_name}</p>
                            </div>)}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
});

export default Item;

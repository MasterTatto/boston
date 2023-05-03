import React from 'react';
import s from "./styles.module.css";
import classNames from "classnames";
import {ReactComponent as Arrow} from "../../../../../assets/hidden_arrow.svg";
import {getFormatedDate} from "../../../../../utils/getFormatDate";


const Item = ({content, onHidden, patients}) => {
    const patient = patients.find(f => f.patient_id === content?.patient_id)

    return (
        <div className={s.hidden_item} onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
        }}>
            <div className={s.hidden_left}>
                <div className={s.hidden_left_item}>
                    <div className={s.hidden_left_item_left}>
                        <p className={s.status}>Status:</p>
                        <p className={s.quest}>Prescription ID:</p>
                        {/*<p className={s.quest}>Patient ID:</p>*/}
                        <p className={s.quest}>Patient name:</p>
                    </div>
                    <div className={s.hidden_left_item_right}>
                        <p className={s.status_answer}>{content?.status}</p>
                        <p className={s.answer}>{content?.prescription_id || 'None'}</p>
                        {/*<p className={s.answer}>{content?.patient_id || 'None'}</p>*/}
                        <p className={s.answer}>{patient?.patient_name ? patient.patient_name : 'None'}</p>
                    </div>
                </div>
                <div className={s.hidden_left_item}>
                    <div className={s.hidden_left_item_left}>
                        <p className={s.quest}>Take days:</p>
                        <p className={s.quest}>Take times per day:</p>
                        <p className={s.quest}>Take grams:</p>
                        <p className={s.quest}>Total grams:</p>
                    </div>
                    <div className={s.hidden_left_item_right}>
                        <p className={s.answer}>{content?.take_days}</p>
                        <p className={s.answer}>{content?.take_times_per_day}</p>
                        <p className={s.answer}>{`${content?.take_grams} g`}</p>
                        <p className={s.answer}>{`${content?.total_grams} g`}</p>
                    </div>
                </div>
                <div className={s.hidden_left_item}>
                    <div className={s.hidden_left_item_left}>
                        <p className={s.quest}>Date of creation:</p>
                        <p className={s.quest}>Note:</p>
                    </div>
                    <div className={s.hidden_left_item_right}>
                        <p className={s.answer}>{getFormatedDate(content?.ctime)}</p>
                        <p className={s.answer}>{content?.notes}</p>
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
                        <p className={s.answer}>{`$${content?.formula_cost}`}</p>
                        <p className={s.answer}>{`$${content?.delivery_cost}`}</p>
                        <p className={s.answer}>{`$${content?.herbs_cost}`}</p>
                        <p className={s.answer}>{`$${content?.fulfillment_fee}`}</p>
                        <p className={s.answer}>{`x${content?.markup}`}</p>
                        <p className={s.answer}>{`$${content?.prescription_price}`}</p>
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
                        <p className={s.answer}>{getFormatedDate(content?.paid_at)}</p>
                        <p className={s.answer}>{getFormatedDate(content?.packed_at)}</p>
                        <p className={s.answer}>{getFormatedDate(content?.shipped_at)}</p>
                        <p className={s.answer}>{content?.tracking_code || 'None'}</p>
                        <p className={s.answer}>{getFormatedDate(content?.completed_at)}</p>
                    </div>
                </div>
                <div className={s.hidden_box} onClick={onHidden}>
                    <Arrow/>
                    <p>Hide details</p>
                </div>
            </div>
            <div className={s.hidden_right}>
                {content?.formula?.components?.length !== 0 && <div className={s.component_box}>
                    <h3>Composition of the formula</h3>

                    <div className={s.component_items}>
                        {content?.formula?.components?.map((el, i) => <div className={s.component_item} key={i}>
                            <p className={s.herb_part}>{`x${el.parts}`}</p>
                            <p className={s.herb_name}>{el.herb_name}</p>
                        </div>)}
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default Item;

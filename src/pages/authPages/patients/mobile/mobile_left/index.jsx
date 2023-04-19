import React, {useState} from 'react';
import s from '../../patient_left/styles.module.css'
import {Collapse, Dropdown} from "antd";
import {ReactComponent as Copy} from "../../../../../assets/copy.svg";
import {observer} from "mobx-react-lite";
import {calculateMF} from "../../../../../utils/coastPrescription";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import CollapseItem from "./collapse_item";

const PatientLeft = observer(({selectedPatient, setHiddenCopy, hiddenCopy, allPrescriptions}) => {
    const navigate = useNavigate()

    const [checkerCloseShowMore, setCheckerCloseShowMore] = useState(false)

    const getCurrentPrescription = async (id) => {

        navigate('/patients/create-prescription', {state: {id: id, navigateBack: '/patients'}})
    }

    const items = (id) => [
        {
            label: <div onClick={async (e) => {
                setHiddenCopy(true)
                await getCurrentPrescription(id)
                e.preventDefault()
                e.stopPropagation()
            }} className={s.drop_item}>
                <Copy/>
                <p>Copy prescription</p>
            </div>,
            key: '0',
        },
    ];

    const genExtra = (id) => (
        !hiddenCopy && <Dropdown

            menu={{
                items: items(id)
            }}
            trigger={['click']}
            placement="bottomRight"
        >
            <div className={s.dots} onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
        </Dropdown>
    );

    return (
        <div className={s.content_accordion}>
            {allPrescriptions.length !== 0 ? <>
                {allPrescriptions.map((el, i) => {
                    const MF = calculateMF(el.take_times_per_day, el.take_grams, el.take_days, el.formula_weight)

                    return <div key={el.prescription_id}>
                        <div className={s.collaps_item}>
                            <Collapse expandIconPosition={'end'}>
                                <Collapse.Panel header={
                                    <div onClick={() => setCheckerCloseShowMore(!checkerCloseShowMore)}>
                                        <p className={s.collapse_name}>{el.formula_name}</p>
                                        <p className={s.collapse_date}>{el.date}</p>
                                    </div>
                                } key="1"
                                                extra={genExtra(el.prescription_id)}>
                                    {/*<p className={s.collapse_description}>{el.notes}</p>*/}
                                    {/*<p className={s.collapse_description}>{el.notes}</p>*/}

                                    <div className={s.collapse_item} style={{
                                        marginTop: 0
                                    }}>
                                        <p className={classNames(s.collapse_title, s.collapse_title_status)}>Status:</p>
                                        <p className={classNames(s.collapse_answer, s.collapse_answer_status)}>{el.status}</p>
                                    </div>

                                    <div className={s.collapse_item}>
                                        <p className={s.collapse_title}>Expert practitioner fee:</p>
                                        <p className={s.collapse_answer}>{`$${(+el?.prescription_price - +el?.herbs_cost - +el?.fulfillment_fee - +el?.delivery_cost).toFixed(2)
                                        }`}</p>
                                    </div>

                                    <div className={s.collapse_item}>
                                        <p className={s.collapse_title}>Total price:</p>
                                        <p className={s.collapse_answer}>{`$${el.prescription_price}`}</p>
                                    </div>

                                    <br/>
                                    <div style={{
                                        height: '1px',
                                        backgroundColor: 'rgba(39,41,51,0.2)',
                                        width: '100%'
                                    }}/>
                                    <br/>

                                    <div className={s.collapse_item} style={{
                                        marginTop: 0
                                    }}>
                                        <p className={s.collapse_title}>Take days:</p>
                                        <p className={s.collapse_answer}>{el.take_days}</p>
                                    </div>

                                    <div className={s.collapse_item}>
                                        <p className={s.collapse_title}>Take times per day:</p>
                                        <p className={s.collapse_answer}>{el.take_times_per_day}</p>
                                    </div>

                                    <div className={s.collapse_item}>
                                        <p className={s.collapse_title}>Take grams:</p>
                                        <p className={s.collapse_answer}>{`${el.take_grams} g`}</p>
                                    </div>

                                    <div className={s.collapse_item}>
                                        <p className={s.collapse_title}>Total grams:</p>
                                        <p className={s.collapse_answer}>{`${el.total_grams} g`}</p>
                                    </div>

                                    <div className={classNames(s.collapse_item, s.collapse_item_notes)}>
                                        <p className={s.collapse_title}>Note:</p>
                                        <p className={classNames(s.collapse_answer, s.collapse_answer_notes)}>
                                            {el.notes}

                                        </p>
                                    </div>

                                    {/*<div className={s.collapse_item}>*/}
                                    {/*    <p className={s.collapse_title}>Duration:</p>*/}
                                    {/*    <p className={s.collapse_answer}>{`${el.take_days} days, ${el.take_times_per_day} times a day`}</p>*/}
                                    {/*</div>*/}

                                    {/*<div className={s.collapse_item}>*/}
                                    {/*    <p className={s.collapse_title}>Dosage:</p>*/}
                                    {/*    <p className={s.collapse_answer}>{`${el.take_grams} gr.each (${el.total_grams} gr. in total)`}</p>*/}
                                    {/*</div>*/}

                                    {/*<div className={s.collapse_item}>*/}
                                    {/*    <p className={s.collapse_title}>Total price:</p>*/}
                                    {/*    /!*<p className={s.collapse_answer}>{`$${calculateTotalPrice(MF, el.formula_weight, el.formula_cost, el.markup, el.fulfillment_fee)}`}</p>*!/*/}
                                    {/*    <p className={s.collapse_answer}>{el?.prescription_price}</p>*/}
                                    {/*</div>*/}

                                    {/*<div className={s.collapse_item}>*/}
                                    {/*    <p className={s.collapse_title}>Payment:</p>*/}
                                    {/*    <p className={s.collapse_answer}>{el.payment_method}</p>*/}
                                    {/*</div>*/}

                                    {/*<div className={s.collapse_item}>*/}
                                    {/*    <p className={s.collapse_title}>Delivery:</p>*/}
                                    {/*    <p className={s.collapse_answer}>{el.delivery_method}</p>*/}
                                    {/*</div>*/}
                                    <CollapseItem checkerCloseShowMore={checkerCloseShowMore} el={el}
                                                  selectedPatient={selectedPatient}/>
                                    <div className={s.collapse_formula}>
                                        <p className={s.collapse_formula_title}>Composition of the formula</p>

                                        <div className={s.formula_items}>
                                            {el.formula.components.map((el) => {
                                                return <div key={el.component_id} className={s.formula_item}>
                                                    <p>
                                                        <span>{`x${el.parts}`}</span>{`${el.herb_name}`}
                                                    </p>
                                                </div>
                                            })}
                                        </div>
                                    </div>

                                </Collapse.Panel>
                            </Collapse>
                        </div>


                    </div>
                })}
            </> : <h2 className={s.empty}>No prescriptions</h2>}
        </div>
    );
});

export default PatientLeft;

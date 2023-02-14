import React, {useState} from 'react';
import s from '../../patient_left/styles.module.css'
import {Collapse, Dropdown} from "antd";
import {ReactComponent as Copy} from "../../../../../assets/copy.svg";
import {observer} from "mobx-react-lite";
import {calculateMF, calculateTotalPrice} from "../../../../../utils/coastPrescription";
import {useNavigate} from "react-router-dom";
import {ReactComponent as Arrow} from '../../../../../assets/arrow.svg'
import classNames from "classnames";

const PatientLeft = observer(({setHiddenCopy, hiddenCopy, allPrescriptions}) => {
    const navigate = useNavigate()

    const [openMenu, setOpenMenu] = useState(false)

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
                                    <div onClick={() => setOpenMenu(false)}>
                                        <p className={s.collapse_name}>{el.formula_name}</p>
                                        <p className={s.collapse_date}>{el.date}</p>
                                    </div>
                                } key="1"
                                                extra={genExtra(el.prescription_id)}>
                                    <p className={s.collapse_description}>{el.notes}</p>

                                    <div className={s.collapse_item}>
                                        <p className={s.collapse_title}>Duration:</p>
                                        <p className={s.collapse_answer}>{`${el.take_days} days, ${el.take_times_per_day} times a day`}</p>
                                    </div>

                                    <div className={s.collapse_item}>
                                        <p className={s.collapse_title}>Dosage:</p>
                                        <p className={s.collapse_answer}>{`${el.take_grams} gr.each (${el.total_grams} gr. in total)`}</p>
                                    </div>

                                    <div className={s.collapse_item}>
                                        <p className={s.collapse_title}>Total price:</p>
                                        {/*<p className={s.collapse_answer}>{`$${calculateTotalPrice(MF, el.formula_weight, el.formula_cost, el.markup, el.fulfillment_fee)}`}</p>*/}
                                        <p className={s.collapse_answer}>{el?.prescription_price}</p>
                                    </div>

                                    <div className={s.collapse_item}>
                                        <p className={s.collapse_title}>Payment:</p>
                                        <p className={s.collapse_answer}>{el.payment_method}</p>
                                    </div>

                                    <div className={s.collapse_item}>
                                        <p className={s.collapse_title}>Delivery:</p>
                                        <p className={s.collapse_answer}>{el.delivery_method}</p>
                                    </div>

                                    <div>
                                        <p className={classNames(s.click, openMenu && s.rotate)}
                                           onClick={() => setOpenMenu(!openMenu)}>
                                            <Arrow/>
                                            More details
                                        </p>
                                        <div style={{
                                            height: openMenu ? 'fit-content' : 0,
                                            overflow: 'hidden'
                                        }}>
                                            <ul>
                                                <li>1</li>
                                                <li>1</li>
                                                <li>1</li>
                                                <li>1</li>
                                                <li>1</li>
                                                <li>1</li>
                                                <li>1</li>
                                                <li>1</li>
                                                <li>1</li>
                                                <li>1</li>
                                            </ul>
                                        </div>
                                    </div>

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

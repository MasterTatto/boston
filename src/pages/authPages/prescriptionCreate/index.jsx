import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useStore} from "../../../useStore";
import {useLocation, useNavigate} from "react-router-dom";
import {calculateHerbCoast, calculateMF, calculateTotalPrice} from "../../../utils/coastPrescription";
import {toast} from "react-toastify";
import s from "./styles.module.css";
import {Button, Input, InputNumber, Select} from "antd";
import AddedTextPlus from "../../../common/addedTextPlus";
import classNames from "classnames";
import {ReactComponent as Plus} from "../../../assets/plus.svg";
import {ReactComponent as Minus} from "../../../assets/minus.svg";
import AddedFormula from "../../../components/adddFormula";

const AddedPrescriptionPatient = observer(() => {
    const store = useStore()
    const navigate = useNavigate()
    const {state} = useLocation()

    const getCurrentFormula = async (id) => {
        await store.patients.getCurrentFormula(id)
    }
    const [openModal, setOpenModal] = useState(false)
    const [allFormula, setAllFormula] = useState([])
    const [values, setValues] = useState({
        formula_id: '',
        take_days: 0,
        take_grams: 0,
        take_times_per_day: 0,
        payment_method: '',
        delivery_method: '',
        notes: '',
        markup: 1,
        total_grams: 0,
        patient_id: store.patients.patient.patient_id,
    })

    const MF = calculateMF(values.take_times_per_day, values.take_grams, values.take_days, store.patients.formula?.formula_weight)
    const totalPrice = calculateTotalPrice(MF, store.patients.formula?.formula_weight, store.patients.formula?.formula_cost, values.markup, localStorage.getItem('fulfillment_fee') || 1)
    const herbsCoast = calculateHerbCoast(MF, store.patients.formula?.formula_cost)
    console.log(localStorage.getItem('fulfillment_fee'))
    const choseTypeModal = (type, open) => {
        setOpenModal(open)
    }

    const addedPrescriptoin = async () => {
        await store.patients.addedPrescriptionToPatient({
            ...values,
            take_days: (+values.take_days).toFixed(0),
            take_times_per_day: (+values.take_times_per_day).toFixed(0),

        }, () => navigate(state.navigateBack))
    }

    useEffect(() => {
        const getAllFormula = async () => {
            await store.patients.getAllFormula()
            setAllFormula(store.patients.allFormula)
            if (state?.formula_id) {
                await getCurrentFormula(state.formula_id)
                setValues({
                    ...values, formula_id: state.formula_id
                })

            }
        }

        getAllFormula()

        return () => {
            store.patients.setCurrentFormula({})
            store.patients.setCurrentPrescription(null)
        }

    }, [])

    useEffect(() => {
        setValues({
            ...values,
            total_grams: +(values.take_days * (values.take_times_per_day * values.take_grams)).toFixed(1),
        })
    }, [values.take_days, values.take_times_per_day, values.take_grams])
    console.log(store.auth.user)
    useEffect(() => {
        if (state?.id) {
            const getCurrentPrescription = async () => {
                await store.patients.getCurrentPrescription(state.id)
                await store.patients.getCurrentFormula(store.patients.currentPrescription?.formula_id)

                setValues({
                    formula_id: store.patients.currentPrescription?.formula_id,
                    take_days: store.patients.currentPrescription?.take_days,
                    take_grams: store.patients.currentPrescription?.take_grams,
                    take_times_per_day: store.patients.currentPrescription?.take_times_per_day,
                    payment_method: store.patients.currentPrescription?.payment_method,
                    delivery_method: store.patients.currentPrescription?.delivery_method,
                    notes: store.patients.currentPrescription?.notes,
                    markup: store.patients.currentPrescription?.markup,
                    total_grams: store.patients.currentPrescription?.total_grams,
                    patient_id: store.patients.patient?.patient_id,
                })

            }

            getCurrentPrescription()

        }
    }, [])

    useEffect(() => {
        if (store.patients.formula?.allergens) {
            const formulaPatient = store.patients.patient.allergens
            const formulaAllergens = store.patients.formula?.allergens.split(', ')
            for (let i = 0; i < formulaPatient.length; i++) {
                if (formulaAllergens.includes(formulaPatient[i])) {
                    console.log(formulaPatient[i])
                    toast.error(`Patient is allergic to ${formulaPatient[i]} `, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        }

    }, [store.patients.formula.allergens])

    return (
        <div className={s.main}>
            {openModal &&
                <AddedFormula setData={setAllFormula} setOpenModal={choseTypeModal} openModal={openModal}/>}
            {store.patients.prescriptionLoading ? <p>Loading...</p> : <div className={s.action_box}>
                <p className={s.title}>Prescriptions creating</p>

                <div className={s.patient_formula_box}>
                    <div className={s.input_box}>
                        <label className={s.label}>Patient</label>
                        <Input disabled={true} value={store.patients.patient.patient_name}/>
                    </div>
                </div>

                <div className={s.patient_formula_box}>
                    <label className={s.label}>Formula</label>
                    <Select
                        placeholder={''}
                        value={values.formula_id}
                        style={{width: '100%'}}
                        onChange={(e) => {
                            // getCurrentFormula(e)
                            getCurrentFormula(e)
                            setValues({...values, formula_id: e})
                        }}
                        options={allFormula.map((el) => ({
                            value: el.formula_id,
                            label: el.formula_name,
                        }))}
                    />

                    <p className={s.alergen_formula}>{store.patients.formula?.allergens ? <>This formula have
                        allergens: <span
                            className={s.alergen_formula_items}>{store.patients.formula?.allergens}</span></> : ''}</p>
                </div>

                <div className={s.create_new}>
                    <AddedTextPlus title={'Create new formula'} onClick={() => setOpenModal(true)}/>
                </div>

                <div className={s.calculate_herbs}>
                    <div className={s.calculate_herbs_left}>
                        <div className={s.input_box_number}>
                            <label className={s.label}>Take days</label>
                            <div className={s.input_number}>

                                <InputNumber pattern="\d*" min="0" step={1} value={values.take_days}
                                             onChange={(e) => setValues({...values, take_days: e})}

                                             addonAfter={<div className={classNames(s.controls, s.after)}
                                                              onClick={() => setValues({
                                                                  ...values,
                                                                  take_days: (+values.take_days + 1)?.toFixed(1)
                                                              })}>
                                                 <Plus/>
                                             </div>}

                                             addonBefore={<div className={classNames(s.controls, s.before)}
                                                               onClick={() => {
                                                                   if (values.take_days == 0) return
                                                                   setValues({
                                                                       ...values,
                                                                       take_days: (+values.take_days - 1)?.toFixed(1)
                                                                   })
                                                               }}>
                                                 <Minus/>
                                             </div>}
                                />
                            </div>
                        </div>

                        <div className={classNames(s.input_box_number, s.input_box_number_2)}>
                            <label className={s.label}>Take times per day</label>
                            <div className={s.input_number}>

                                <InputNumber pattern="\d*" min="0" step={1} value={values.take_times_per_day}
                                             onChange={(e) => setValues({...values, take_times_per_day: e})}

                                             addonAfter={<div className={classNames(s.controls, s.after)}
                                                              onClick={() => setValues({
                                                                  ...values,
                                                                  take_times_per_day: (+values.take_times_per_day + 1)?.toFixed(1)
                                                              })}>
                                                 <Plus/>
                                             </div>}

                                             addonBefore={<div className={classNames(s.controls, s.before)}
                                                               onClick={() => {
                                                                   if (values.take_times_per_day == 0) return
                                                                   setValues({
                                                                       ...values,
                                                                       take_times_per_day: (+values.take_times_per_day - 1)?.toFixed(1)
                                                                   })
                                                               }}>
                                                 <Minus/>
                                             </div>}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={s.take_gram_box}>
                        <div className={classNames(s.input_box_number)}>
                            <label className={s.label}>Take grams</label>
                            <div className={s.input_number}>

                                <InputNumber pattern="\d*" min="0" step={0.1} value={values.take_grams}
                                             onChange={(e) => setValues({...values, take_grams: e})}

                                             addonAfter={<div className={classNames(s.controls, s.after)}
                                                              onClick={() => setValues({
                                                                  ...values,
                                                                  take_grams: (+values.take_grams + 0.1)?.toFixed(1)
                                                              })}>
                                                 <Plus/>
                                             </div>}

                                             addonBefore={<div className={classNames(s.controls, s.before)}
                                                               onClick={() => {
                                                                   if (values.take_grams == 0) return
                                                                   setValues({
                                                                       ...values,
                                                                       take_grams: (+values.take_grams - 0.1)?.toFixed(1)
                                                                   })
                                                               }}>
                                                 <Minus/>
                                             </div>}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={s.total_gramms}>
                    <p className={s.total_gramm_title}>Total grams:</p>
                    <p className={s.total_gramms_answer}>{values.total_grams}</p>
                </div>

                <div className={s.markup}>
                    <div className={classNames(s.input_box_number)}>
                        <label className={s.label}>Markup</label>
                        <div className={s.input_number}>
                            <InputNumber pattern="\d*" min="1" step={1} value={`x${values.markup}`}
                                         onChange={(e) => setValues({...values, markup: e})}

                                         addonAfter={<div className={classNames(s.controls, s.after)}
                                                          onClick={() => setValues({
                                                              ...values,
                                                              markup: (+values.markup + 1)?.toFixed(0)
                                                          })}>
                                             <Plus/>
                                         </div>}

                                         addonBefore={<div className={classNames(s.controls, s.before)}
                                                           onClick={() => {
                                                               if (values.markup == 1) return
                                                               setValues({
                                                                   ...values,
                                                                   markup: (+values.markup - 1)?.toFixed(0)
                                                               })
                                                           }}>
                                             <Minus/>
                                         </div>}
                            />
                        </div>
                    </div>
                    <>
                        <div className={s.markup_item}>
                            <p className={s.markup_item_title}>Herbs cost:</p>
                            <p className={s.markup_item_answer}>{herbsCoast}</p>
                        </div>

                        <div className={s.markup_item}>
                            <p className={s.markup_item_title}>Fulfillment fee:</p>
                            <p className={s.markup_item_answer}>{localStorage.getItem('fulfillment_fee') || 1}</p>
                        </div>

                        <div className={s.markup_item}>
                            <p className={s.markup_item_title}>Total price:</p>
                            <p className={s.markup_item_answer}>{totalPrice}</p>
                        </div>
                    </>
                </div>

                <div className={s.notes_box}>
                    <div className={classNames(s.text_area)}>
                        <label className={s.label}>Prescription notes</label>
                        <Input.TextArea placeholder={'Note'}
                                        onChange={(e) => setValues({...values, notes: e.target.value})}
                                        value={values.notes}/>
                    </div>

                    <div className={s.payment_box}>
                        <div className={s.notes_box_select}>
                            <label className={s.label}>Payment method</label>
                            <Select
                                value={values.payment_method}
                                placeholder={''}
                                style={{width: '100%'}}
                                onChange={(e) => {
                                    setValues({...values, payment_method: e})
                                }}
                                options={[
                                    {
                                        value: 'local',
                                        label: 'local',
                                    },
                                    {
                                        value: 'stripe',
                                        label: 'stripe',
                                    },
                                ]}
                            />
                        </div>
                        <div className={s.notes_box_select}>
                            <label className={s.label}>Delivery method</label>
                            <Select
                                value={values.delivery_method}
                                placeholder={''}
                                style={{width: '100%'}}
                                onChange={(e) => {
                                    setValues({...values, delivery_method: e})
                                }}
                                options={[
                                    {
                                        value: 'local pickup',
                                        label: 'local pickup',
                                    },
                                    {
                                        value: 'USPS',
                                        label: 'USPS',
                                    },
                                ]}
                            />
                        </div>

                    </div>
                </div>
            </div>}

            <div className={s.btn_box}>
                <Button
                    onClick={addedPrescriptoin}
                    loading={store.patients.buttonLoading}
                    className={classNames(s.btn, s.add)}
                >Add prescription</Button>
                <Button
                    // loading={store.patients.buttonLoading}
                    onClick={() => navigate(state.navigateBack)}
                    className={classNames(s.btn, s.cancel)}
                >Cancel</Button>
            </div>
        </div>
    );
});

export default AddedPrescriptionPatient;

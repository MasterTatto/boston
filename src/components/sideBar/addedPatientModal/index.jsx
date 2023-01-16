import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Input, Modal} from "antd";
import s from './styles.module.css'
import classNames from "classnames";
import {useStore} from "../../../useStore";
import {observer} from "mobx-react-lite";
import Loader from "../../Loader";
import Chip from "../../../common/chip";

const AddedPatientsModal = observer(({openAddedModal, setOpenAddedModal, handleOk}) => {
    const store = useStore()

    const [othersValue, setOtherValue] = useState('')
    const [values, setValues] = useState({
        patient_name: '',
        notes: '',
        phone_number: '',
        email: '',
        allergens: []
    })

    const deleteOtherItem = (value) => {
        setValues({...values, allergens: values.allergens.filter(f => f !== value)})
    }

    useEffect(() => {
        if (openAddedModal === 'edit' && !store.patients.isModalLoading) {
            setValues({
                patient_name: store.patients.patient?.patient_name,
                notes: store.patients.patient?.notes,
                phone_number: store.patients.patient?.phone_number,
                email: store.patients.patient?.email,
                allergens: store.patients.patient?.allergens,
            })
        }
    }, [store.patients.isModalLoading])

    return (
        <div>
            <Modal
                title=""
                centered
                width={315}
                footer={<div className={s.btn_box}>
                    <Button onClick={() => setOpenAddedModal(null)} className={classNames(s.btn, s.cancel)}
                    >Cancel</Button>
                    <Button loading={store.patients.buttonLoading}
                            onClick={() => handleOk(values)}
                            className={classNames(s.btn, s.add)}
                    >{openAddedModal === 'add' ? 'Add' : 'Save'}</Button>
                </div>}
                open={openAddedModal === 'add' || openAddedModal === 'edit'}
                onCancel={() => setOpenAddedModal(null)}
            >
                <div>
                    <p className={s.title}>{openAddedModal === 'add' ? 'New patient' : 'Edit patient'}</p>

                    {store.patients.isModalLoading ? <Loader/> :
                        <div className={s.action_box}>
                            <div className={s.input_box}>
                                <label className={s.label}>Name</label>
                                <Input onChange={(e) => setValues({...values, patient_name: e.target.value})}
                                       value={values.patient_name}/>
                            </div>

                            <div className={s.input_box}>
                                <label className={s.label}>Phone</label>
                                <Input onChange={(e) => setValues({...values, phone_number: e.target.value})}
                                       value={values.phone_number}/>
                            </div>

                            <div className={s.input_box}>
                                <label className={s.label}>Email</label>
                                <Input onChange={(e) => setValues({...values, email: e.target.value})}
                                       value={values.email}/>
                            </div>

                            <div className={classNames(s.input_box, s.text_area)}>
                                <label className={s.label}>Note</label>
                                <Input.TextArea onChange={(e) => setValues({...values, notes: e.target.value})}
                                                value={values.notes}/>
                            </div>

                            <div className={s.alergen}>
                                <label className={s.label}>Allergen</label>

                                <div className={s.checkbox_box}>

                                    <div className={s.alergen_item}>
                                        <Checkbox
                                            checked={values.allergens.includes('Nuts')}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setValues({
                                                        ...values,
                                                        allergens: [...values.allergens, 'Nuts']
                                                    })
                                                } else {
                                                    setValues({
                                                        ...values,
                                                        allergens: values.allergens.filter(f => f !== 'Nuts')
                                                    })
                                                }
                                            }}>Nuts:</Checkbox>
                                    </div>

                                    <div className={s.alergen_item}>
                                        <Checkbox
                                            checked={values.allergens.includes('Gluten')}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setValues({
                                                        ...values,
                                                        allergens: [...values.allergens, 'Gluten']
                                                    })
                                                } else {
                                                    setValues({
                                                        ...values,
                                                        allergens: values.allergens.filter(f => f !== 'Gluten')
                                                    })
                                                }
                                            }}>Gluten:</Checkbox>
                                    </div>

                                    <div className={s.alergen_item}>
                                        <Checkbox
                                            defaultChecked={true}
                                            checked={values.allergens.includes('Shellfish')}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setValues({
                                                        ...values,
                                                        allergens: [...values.allergens, 'Shellfish']
                                                    })
                                                } else {
                                                    setValues({
                                                        ...values,
                                                        allergens: values.allergens.filter(f => f !== 'Shellfish')
                                                    })
                                                }
                                            }}
                                        >Shellfish:</Checkbox>
                                    </div>
                                </div>

                                <div className={classNames(s.alergen_item, s.alergen_item_input)}>
                                    <label htmlFor="">other:</label>
                                    <Input onKeyPress={(e) => {
                                        if (e.code === 'Enter') {
                                            // setValues([...otherData, othersValue])
                                            setValues({...values, allergens: [...values.allergens, othersValue]})
                                            setOtherValue('')
                                        }
                                    }} onChange={(e) => setOtherValue(e.target.value)}
                                           value={othersValue}/>

                                    <Button className={s.accept_other} onClick={() => {
                                        setValues({...values, allergens: [...values.allergens, othersValue]})
                                        setOtherValue('')
                                    }
                                    }>
                                        ok
                                    </Button>
                                </div>

                                <div className={s.chip_box}>
                                    {values.allergens?.map((el, i) => <Chip onClick={deleteOtherItem} title={el}
                                                                            key={i}/>)}
                                </div>
                            </div>
                        </div>}

                </div>
            </Modal>
        </div>
    );
});

export default AddedPatientsModal;

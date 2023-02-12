import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {Button, Input, InputNumber, Modal, Select} from "antd";
import classNames from "classnames";
import {observer} from "mobx-react-lite";
import {useStore} from "../../useStore";
import {ReactComponent as Plus} from "../../assets/plus.svg";
import {ReactComponent as Minus} from "../../assets/minus.svg";
import {ReactComponent as Delete} from "../../assets/trash.svg";
import AddedTextPlus from "../../common/addedTextPlus";

const AddedFormula = observer(({openModal, setOpenModal, type, setData}) => {
    const store = useStore()

    const [allHerbs, setAllHerbs] = useState([])
    const [chooseHerbs, setChooseHerbs] = useState([])
    const [part, setPart] = useState(1)
    const [herb, setHerb] = useState({})
    const [values, setValues] = useState({
        formula_name: '',
        notes: '',
        components: []
    })
    const [errors, setErrors] = useState({
        formula_name: '',
        components: ''
    })

    const addedFormula = async () => {
        await store.formula.addedFormula({
            ...values,
            components: chooseHerbs.map(el => ({herb_code: el.herb_code, parts: +el.parts}))
        }, setOpenModal)
        await store.formula.getAllFormulas()
        setData(store.formula.formulas)
    }

    const updateFormula = async () => {
        await store.formula.updateFormula({
            formula_name: values.formula_name,
            notes: values.notes,
        }, store.formula.currentFormula.formula_id, setOpenModal)
        await store.formula.getAllFormulas()
        setData(store.formula.formulas)
    }


    useEffect(() => {
        if (type === 'edit' || type === 'copy') {
            setValues({
                ...values,
                formula_name: store.formula.currentFormula.formula_name,
                notes: store.formula.currentFormula.notes,
            })
            setChooseHerbs([...store.formula.currentFormula.components])
        }
    }, [type])

    useEffect(() => {
        const getAllHerbs = async () => {
            await store.herbs.getAllHerbs()
            setAllHerbs(store.herbs.allHerbs)
        }
        getAllHerbs()
    }, [])
    console.log(herb?.herb_name)
    return (
        <Modal
            title=""
            centered
            width={757}
            footer={<div className={s.btn_box}>
                <Button onClick={() => setOpenModal(null, false)}
                        className={classNames(s.btn, s.cancel)}>Cancel</Button>
                <Button onClick={async () => {
                    if (type === 'edit') {
                        await updateFormula()
                    } else {
                        if (chooseHerbs.length === 0 || values.formula_name.length === 0) {
                            setErrors({
                                ...errors,
                                components: chooseHerbs.length === 0 ? 'error' : '',
                                formula_name: values.formula_name.length === 0 ? 'error' : ''
                            })
                        } else {
                            await addedFormula()
                        }

                    }
                }
                }
                        loading={store.formula.buttonLoading}
                        className={classNames(s.btn, s.add)}>{type === 'copy' ? 'Save' : 'Add'}</Button>
            </div>}
            open={openModal}
            onCancel={() => setOpenModal(null, false)}
        >
            <p className={s.title}>{type === 'edit' ? 'Edit formula' : 'New formula'}</p>

            <div className={s.content}>
                <div className={s.left_content} style={{
                    maxWidth: type === 'edit' && '100%'
                }}>
                    <div className={s.input_box}>
                        <label className={s.label}>Formula name</label>
                        <Input status={errors.formula_name} onFocus={() => {
                            setErrors({...errors, formula_name: ''})
                        }} onBlur={() => {
                            if (values.formula_name.length >= 1) {
                                setErrors({...errors, formula_name: ''})
                            } else {
                                setErrors({...errors, formula_name: 'error'})
                            }
                        }} onChange={(e) => setValues({...values, formula_name: e.target.value})}
                               value={values.formula_name}/>
                        {errors.formula_name === 'error' && <span className={s.error_mes}>Required field</span>}
                    </div>
                    <div className={classNames(s.text_area)}>
                        <label className={s.label}>Note</label>
                        <Input.TextArea placeholder={'Note'}
                                        onChange={(e) => setValues({...values, notes: e.target.value})}
                                        value={values.notes}/>
                    </div>
                </div>
                <div className={s.right_content} style={{
                    display: type === 'edit' ? 'none' : 'block'
                }}>
                    <div className={s.herb_chose}>
                        <div className={s.patient_formula_box}>
                            <label className={s.label}>Herb</label>
                            <Select
                                status={errors.components}
                                placeholder={''}
                                onFocus={() => {
                                    setErrors({...errors, components: ''})
                                }}
                                value={herb?.formula_id}
                                style={{width: '100%'}}
                                onChange={(e) => {
                                    // getCurrentFormula(e)
                                    // getCurrentFormula(e)
                                    setHerb(allHerbs?.find(f => f.herb_code === e))
                                }}
                                options={allHerbs.map((el) => ({
                                    value: el.herb_code,
                                    label: el.herb_name,
                                }))}
                            />
                            {errors.components === 'error' && <span className={s.error_mes}>Required field</span>}
                        </div>

                        <div className={s.input_box_number}>
                            <label className={s.label}>Part</label>
                            <div className={s.input_number}>

                                <InputNumber pattern="\d*" min="0" step={.1} value={part}
                                             onChange={(e) => setPart(e)}

                                             addonAfter={<div className={classNames(s.controls, s.after)}
                                                              onClick={() => setPart((+part + 0.1)?.toFixed(1))}>
                                                 <Plus/>
                                             </div>}

                                             addonBefore={<div className={classNames(s.controls, s.before)}
                                                               onClick={() => {
                                                                   if (part == 0) return
                                                                   setPart((+part - 0.1)?.toFixed(1))
                                                               }}>
                                                 <Minus/>
                                             </div>}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={s.added_herb}>
                        {herb?.herb_name ? <AddedTextPlus title={'Add herb'}
                                                           onClick={() => {
                                                               if (chooseHerbs?.find(f => f.herb_code === herb.herb_code) || !herb.herb_code) {
                                                                   return
                                                               }
                                                               setChooseHerbs([{...herb, parts: part}, ...chooseHerbs])
                                                               setPart(1)
                                                           }}/> : null}
                    </div>

                    <div className={s.table}>
                        <div className={s.table_header}>
                            <p className={s.code}>Code</p>
                            <p className={s.name}>Name</p>
                            <p className={s.parts}>Parts</p>
                        </div>

                        <div className={s.items_box}>

                            {chooseHerbs?.map((el, i) => {
                                return <div className={s.item} key={`${el.herb_code} ${i}`}>
                                    <p className={s.code}>{el.herb_code}</p>
                                    <p className={s.name}>{el.herb_name}</p>
                                    <p className={s.parts}>{el.parts} <Delete
                                        onClick={() => setChooseHerbs(chooseHerbs.filter(f => f.herb_code !== el.herb_code))}/>
                                    </p>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </Modal>
    );
});

export default AddedFormula;

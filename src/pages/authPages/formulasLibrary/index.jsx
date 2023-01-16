import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import AddedTextPlus from "../../../common/addedTextPlus";
import {Input, Switch} from "antd";
import FormulaLeft from "./formulaLeft";
import FormulaRight from "./formulaRight";
import {useStore} from "../../../useStore";
import {observer} from "mobx-react-lite";
import AddedFormula from "../../../components/adddFormula";
import RemoveFormula from "./removeFormula";

const FormulasLibrary = observer(() => {
    const store = useStore()

    const [removeModal, setRemoveModal] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [typeModal, setTypeModal] = useState(null)
    const [data, setData] = useState([])
    const [selectedFormula, setSelectedFormula] = useState('')
    const [classic, setClassic] = useState(false)

    const choseTypeModal = (type, isOpen) => {
        setTypeModal(type)
        setOpenModal(isOpen)
    }

    const removeFormula = async () => {
        await store.formula.removeFormula(store.formula.currentFormula.formula_id)
        await store.formula.getAllFormulas()
        setData(store.formula.formulas)
        setRemoveModal(false)
    }

    useEffect(() => {
        const classicData = data.filter((f) => f.is_classic)
        const noClassicData = store.formula.formulas
        setData(classic ? classicData : noClassicData)
    }, [classic])

    useEffect(() => {
        const getAllFormulas = async () => {
            await store.formula.getAllFormulas()
            setData(store.formula.formulas)

            if (store.formula.formulas.length !== 0) {
                setSelectedFormula(store.formula.formulas[0].formula_id)
                await store.formula.getCurrentFormula(store.formula.formulas[0].formula_id)
            }
        }
        getAllFormulas()
    }, [])

    return (
        <div className={s.formula}>
            {openModal &&
                <AddedFormula type={typeModal} setData={setData} setOpenModal={choseTypeModal} openModal={openModal}/>}
            {removeModal &&
                <RemoveFormula removeFormula={removeFormula} setOpenModal={setRemoveModal} openModal={removeModal}/>}
            <div className={s.content_box}>
                <div className={s.header}>
                    <div className={s.header_top}>
                        <p className={s.header_title}>Formulas</p>
                        <AddedTextPlus title={'Add formula'}
                                       onClick={() => setOpenModal(true)}/>
                    </div>
                    <div className={s.header_bottom}>
                        <div className={s.input_box}>
                            <Input.Search onSearch={() => {
                            }} placeholder="Find formula"/>
                        </div>
                        <div className={s.switch_box}>
                            <Switch value={classic} onChange={setClassic}/>
                            <span className={s.switch_box_title}>Classic formulas</span>
                        </div>
                    </div>
                </div>

                <FormulaLeft setRemoveModal={setRemoveModal} formulas={data} choseTypeModal={choseTypeModal}
                             setSelectedFormula={setSelectedFormula}
                             selectedFormula={selectedFormula}/>
            </div>

            <FormulaRight/>
        </div>
    );
});

export default FormulasLibrary;

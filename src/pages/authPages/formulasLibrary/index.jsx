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
    const [search, setSearch] = useState('')
    const [search2, setSearch2] = useState('')

    const dataFiltered = [...data.filter(item => {
        if (!search2) return true
        if (item?.formula_name?.toLowerCase()?.includes(search2.toLowerCase())) {
            return true
        }
    })];

    const choseTypeModal = (type, isOpen) => {
        setTypeModal(type)
        setOpenModal(isOpen)
    }

    const removeFormula = async () => {
        await store.formula.removeFormula(store.formula.currentFormula.formula_id)
        await store.formula.getAllFormulas()
        const filteredDataByClassic = classic ? store.formula.formulas.filter((f) => f.is_classic) : store.formula.formulas.filter((f) => !f.is_classic)
        setData(filteredDataByClassic)
        setRemoveModal(false)
    }

    console.log(data)

    useEffect(() => {
        const filteredDataByClassic = classic ? store.formula.formulas.filter((f) => f.is_classic) : store.formula.formulas.filter((f) => !f.is_classic)
        setData(filteredDataByClassic)
    }, [classic])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearch2(search)
            // Send Axios request here
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [search])

    useEffect(() => {
        const getAllFormulas = async () => {
            await store.formula.getAllFormulas()
            const filteredDataByClassic = classic ? store.formula.formulas.filter((f) => f.is_classic) : store.formula.formulas.filter((f) => !f.is_classic)
            setData(filteredDataByClassic)

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
                <AddedFormula classic={classic} type={typeModal} setData={setData} setOpenModal={choseTypeModal}
                              openModal={openModal}/>}
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
                            <Input.Search value={search} onChange={(e) => {
                                setSearch(e.target.value)
                            }} onSearch={setSearch} placeholder="Find formula"/>
                        </div>
                        <div className={s.switch_box}>
                            <Switch checked={classic} onChange={setClassic}/>
                            <span
                                className={s.switch_box_title}>Classic formulas</span>
                        </div>
                    </div>
                </div>

                <FormulaLeft setRemoveModal={setRemoveModal} formulas={dataFiltered} choseTypeModal={choseTypeModal}
                             setSelectedFormula={setSelectedFormula}
                             selectedFormula={selectedFormula}/>
            </div>

            <FormulaRight/>
        </div>
    );
});

export default FormulasLibrary;

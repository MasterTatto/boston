import React, {useState} from 'react';
import s from './styles.module.css'
import {useStore} from "../../../../useStore";
import {observer} from "mobx-react-lite";
import {ReactComponent as Edit} from "../../../../assets/edit.svg";
import {ReactComponent as Copy} from "../../../../assets/copy.svg";
import {ReactComponent as Plus} from "../../../../assets/plus_formula.svg";
import classNames from "classnames";
import {ReactComponent as Remove} from "../../../../assets/remove.svg";
import {Collapse, Dropdown} from "antd";
import {useNavigate} from "react-router-dom";
import {useWindowSize} from "../../../../utils/useWindowSize";

const FormulaLeft = observer(({formulas, selectedFormula, setSelectedFormula, choseTypeModal, setRemoveModal}) => {
    const store = useStore()
    const size = useWindowSize();
    const navigate = useNavigate()

    const getCurrentFormula = async (id) => {
        await store.formula.getCurrentFormula(id)
    }

    // collapsible="disabled"
    const items = (id, is_classic) => {
        if (is_classic) {
            return [
                {
                    label: <div className={s.drop_item} onClick={async (e) => {
                        // e.stopPropagation()
                        setSelectedFormula(id)
                        await getCurrentFormula(id)
                        choseTypeModal('edit', true)
                    }}>
                        <Edit/>
                        <p>Edit formula</p>
                    </div>,
                    key: '0',
                },
                {
                    label: <div className={s.drop_item}
                                onClick={() => navigate('/formulas-library/create-prescription', {
                                    state: {
                                        navigateBack: '/formulas-library',
                                        formula_id: id
                                    }
                                })}>
                        <Plus/>
                        <p>Create Prescription</p>
                    </div>,
                    key: '1',
                },
                {
                    label: <div className={s.drop_item} onClick={() => choseTypeModal('copy', true)}>
                        <Copy/>
                        <p>Copy formula</p>
                    </div>,
                    key: '2',
                },
            ]
        } else {
            return [
                {
                    label: <div className={s.drop_item} onClick={async (e) => {
                        // e.stopPropagation()
                        setSelectedFormula(id)
                        await getCurrentFormula(id)
                        choseTypeModal('edit', true)
                    }}>
                        <Edit/>
                        <p>Edit formula</p>
                    </div>,
                    key: '0',
                },
                {
                    label: <div className={s.drop_item}
                                onClick={() => navigate('/formulas-library/create-prescription', {
                                    state: {
                                        navigateBack: '/formulas-library',
                                        formula_id: id
                                    }
                                })}>
                        <Plus/>
                        <p>Create Prescription</p>
                    </div>,
                    key: '1',
                },
                {
                    label: <div className={s.drop_item} onClick={() => choseTypeModal('copy', true)}>
                        <Copy/>
                        <p>Copy formula</p>
                    </div>,
                    key: '2',
                },
                {
                    label: <div className={classNames(s.drop_item, s.drop_item_remove)}
                                onClick={() => setRemoveModal(true)}>
                        <Remove/>
                        <p>Delete formula</p>
                    </div>,
                    key: '3',
                },
            ]
        }
    };

    const genExtra = (id, is_classic) => (
            <Dropdown
                menu={{
                    items: items(id, is_classic)
                }}
                trigger={['click']}
                placement="bottomRight"
            >
                <div className={s.dots} onClick={(e) => {
                    console.log('click')
                    e.stopPropagation()
                    e.preventDefault()
                }}>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </Dropdown>

        )
    ;

    return (
        <div className={s.formula_left}>
            {formulas.map((el) => {
                console.log(el)
                return <div
                    className={classNames(s.formula, selectedFormula === el.formula_id && s.selected)}
                    key={el.formula_id} onClick={async (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedFormula(el.formula_id)
                    await getCurrentFormula(el.formula_id)
                }}>
                    <Collapse
                        collapsible={(size.width > 1000 && "disabled")}
                        expandIconPosition={'end'}>

                        <Collapse.Panel accordion={false} header={
                            <div style={{
                                position: 'relative',
                                height:'50px',
                                alignItems:'flex-start',
                                justifyContent:"center",
                                display:'flex',
                                flexDirection:'column'
                            }}>
                                <p className={s.formula_name}>{el.formula_name}</p>
                                <p className={s.formula_note}>{el.notes}</p>
                                <div className={s.extra} onClick={(e) => e.stopPropagation()}>
                                    {genExtra(el.formula_id, el.is_classic)}
                                </div>
                            </div>
                        } key="1"
                            // extra={genExtra(el.formula_id, el.is_classic)}
                        >

                            <div className={s.test}>
                                <p className={s.title_components}>Composition of the formula</p>

                                {store.formula.currentFormula?.components?.map((el, i) => {
                                    return <div className={s.component} key={el.component_id}>
                                        <p className={s.component_part}>x{el.parts}</p>
                                        <p className={s.component_name}>{el.herb_name}</p>
                                    </div>
                                })}
                            </div>
                        </Collapse.Panel>
                    </Collapse>
                </div>

            })}

        </div>
    );
});

export default FormulaLeft;

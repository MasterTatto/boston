import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {useStore} from "../../../../useStore";
import {observer} from "mobx-react-lite";
import {ReactComponent as Edit} from "../../../../assets/edit.svg";
import {ReactComponent as Copy} from "../../../../assets/copy.svg";
import {ReactComponent as Plus} from "../../../../assets/plus_formula.svg";
import classNames from "classnames";
import {ReactComponent as Remove} from "../../../../assets/remove.svg";
import {Dropdown} from "antd";
import {useNavigate} from "react-router-dom";

const FormulaLeft = observer(({formulas, selectedFormula, setSelectedFormula, choseTypeModal, setRemoveModal}) => {
    const store = useStore()

    const navigate = useNavigate()

    const getCurrentFormula = async (id) => {
        await store.formula.getCurrentFormula(id)
    }

    const items = (id) => [
        {
            label: <div className={s.drop_item} onClick={() => choseTypeModal('edit', true)}>
                <Edit/>
                <p>Edit formula</p>
            </div>,
            key: '0',
        },
        {
            label: <div className={s.drop_item} onClick={() => navigate('/formulas-library/create-prescription', {
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
            label: <div className={classNames(s.drop_item, s.drop_item_remove)} onClick={() => setRemoveModal(true)}>
                <Remove/>
                <p>Delete formula</p>
            </div>,
            key: '3',
        },
    ];

    return (
        <div className={s.formula_left}>
            {formulas.map((el) => {
                return <div className={classNames(s.formula, selectedFormula === el.formula_id && s.selected)}
                            key={el.formula_id} onClick={async () => {
                    setSelectedFormula(el.formula_id)
                    await getCurrentFormula(el.formula_id)
                }}>
                    <div>
                        <p className={s.formula_name}>{el.formula_name}</p>
                        <p className={s.formula_note}>{el.notes}</p>
                    </div>

                    <div className={s.menu}>
                        <Dropdown
                            menu={{
                                items: items(el.formula_id)
                            }}
                            trigger={['click']}
                            placement="bottomRight"
                        >
                            <div className={s.dots} onClick={(e) => e.preventDefault()}>
                                <span>.</span>
                                <span>.</span>
                                <span>.</span>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            })}
        </div>
    );
});

export default FormulaLeft;

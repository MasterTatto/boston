import React from 'react';
import {useStore} from "../../../../useStore";
import {observer} from "mobx-react-lite";
import s from './styles.module.css'

const FormulaRight = observer(() => {
    const store = useStore()

    return (
        <div className={s.formula_right}>
            <p className={s.formula_name}>{store.formula.currentFormula.formula_name}</p>

            <p className={s.title_components}>Composition of the formula</p>

            {store.formula.currentFormula?.components?.map((el, i) => {
                return <div className={s.component} key={el.component_id}>
                    <p className={s.component_part}>x{el.parts}</p>
                    <p className={s.component_name}>{el.herb_name}</p>
                </div>
            })}
        </div>
    );
});

export default FormulaRight;

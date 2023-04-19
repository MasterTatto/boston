import React, {useState} from 'react';
import classNames from "classnames";
import s from "./styles.module.css";
import {ReactComponent as Arrow} from "../../../../assets/arrow_select.svg";

const Items = ({el, i}) => {
    const [showSubTitle, setShowSubTitle] = useState(false)
    return (
        <div className={classNames(s.item, i === 3 && s.last_item)}
             style={{
                 padding: i === 3 && '9px'
             }}>
            <div>{el.svg}</div>

            <div className={s.text}>
                <p className={s.title}>
                    {el.title}

                </p>
                <p className={s.title_mobile} onClick={() => setShowSubTitle(!showSubTitle)}>
                    {el.title}
                    <span className={classNames(s.arrow, showSubTitle && s.rotate)} onClick={() => setShowSubTitle(!showSubTitle)}>
                    <Arrow/>
            </span>
                </p>
                <p className={s.subtitle}>{el.subtitle}</p>
                <p className={s.subtitle_mobile} style={{
                    height: showSubTitle ? 'fit-content' : 0
                }}>{el.subtitle}</p>
            </div>
        </div>
    );
};

export default Items;

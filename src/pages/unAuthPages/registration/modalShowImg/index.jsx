import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {Button, Modal} from "antd";
import classNames from "classnames";

const ModalShowImg = ({openModal, setOpenModal, img}) => {
    const handleOk = () => {
        setOpenModal(null)
    }

    return (
        <div>
            <Modal
                title=""
                centered
                width={315}
                footer={<div className={s.btn_box}>

                    <Button onClick={handleOk}
                            className={classNames(s.btn, s.add)}>OK</Button>
                </div>}
                open={openModal}
                onCancel={handleOk}
            >
                <div className={s.box_img}>
                    <img src={img} alt=""/>
                </div>
            </Modal>
        </div>
    );
};

export default ModalShowImg;

import React from 'react';
import s from './styles.module.css'
import {Button, Modal} from "antd";
import classNames from "classnames";
import Loader from "../../../../components/Loader";
import {useStore} from "../../../../useStore";

const RemoveFormula = ({openModal, setOpenModal, removeFormula}) => {
    const store = useStore()
    return (
        <Modal
            title=""
            centered
            width={315}
            footer={<div className={s.btn_box}>
                <Button onClick={() => setOpenModal(false)} className={classNames(s.btn, s.cancel)}>No,
                    cancel</Button>
                <Button loading={store.patients.buttonLoading} onClick={removeFormula}
                        className={classNames(s.btn, s.add)}>Yes, delete</Button>
            </div>}
            open={openModal}
            onCancel={() => setOpenModal(false)}
        >
            {store.patients.isModalLoading ? <Loader/> : <div>
                <p className={s.title}>Delete formula??</p>

                <p className={s.description}>
                    Formula will be deleted from all prescriptions. <b>Are you sure?</b>
                </p>
            </div>}
        </Modal>
    );
};

export default RemoveFormula;

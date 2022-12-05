import React from 'react';
import {Button, Modal} from "antd";
import classNames from "classnames";
import Loader from "../../Loader";
import s from './styles.module.css'
import {useStore} from "../../../useStore";
import {observer} from "mobx-react-lite";

const RemovePatientModal = observer(({openRemoveModal, setOpenRemoveModal, removePatient}) => {
    const store = useStore()

    return (
        <div>
            <Modal
                title=""
                centered
                width={315}
                footer={<div className={s.btn_box}>
                    <Button onClick={() => setOpenRemoveModal(false)} className={classNames(s.btn, s.cancel)}>No,
                        cancel</Button>
                    <Button loading={store.patients.buttonLoading} onClick={removePatient}
                            className={classNames(s.btn, s.add)}>Yes, delete</Button>
                </div>}
                open={openRemoveModal}
                onCancel={() => setOpenRemoveModal(false)}
            >
                {store.patients.isModalLoading ? <Loader/> : <div>
                    <p className={s.title}>Delete patient?</p>

                    <p className={s.description}>
                        All patient info and prescriptions will be deleted. <b>Are you sure?</b>
                    </p>
                </div>}
            </Modal>
        </div>
    );
});

export default RemovePatientModal;

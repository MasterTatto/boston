import React from 'react';
import s from './styles.module.css'
import {Button, Modal} from "antd";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

const ModalFinishRegistration = ({openModal, setOpenModal, email}) => {
    const navigate = useNavigate()
    const handleOk = () => {
        setOpenModal(false)
        navigate('/login')
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
                <div>
                    <p className={s.title}>{email}</p>

                    <p className={s.description}>
                        Thank you for filling out your application.
                    </p>
                    <p className={s.description}>
                        A representative of AcuBoston Pharmacy will get back to you within 1-2 days.
                    </p>
                    <p className={s.description}>
                        If your application is accepted, we will send you username and password to access and use
                        AcuBoston Pharmacy.
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default ModalFinishRegistration;

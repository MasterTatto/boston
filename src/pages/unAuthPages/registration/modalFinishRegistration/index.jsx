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
                            className={classNames(s.btn, s.add)}>Okay</Button>
                </div>}
                open={openModal}
                onCancel={handleOk}
            >
                <div>
                    <p className={s.title}>{email}</p>

                    <p className={s.description}>
                        We check your data, the password will be sent to e-mail for several days
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default ModalFinishRegistration;

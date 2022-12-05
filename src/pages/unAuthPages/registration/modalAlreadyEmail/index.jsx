import React from 'react';
import {Button, Modal} from "antd";
import s from './styles.module.css'
import classNames from "classnames";

const ModalAlreadyEmail = ({setOpenModal, openModal, email}) => {
    return (
        <div>
            <Modal
                title=""
                centered
                width={315}
                footer={<div className={s.btn_box}>

                    <Button onClick={() => setOpenModal(false)}
                            className={classNames(s.btn, s.add)}>Okay</Button>
                </div>}
                open={openModal}
                onCancel={() => setOpenModal(false)}
            >
                <div>
                    <p className={s.title}>{email}</p>

                    <p className={s.description}>
                        This email is already used in the system. If you forgot your password, write to our support
                        - <b>AcuBoston.com</b>
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default ModalAlreadyEmail;

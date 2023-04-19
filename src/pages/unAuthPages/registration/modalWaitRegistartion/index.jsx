import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {Button, Modal} from "antd";
import classNames from "classnames";
import axios from "axios";

const ModalWaitRegistartion = ({openModal, setOpenModal, email}) => {
    const [status, setStatus] = useState('')

    const handleOk = () => {
        setOpenModal(false)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        const getStatusRegistration = async () => {
            try {
                const res = await axios.get(`https://stage.acuboston.com/api/v1/auth/checkregistration?email=${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setStatus(res.data.registrationStatus)
            } catch (e) {
                console.log(e)
            }
        }
        getStatusRegistration()
    }, [])

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
                    {status === 'requested' && <>
                        <p className={s.title}>{email}</p>

                        <p className={s.description}>
                            Your registration application is being processed.
                        </p>
                        <p className={s.description}>
                            Within 72 hours you will receive an answer by email.
                        </p>
                    </>}
                    {status === 'approved' && <>
                        <p className={s.title}>{email}</p>

                        <p className={s.description}>
                            Your application registration has been approved.
                        </p>
                        <p className={s.description}>
                            Your login and password have been sent to your email.
                        </p>
                    </>}
                    {status === 'rejected' && <>
                        <p className={s.title}>{email}</p>

                        <p className={s.description}>
                            Your application registration has been reviewed.
                        </p>
                        <p className={s.description}>
                            Registration is denied, a message with the reasons for refusal will be sent to your email.
                        </p>
                    </>}
                    {status === 'unknown' && <>
                        <p className={s.title}>{email}</p>

                        <p className={s.description}>
                            The application registration has not been received.
                        </p>
                    </>}
                </div>
            </Modal>
        </div>
    );
};

export default ModalWaitRegistartion;

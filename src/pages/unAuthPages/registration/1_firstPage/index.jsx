import React, {useState} from 'react';
import s from './styles.module.css'
import {Input, Select} from "antd";
import classNames from "classnames";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../../useStore";
import ModalAlreadyEmail from "../modalAlreadyEmail";

const FirstPage = observer(({salutations, suffixes, changeValues, values}) => {
    const store = useStore()

    const [validateEmail, setValidateEmail] = useState({
        status: '',
        text: ''
    })
    const [openModal, setOpenModal] = useState(false)

    const checkEmail = async () => {
        const res = await store.auth.checkEmail(values.email)
        if (res.response) {
            setValidateEmail({status: 'error', text: 'This email is already'})
            setOpenModal(true)
        } else {
            setValidateEmail({status: 'succes', text: 'Email available'})
        }
    }
    return (
        <div className={s.first_page}>
            {openModal && <ModalAlreadyEmail setOpenModal={setOpenModal} openModal={openModal} email={values.email}/>}
            <div className={s.contact_box}>
                <h3 className={s.title}>Contact Info</h3>

                <div className={s.box}>
                    <label className={s.label}>Phone Number</label>
                    <Input onChange={(e) => changeValues('phone', e.target.value)} value={values.phone}/>
                </div>

                <div className={s.box}>
                    <label className={s.label}>E-mail</label>
                    <Input onChange={(e) => changeValues('email', e.target.value)}
                           value={values.email}/>
                    {validateEmail !== null &&
                        <span
                            className={classNames(s.label, validateEmail.status === 'error' ? s.error : s.succes)}>{validateEmail.text}</span>}
                    <div className={classNames(s.label, s.check)} onClick={checkEmail}>
                        Check email
                    </div>
                </div>
            </div>

            <div className={s.presonal_info}>
                <h3 className={s.title}>Personal Info</h3>

                <div className={s.box}>
                    <label className={s.label}>Salutation</label>
                    <Select
                        value={values.salutation}
                        placeholder={''}
                        style={{width: '100%'}}
                        onChange={(e) => {
                            changeValues('salutation', e)
                        }}
                        options={salutations.map((el) => ({
                            value: el,
                            label: el,
                        }))}
                    />
                </div>

                <div className={s.box}>
                    <label className={s.label}>First Name</label>
                    <Input onChange={(e) => changeValues('first_name', e.target.value)} value={values.first_name}/>
                </div>

                <div className={s.box}>
                    <label className={s.label}>Middle Initial</label>
                    <Input onChange={(e) => changeValues('middle_name', e.target.value)} value={values.middle_name}/>
                </div>

                <div className={s.box}>
                    <label className={s.label}>Last Name</label>
                    <Input onChange={(e) => changeValues('last_name', e.target.value)} value={values.last_name}/>
                </div>

                <div className={s.box}>
                    <label className={s.label}>Suffix</label>
                    <Select
                        placeholder={''}
                        style={{width: '100%'}}
                        onChange={(e) => {
                            changeValues('suffix', e)
                        }}
                        value={values.suffix}
                        options={suffixes.map((el) => ({
                            value: el,
                            label: el,
                        }))}
                    />
                </div>

                <div className={classNames(s.text_area)}>
                    <label className={s.label}>Specialties</label>
                    <Input.TextArea placeholder={'Specialties'}
                                    onChange={(e) => changeValues('specialities', e.target.value)}
                                    value={values.specialities}/>
                </div>
            </div>
        </div>
    );
});

export default FirstPage;

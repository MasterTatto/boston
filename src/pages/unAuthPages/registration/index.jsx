import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {observer} from "mobx-react-lite";
import {useStore} from "../../../useStore";
import FirstPage from "./1_firstPage";
import SecondPage from "./2_secondPage";
import ThirdPage from "./3_thirdPage";
import HeaderReg from "./header";
import ModalFinishRegistration from "./modalFinishRegistration";
import {toast} from "react-toastify";
import dayjs from "dayjs";
import ModalWaitRegistartion from "./modalWaitRegistartion";

const dateFormat = 'YYYY/MM/DD';

const Registration = observer(() => {
    const store = useStore()

    const [openModalWait, setOpenModalWait] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [regStuff, setRegStuff] = useState({
        credentials: [],
        nationalAssociations: [],
        practices: [],
        salutations: [],
        schools: [],
        stateAssociations: [],
        suffixes: [],
    })

    const [validImportantValue, setValidImportantValue] = useState({
        email: null,
        name: null
    })

    const [loader, setLoader] = useState(false)

    const [values, setValues] = useState({
        //first page
        email: '',
        phone: '',
        salutation: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        suffix: '',
        specialities: '',
        //second page
        practice_clinic: '',
        practice_type: '',
        practice_credential: '',
        license_number: '',
        practice_state: '',
        expiration_date: '',
        school: '',
        state_association: '',
        national_association: '',
        //third page
        photo: [],
    })

    const changeValues = (name, value) => {
        setValues({...values, [name]: value})
    }

    const registration = async () => {

        if (values.email === '' || values.first_name === '') {
            setValidImportantValue({
                email: values.email === '' ? 'error' : null,
                name: values.first_name === '' ? 'error' : null
            })
            toast.error('Fill required fields', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return
        }
        await store.auth.registration(values, setOpenModal)
    }

    useEffect(() => {
        const registration_values = JSON.parse(localStorage.getItem('registration_values'))
        const wait_registration = localStorage.getItem('wait_registration')
        const wait_registration_date = new Date(localStorage.getItem('wait_registration_date'))

        const dateNow = new Date()

        const limit = 72 * 60
        // const limit = 3
        const timeOutside = ((dateNow - wait_registration_date) / 1000) / 60

        if (limit > timeOutside) {
            setLoader(true)
            setValues({
                //first page
                email: registration_values.email,
                phone: registration_values.phone,
                salutation: registration_values.salutation,
                first_name: registration_values.first_name,
                last_name: registration_values.last_name,
                middle_name: registration_values.middle_name,
                suffix: registration_values.suffix,
                specialities: registration_values.specialities,
                //second page
                practice_clinic: registration_values.practice_clinic,
                practice_type: registration_values.practice_type,
                practice_credential: registration_values.practice_credential,
                license_number: registration_values.license_number,
                practice_state: registration_values.practice_state,
                expiration_date: registration_values.expiration_date,
                school: registration_values.school,
                state_association: registration_values.state_association,
                national_association: registration_values.national_association,
                //third page
                photo: registration_values.photo,
            })
            setOpenModalWait(true)


            setTimeout(() => setLoader(false), 0)
        } else {
            window.localStorage.removeItem('registration_values')
            window.localStorage.removeItem('wait_registration')
            window.localStorage.removeItem('wait_registration_date')
            setValues({
                //first page
                email: '',
                phone: '',
                salutation: '',
                first_name: '',
                last_name: '',
                middle_name: '',
                suffix: '',
                specialities: '',
                //second page
                practice_clinic: '',
                practice_type: '',
                practice_credential: '',
                license_number: '',
                practice_state: '',
                expiration_date: '',
                school: '',
                state_association: '',
                national_association: '',
                //third page
                photo: [],
            })
        }
    }, [])

    useEffect(() => {
        const getRegStuff = async () => {
            await store.auth.getRegStuff()
            setRegStuff({
                credentials: store.auth.regStuff.credentials,
                nationalAssociations: store.auth.regStuff.nationalAssociations,
                practices: store.auth.regStuff.practices,
                salutations: store.auth.regStuff.salutations,
                schools: store.auth.regStuff.schools,
                stateAssociations: store.auth.regStuff.stateAssociations,
                suffixes: store.auth.regStuff.suffixes,
            })
        }
        getRegStuff()
    }, [])

    return (
        <div className={s.registartion}>
            {openModal &&
                <ModalFinishRegistration openModal={openModal} setOpenModal={setOpenModal} email={values.first_name}/>}
            {openModalWait &&
                <ModalWaitRegistartion openModal={openModalWait} setOpenModal={setOpenModalWait} email={values.email}/>}
            <HeaderReg/>
            <div className={s.content}>
                <h2 className={s.title}>Sign Up</h2>
                <div className={s.content_items}>
                    {loader === false && <FirstPage
                        setValidImportantValue={setValidImportantValue}
                        validImportantValue={validImportantValue}
                        changeValues={changeValues} values={values}
                        suffixes={regStuff.suffixes}
                        salutations={regStuff.salutations}/>}
                    {loader === false && <SecondPage
                        changeValues={changeValues} values={values}
                        nationalAssociations={regStuff.nationalAssociations}
                        stateAssociations={regStuff.stateAssociations} schools={regStuff.schools}
                        practices={regStuff.practices} credentials={regStuff.credentials}/>}
                    {loader === false && <ThirdPage
                        registration={registration}
                        changeValues={changeValues} values={values}
                    />}
                </div>
            </div>
        </div>
    );
});

export default Registration;

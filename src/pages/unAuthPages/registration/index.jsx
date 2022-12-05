import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {observer} from "mobx-react-lite";
import {useStore} from "../../../useStore";
import FirstPage from "./1_firstPage";
import SecondPage from "./2_secondPage";
import ThirdPage from "./3_thirdPage";
import HeaderReg from "./header";
import ModalFinishRegistration from "./modalFinishRegistration";

const Registration = observer(() => {
    const store = useStore()

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

    const [values, setValues] = useState({
        //first page
        email: 'bpssoft@yahoo.com',
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

    console.log(values)

    const changeValues = (name, value) => {
        setValues({...values, [name]: value})
    }

    const registration = async () => {
        await store.auth.registration(values, setOpenModal)
    }

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
                <ModalFinishRegistration openModal={openModal} setOpenModal={setOpenModal} email={values.email}/>}
            <HeaderReg/>
            <div className={s.content}>
                <h2 className={s.title}>Sign Up</h2>
                <div className={s.content_items}>
                    <FirstPage
                        changeValues={changeValues} values={values}
                        suffixes={regStuff.suffixes}
                        salutations={regStuff.salutations}/>
                    <SecondPage
                        changeValues={changeValues} values={values}
                        nationalAssociations={regStuff.nationalAssociations}
                        stateAssociations={regStuff.stateAssociations} schools={regStuff.schools}
                        practices={regStuff.practices} credentials={regStuff.credentials}/>
                    <ThirdPage
                        registration={registration}
                        changeValues={changeValues} values={values}
                    />
                </div>
            </div>
        </div>
    );
});

export default Registration;

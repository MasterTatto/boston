import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import AddedTextPlus from "../../../common/addedTextPlus";
import {Input} from "antd";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../useStore";
import Loader from "../../../components/Loader";
import PatientRight from "./patient_right";
import PatientLeft from "./patient_left";
import {useNavigate} from "react-router-dom";

const Patients = observer(() => {
    const store = useStore()
    const navigate = useNavigate()

    const [hiddenCopy, setHiddenCopy] = useState(false)
    const [allPrescriptions, setAllPrescriptions] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        setTimeout(() => setHiddenCopy(false), 0)
    }, [hiddenCopy])

    useEffect(() => {
        const getAllPrescriptions = async () => {
            await store.patients.getPrescription(store.patients.patient.patient_id)
            setAllPrescriptions(store.patients.allPrescription)
        }
        getAllPrescriptions()
    }, [store.patients.patient.patient_id])

    return (
        <>

            {store.patients.pageLoading ? <Loader/> : <div className={s.patient_page}>
                <div className={s.content_box}>

                    <div className={s.header}>
                        <div className={s.header_top}>
                            <p className={s.header_title}>Prescriptions</p>
                            <AddedTextPlus title={'Add prescription'}
                                           onClick={() => navigate('/patients/create-prescription', {
                                               state: {
                                                   navigateBack: '/patients'
                                               }
                                           })}/>
                        </div>
                        <div className={s.header_bottom}>
                            <Input.Search onSearch={setSearch} placeholder="Find Prescription"/>
                        </div>
                    </div>

                    <PatientLeft setSearch={setSearch} search={search} setHiddenCopy={setHiddenCopy}
                                 allPrescriptions={allPrescriptions}
                                 hiddenCopy={hiddenCopy}/>
                </div>

                <PatientRight/>
            </div>}
        </>
    );
});

export default Patients;

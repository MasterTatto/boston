import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import AddedTextPlus from "../../../common/addedTextPlus";
import {Dropdown, Input} from "antd";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../useStore";
import Loader from "../../../components/Loader";
import PatientRight from "./patient_right";
import PatientLeft from "./patient_left";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import {ReactComponent as Arrow} from '../../../assets/arrow.svg'
import AddedPatientsModal from "../../../components/sideBar/addedPatientModal";
import InfoPatient from "../../../components/infoPatient";
import {ReactComponent as Edit} from "../../../assets/edit.svg";
import {ReactComponent as Remove} from "../../../assets/remove.svg";
import RemovePatientModal from "../../../components/sideBar/removePatientModal";

const Patients = observer(() => {
    const store = useStore()
    const navigate = useNavigate()

    const items = (id) => [
        {
            label: <div onClick={async () => {
                setOpenAddedModal('edit')
                // await store.patients.getPatients(id)
            }} className={s.drop_item}>
                <Edit/>
                <p>Edit info</p>
            </div>,
            key: '0',
        },
        {
            label: <div onClick={async () => {
                setOpenRemoveModal(true)
            }}
                        className={classNames(s.drop_item, s.drop_item_remove)}>
                <Remove/>
                <p>Delete patient</p>
            </div>,
            key: '1',
        },
    ];

    const [currentID, setCurrentID] = useState(null)
    const [openRemoveModal, setOpenRemoveModal] = useState(false)
    const [showFullPatient, setShowFullPatient] = useState(false)
    const [openInfo, setOpenInfo] = useState(false)
    const [openAddedModal, setOpenAddedModal] = useState(null)
    const [hiddenCopy, setHiddenCopy] = useState(false)
    const [allPrescriptions, setAllPrescriptions] = useState([])
    const [search, setSearch] = useState('')
    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState()
    const [prescriptionID, setPrescriptionID] = useState(null)
    const [prescriptionItems, setPrescriptionItems] = useState([])

    const getCurrentPrescription = async (id) => {
        setPrescriptionID(id)
        await store.history.getCurrentPrescription(id)
        setPrescriptionItems(store.history.prescription)
    }

    const removePatient = async () => {
        await store.patients.deletePatients(store.patients.patient.patient_id, setOpenRemoveModal)
        await store.patients.getAllPatients()
        await store.patients.getPatients(store.patients.allPatients[0]?.patient_id || null)
        await store.patients.getPrescription(store.patients.allPatients[0]?.patient_id || null)
        setPatients(store.patients.allPatients)
        setSelectedPatient(store.patients.allPatients.length > 0 ? store.patients.allPatients[0]?.patient_id : null)
    }

    const handleOk = async (values) => {
        if (openAddedModal === 'add') {
            const add = await store.patients.addedPatients(values, setOpenAddedModal)

            if (!add.response) {
                await store.patients.getAllPatients()
                setPatients(store.patients.allPatients)
            }
        }

        if (openAddedModal === 'edit') {
            const edit = await store.patients.updatePatients(values, store.patients.patient.patient_id, setOpenAddedModal)

            if (!edit.response) {
                await store.patients.getAllPatients()
                await store.patients.getPatients(store.patients.patient.patient_id)
                setSelectedPatient(store.patients.patient.patient_id)
                setPatients(store.patients.allPatients)
            }
        }
    };

    useEffect(() => {
        setTimeout(() => setHiddenCopy(false), 0)
    }, [hiddenCopy])

    useEffect(() => {
        const getAllPrescriptions = async () => {
            setShowFullPatient(false)
            setPrescriptionID(null)

            await store.patients.getPrescription(store.patients.patient.patient_id)
            // await store.patients.getPrescription(store.patients.allPatients[0]?.patient_id || null)
            setAllPrescriptions(store.patients.allPrescription)
            if (store.patients.allPrescription.length !== 0) {
                setCurrentID(store.patients.allPrescription[0]?.prescription_id)
                await getCurrentPrescription(store.patients.allPrescription[0]?.prescription_id)
                await store.formula.getCurrentFormula(store.patients.allPrescription[0]?.formula_id || null)
            }


            // if (allPrescriptions.length !== 0) {
            //     await store.formula.getCurrentFormula(store.patients.allPrescription[0]?.formula_id)
            // }


        }
        if (store.patients.patient.patient_id) {
            getAllPrescriptions()
        }

    }, [store.patients.patient.patient_id])

    useEffect(() => {
        setPatients(store.patients.allPatients)
    }, [store.patients.isLoading])

    return (
        <>
            {/*<MobilePatients/>*/}
            <div className={s.desktop_patient}>
                {openAddedModal !== null && <AddedPatientsModal handleOk={handleOk} openAddedModal={openAddedModal}
                                                                setOpenAddedModal={setOpenAddedModal}/>}

                {openRemoveModal &&
                    <RemovePatientModal removePatient={removePatient} openRemoveModal={openRemoveModal}
                                        setOpenRemoveModal={setOpenRemoveModal}/>}

                {openInfo && <InfoPatient openInfo={openInfo} setOpenInfo={setOpenInfo}/>}
                {store.patients.pageLoading ? <Loader/> : <div className={s.patient_page}>

                    <div className={s.content_box}>

                        <div className={s.header}>
                            <div className={s.patients}>
                                <div className={s.header_top}>
                                    <p className={s.header_title}>Patients</p>
                                    <AddedTextPlus title={'Add patient'}
                                                   onClick={() => setOpenAddedModal('add')}/>
                                </div>
                                <div className={classNames(s.header_bottom, s.header_bottom_2)}>
                                    <div className={s.patients_serach}>
                                        <p className={s.patient_name}>{store.patients.patient.patient_name}</p>
                                        <div className={s.action_box}>
                                            <p className={s.show_more} onClick={() => setOpenInfo(true)}>Show Info</p>
                                            <Arrow onClick={() => setShowFullPatient(!showFullPatient)}/>
                                        </div>
                                    </div>
                                </div>

                                {showFullPatient && <div>
                                    {patients.length !== 0 ? <div className={s.patient_items}>
                                        {patients.map((el) => <div key={el.patient_id} onClick={async () => {
                                            setSelectedPatient(el.patient_id)
                                            if (el.patient_id !== selectedPatient) {
                                                setShowFullPatient(false)
                                                await store.patients.getPatients(el.patient_id)
                                            }

                                        }}
                                                                   className={classNames(s.item, store.patients.patient.patient_id === el.patient_id && s.selected)}>
                                            <div className={s.info_box_item}>
                                                <p className={s.item_name}>{el.patient_name}</p>
                                                <p className={s.item_email}>{el.email}</p>
                                            </div>

                                            <div className={s.action_box_item}>

                                                <Dropdown
                                                    menu={{
                                                        items: items(el.patient_id)
                                                    }}
                                                    trigger={['click']}
                                                    placement="bottomRight"
                                                >
                                                    <div className={s.dots} onClick={(e) => e.preventDefault()}>
                                                        <span>.</span>
                                                        <span>.</span>
                                                        <span>.</span>
                                                    </div>
                                                </Dropdown>
                                                <Arrow/>
                                            </div>

                                        </div>)}
                                    </div> : <h2 className={s.empty}>No patients</h2>}
                                </div>}
                            </div>

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
                                <Input.Search onChange={(e) => {
                                    setSearch(e.target.value)
                                }} onSearch={setSearch} value={search} placeholder="Find Prescription"/>
                            </div>
                        </div>


                        <PatientLeft setCurrentID={setCurrentID} currentID={currentID}
                                     getCurrentPrescriptionHandler={getCurrentPrescription} setSearch={setSearch}
                                     search={search}
                                     setHiddenCopy={setHiddenCopy}
                                     allPrescriptions={allPrescriptions}
                                     hiddenCopy={hiddenCopy}/>
                    </div>

                    <PatientRight patients={patients}
                                  prescription={prescriptionItems.find((f) => f.prescription_id === prescriptionID)}/>
                </div>}
            </div>
        </>
    );
});

export default Patients;

import React, {useEffect, useState} from 'react';
import s from '../styles.module.css'
import AddedTextPlus from "../../../../common/addedTextPlus";
import {Dropdown, Input} from "antd";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../../useStore";
import Loader from "../../../../components/Loader";
import {NavLink, useNavigate} from "react-router-dom";
import classNames from "classnames";
import {ReactComponent as Arrow} from '../../../../assets/arrow.svg'
import AddedPatientsModal from "../../../../components/sideBar/addedPatientModal";
import InfoPatient from "../../../../components/infoPatient";
import {ReactComponent as Edit} from "../../../../assets/edit.svg";
import {ReactComponent as Remove} from "../../../../assets/remove.svg";
import RemovePatientModal from "../../../../components/sideBar/removePatientModal";
import PatientLeft from "./mobile_left";
import PatientRight from "./mobile_right";

const MobilePatients = observer(() => {
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

    const [openRemoveModal, setOpenRemoveModal] = useState(false)
    const [showFullPatient, setShowFullPatient] = useState(false)
    const [openInfo, setOpenInfo] = useState(false)
    const [openAddedModal, setOpenAddedModal] = useState(null)
    const [hiddenCopy, setHiddenCopy] = useState(false)
    const [allPrescriptions, setAllPrescriptions] = useState([])
    const [search, setSearch] = useState('')
    const [search2, setSearch2] = useState('')
    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState()
    const [searchPatient, setSearchPatient] = useState('')
    const [searchPatient2, setSearchPatient2] = useState('')
    console.log(selectedPatient)
    const dataFiltered = [...patients.filter(item => {
        if (!searchPatient2) return true
        if (item?.patient_name?.toLowerCase()?.includes(searchPatient2.toLowerCase())) {
            return true
        }
    })];

    const dataFilteredPrescriptin = [...allPrescriptions.filter(item => {
        if (!search2) return true
        if (item?.formula_name?.toLowerCase()?.includes(search2.toLowerCase())) {
            return true
        }
    })];

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchPatient2(searchPatient)
            // Send Axios request here
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [searchPatient])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearch2(search)
            // Send Axios request here
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [search])

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
        const id_patient = localStorage.getItem('patient_id')

        const getAllPrescriptions = async () => {
            await store.patients.getAllPatients()
            setPatients(store.patients.allPatients)
            await store.patients.getPatients(id_patient ? id_patient : (store.patients.allPatients[0] ? store.patients.allPatients[0]?.patient_id : null))
            setSelectedPatient((store.patients.allPatients.length > 0 && id_patient) ? id_patient : (store.patients.allPatients[0] ? store.patients.allPatients[0]?.patient_id : null))
            await store.patients.getPrescription(store.patients.patient.patient_id)
            setAllPrescriptions(store.patients.allPrescription)
        }
        getAllPrescriptions()
    }, [store.patients.patient.patient_id])

    // useEffect(() => {
    //     const getAllPatients = async () => {
    //         await store.patients.getAllPatients()
    //         setSelectedPatient(store.patients.allPatients.length > 0 ? store.patients.allPatients[0]?.patient_id : null)
    //         if (store.patients.allPatients.length > 0) {
    //             await store.patients.getPatients(store.patients.allPatients[0]?.patient_id)
    //             await store.patients.getPrescription(store.patients.allPatients[0]?.patient_id)
    //         }
    //     }
    //
    //     getAllPatients()
    //
    // }, [])

    useEffect(() => {
        const id_patient = localStorage.getItem('patient_id')
        setPatients(store.patients.allPatients)
        // setSelectedPatient(id_patient ? id_patient : (store.patients.allPatients[0] ? store.patients.allPatients[0]?.patient_id : null))
    }, [store.patients.isLoading])

    // useEffect(() => {
    //     const id_patient = localStorage.getItem('patient_id')
    //     const test = async () => {
    //         await store.patients.getPatients(id_patient ? id_patient : (store.patients.allPatients[0] ? store.patients.allPatients[0]?.patient_id : null))
    //         await store.patients.getPrescription(id_patient ? id_patient : (store.patients.allPatients[0] ? store.patients.allPatients[0]?.patient_id : null))
    //         setPatients(store.patients.allPatients)
    //         setSelectedPatient((store.patients.allPatients.length > 0 && id_patient) ? id_patient : (store.patients.allPatients[0] ? store.patients.allPatients[0]?.patient_id : null))
    //     }
    //     test()
    // }, [])

    return (
        <div className={s.mobile_patient}>
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
                            {!showFullPatient && <div>
                                <div className={s.header_top}>
                                    <p className={s.header_title}>{store.patients.patient.patient_name}</p>
                                    <p className={s.change_patient}
                                       onClick={() => setShowFullPatient(!showFullPatient)}>Change
                                        Patient</p>
                                    {/*<AddedTextPlus title={'Add patient'}*/}
                                    {/*               onClick={() => setOpenAddedModal('add')}/>*/}
                                </div>
                                <p className={s.show_more} onClick={() => setOpenInfo(true)}>Show Info</p>
                            </div>}
                            {showFullPatient && <div className={classNames(s.header_bottom, s.header_bottom_2)}>
                                <div className={s.heder_action_info}>
                                    <p className={s.patient_title}>Patients</p>
                                    <AddedTextPlus title={'Add patient'}
                                                   onClick={() => setOpenAddedModal('add')}/>
                                </div>

                                <div className={s.serach_patient}>
                                    <Input.Search placeholder="Find patient" value={searchPatient} onChange={(e) => {
                                        setSearchPatient(e.target.value)
                                    }} onSearch={setSearchPatient}/>
                                </div>
                            </div>}

                            {showFullPatient && <div>
                                {patients.length !== 0 ? <div className={s.patient_items}>
                                    {dataFiltered.map((el) => <div key={el.patient_id} onClick={async () => {
                                        setSelectedPatient(el.patient_id)
                                        localStorage.setItem('patient_id', el.patient_id)
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
                            <Input.Search value={search} onChange={(e) => {
                                setSearch(e.target.value)
                            }} onSearch={setSearch} placeholder="Find Prescription"/>
                        </div>
                    </div>

                    <PatientLeft selectedPatient={selectedPatient} setHiddenCopy={setHiddenCopy}
                                 allPrescriptions={dataFilteredPrescriptin}
                                 hiddenCopy={hiddenCopy}/>
                </div>

                <PatientRight/>
            </div>}
        </div>
    );
});

export default MobilePatients;

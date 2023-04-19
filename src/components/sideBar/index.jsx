import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import logo from '../../assets/logo.png'
import {Dropdown, Input} from "antd";
import {useStore} from "../../useStore";
import {observer} from "mobx-react-lite";
import {ReactComponent as Edit} from "../../assets/edit.svg";
import {ReactComponent as Remove} from "../../assets/remove.svg";
import {ReactComponent as Arrow} from "../../assets/arrow.svg";
import classNames from "classnames";
import AddedPatientsModal from "./addedPatientModal";
import RemovePatientModal from "./removePatientModal";
import AddedTextPlus from "../../common/addedTextPlus";
import {NavLink, useLocation} from "react-router-dom";

const SideBar = observer(() => {
    const store = useStore()
    const location = useLocation()

    const navigateHandle =
        (['/patients/create-prescription', '/patients'].includes(location.pathname) && '/patients') ||
        (['/formulas-library', '/formulas-library/create-prescription'].includes(location.pathname) && '/formulas-library') ||
        (['/herbs-list'].includes(location.pathname) && location.pathname) ||
        (['/payment-history'].includes(location.pathname) && location.pathname) ||
        '/'
    //type null = close
    //type add = addModal
    //type edit = editModal
    const [openAddedModal, setOpenAddedModal] = useState(null)
    const [openRemoveModal, setOpenRemoveModal] = useState(false)
    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState()
    const [search, setSearch] = useState('')
    const [search2, setSearch2] = useState('')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearch2(search)
            // Send Axios request here
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [search])

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


    const handleOk = async (values) => {
        if (openAddedModal === 'add') {
            const add = await store.patients.addedPatients(values, setOpenAddedModal)
            await store.patients.getPatients(add.data.patient_id)
            setSelectedPatient(add.data.patient_id)
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

    const removePatient = async () => {
        await store.patients.deletePatients(store.patients.patient.patient_id, setOpenRemoveModal)
        await store.patients.getAllPatients()
        await store.patients.getPatients(store.patients.allPatients[0]?.patient_id || null)
        await store.patients.getPrescription(store.patients.allPatients[0]?.patient_id || null)
        setPatients(store.patients.allPatients)
        setSelectedPatient(store.patients.allPatients.length > 0 ? store.patients.allPatients[0]?.patient_id : null)
    }

    useEffect(() => {
        const getAllPatients = async () => {
            await store.patients.getAllPatients()

            setSelectedPatient(store.patients.allPatients.length > 0 ? store.patients.allPatients[0]?.patient_id : null)
            if (store.patients.allPatients.length > 0) {
                await store.patients.getPatients(store.patients.allPatients[0]?.patient_id)
                // await store.patients.getPrescription(store.patients.allPatients[0]?.patient_id)
            }
        }

        getAllPatients()

    }, [])

    useEffect(() => {
        setPatients(store.patients.allPatients)

    }, [store.patients.isLoading])


    return (
        <div className={s.side_bar}>
            {openAddedModal !== null && <AddedPatientsModal handleOk={handleOk} openAddedModal={openAddedModal}
                                                            setOpenAddedModal={setOpenAddedModal}/>}

            {openRemoveModal &&
                <RemovePatientModal removePatient={removePatient} openRemoveModal={openRemoveModal}
                                    setOpenRemoveModal={setOpenRemoveModal}/>}
            <img className={s.logo} src={logo} alt="logo"/>

            <div className={s.action_box}>
                <div className={s.added_patients}>
                    <p className={s.title}>Patients</p>
                    <AddedTextPlus title={'Add patient'} onClick={() => setOpenAddedModal('add')}/>
                </div>
                <div className={s.search_pacient}>
                    <Input.Search placeholder="Find patient" value={search} onChange={(e) => {
                        setSearch(e.target.value)
                    }} onSearch={setSearch}/>
                </div>
            </div>

            {patients.length !== 0 ? <div className={s.patient_items}>
                {patients.filter(item => {
                    if (!search2) return true
                    if (item.patient_name.toLowerCase().includes(search2.toLowerCase())) {
                        return true
                    }
                })?.map((el) => <NavLink to={navigateHandle} key={el.patient_id} onClick={async () => {
                    setSelectedPatient(el.patient_id)
                    if (el.patient_id !== selectedPatient) {
                        await store.patients.getPatients(el.patient_id)
                    }

                }}
                                         className={classNames(s.item, selectedPatient === el.patient_id && s.selected)}>
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

                </NavLink>)}
            </div> : <h2 className={s.empty}>No patients</h2>}
        </div>
    );
});

export default SideBar;

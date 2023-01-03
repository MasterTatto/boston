import React, {useState} from 'react';
import s from '../../patient_right/styles.module.css'
import {ReactComponent as Edit} from "../../../../../assets/edit_text.svg";
import {useStore} from "../../../../../useStore";
import AddedPatientsModal from "../../../../../components/sideBar/addedPatientModal";
import {observer} from "mobx-react-lite";

const PatientRight = observer(() => {
    const store = useStore()

    const [openAddedModal, setOpenAddedModal] = useState(null)

    const handleOk = async (values) => {

        const edit = await store.patients.updatePatients(values, store.patients.patient.patient_id, setOpenAddedModal)

        if (!edit.response) {
            await store.patients.getAllPatients()
            await store.patients.getPatients(store.patients.patient.patient_id)
        }
    };
    return (
        <div className={s.info_box}>
            {openAddedModal !== null && <AddedPatientsModal handleOk={handleOk} openAddedModal={openAddedModal}
                                                            setOpenAddedModal={setOpenAddedModal}/>}

            <h3 className={s.info_name}>{store.patients.patient.patient_name}</h3>
            <div className={s.info_box_wrapper}>
                <p className={s.info_number}>{store.patients.patient.phone_number || 'No number'}</p>
                <p className={s.info_email}>{store.patients.patient.email || 'No email'}</p>
            </div>

            <div className={s.allergic}>
                <p className={s.allergic_title}>Allergies:</p>
                <div className={s.allergic_box}>
                    {store.patients.patient.allergens?.map((el) => <p key={el}
                                                                      className={s.allergic_item}>{`${el}`}</p>)}
                </div>
            </div>
            <p className={s.info_note}>{store.patients.patient.notes || 'No notes'}</p>

            <p className={s.edit} onClick={() => setOpenAddedModal('edit')}>
                <Edit/>
                Edit info
            </p>

        </div>
    );
});

export default PatientRight;

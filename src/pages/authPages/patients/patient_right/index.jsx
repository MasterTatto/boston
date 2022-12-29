import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {ReactComponent as Edit} from "../../../../assets/edit_text.svg";
import {useStore} from "../../../../useStore";
import AddedPatientsModal from "../../../../components/sideBar/addedPatientModal";
import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {ReactComponent as Arrow} from "../../../../assets/hidden_arrow.svg";
import {getFormatedDate} from "../../../../utils/getFormatDate";

const PatientRight = observer(({prescription, patients}) => {
    const store = useStore()

    const patient = patients?.find(f => f.patient_id === prescription?.patient_id)

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

            {prescription && <div className={s.hidden_left}>
                <div className={s.hidden_left_item}>
                    <div className={s.hidden_left_item_left}>
                        <p className={s.status}>Status:</p>
                        <p className={s.quest}>Prescription ID:</p>
                        <p className={s.quest}>Patient ID:</p>
                        <p className={s.quest}>Patient name:</p>
                    </div>
                    <div className={s.hidden_left_item_right}>
                        <p className={s.status_answer}>{prescription?.status}</p>
                        <p className={s.answer}>{prescription?.prescription_id || 'None'}</p>
                        <p className={s.answer}>{prescription?.patient_id || 'None'}</p>
                        <p className={s.answer}>{patient?.patient_name ? patient.patient_name : 'None'}</p>
                    </div>
                </div>
                <div className={s.hidden_left_item}>
                    <div className={s.hidden_left_item_left}>
                        <p className={s.quest}>Take days:</p>
                        <p className={s.quest}>Take times per day:</p>
                        <p className={s.quest}>Take grams:</p>
                        <p className={s.quest}>Total grams:</p>
                    </div>
                    <div className={s.hidden_left_item_right}>
                        <p className={s.answer}>{prescription?.take_days}</p>
                        <p className={s.answer}>{prescription?.take_times_per_day}</p>
                        <p className={s.answer}>{`${prescription?.take_grams} g`}</p>
                        <p className={s.answer}>{`${prescription?.total_grams} g`}</p>
                    </div>
                </div>
                <div className={s.hidden_left_item}>
                    <div className={s.hidden_left_item_left}>
                        <p className={s.quest}>Date of creation:</p>
                        <p className={s.quest}>Note:</p>
                    </div>
                    <div className={s.hidden_left_item_right}>
                        <p className={s.answer}>{getFormatedDate(prescription?.ctime)}</p>
                        <p className={s.answer}>{prescription?.notes}</p>
                    </div>
                </div>
                <div className={s.hidden_left_item}>
                    <div className={s.hidden_left_item_left}>
                        <p className={s.quest}>Cost per dose:</p>
                        <p className={s.quest}>Delivery cost:</p>
                        <p className={s.quest}>Herbs cost:</p>
                        <p className={s.quest}>Fulfillment fee:</p>
                        <p className={s.quest}>Markup:</p>
                        <p className={s.quest}>Total price:</p>
                    </div>
                    <div className={s.hidden_left_item_right}>
                        <p className={s.answer}>{`$${prescription?.formula_cost}`}</p>
                        <p className={s.answer}>{`$${prescription?.delivery_cost}`}</p>
                        <p className={s.answer}>{`$${prescription?.herbs_cost}`}</p>
                        <p className={s.answer}>{`$${prescription?.fulfillment_fee}`}</p>
                        <p className={s.answer}>{`x${prescription?.markup}`}</p>
                        <p className={s.answer}>{`$${prescription?.prescription_price}`}</p>
                    </div>
                </div>
                <div className={classNames(s.hidden_left_item, s.hidden_left_item_last)}>
                    <div className={s.hidden_left_item_left}>
                        <p className={s.quest}>Payment date:</p>
                        <p className={s.quest}>Packing date:</p>
                        <p className={s.quest}>Delivery date:</p>
                        <p className={s.quest}>Tracking code:</p>
                        <p className={s.quest}>Completion date:</p>
                    </div>
                    <div className={s.hidden_left_item_right}>
                        <p className={s.answer}>{getFormatedDate(prescription?.paid_at)}</p>
                        <p className={s.answer}>{getFormatedDate(prescription?.packed_at)}</p>
                        <p className={s.answer}>{getFormatedDate(prescription?.shipped_at)}</p>
                        <p className={s.answer}>{prescription?.tracking_code || 'None'}</p>
                        <p className={s.answer}>{getFormatedDate(prescription?.completed_at)}</p>
                    </div>
                </div>

            </div>}

            {prescription?.formula?.components?.length !== 0 && <div className={s.component_box}>
                <h3>Composition of the formula</h3>

                <div className={s.component_items}>
                    {prescription?.formula?.components?.map((el, i) => <div className={s.component_item} key={i}>
                        <p className={s.herb_part}>{`x${el.parts}`}</p>
                        <p className={s.herb_name}>{el.herb_name}</p>
                    </div>)}
                </div>
            </div>}
        </div>
    );
});

export default PatientRight;

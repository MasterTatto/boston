import Login from "../pages/unAuthPages/login";
import React from "react";
import Patients from "../pages/authPages/patients";
import FormulasLibrary from "../pages/authPages/formulasLibrary";
import Herbs from "../pages/authPages/herbs";
import s from "./styles.module.css";
import AddedPrescriptionPatient from "../pages/authPages/prescriptionCreate";
import PatientRight from "../pages/authPages/patients/patient_right";
import Registration from "../pages/unAuthPages/registration";
import MobilePatients from "../pages/authPages/patients/mobile";
import Help from "../pages/authPages/help";
import Account from "../pages/authPages/Account";

export const unAuthRoutes = [
    {path: '/login', element: <Login/>},
    {path: '/registration', element: <Registration/>},
]


export const authRoutes = (width) => [
    {path: '/patients', element: width > 1000 ? <Patients/> : <MobilePatients/>},
    {path: '/formulas-library', element: <FormulasLibrary/>},
    {path: '/herbs-list', element: <Herbs/>},
    {path: '/help', element: <Help/>},
    {path: '/account', element: <Account/>},
    {path: '*', element: <h1>404</h1>},
    // {path: '/payment-history', element: <PaymentHistory/>},
    {
        path: '/formulas-library/create-prescription', element: <div className={s.create_prescription_patient}>
            <AddedPrescriptionPatient/>
            <PatientRight needPrescription={true}/>
        </div>
    },
    {
        path: '/patients/create-prescription', element: <div className={s.create_prescription_patient}>
            <AddedPrescriptionPatient/>
            <PatientRight needPrescription={true}/>
        </div>
    },
]

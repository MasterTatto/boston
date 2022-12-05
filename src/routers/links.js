import Login from "../pages/unAuthPages/login";
import React from "react";
import Patients from "../pages/authPages/patients";
import FormulasLibrary from "../pages/authPages/formulasLibrary";
import Herbs from "../pages/authPages/herbs";
import s from "./styles.module.css";
import AddedPrescriptionPatient from "../pages/authPages/prescriptionCreate";
import PatientRight from "../pages/authPages/patients/patient_right";
import Registration from "../pages/unAuthPages/registration";

export const unAuthRoutes = [
    {path: '/login', element: <Login/>},
    {path: '/registration', element: <Registration/>},
]

export const authRoutes = [
    {path: '/patients', element: <Patients/>},
    {path: '/formulas-library', element: <FormulasLibrary/>},
    {path: '/herbs-list', element: <Herbs/>},
    {
        path: '/formulas-library/create-prescription', element: <div className={s.create_prescription_patient}>
            <AddedPrescriptionPatient/>
            <PatientRight/>
        </div>
    },
    {
        path: '/patients/create-prescription', element: <div className={s.create_prescription_patient}>
            <AddedPrescriptionPatient/>
            <PatientRight/>
        </div>
    },
]

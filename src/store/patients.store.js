import {makeAutoObservable} from "mobx";
import PatientsService from "./services/patients.service";
import {toast} from "react-toastify";

export class PatientsStore {
    allPatients = []
    allPrescription = []
    currentPrescription = null
    patient = {}
    formula = {}
    isLoading = false
    isModalLoading = false
    buttonLoading = false
    pageLoading = false
    prescriptionLoading = false
    allFormula = []

    constructor() {
        makeAutoObservable(this)
    }

    async getAllPatients() {
        this.setIsLoading(true)
        this.setPageLoading(true)

        try {
            const res = await PatientsService.getAllPatients()
            this.setAllPatients(res.data)
            this.setIsLoading(false)
            this.setPageLoading(false)
        } catch (e) {
            console.log(e)
            this.setIsLoading(false)
            this.setPageLoading(false)
        }
    }

    async getAllFormula() {

        try {
            const res = await PatientsService.getAllFormula()
            this.setAllFormula(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    async getCurrentFormula(id) {

        try {
            const res = await PatientsService.getCurrentFormula(id)
            this.setCurrentFormula(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    async getPatients(id) {
        this.setModalLoading(true)
        this.setPageLoading(true)

        try {
            const res = await PatientsService.getPatients(id)
            this.setPatient(res.data)
            this.setModalLoading(false)
            this.setPageLoading(false)
        } catch (e) {
            console.log(e)
            this.setModalLoading(false)
            this.setPageLoading(false)
        }
    }

    async getPrescription(id) {
        this.setPageLoading(true)

        try {
            const res = await PatientsService.getPrescription(id)
            this.setAllPrescription(res.data)
            this.setPageLoading(false)
        } catch (e) {
            console.log(e)
            this.setPageLoading(false)
        }
    }

    async getCurrentPrescription(id) {
        this.setPrescriptionLoading(true)

        try {
            const res = await PatientsService.getCurrentPrescription(id)
            this.setCurrentPrescription(res.data)
            this.setPrescriptionLoading(false)
        } catch (e) {
            console.log(e)
            this.setPrescriptionLoading(false)
        }
    }

    async addedPrescriptionToPatient(payload, navigate) {
        this.setButtonLoading(true)

        try {
            const res = await PatientsService.addedPrescriptionToPatient(payload)
            navigate()
            this.setButtonLoading(false)
            toast.success('Prescription added to patient', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            if (e.response.data.errors) {
                for (let key of Object.keys(e.response.data.errors)) {
                    toast.error(e.response.data.errors[key].message, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } else {
                toast.error('Something went wrong', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
            this.setButtonLoading(false)
        }
    }

    async deletePatients(id, setOpenRemoveModal) {
        this.setButtonLoading(true)

        try {
            const res = await PatientsService.deletePatients(id)
            this.setButtonLoading(false)
            setOpenRemoveModal(false)
            toast.success('Patient removed', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            console.log(e)
            this.setButtonLoading(false)
            setOpenRemoveModal(true)
            toast.error('Something went wrong', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }

    async addedPatients(payload, setOpenAddedModal) {
        this.setButtonLoading(true)

        try {
            const res = await PatientsService.addedPatients(payload)
            this.setButtonLoading(false)
            toast.success('Patient added', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setOpenAddedModal(null)
            return res
        } catch (e) {
            console.log(e)
            toast.error(e.response.data.errors[0].message || 'Something went wrong', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setOpenAddedModal('add')
            this.setButtonLoading(false)
            return e
        }
    }

    async updatePatients(payload, id, setOpenAddedModal) {
        this.setButtonLoading(true)
        this.setPageLoading(true)

        try {
            const res = await PatientsService.updatePatients(payload, id)
            this.setButtonLoading(false)
            this.setPageLoading(false)
            toast.success('Patient update', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setOpenAddedModal(null)
            return res
        } catch (e) {
            console.log(e)
            toast.error(e.response.data.errors[0].message || 'Something went wrong', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setOpenAddedModal('edit')
            this.setButtonLoading(false)
            this.setPageLoading(false)
            return e
        }
    }

    setIsLoading(loading) {
        this.isLoading = loading
    }

    setModalLoading(loading) {
        this.isModalLoading = loading
    }

    setAllPatients(patients) {
        this.allPatients = patients
    }

    setAllFormula(allFormula) {
        this.allFormula = allFormula
    }

    setAllPrescription(allPrescription) {
        this.allPrescription = allPrescription
    }

    setPatient(patient) {
        this.patient = patient
    }

    setButtonLoading(loading) {
        this.buttonLoading = loading
    }

    setPageLoading(loading) {
        this.pageLoading = loading
    }

    setPrescriptionLoading(prescriptionLoading) {
        this.prescriptionLoading = prescriptionLoading
    }

    setCurrentFormula(formula) {
        this.formula = formula
    }

    setCurrentPrescription(currentPrescription) {
        this.currentPrescription = currentPrescription
    }

}

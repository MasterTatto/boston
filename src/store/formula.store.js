import {makeAutoObservable} from "mobx";
import FormulaService from "./services/formula.service";
import {toast} from "react-toastify";

export class FormulaStore {
    formulas = []
    currentFormula = {}
    isLoading = false
    buttonLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    async getAllFormulas() {
        this.setIsLoading(true)
        try {
            const res = await FormulaService.getAllFormulas()
            this.setAllFormula(res.data)
            this.setIsLoading(false)
        } catch (e) {
            console.log(e)
            this.setIsLoading(false)
        }
    }

    async getCurrentFormula(id) {
        this.setIsLoading(true)
        try {
            const res = await FormulaService.getCurrentFormula(id)
            this.setCurrentFormula(res.data)
            this.setIsLoading(false)
        } catch (e) {
            console.log(e)
            this.setIsLoading(false)
        }
    }

    async removeFormula(id) {
        // this.setIsLoading(true)
        try {
            const res = await FormulaService.removeFormula(id)
            // this.setIsLoading(false)
        } catch (e) {
            console.log(e)
            // this.setIsLoading(false)
        }
    }

    async addedFormula(payload, setOpenModal) {
        this.setButtonLoading(true)
        try {
            const res = await FormulaService.addedFormula(payload)
            this.setButtonLoading(false)
            setOpenModal(null, false)
        } catch (e) {
            console.log(e)
            this.setButtonLoading(false)
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
        }
    }

    async updateFormula(payload, id, setOpenModal) {
        this.setButtonLoading(true)
        try {
            const res = await FormulaService.updateFormula(payload, id)
            this.setButtonLoading(false)
            setOpenModal(null, false)
        } catch (e) {
            console.log(e)
            this.setButtonLoading(false)
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
        }
    }

    setButtonLoading(loading) {
        this.buttonLoading = loading
    }

    setIsLoading(loading) {
        this.isLoading = loading
    }

    setAllFormula(formulas) {
        this.formulas = formulas
    }

    setCurrentFormula(currentFormula) {
        this.currentFormula = currentFormula
    }
}

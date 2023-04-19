import {makeAutoObservable} from "mobx";
import ReportService from "./services/report.service";

export class ReportStore {
    allReport = []
    isLoading = false
    payoutInfo = {}
    prescription = []

    constructor() {
        makeAutoObservable(this)
    }

    async getAllHistory(from, to,classic) {
        this.setIsLoading(true)
        try {
            const res = await ReportService.getAllHistory(from, to,classic)
            this.setAllReport({...res.data, rows: res.data.rows.map((el) => ({...el, isOpen: false}))})
            this.setIsLoading(false)
        } catch (e) {
            console.log(e)
            this.setIsLoading(false)
        }
    }

    async getPayoutInfo() {
        this.setIsLoading(true)
        try {
            const res = await ReportService.getPayoutInfo()
            this.setPayoutInfo(res.data)
            this.setIsLoading(false)
        } catch (e) {
            console.log(e)
            this.setIsLoading(false)
        }
    }

    async updatePayoutInfo(payload) {
        this.setIsLoading(true)
        try {
            await ReportService.updatePayoutInfo(payload)
            this.setIsLoading(false)
        } catch (e) {
            console.log(e)
            this.setIsLoading(false)
        }
    }

    async getCurrentPrescription(id) {
        this.setIsLoading(true)
        try {
            const res = await ReportService.getCurrentPrescription(id)

            if (this.prescription.find((f) => f.prescription_id === res.data.prescription_id)) {
                this.setCurrentPrescription(this.prescription)
            } else {
                this.setCurrentPrescription([...this.prescription, res.data])
            }


            this.setIsLoading(false)
        } catch (e) {
            console.log(e)
            this.setIsLoading(false)
        }
    }

    setIsLoading(loading) {
        this.isLoading = loading
    }

    setAllReport(allReport) {
        this.allReport = allReport
    }

    setPayoutInfo(payoutInfo) {
        this.payoutInfo = payoutInfo
    }

    setCurrentPrescription(prescription) {
        this.prescription = prescription
    }
}

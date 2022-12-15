import {makeAutoObservable} from "mobx";
import ReportService from "./services/report.service";

export class ReportStore {
    allReport = []
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    async getAllHistory(from, to) {
        this.setIsLoading(true)
        try {
            const res = await ReportService.getAllHistory(from, to)
            this.setAllReport({...res.data, rows: res.data.rows.map((el) => ({...el, isOpen: false}))})
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
}

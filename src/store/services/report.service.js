import axiosConfig from "../../api";

class ReportService {

    async getAllHistory(from, to) {
        const token = localStorage.getItem('token')

        return await axiosConfig().get(`office/report?from=${from}&to=${to}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async getPayoutInfo() {
        const token = localStorage.getItem('token')

        return await axiosConfig().get(`office/payoutinfo`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async updatePayoutInfo(payload) {
        const token = localStorage.getItem('token')

        return await axiosConfig().put(`office/payoutinfo`, {...payload}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async getCurrentPrescription(id) {
        const token = localStorage.getItem('token')

        return await axiosConfig().get(`office/prescription/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export default new ReportService()

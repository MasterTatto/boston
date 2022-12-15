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
}

export default new ReportService()

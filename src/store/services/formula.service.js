import axiosConfig from "../../api";

class FormulaService {

    async getAllFormulas() {
        const token = localStorage.getItem('token')

        return await axiosConfig().get(`office/formulas`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async getCurrentFormula(id) {
        const token = localStorage.getItem('token')

        return await axiosConfig().get(`office/formula/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async addedFormula(payload) {
        const token = localStorage.getItem('token')

        return await axiosConfig().post(`office/formula`, {...payload}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async updateFormula(payload, id) {
        const token = localStorage.getItem('token')

        return await axiosConfig().put(`office/formula/${id}`, {...payload}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async removeFormula(id) {
        const token = localStorage.getItem('token')

        return await axiosConfig().delete(`office/formula/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export default new FormulaService()

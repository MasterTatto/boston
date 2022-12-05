import axiosConfig from "../../api";

class PatientsService {

    async getAllPatients() {
        const token = localStorage.getItem('token')

        return await axiosConfig().get('office/patients', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async addedPatients(payload) {
        const token = localStorage.getItem('token')

        return await axiosConfig().post('office/patient', {...payload}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async updatePatients(payload, id) {
        const token = localStorage.getItem('token')

        return await axiosConfig().put(`office/patient/${id}`, {...payload}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async deletePatients(id) {
        const token = localStorage.getItem('token')

        return await axiosConfig().delete(`office/patient/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async getPatients(id) {
        const token = localStorage.getItem('token')

        return await axiosConfig().get(`office/patient/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async getPrescription(id) {
        const token = localStorage.getItem('token')

        return await axiosConfig().get(`office/patient/${id}/prescriptions`, {
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

    async getAllFormula() {
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

    async addedPrescriptionToPatient(payload) {
        const token = localStorage.getItem('token')

        return await axiosConfig().post(`office/prescription`, {...payload}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }


}

export default new PatientsService()

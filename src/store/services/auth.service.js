import axiosConfig from "../../api";
import axios from "axios";

class AuthService {

    async login(email, password) {
        return await axiosConfig().post('auth/login', {
            email,
            password
        })
    }

    async logout(refreshToken) {
        return await axiosConfig().post('auth/logout', {
            refreshToken
        })
    }

    async regStuff() {
        return await axiosConfig().get('auth/regstuff')
    }

    async checkEmail(email) {
        return await axiosConfig().get(`auth/checkemail?email=${email}`)
    }

    async registration(payload) {
        const formData = new FormData()

        function DataURIToBlob(dataURI) {
            const splitDataURI = dataURI.split(',')
            const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
            const mimeString = splitDataURI[0]?.split(':')[1]?.split(';')[0]
            const ia = new Uint8Array(byteString.length)
            for (let i = 0; i < byteString.length; i++)
                ia[i] = byteString.charCodeAt(i)

            return new Blob([ia], {type: mimeString})
        }

        formData.append('email', payload.email)
        formData.append('phone', payload.phone)
        formData.append('salutation', payload.salutation)
        formData.append('first_name', payload.first_name)
        formData.append('last_name', payload.last_name)
        formData.append('middle_name', payload.middle_name)
        formData.append('suffix', payload.suffix)
        formData.append('specialities', payload.specialities)
        formData.append('practice_clinic', payload.practice_clinic)
        formData.append('practice_type', payload.practice_type)
        formData.append('practice_credential', payload.practice_credential)
        formData.append('license_number', payload.license_number)
        formData.append('practice_state', payload.practice_state)
        formData.append('expiration_date', payload.expiration_date)
        formData.append('school', payload.school)
        formData.append('state_association', payload.state_association)
        formData.append('national_association', payload.national_association)
        formData.append('photo', payload?.photo.map(el => DataURIToBlob(el)))

        const res = await axios({
            url: `https://stage.acuboston.com/api/v1/auth/register`,
            method: 'POST',
            data: formData
        })
        return res
    }
}

export default new AuthService()



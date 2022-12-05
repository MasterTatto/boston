import axiosConfig from "../../api";

export class AuthServices {

    async login(email, password) {
        return await axiosConfig().post('auth/login', {
            email,
            password
        })
    }
}

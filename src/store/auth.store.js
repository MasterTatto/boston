import {makeAutoObservable} from "mobx";
import AuthService from "./services/auth.service";
import {toast} from "react-toastify";

export class AuthStore {
    isAuth = false
    buttonLoading = false
    user = {}
    regStuff = {}

    constructor() {
        makeAutoObservable(this)
        this.check();
    }

    async login(email, password, navigate) {
        this.setButtonLoading(true)
        try {
            const res = await AuthService.login(email, password)

            localStorage.setItem('fulfillment_fee', res.data.user.fulfillment_fee ? res.data.user.fulfillment_fee : 1)
            localStorage.setItem('token', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
            navigate('/patients')
            this.setIsAuth(true)
            this.setButtonLoading(false)
        } catch (e) {
            console.log(e)
            this.setIsAuth(false)
            this.setButtonLoading(false)
            toast.error(e.response.data, {
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

    async logout(navigate) {
        const token = localStorage.getItem('refreshToken')

        try {
            const res = await AuthService.logout(token)
            this.setIsAuth(false)
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            navigate('/login')
        } catch (e) {
            console.log(e)
            debugger
        }
    }

    async getRegStuff() {
        try {
            const res = await AuthService.regStuff()
            this.setRegStuff(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    async checkEmail(email) {
        try {
            const res = await AuthService.checkEmail(email)
            return res
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async registration(payload, setOpenModal) {
        try {
            const res = await AuthService.registration(payload)
            setOpenModal(true)
        } catch (e) {
            console.log(e)
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

    check() {
        const token = localStorage.getItem('refreshToken');
        if (token !== null) this.setIsAuth(true);
    }

    setIsAuth(auth) {
        this.isAuth = auth
    }

    setUser(user) {
        this.user = user
    }

    setRegStuff(regStuff) {
        this.regStuff = regStuff
    }

    setButtonLoading(loading) {
        this.buttonLoading = loading
    }
}

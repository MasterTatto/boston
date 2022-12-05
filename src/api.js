import axios from 'axios';

export default function axiosConfig() {

    const instance = axios.create({
        baseURL: 'https://stage.acuboston.com/api/v1/',
    });

    instance.interceptors.response.use((response) => response, async (error) => {
        console.log(error);
        const originalRequest = error.config;
        if (error.response.status === 401) {
            const token = localStorage.getItem('refreshToken')

            try {
                const res = await axios.post('https://stage.acuboston.com/api/v1/auth/refresh', {
                    refreshToken: token
                })

                localStorage.setItem('token', res.data.accessToken)
                localStorage.setItem('refreshToken', res.data.refreshToken)
                return axiosConfig().request({
                    ...originalRequest, headers: {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${res.data.accessToken}`
                    }
                });
            } catch (e) {
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                window.location.reload()
                window.location = "/login"
            }
        }
        throw error;
    });

    return instance;
}

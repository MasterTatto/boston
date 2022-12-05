import axiosConfig from "../../api";

class HerbsService {

    async getAllHerbs() {
        const token = localStorage.getItem('token')

        return await axiosConfig().get(`office/herbs`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export default new HerbsService()

import {makeAutoObservable} from "mobx";
import HerbsService from "./services/herbs.service";

export class HerbsStore {
    allHerbs = []
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    async getAllHerbs() {
        this.setIsLoading(true)
        try {
            const res = await HerbsService.getAllHerbs()
            this.setAllHerbs(res.data)
            this.setIsLoading(false)
        } catch (e) {
            console.log(e)
            this.setIsLoading(false)
        }
    }


    setIsLoading(loading) {
        this.isLoading = loading
    }

    setAllHerbs(herbs) {
        this.allHerbs = herbs
    }
}

import {AuthStore} from "./auth.store";
import {PatientsStore} from "./patients.store";
import {HerbsStore} from "./herbs.store";
import {FormulaStore} from "./formula.store";

class Store {

    constructor() {
        this.auth = new AuthStore();
        this.patients = new PatientsStore();
        this.herbs = new HerbsStore();
        this.formula = new FormulaStore();
    }
}

const store = new Store();
export default store;

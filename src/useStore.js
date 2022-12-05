// import {AuthService} from "./store/services/login.service";
// import {AuthStore} from "./store/login.store";
// import {createContext} from "react";
//
// // store login
// const authServices = new AuthService()
// const authStore = new AuthStore(authServices)
//
//
// export const StoreContext = createContext({
//     authStore
// })

import {useContext} from "react";
import {Context} from "./index";

export const useStore = () => {
    const { store } = useContext(Context);
    return store;
}

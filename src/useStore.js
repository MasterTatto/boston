// import {AuthService} from "./store/services/auth.service";
// import {AuthStore} from "./store/auth.store";
// import {createContext} from "react";
//
// // store auth
// const authServices = new AuthService()
// const authStore = new AuthStore(authServices)
//
//
// export const StoreContext = createContext({
//     authStore
// })

import {useContext} from "react";

export const useStore = () => {
    const { store } = useContext(Context);
    return store;
}

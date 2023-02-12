import './App.css';
// import 'antd/dist/reset.css';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import {useStore} from "./useStore";
import {observer} from "mobx-react-lite";
import SideBar from "./components/sideBar";
import Header from "./components/header";
import Routers from "./routers/routers";
import {useLocation, useNavigate, useRoutes} from "react-router-dom";
import {useEffect} from "react";
import {unAuthRoutes} from "./routers/links";
import {useWindowSize} from "./utils/useWindowSize";

const App = observer(() => {
    const store = useStore()
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const unAuthPage = useRoutes(unAuthRoutes)
    const {width} = useWindowSize()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    useEffect(() => {
        if (!store.auth.isAuth) {
            if (!['/login', '/registration'].includes(pathname)) {
                navigate('/login')
            }
        }
    }, [store.auth.isAuth])

    if (!store.auth.isAuth) {
        return unAuthPage
    }

    return (
        <div className="App">
            {width > 1000 ? <SideBar/> : null}

            <div className={'content'}>
                <Header/>

                <div className={'routers'}>
                    <Routers/>
                </div>
            </div>
        </div>
    );
})

export default App;

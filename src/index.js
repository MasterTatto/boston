import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from "./store/store";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-image-crop/dist/ReactCrop.css'
import {CookiesProvider} from "react-cookie";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <Context.Provider
            value={{
                store: store,
            }}
        >
            <CookiesProvider>
                <App/>
            </CookiesProvider>
        </Context.Provider>
    </BrowserRouter>
);

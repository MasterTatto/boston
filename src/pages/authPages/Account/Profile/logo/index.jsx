import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import axios from "axios";
import {toast} from "react-toastify";
import axiosConfig from "../../../../../api";
import RemoveLogo from "../../paymentHistory/removeLogo";
import ImgEditor from "../../../../../components/editorImg";
import {useStore} from "../../../../../useStore";
import {Button, Skeleton} from "antd";

const Logo = () => {
    const store = useStore()

    const [showAddedLogo, setShowAddedLogo] = useState(false)
    const [firstLoadingLogo, setFirstLoadingLogo] = useState(false)
    const [logo, setLogo] = useState(null)
    const [loadingButton, setLoadingButton] = useState(false)
    const [removeLogo, setRemoveLogo] = useState(false)

    const getLogo = async () => {
        const token = localStorage.getItem('token')
        setFirstLoadingLogo(true)
        try {
            const response = await fetch('https://stage.acuboston.com/api/v1/office/logo', {
                method: 'GET',
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const blob = await response.blob()

            function blobToBase64(blob) {
                return new Promise((resolve, _) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
            }

            blobToBase64(blob).then((res) => {
                    setLogo(res === 'data:' ? null : res)
                }
            )

            setFirstLoadingLogo(false)
        } catch (e) {

            setFirstLoadingLogo(false)
            console.log(e)
        }
    }

    const downloadLogo = async (url) => {
        const token = localStorage.getItem('token')
        setLoadingButton(true)
        try {
            const formData = new FormData()

            formData.append('logo ', url)

            const res = await axios({
                url: `https://stage.acuboston.com/api/v1/office/logo`,
                method: 'POST',
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const response = await fetch('https://stage.acuboston.com/api/v1/office/logo', {
                method: 'GET',
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const blob = await response.blob()

            function blobToBase64(blob) {
                return new Promise((resolve, _) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
            }

            blobToBase64(blob).then((res) => {
                    setLogo(res === 'data:' ? null : res)
                }
            )
            // setLogo(res2.data)
            setShowAddedLogo(false)
            setLoadingButton(false)
            toast.success('Your logo uploading', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            console.log(e)
            setLoadingButton(false)
            toast.error('Something went wrong', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setShowAddedLogo(true)
        }
    }

    const removeLogoHandler = async () => {
        const token = localStorage.getItem('token')

        try {
            const res = await axios.delete('https://stage.acuboston.com/api/v1/office/logo', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setLogo(null)
            setRemoveLogo(false)
            toast.success('Your logo removed', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

        } catch (e) {
            console.log(e)
            const originalRequest = e.config;

            if (e.response.status === 401) {
                const token = localStorage.getItem('refreshToken')

                const res = await axios.post('https://stage.acuboston.com/api/v1/auth/refresh', {
                    refreshToken: token
                })

                localStorage.setItem('token', res.data.accessToken)
                localStorage.setItem('refreshToken', res.data.refreshToken)

                setLogo(null)
                setRemoveLogo(false)
                toast.success('Your logo removed', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });

                return axiosConfig().request({
                    ...originalRequest, headers: {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${res.data.accessToken}`
                    }
                });

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

    useEffect(() => {
        getLogo()
    }, [])

    return (
        <div className={s.logo}>
            {removeLogo &&
                <RemoveLogo onClick={removeLogoHandler} open={removeLogo} onClose={() => setRemoveLogo(false)}/>}
            {showAddedLogo &&
                <ImgEditor loading={loadingButton} onClick={(url) => downloadLogo(url)} open={showAddedLogo}
                           onClose={() => setShowAddedLogo(false)}/>}
            <div className={s.logo_added_box}>
                <h3 className={s.detalis_title}>Your company logo</h3>

                {firstLoadingLogo && <Skeleton.Avatar width={'100%'} style={{
                    width: '100%',
                    height: '100px',
                    marginTop: '20px'
                }} active={true} shape={'square'}/>}
                {!firstLoadingLogo && <>
                    {logo && <div className={s.logo_box}>
                        <img src={logo} alt=""/>
                    </div>}

                    <div className={s.btns_box}>
                        <Button className={s.added_btn}
                                onClick={() => setShowAddedLogo(true)}>{logo ? 'Change logo' : 'Added logo'}</Button>
                        {logo &&
                            <Button className={s.remove_btn} onClick={() => setRemoveLogo(true)}>Remove
                                logo</Button>}
                    </div>
                </>}
            </div>
        </div>
    );
};

export default Logo;

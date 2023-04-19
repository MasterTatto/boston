import React, {useEffect, useRef, useState} from 'react';
import s from './styles.module.css'
import {Button, Input, Skeleton} from "antd";
import {ReactComponent as Edit} from "../../../../assets/edit_text.svg";
import {ReactComponent as Plus} from "../../../../assets/plus.svg";
import classNames from "classnames";
import {useStore} from "../../../../useStore";
import ImgEditor from "../../../../components/editorImg";
import axios from "axios";
import {toast} from "react-toastify";
import RemoveLogo from "../removeLogo";
import axiosConfig from "../../../../api";

const RightSide = ({balance}) => {
    const store = useStore()

    const inputRef = useRef(null)

    const [showAddedLogo, setShowAddedLogo] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [values, setValues] = useState({
        payout_person: '',
        payout_address: '',
    })
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

    const updatePayoutInfo = async () => {
        await store.history.updatePayoutInfo(values)
        await store.history.getPayoutInfo()
        setValues({
            payout_address: store.history.payoutInfo?.payout_address,
            payout_person: store.history.payoutInfo?.payout_person
        })
        setIsDisabled(true)
    }

    useEffect(() => {
        getLogo()
    }, [])

    useEffect(() => {
        const getPayoutInfo = async () => {
            await store.history.getPayoutInfo()
            setValues({
                payout_address: store.history.payoutInfo?.payout_address,
                payout_person: store.history.payoutInfo?.payout_person
            })
        }
        getPayoutInfo()
        console.log(logo)
    }, [])

    console.log(logo)
    return (
        <div className={s.right_side}>
            {removeLogo &&
                <RemoveLogo onClick={removeLogoHandler} open={removeLogo} onClose={() => setRemoveLogo(false)}/>}
            {showAddedLogo &&
                <ImgEditor loading={loadingButton} onClick={(url) => downloadLogo(url)} open={showAddedLogo}
                           onClose={() => setShowAddedLogo(false)}/>}
            {/*{showAddedLogo && <h1>hello</h1>}*/}
            <div className={s.balance_box}>
                <p className={s.text_balance}>Your balance</p>
                <p className={s.balance}>{`$${balance}`}</p>
                <p className={s.description_balance}>Account Balances in excess of $30 are paid monthly by check</p>
            </div>
            <div className={s.detalis}>
                <h3 className={s.detalis_title}>Payment details</h3>
                <div className={s.input_box}>
                    <div className={s.input_box}>
                        <label className={s.label}>Name</label>
                        <Input disabled={isDisabled}
                               placeholder={'Whom the check is payable to'}
                               ref={inputRef}
                               onChange={(e) => setValues({...values, payout_person: e.target.value})}
                               value={values.payout_person}
                        />
                    </div>
                    <div className={s.input_box}>
                        <label className={s.label}>Address</label>
                        <Input disabled={isDisabled}
                               placeholder={'Fill in address'}
                               onChange={(e) => setValues({...values, payout_address: e.target.value})}
                               value={values.payout_address}
                        />
                    </div>
                    {isDisabled && <p className={s.edit} onClick={() => {
                        setIsDisabled(false)
                        setTimeout(() => inputRef.current.focus(), 100)

                    }}>
                        <Edit/>
                        Edit information
                    </p>}
                    {!isDisabled && <p className={classNames(s.edit, s.edit_dave)} onClick={updatePayoutInfo}>
                        Save
                    </p>}
                </div>
            </div>

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

export default RightSide;

import React, {useEffect, useRef, useState} from 'react';
import s from './styles.module.css'
import {Button, DatePicker, Input, Skeleton, Switch} from "antd";
import {useStore} from "../../../../useStore";
import {ReactComponent as Arrow} from '../../../../assets/arrow_select.svg'
import {ReactComponent as Edit} from "../../../../assets/edit_text.svg";
import classNames from "classnames";
import {observer} from "mobx-react-lite";
import Item from "./item/item";
import moment from "moment/moment";
import axios from "axios";
import {toast} from "react-toastify";
import RemoveLogo from "../removeLogo";
import ImgEditor from "../../../../components/editorImg";
import axiosConfig from "../../../../api";

const MobilePaymentHistory = observer(() => {
    const store = useStore()
    const inputRef = useRef(null)

    const [showAddedLogo, setShowAddedLogo] = useState(false)
    const [firstLoadingLogo, setFirstLoadingLogo] = useState(false)
    const [logo, setLogo] = useState(null)
    const [loadingButton, setLoadingButton] = useState(false)
    const [removeLogo, setRemoveLogo] = useState(false)

    const [patients, setPatients] = useState([])
    const [selectedID, setSelectedID] = useState()
    const [openBalanceInfo, setOpenBalanceInfo] = useState(false)
    const [history, setHistory] = useState()
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)
    const [classic, setClassic] = useState(false)
    const [values, setValues] = useState({
        payout_person: '',
        payout_address: '',
    })

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
            payout_address: store.history.payoutInfo?.payout_address || 'Empty',
            payout_person: store.history.payoutInfo?.payout_person || 'Empty'
        })
        setIsDisabled(true)
    }

    const chooseDay = async (from, to) => {

        await store.history.getAllHistory(from, to, classic)
        setHistory(store.history.allReport)

    }

    const getCurrentPrescription = async (id) => {
        await store.history.getCurrentPrescription(id)
    }

    useEffect(() => {
        getLogo()
    }, [])

    useEffect(() => {
        const getPayoutInfo = async () => {
            await store.history.getPayoutInfo()
            await store.patients.getAllPatients()
            setPatients(store.patients.allPatients)
            setValues({
                payout_address: store.history.payoutInfo?.payout_address || 'Empty',
                payout_person: store.history.payoutInfo?.payout_person || 'Empty'
            })
        }
        getPayoutInfo()
    }, [])

    useEffect(() => {
        const getAllHistory = async () => {
            const date = new Date()
            const start = moment(date).add(-6, 'month');

            const date1 = new Date()
            const date2 = new Date(start.format())

            const toDate = `${date1.getFullYear()}-${date1.getMonth() + 1 < 10 ? `0${date1.getMonth() + 1}` : date1.getMonth() + 1}-${date1.getDate() < 10 ? `0${date1.getDate()}` : date1.getDate()}`
            const fromDate = `${date2.getFullYear()}-${date2.getMonth() + 1 < 10 ? `0${date2.getMonth() + 1}` : date2.getMonth() + 1}-${date2.getDate() < 10 ? `0${date2.getDate()}` : date2.getDate()}`

            setTo(toDate)
            setFrom(fromDate)

            await store.history.getAllHistory(fromDate, toDate, classic)

            setHistory(store.history.allReport)
        }

        getAllHistory()
    }, [])



    return (
        <div className={s.mobile}>
            {removeLogo &&
                <RemoveLogo onClick={removeLogoHandler} open={removeLogo} onClose={() => setRemoveLogo(false)}/>}
            {showAddedLogo &&
                <ImgEditor loading={loadingButton} onClick={(url) => downloadLogo(url)} open={showAddedLogo}
                           onClose={() => setShowAddedLogo(false)}/>}
            <div className={s.header}>
                <div className={s.top_header}>
                    <p className={s.title}>Account Statement</p>
                    <p className={classNames(s.balance, openBalanceInfo && s.rotate)}
                       onClick={() => setOpenBalanceInfo(!openBalanceInfo)}>Balance <Arrow/></p>
                </div>

                <div className={s.info} style={{
                    height: (openBalanceInfo && logo) && '630px' || openBalanceInfo && '430px'
                }}>
                    <div className={s.balance_box}>
                        <p className={s.balance_title}>Your balance:</p>
                        <p className={s.balance_count}>
                            {`$${history?.current_balance || 0}`}</p>
                        <p className={s.balance_description}>
                            Account Balances in excess of $30 are paid monthly by check
                        </p>
                    </div>

                    <div className={s.detalis}>
                        <h3 className={s.detalis_title}>Payment details</h3>
                        <div className={s.input_box}>
                            <div className={s.input_box}>
                                <label className={s.label}>Name</label>
                                <Input disabled={isDisabled}
                                       ref={inputRef}
                                       onChange={(e) => setValues({...values, payout_person: e.target.value})}
                                       value={values.payout_person}
                                />
                            </div>
                            <div className={s.input_box}>
                                <label className={s.label}>Address</label>
                                <Input disabled={isDisabled}
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
                </div>

                <div className={s.date}>
                    <DatePicker
                        placeholder={from}
                        onChange={async (e) => {
                            const date = new Date(e)
                            await chooseDay(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`, to)
                            setFrom(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`)
                        }}
                    />
                    <p className={s.arrow}/>
                    <DatePicker
                        placeholder={to}
                        onChange={async (e) => {
                            const date = new Date(e)
                            await chooseDay(from, `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`)
                            setTo(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`)
                        }}/>
                </div>

                <div className={s.switch_box}>
                    <div className={s.switch}>
                        <Switch
                            checked={classic}
                            onChange={async (e) => {
                                setClassic(e)
                                await store.history.getAllHistory(from, to, e)
                                setHistory(store.history.allReport)
                            }}
                        />
                        <span className={s.switch_box_title}>Payouts only</span>
                    </div>
                </div>
            </div>

            {/*{store.history.isLoading ? <Loader/> : */}
            <div className={s.items_box}>
                {history?.rows?.map((el, i) => <Item patients={patients} getCurrentPrescription={getCurrentPrescription}
                                                     selectedID={selectedID} setSelectedID={setSelectedID} key={i}
                                                     index={i} {...el}/>)}
            </div>
            {/*// }*/}
        </div>
    );
});

export default MobilePaymentHistory;

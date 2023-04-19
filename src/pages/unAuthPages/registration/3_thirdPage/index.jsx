import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import {Button, Input, Upload} from 'antd';
import {DeleteOutlined, UploadOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import ModalShowImg from "../modalShowImg";
import {toast} from "react-toastify";


const ThirdPage = ({registration, changeValues, values}) => {
    const navigate = useNavigate()

    const [currentImg, setCurrentImg] = useState(null)
    // const [semiImg, setSemiImg] = useState([])
    const [fileList, setFileList] = useState([])

    const wait_registration = window.localStorage.getItem('wait_registration')
    const registration_values = JSON.parse(window.localStorage.getItem('registration_values'))

    //

    // useEffect(() => {
    //     if (wait_registration === 'yes') {
    //
    //         if (values.photo.length === 0) {
    //             setSemiImg([])
    //             return
    //         }
    //
    //         for (let i = 0; i < values.photo?.length; i++) {
    //
    //             for (let y = 0; y < registration_values.photo?.length; y++) {
    //
    //                 if (values.photo[i] === registration_values?.photo[y]) {
    //                     if (semiImg?.find((f) => f === values.photo[i])) return
    //                     setSemiImg([...semiImg, values.photo[i]])
    //                 }
    //             }
    //
    //         }
    //     }
    // }, [values.photo, wait_registration])

    // console.log(semiImg)
    const props = {
        beforeUpload: (test) => {
            return false;
        },
        onChange(info) {
            const getBase64 = (img, callback) => {
                const reader = new FileReader();
                reader.addEventListener('load', () => callback(reader.result))
                // debugger
                reader.readAsDataURL(img?.originFileObj ? img.originFileObj : img);
            }

            // console.log(fileList)
            //
            // console.log(values)
            // getBase64(info.file, (url) => {
            //     // console.log(url)
            //     if (registration_values.photo.some(e => e === url)) {
            //         console.log('here')
            //         return false
            //     } else {
            if (info.file.status === 'removed') {

                getBase64(info.file, (url) => {

                    setFileList(info.fileList.filter(f => f.uid !== info.file.uid))
                    changeValues('photo', values.photo.filter((f) => f !== url))
                })
            }

            if (info.file.status !== 'uploading') {

                getBase64(info.file, (url) => {
                    console.log(info.file)
                    if (values.photo.length >= 5 && info.file.status !== 'removed') {
                        toast.error('Max limit upload file = 5.', {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        });
                        return
                    }
                    // if (registration_values.photo.some(e => e === url)) {
                    if (values.photo.some(e => e === url)) {
                        if (info.file.status === 'removed') return
                        if (values.photo.length >= 5 && info.file.status !== 'removed') {
                            toast.error('Max limit upload file = 5.', {
                                position: "bottom-left",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            });
                            return
                        }
                        console.log('semi')
                        toast.error('You have already downloaded this file.', {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        });
                        return
                        // changeValues('photo', values.photo.slice(0, -1))
                        // setFileList(info.fileList.map(f => f.uid === info.file.uid ? ({...f, status: 'error'}) : f))
                    } else {
                        if (values.photo.length >= 5 && info.file.status !== 'removed') {
                            toast.error('Max limit upload file = 5.', {
                                position: "bottom-left",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            });
                            return
                        }
                        // setFileList(info.fileList.map(el => ({...el, status: 'done', name: el.name})))
                        setFileList(info.fileList)
                        // setFileList([...fileList, {
                        //     uid: info.file.uid,
                        //     lastModified: info.file.lastModified,
                        //     lastModifiedDate: info.file.lastModifiedDate,
                        //     name: info.file.name,
                        //     size: info.file.size,
                        //     type: info.file.type,
                        //     webkitRelativePath: info.file.webkitRelativePath,
                        // }])
                        if (info.file.status === 'removed') return
                        changeValues('photo', [...values.photo, url])
                        console.log('not semi')
                    }
                })
                // for (let i = 0; i < info.fileList.length; i++) {
                //
                //     getBase64(info.fileList.length !== 0 && info.fileList[i].originFileObj, (url) => {
                //         if (registration_values.photo.some(e => e === url)) {
                //             console.log('semi')
                //             // changeValues('photo', values.photo.slice(0, -1))
                //             setFileList(info.fileList.map(f => f.uid === info.file.uid ? ({...f, status: 'error'}) : f))
                //         } else {
                //             setFileList(info.fileList.map(el => ({...el, status: 'done', name: el.name})))
                //             changeValues('photo', [...values.photo, url])
                //             console.log('not semi')
                //         }
                //     })
                // }
            }


            // }
            // })


        },
    };
    console.log(values)
    console.log(fileList)
    return (
        <div className={s.third_page}>
            {currentImg !== null &&
                <ModalShowImg img={currentImg} openModal={currentImg !== null} setOpenModal={setCurrentImg}/>}
            <h3 className={s.title}>Upload Files</h3>

            <div className={s.upload}>
                <Upload maxCount={5} {...props} fileList={fileList}>
                    <label className={s.label}>Students / Practices</label>
                    <div className={s.input_upload}>
                        <Input disabled={true} value={`Upload photo of license`} onChange={(e) => {
                        }}/>
                        <div className={s.upload_btn}>
                            <UploadOutlined/>
                        </div>
                    </div>

                    <span className={s.label_upload}>Attach a copy of your acupuncture school's student card or your state license or NCCAOM and a graduation diploma</span>
                </Upload>
            </div>

            {/*<div className={s.upload}>*/}
            {/*    <Upload maxCount={5} {...props}>*/}
            {/*        <label className={s.label}>Practices</label>*/}
            {/*        <div className={s.input_upload}>*/}
            {/*            <Input disabled={true} value={`Upload photo of license`} onChange={(e) => {*/}
            {/*            }}/>*/}
            {/*            <div className={s.upload_btn}>*/}
            {/*                <UploadOutlined/>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <span className={s.label_upload}>Attach a copy of your state license or NCCAOM and a graduation diploma</span>*/}
            {/*    </Upload>*/}
            {/*</div>*/}

            {wait_registration === 'yes' && <div className={s.uploaded_files_box}>
                <h3 className={s.title}>Uploaded files</h3>
                <div className={s.uploaded_files}>
                    {values.photo?.map((el, i) => {
                        // if (registration_values.photo.some(e => e !== el)) return
                        return <div key={`${el}${i}`} style={{
                            display: !registration_values.photo.some(e => e !== el) && 'none'
                        }} onClick={() => setCurrentImg(el)}
                                    className={s.uploaded_file_item}>
                            <span>{`File ${i + 1}`}</span>
                            <DeleteOutlined onClick={(e) => {
                                e.stopPropagation()

                                const getBase64 = (img, callback) => {
                                    const reader = new FileReader();
                                    reader.addEventListener('load', () => callback(reader.result))
                                    // debugger
                                    reader.readAsDataURL(img?.originFileObj ? img.originFileObj : img);
                                }

                                changeValues('photo', values.photo.filter((f) => f !== el))
                                for (let i = 0; i < fileList.length; i++) {
                                    getBase64(fileList[i], (url) => {
                                        if (url !== el) return
                                        console.log(fileList)
                                        console.log(i)
                                        setFileList(fileList.filter((f, indx) => indx !== i))
                                    })
                                }

                                // if (registration_values.photo.some(e => e === el)) {
                                //     console.log('yes')
                                //     // setFileList(fileList.filter((f, indx) => indx !== i))
                                // }
                                // window.localStorage.setItem('registration_values', JSON.stringify({
                                //     ...values,
                                //     photo: values.photo.filter((f) => f !== el)
                                // }))
                            }}/>
                        </div>
                    })}
                </div>

            </div>}

            <div className={s.action_box}>
                <Button className={s.btn} onClick={registration}
                >Sign Up</Button>

                <p>Already have an account?<span onClick={() => navigate('/login')}> Sign In</span></p>
            </div>


        </div>
    );
};

export default ThirdPage;

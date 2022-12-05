import React from 'react';
import s from './styles.module.css'
import {Button, Input, message, Upload} from 'antd';
import {UploadOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";


const ThirdPage = ({registration, changeValues, values}) => {
    const navigate = useNavigate()

    const props = {
        beforeUpload: () => {
            return false;
        },
        onChange(info) {
            const getBase64 = (img, callback) => {
                const reader = new FileReader();
                reader.addEventListener('load', () => callback(reader.result))
                reader.readAsDataURL(img);
            }

            if (info.file.status !== 'uploading') {

                for (let i = 0; i < info.fileList.length; i++) {

                    getBase64(info.fileList[i].originFileObj, (url) => {

                        changeValues('photo', [...values.photo, url])
                    })
                }
            }

            if (info.file.status === 'removed') {
                getBase64(info.file.originFileObj, (url) => {

                    changeValues('photo', values.photo.filter((f) => f !== url))
                })
            }
        },
    };
    return (
        <div className={s.third_page}>
            <h3 className={s.title}>Practice Info</h3>

            <div className={s.upload}>
                <Upload {...props}>
                    <label className={s.label}>Students</label>
                    <div className={s.input_upload}>
                        <Input disabled={true} value={`Upload photo of license`} onChange={(e) => {
                        }}/>
                        <div className={s.upload_btn}>
                            <UploadOutlined/>
                        </div>
                    </div>

                    <span className={s.label_upload}>Attach a copy of your acupuncture school's student card</span>
                </Upload>
            </div>

            <div className={s.upload}>
                <Upload {...props}>
                    <label className={s.label}>Practices</label>
                    <div className={s.input_upload}>
                        <Input disabled={true} value={`Upload photo of license`} onChange={(e) => {
                        }}/>
                        <div className={s.upload_btn}>
                            <UploadOutlined/>
                        </div>
                    </div>

                    <span className={s.label_upload}>Attach a copy of your state license For states without a licensed copy of NCCAOM and a dipl</span>
                </Upload>
            </div>

            <div className={s.action_box}>
                <Button className={s.btn} onClick={registration}
                >Sign Up</Button>

                <p>Already have an account?<span onClick={() => navigate('/login')}> Sign In</span></p>
            </div>
        </div>
    );
};

export default ThirdPage;

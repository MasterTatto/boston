import React from 'react';
import s from "../../../../../components/editorImg/styles.module.css";
import {Button, Modal} from "antd";
import classNames from "classnames";

const RemoveLogo = ({open,onClose,onClick}) => {
    return (
        <div>
            <Modal
                title="Remove logo?"
                // className={s.modal}
                style={{
                    padding: '20px 0'
                }}
                centered
                width={315}
                footer={<div className={s.btn_box}>
                    <Button
                        onClick={onClick}
                        className={classNames(s.btn, s.cancel2)}
                    >Yes</Button>
                    <Button
                        onClick={onClose}
                        className={classNames(s.btn, s.add)}
                    >
                        No</Button>
                </div>}
                open={open}
                onCancel={onClose}
                // maskClosable={false}
            >
            </Modal>
        </div>
    );
};

export default RemoveLogo;

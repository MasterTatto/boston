import React, {useEffect, useRef, useState} from 'react';
import s from './styles.module.css'
import ReactCrop, {centerCrop, makeAspectCrop} from "react-image-crop";
import {useDebounceEffect} from "../../utils/useDebounceEffect";
import {canvasPreview} from "../../utils/canvasPrev";
import {Button, Modal} from "antd";
import classNames from "classnames";
import {UploadOutlined} from "@ant-design/icons";
import {useWindowSize} from "../../utils/useWindowSize";
import {imgPreview} from "../../utils/imgPrev";

const ImgEditor = ({open, onClose, onClick, loading}) => {
    const imgRef = useRef(null)
    const previewCanvasRef = useRef(null)
    const blobUrlRef = useRef('')
    const hiddenAnchorRef = useRef(null)

    const {width} = useWindowSize()

    const [scale, setScale] = useState(1)
    const [imgSrc, setImgSrc] = useState('')
    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState()

    function centerAspectCrop(
        mediaWidth,
        mediaHeight,
        aspect,
    ) {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                aspect,
                mediaWidth,
                mediaHeight,
            ),
            mediaWidth,
            mediaHeight,
        )
    }

    function onImageLoad(e) {
        const {width, height} = e.currentTarget
        setCrop(centerAspectCrop(width, height, 3 / 1))
    }

    function onDownloadCropClick() {
        if (!previewCanvasRef.current) {
            throw new Error('Crop canvas does not exist')
        }

        previewCanvasRef.current.toBlob((blob) => {
            if (!blob) {
                throw new Error('Failed to create blob')
            }
            if (blobUrlRef.current) {
                URL.revokeObjectURL(blobUrlRef.current)
            }
            onClick(blob)

            // console.log(URL.createObjectURL(blob))
            // blobUrlRef.current = URL.createObjectURL(blob)
            // hiddenAnchorRef.current.href = blobUrlRef.current
            // hiddenAnchorRef.current.click()
        })
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }

    const fileDrop = (e) => {
        e.preventDefault();
        // console.log(e.target.files)
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(files[0])
        }
    }

    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale
                )
            }
        },
        0,
        [completedCrop, crop, scale],
    )

    console.log(previewCanvasRef)

    return (
        <div>
            {/*<UploadOutlined />*/}
            <Modal
                title=""
                // className={s.modal}
                style={{
                    padding: '20px 0'
                }}
                centered
                width={width >= 1000 ? '60vw' : '90vw'}
                footer={<div className={s.btn_box}>
                    <Button onClick={onClose} className={classNames(s.btn, s.cancel)}
                    >Cancel</Button>
                    {imgSrc && <Button
                        onClick={onDownloadCropClick}
                        className={classNames(s.btn, s.add)}
                        loading={loading}>Save</Button>}
                </div>}
                open={open}
                onCancel={onClose}
                maskClosable={false}
            >
                {!imgSrc && <div className={s.upload_img} onDragOver={dragOver}
                                 onDragEnter={dragEnter}
                                 onDragLeave={dragLeave}
                                 onDrop={fileDrop}>
                    <input className={s.upload_input} type="file" accept="image/*" onChange={onSelectFile}/>
                    <UploadOutlined/>
                    <h3>Choose or drag logo here</h3>
                </div>}

                {imgSrc && <Button className={classNames(s.btn, s.clear)} onClick={() => setImgSrc('')}>Clear</Button>}
                <div className={s.content_image}>
                    {imgSrc !== '' && <div className={s.initial}>
                        <h3>Initial logo:</h3>
                        <ReactCrop
                            aspect={3 / 1}
                            // locked={true}
                            crop={crop}
                            scale={scale}
                            onChange={(_, percentCrop) => {
                                console.log(percentCrop)
                                setCrop(percentCrop)
                            }}
                            onComplete={(c) => {
                                setCompletedCrop(c)
                            }}
                        >

                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                                id={'img_initial'}
                                onLoad={onImageLoad}
                                style={{
                                    transform: `scale(${scale})`,
                                    // width: '50vw',
                                    // // width: '100%',
                                    // height: 'auto',
                                }}
                                // onLoad={onImageLoad}
                            />
                        </ReactCrop></div>}

                    {(imgSrc) && <div className={s.canvas}>
                        <h3>Result logo:</h3>
                        <canvas
                            ref={previewCanvasRef}
                            style={{
                                border: '1px solid black',
                            }}
                        />
                    </div>}
                </div>
                {/*{completedCrop && <button onClick={onDownloadCropClick}>Download</button>}*/}
                <a
                    ref={hiddenAnchorRef}
                    download
                    style={{
                        position: 'absolute',
                        top: '-200vh',
                        visibility: 'hidden',
                    }}
                >
                    Hidden download
                </a>
            </Modal>
        </div>
    );
};

export default ImgEditor;

import React from 'react';
import s from './styles.module.css'
import img1 from '../../../../assets/auth_img1.png'
import img2 from '../../../../assets/auth_img2.png'

const MediaAuth = () => {
    return (
        <div className={s.media_auth}>
            <div className={s.media_top}>
                <img className={s.img1} src={img1} alt="img1"/>
                <img className={s.img2} src={img2} alt="img2"/>
                <div className={s.media_text}>
                    <h3>Your own herbal pharmacy</h3>
                    <p>We can serve as your own herbal pharmacy where you can design custom herbal formulas according to
                        FDA GMP requirements without the burden of paperwork
                        and proper inventory control so you can focus on your patients.</p>
                </div>
            </div>
            <div className={s.media_bottom}>
                <h2>How to start?</h2>
                <iframe className={s.iframe} src="https://www.youtube.com/embed/fKopy74weus"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
            </div>
        </div>
    );
};

export default MediaAuth;

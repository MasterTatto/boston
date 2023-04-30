import React, {useState} from 'react';
import s from './styles.module.css'
import avatar from '../../../../../assets/user.png'
import {ReactComponent as Upload} from '../../../../../assets/upload.svg'

const Avatar = () => {
    const userName = localStorage.getItem('name_user')

    const [mouseInAvatar, setMouseInAvatar] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState(null)

    return (
        <div className={s.avatar}>
            <div className={s.avatar_box}
                 onMouseLeave={() => setMouseInAvatar(false)}
                 onMouseEnter={() => setMouseInAvatar(true)}
                 style={{
                     backgroundImage: `url(${avatarUrl ? URL.createObjectURL(avatarUrl) : avatar})`
                 }}>
                <div className={s.new_avatar} style={{
                    bottom: mouseInAvatar ? 0 : '-100px'
                }}>
                    <input type="file" className={s.upload} onChange={(e) => {
                        console.log(e.target.files[0]);
                        setAvatarUrl(e.target.files[0])
                    }}/>
                    <Upload/>
                </div>
                {/*<img src={avatar} alt="avatar"/>*/}
            </div>
            <p className={s.username}>{userName}</p>
        </div>
    );
};

export default Avatar;

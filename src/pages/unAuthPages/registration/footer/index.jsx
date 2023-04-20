import React from 'react';
import s from './styles.module.css'

const Footer = () => {
    return (
        <div className={s.footer}>
            <h3>Benefits of Joining AcuBoston Herbal Pharmacy</h3>
            <ul className={s.ul}>
                <li> 1. Create custom FDA GMP-compliant formulas from highest quality individual herbs</li>
                <li> 2. Use your own clinic logo on every prescription</li>
                <li> 3. Allow AcuBoston pharmacists to review your formula for quality control</li>
                <li> 4. Let AcuBoston Herbal Pharmacy mail your custom formulas to your patients</li>
            </ul>
        </div>
    );
};

export default Footer;

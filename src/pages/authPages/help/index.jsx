import React from 'react';
import s from './styles.module.css'
import {ReactComponent as Auth1} from "../../../assets/auth1.svg";
import {ReactComponent as Auth2} from "../../../assets/auth2.svg";
import {ReactComponent as Auth3} from "../../../assets/auth3.svg";
import {ReactComponent as Auth4} from "../../../assets/auth4.svg";

const mapingData = [
    {
        svg: <Auth3/>,
        title: 'Climate-controlled inventory, high quality ingredients',
        subtitle: 'AcuBoston Herbal Pharmacy maintains a climate-controlled inventory of hundreds of fresh TCM ingredients of highest quality. You can view a full list of our wholesale per gram prices listed for each TCM ingredient',
        id: 3
    },
    {
        svg: <Auth1/>,
        title: 'You design custom TCM formulas',
        subtitle: 'Use AcuBoston Herbal Pharmacy app to design custom herbal formulas for your patients. Let AcuBoston fill your prescription according to FDA GMP requirements and take care of billing and shipping.',
        id: 1
    },
    {
        svg: <Auth2/>,
        title: 'We fulfill your orders and deliver to your patients',
        subtitle: 'Once your patient pays for their prescription via emailed link, we will fill your order and mail the formula to your patient.',
        id: 2
    },

    {
        svg: <Auth4/>,
        title: 'You set your own prescription $prices for your patients',
        subtitle: <>
            Set your own prescription $prices for your patients. Add your own Practitioner Expert Fee
            surcharge to the wholesale price for your TCM formula.
            <br/>
            <div style={{
                marginBottom: '10px'
            }}/>
            AcuBoston only charges a small flat fulfillment fee
            of $3.95 per bottle in addition to listed wholesale cost of ingredients and shipping. Your Practitioner
            Expert Fee can be set via a drop-down ‘Markup’ field.
            <br/>
            <div style={{
                marginBottom: '10px'
            }}/>
            Markup set at default “x3” means that the patient pays
            triple charges compared to the wholesale cost of the custom formula.
            <br/>
            <div style={{
                marginBottom: '10px'
            }}/>
            Your accumulated Practitioner Expert
            Fees will be listed in your secure online account and will be paid to you by AcuBoston Herbal Pharmacy.
        </>, id: 4
    },
]

const Help = () => {
    return (
        <div className={s.help}>
            <p className={s.title}>AcuBoston Herbal Pharmacy</p>
            <p className={s.switch_box_title}>Custom Herbal Prescriptions Pharmacy conforming to FDA GMP
                requirements</p>
            <p className={s.therd_block}>FOR LICENSED TCM PRACTITIONERS AND STUDENTS</p>

            <div className={s.wrapper}>
                {mapingData.map((el, i) => {
                    return <div className={s.item} key={i}>
                        <div className={s.svg}>
                            {el.svg}
                        </div>
                        <p className={s.subtitle}>{el.subtitle}</p>
                    </div>
                })}
            </div>
        </div>
    );
};

export default Help;

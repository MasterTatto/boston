import React from 'react';
import s from './styles.module.css'
import {DatePicker, Input, Select} from "antd";
import {observer} from "mobx-react-lite";

const STATES = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District Of Columbia',
    'Federated States Of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Islands',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
];

const SecondPage = observer(({
                                 changeValues,
                                 values,
                                 schools,
                                 stateAssociations,
                                 nationalAssociations,
                                 practices,
                                 credentials
                             }) => {
    return (
        <div className={s.second_page}>
            <h3 className={s.title}>Practice Info</h3>

            <div className={s.box}>
                <label className={s.label}>Clinic Name</label>
                <Input onChange={(e) => changeValues('practice_clinic', e.target.value)}
                       value={values.practice_clinic}/>
            </div>

            <div className={s.box}>
                <label className={s.label}>Practice Type</label>
                <Select
                    placeholder={''}
                    style={{width: '100%'}}
                    onChange={(e) => {
                        changeValues('practice_type', e)
                    }}
                    value={values.practice_type}
                    options={practices.map((el) => ({
                        value: el,
                        label: el,
                    }))}
                />
            </div>

            <div className={s.box}>
                <label className={s.label}>Credential</label>
                <Select
                    placeholder={''}
                    style={{width: '100%'}}
                    onChange={(e) => {
                        changeValues('practice_credential', e)
                    }}
                    value={values.practice_credential}
                    options={credentials.map((el) => ({
                        value: el,
                        label: el,
                    }))}
                />
            </div>

            <div className={s.box}>
                <label className={s.label}>License Number</label>
                <Input onChange={(e) => changeValues('license_number', e.target.value)} value={values.license_number}/>
            </div>

            <div className={s.box}>
                <label className={s.label}>State</label>
                <Select
                    placeholder={''}
                    style={{width: '100%'}}
                    onChange={(e) => {
                        changeValues('practice_state', e)
                    }}
                    value={values.practice_state}
                    options={STATES.map((el) => ({
                        value: el,
                        label: el,
                    }))}
                />
            </div>

            <div className={s.box}>
                <label className={s.label}>Expiration Date</label>

                <DatePicker
                    onChange={(e) => {
                        const date = new Date(e)
                        changeValues('expiration_date', `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`)
                    }}/>
            </div>

            <div className={s.box}>
                <label className={s.label}>School</label>
                <Select
                    placeholder={''}
                    style={{width: '100%'}}
                    onChange={(e) => {
                        changeValues('school', e)
                    }}
                    value={values.school}
                    options={schools.map((el) => ({
                        value: el,
                        label: el,
                    }))}
                />
            </div>

            <div className={s.box}>
                <label className={s.label}>State Association</label>
                <Select
                    placeholder={''}
                    style={{width: '100%'}}
                    onChange={(e) => {
                        changeValues('state_association', e)
                    }}
                    value={values.state_association}
                    options={stateAssociations.map((el) => ({
                        value: el,
                        label: el,
                    }))}
                />
            </div>

            <div className={s.box}>
                <label className={s.label}>National Association</label>
                <Select
                    placeholder={''}
                    style={{width: '100%'}}
                    onChange={(e) => {
                        changeValues('national_association', e)
                    }}
                    value={values.national_association}
                    options={nationalAssociations.map((el) => ({
                        value: el,
                        label: el,
                    }))}
                />
            </div>
        </div>
    );
});

export default SecondPage;

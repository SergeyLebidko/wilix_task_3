import React from 'react';
import {RateRecord, RatesData} from '../../types';
import {CURRENCY_CODE_MAP} from "../../settings";
import './RateList.scss';

type RateListProps = {
    ratesData: RatesData
}

const RateList: React.FC<RateListProps> = ({ratesData}) => {
    const base: string = ratesData.base;
    const rates: RateRecord = ratesData.rates;

    return (
        <div className="rate_list">
            <h1>Текущий курсы</h1>
            <h3>Базовая валюта {base} {CURRENCY_CODE_MAP[base]}</h3>
            <ul>
                {Object.keys(rates).map((code: string) => <li key={code}>{code} {CURRENCY_CODE_MAP[code]}</li>)}
            </ul>
        </div>
    );
}

export default RateList;
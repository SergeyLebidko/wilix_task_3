import React, {ChangeEvent} from 'react';
import {RateRecord, RatesData} from '../../types';
import {CURRENCY_CODE_MAP} from '../../settings';
import './RateList.scss';

type RateListProps = {
    ratesData: RatesData,
    defaultBase: string,
    setDefaultBase: (nextBase: string) => void
}

const RateList: React.FC<RateListProps> = ({ratesData, defaultBase, setDefaultBase}) => {
    const base: string = ratesData.base;
    const rates: RateRecord = ratesData.rates;
    const rateCodes: Array<string> = Object.keys(rates);

    const getRate = (code: string): number => {
        if (defaultBase === code) return 1;
        if (defaultBase === base) return 1 / rates[code];
        return 1 / (rates[code] * (1 / rates[defaultBase]));
    };

    const changeBaseHandler = (event: ChangeEvent<HTMLSelectElement>): void => setDefaultBase(event.target.value);

    return (
        <div className="rate_list">
            <h1>
                Базовая валюта
                <select value={defaultBase} onChange={changeBaseHandler}>
                    {rateCodes.map(
                        (code: string) => <option key={code} value={code}>{code} {CURRENCY_CODE_MAP[code]}</option>
                    )}
                </select>
            </h1>
            <ul>
                {rateCodes.map((code: string) => <li key={code}>{code} {CURRENCY_CODE_MAP[code]} {getRate(code)}</li>)}
            </ul>
        </div>
    );
}

export default RateList;
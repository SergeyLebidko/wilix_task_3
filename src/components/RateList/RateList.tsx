import React, {ChangeEvent} from 'react';
import {RateRecord, RatesData} from '../../types';
import {CURRENCY_CODE_MAP} from '../../settings';
import './RateList.scss';
import RateCards from "../RateCards/RateCards";

type RateListProps = {
    ratesData: RatesData,
    defaultBase: string,
    setDefaultBase: (nextBase: string) => void
}

const RateList: React.FC<RateListProps> = ({ratesData, defaultBase, setDefaultBase}) => {
    const base: string = ratesData.base;
    const rates: RateRecord = ratesData.rates;
    const rateCodes: Array<string> = Object.keys(rates);

    const getRateValue = (code: string): number => {
        if (defaultBase === code) return 1;
        if (defaultBase === base) return 1 / rates[code];
        return 1 / (rates[code] * (1 / rates[defaultBase]));
    };

    const changeBaseHandler = (event: ChangeEvent<HTMLSelectElement>): void => setDefaultBase(event.target.value);

    return (
        <div className="rate_list">
            <div className="rate_list__choice_block">
                <label htmlFor="default_base_selector">Базовая валюта:</label>
                <select id="default_base_selector" value={defaultBase} onChange={changeBaseHandler}>
                    {rateCodes.map(
                        (code: string) => <option key={code} value={code}>{code} {CURRENCY_CODE_MAP[code]}</option>
                    )}
                </select>
            </div>
            <RateCards rateCodes={rateCodes} getRateValue={getRateValue}/>
        </div>
    );
}

export default RateList;
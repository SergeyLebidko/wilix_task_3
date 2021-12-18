import React from 'react';
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

    return (
        <div className="rate_list">
            <div className="rate_list__base_block">
                <h1>
                    Базовая валюта: {defaultBase} {CURRENCY_CODE_MAP[defaultBase]}
                </h1>
                <p>
                    Чтобы выбрать другую базовую валюту, просто кликните по её карточке внизу.
                </p>
                <p>
                    Вы можете искать нужную валюту по её коду или названию.
                </p>
            </div>
            <RateCards rateCodes={rateCodes} getRateValue={getRateValue} clickHandler={setDefaultBase}/>
        </div>
    );
}

export default RateList;
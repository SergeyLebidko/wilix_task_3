import React, {useState} from 'react';
import RateCards from '../RateCards/RateCards';
import {RateRecord, RatesData} from '../../types';
import {CURRENCY_CODE_MAP, DEFAULT_BASE} from '../../settings';
import './RateList.scss';

type RateListProps = {
    ratesData: RatesData
}

const RateList: React.FC<RateListProps> = ({ratesData, }) => {
    const [defaultBase, setDefaultBase] = useState<string>(DEFAULT_BASE);

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
                <h1 className="rate_list__base_pane">
                    Базовая валюта: {defaultBase} {CURRENCY_CODE_MAP[defaultBase]}
                </h1>
                <p className="rate_list__help_text">
                    Чтобы выбрать другую базовую валюту, просто кликните по её карточке внизу.
                </p>
                <p className="rate_list__help_text">
                    Вы можете искать нужную валюту по её коду или названию.
                </p>
            </div>
            <RateCards rateCodes={rateCodes} getRateValue={getRateValue} clickHandler={setDefaultBase}/>
        </div>
    );
}

export default RateList;
import React from 'react';
import {CURRENCY_CODE_MAP} from '../../settings';
import './RateCards.scss';

type RateCardsProps = {
    rateCodes: Array<string>,
    getRateValue: (code: string) => number
}

const RateCards: React.FC<RateCardsProps> = ({rateCodes, getRateValue}) => {
    return (
        <ul className="rate_cards">
            {rateCodes.map(
                (code: string) =>
                    <li key={code} className="rate_cards__card">
                        {code} {CURRENCY_CODE_MAP[code]} {getRateValue(code)}
                    </li>
            )}
        </ul>
    );
}

export default RateCards;
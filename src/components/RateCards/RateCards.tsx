import React, {ChangeEvent, useEffect, useState} from 'react';
import {CURRENCY_CODE_MAP} from '../../settings';
import './RateCards.scss';

type RateCardsProps = {
    rateCodes: Array<string>,
    getRateValue?: (code: string) => number,
    clickHandler: (code: string) => void
}

const RateCards: React.FC<RateCardsProps> = ({rateCodes, getRateValue, clickHandler}) => {
    const [rateCodesToShow, setRateCodesToShow] = useState<Array<string>>([]);
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        if (!filterValue) {
            setRateCodesToShow(rateCodes);
            return;
        }
        setRateCodesToShow(rateCodes.filter((code: string): boolean => {
            const _code = code.toLowerCase();
            const _name = CURRENCY_CODE_MAP[code].toLowerCase();
            const _filterValue = filterValue.toLowerCase();
            return _code.includes(_filterValue) || _name.includes(_filterValue);
        }));
    }, [filterValue, rateCodes]);

    const filterChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => setFilterValue(event.target.value);

    return (
        <div className="rate_cards">
            <div className="rate_cards__filter_block">
                <input placeholder="Код или название валюты" value={filterValue} onChange={filterChangeHandler}/>
            </div>
            <ul className="rate_cards__cards_block">
                {rateCodesToShow.map(
                    (code: string) =>
                        <li key={code} className="rate_cards__card" onClick={() => clickHandler(code)}>
                            <span className="rate_cards__code">{code}</span>
                            <span className="rate_cards__name">{CURRENCY_CODE_MAP[code]}</span>
                            {getRateValue && <span className="rate_cards__rate">{getRateValue(code)}</span>}
                        </li>
                )}
            </ul>
        </div>

    );
}

export default RateCards;
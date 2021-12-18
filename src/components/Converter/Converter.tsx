import React, {useRef, useState} from 'react';
import {RateRecord, RatesData} from '../../types';
import './Converter.scss';
import RateCards from "../RateCards/RateCards";

type ConverterProps = {
    ratesData: RatesData
}

const Converter: React.FC<ConverterProps> = ({ratesData}) => {
    const rates: RateRecord = ratesData.rates;
    const rateCodes: Array<string> = Object.keys(rates);

    const [result, setResult] = useState<number | null>();
    const inputRef = useRef<HTMLInputElement>(null);

    const calcHandler = (): void => {
        if (!inputRef.current) return;

        const {base, rates} = ratesData;
        const [_count, _baseFrom, _baseTo] = inputRef.current.value.split(/\s+/);
        const count = +_count;
        const baseFrom = _baseFrom.toUpperCase();
        const baseTo = _baseTo.toUpperCase();

        if (baseFrom === baseTo) {
            setResult(count);
            return;
        }

        if (baseTo === base) {
            setResult(count / rates[base]);
            return;
        }

        if (baseFrom === base) {
            setResult(count * rates[baseTo]);
            return;
        }

        setResult((count / rates[baseFrom]) * rates[baseTo]);
    }

    const cardClickHandler = (code: string): void => {
        if(!inputRef.current) return;
        inputRef.current.value += ` ${code}`;
    }

    return (
        <div className="converter">
            <div className="converter__request_block">
                <input className="converter__request_field" ref={inputRef} placeholder="Введите запрос"/>
                <button className="converter__calc_button" onClick={calcHandler}>Рассчитать</button>
            </div>
            <p className="converter__help_text">
                Введите запрос на конвертирование в виде: сумма код_исходной_валюты код_целевой_валюты
            </p>
            <p className="converter__help_text">
                Вы можете выбирать нужные валюты из списка внизу (можно искать по коду или наименованию).
            </p>
            {result !== null && <h1 className="converter__result">{result}</h1>}
            <RateCards rateCodes={rateCodes} clickHandler={cardClickHandler}/>
        </div>
    );
}

export default Converter;